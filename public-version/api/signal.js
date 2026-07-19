// api/signal.js
// Receives both new signals AND status updates (TP/SL hit) from the MT5 EA.
// Upsert only touches the fields provided, so a status-only update won't
// wipe out the entry/SL/TP data already stored for that symbol.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed here' });
  }

  try {
    const {
      symbol, family, direction, confidence, components, confirmations,
      atr_value, baseline_atr_value, entry_price, sl_price, tp_price,
      ticks_since_jump, expected_gap_ticks, family_score, sl_proximity,
      timeframe, status, hit_time, bar_time, sent_at,
      bbw_score, rsi_value, strategy_version
    } = req.body;

    if (!symbol) {
      return res.status(400).json({ error: 'Missing required field: symbol' });
    }

    // Build the row with only the fields that were actually sent, so a
    // status-only update (TP/SL hit) doesn't overwrite other columns with null.
    const row = { symbol };
    if (family !== undefined) row.family = family;
    if (direction !== undefined) row.direction = direction;
    if (confidence !== undefined) row.confidence = confidence;
    if (confirmations !== undefined) row.confirmations = confirmations;
    if (components?.compression !== undefined) row.compression = components.compression;
    if (components?.velocity !== undefined) row.velocity = components.velocity;
    if (components?.time_since_spike !== undefined) row.time_since_spike = components.time_since_spike;
    if (atr_value !== undefined) row.atr_value = atr_value;
    if (entry_price !== undefined) row.entry_price = entry_price;
    if (sl_price !== undefined) row.sl_price = sl_price;
    if (tp_price !== undefined) row.tp_price = tp_price;
    if (ticks_since_jump !== undefined) row.ticks_since_jump = ticks_since_jump;
    if (expected_gap_ticks !== undefined) row.expected_gap_ticks = expected_gap_ticks;
    if (family_score !== undefined) row.family_score = family_score;
    if (sl_proximity !== undefined) row.sl_proximity = sl_proximity;
    if (timeframe !== undefined) row.timeframe = timeframe;
    if (status !== undefined) row.status = status;
    if (hit_time !== undefined) row.hit_time = hit_time;
    if (bar_time !== undefined) row.bar_time = bar_time;
    if (sent_at !== undefined) row.sent_at = sent_at;
    if (bbw_score !== undefined) row.bbw_score = bbw_score;
    if (strategy_version !== undefined) row.strategy_version = strategy_version;
    if (baseline_atr_value !== undefined) row.baseline_atr_value = baseline_atr_value;
    if (rsi_value !== undefined) row.rsi_value = rsi_value;

    const { error } = await supabase
      .from('signals')
      .upsert(row, { onConflict: 'symbol' });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    // --- Trade history logging -----------------------------------------
    // Isolated in its own try/catch so a trade_history failure can never
    // break the primary signals upsert response above. See TODO.md for
    // the agreed plan this implements.
    try {
      const isNewActiveSignal = entry_price !== undefined && status === 'active';
      const isResolution = (status === 'tp_hit' || status === 'sl_hit') && entry_price === undefined;

      if (isNewActiveSignal) {
        // A new active signal for this symbol means any previous 'open' row
        // for the same symbol never actually resolved (confidence dropped
        // and a fresh signal fired before the old one hit TP or SL). Close
        // it out as 'invalidated' rather than leaving it stuck 'open'
        // forever — otherwise win-rate math and strategy-version comparisons
        // both get skewed by rows that were never really live trades at the
        // time this new one opened. This runs every time, so it self-heals
        // going forward even without a manual backfill.
        const { error: staleCloseError } = await supabase
          .from('trade_history')
          .update({ outcome: 'invalidated', closed_at: sent_at })
          .eq('symbol', symbol)
          .eq('outcome', 'open');
        if (staleCloseError) {
          console.error('trade_history stale-close error:', staleCloseError);
        }

        const { error: historyInsertError } = await supabase
          .from('trade_history')
          .insert({
            symbol, family, direction, confidence,
            entry_price, sl_price, tp_price, timeframe,
            outcome: 'open',
            opened_at: sent_at,
            strategy_version: strategy_version ?? null,
            // Captured so the baseline-ATR SL hypothesis can be validated
            // rigorously from this point forward — this data never existed
            // in trade_history before, which is why the original hypothesis
            // couldn't be backtested against pre-existing rows.
            atr_at_entry: atr_value ?? null,
            baseline_atr_at_entry: baseline_atr_value ?? null,
            compression_at_entry: components?.compression ?? null
          });
        if (historyInsertError) {
          console.error('trade_history insert error:', historyInsertError);
        }
      } else if (isResolution) {
        const { data: openRow, error: findError } = await supabase
          .from('trade_history')
          .select('id')
          .eq('symbol', symbol)
          .eq('outcome', 'open')
          .order('opened_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (findError) {
          console.error('trade_history lookup error:', findError);
        } else if (openRow) {
          const { error: updateError } = await supabase
            .from('trade_history')
            .update({
              outcome: status === 'tp_hit' ? 'win' : 'loss',
              closed_at: hit_time
            })
            .eq('id', openRow.id);
          if (updateError) {
            console.error('trade_history update error:', updateError);
          }
        }
        // No matching 'open' row is not treated as an error — it can happen
        // if the history table was only just created and this symbol's
        // still-open signal predates it.
      }
    } catch (historyErr) {
      console.error('trade_history logging failed (non-fatal):', historyErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
