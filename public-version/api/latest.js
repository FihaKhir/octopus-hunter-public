// api/latest.js
// This endpoint returns the latest signal for every symbol.
// Your website will call this every few seconds to update the dashboard.
// Requires a valid, non-expired access code passed as ?code=... — this is
// what makes the access gate real: even someone who found this URL directly
// can't read signal data without a genuinely valid code.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function isCodeValid(code){
  if (!code) return false;
  const { data: row } = await supabase
    .from('access_codes')
    .select('*')
    .eq('code', code)
    .maybeSingle();

  if (!row || !row.redeemed_at) return false;
  if (row.duration_days === null || row.duration_days === undefined) return true; // lifetime

  const redeemedMs = new Date(row.redeemed_at).getTime();
  const expiresMs = redeemedMs + row.duration_days * 24 * 60 * 60 * 1000;
  return Date.now() <= expiresMs;
}

export default async function handler(req, res) {
  // Allow the website (running in a browser, possibly a different domain) to call this
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Only GET requests are allowed here' });
  }

  const valid = await isCodeValid(req.query.code);
  if (!valid) {
    return res.status(401).json({ error: 'invalid_or_expired_code' });
  }

  const { data, error } = await supabase
    .from('signals')
    .select('*')
    .order('sent_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  // Read display_config
  let hiddenSymbols = [];
  let showTpSl = false; // default to hidden
  let exitDisplayMode = 'sltp'; // default: unchanged existing behaviour
  let candleExitBars = 20;
  try {
    // select('*') instead of naming exit_display_mode/candle_exit_bars
    // explicitly — an explicitly-named missing column fails PostgREST's
    // ENTIRE query, which would have also wiped out hidden_symbols/
    // show_tp_sl (and therefore shown ALL symbols publicly, hidden ones
    // included) whenever the migration hasn't been run yet.
    const { data: configRow, error: configError } = await supabase
  .from('display_config')
  .select('*')
  .eq('id', 1)
  .maybeSingle();

    if (configError) {
      console.error('display_config read error (treating as no config):', configError);
    } else {
      
      // normalize hidden_symbols safely to an array of trimmed strings
      if (Array.isArray(configRow?.hidden_symbols)) {
        hiddenSymbols = configRow.hidden_symbols.map(s => String(s).trim());
      } else {
        hiddenSymbols = [];
      }
      showTpSl = !!configRow?.show_tp_sl;
      exitDisplayMode = configRow?.exit_display_mode || 'sltp';
      candleExitBars = configRow?.candle_exit_bars ?? 20;
    }
  } catch (err) {
    console.error('display_config read failed (treating as no config):', err);
  }

  // SL/TP price fields are only ever exposed when the admin's Exit / Signal
  // Display Mode is explicitly "SL/TP" (the default) AND the legacy
  // show_tp_sl toggle is on — this preserves existing behaviour exactly
  // when exit_display_mode is left at its default, while the "Candle Exit"
  // and "None" modes hide prices regardless of show_tp_sl.
  const includePriceFields = showTpSl && exitDisplayMode === 'sltp';

  // Diagnostic logging requested (non-sensitive)
  try {
    console.log('[DISPLAY CONFIG]', {
      hidden_symbols_count: (hiddenSymbols || []).length,
      show_tp_sl: !!showTpSl
    });
  } catch (e) { /* ignore logging errors */ }

  // Compute visibleRows with normalized matching
  const beforeCount = Array.isArray(data) ? data.length : 0;

  // Build a normalized Set for fast membership checks
  const hiddenSet = new Set((hiddenSymbols || []).map(s => String(s).trim()));

  const visibleRows = (hiddenSet.size > 0 && Array.isArray(data))
    ? data.filter(row => {
        const sym = row && row.symbol ? String(row.symbol).trim() : '';
        return !hiddenSet.has(sym);
      })
    : data;

  const afterCount = Array.isArray(visibleRows) ? visibleRows.length : 0;

  // More diagnostic logs
  try {
    console.log('[VISIBLE ROWS]', { before: beforeCount, after: afterCount });
    console.log('[TP SL]', { enabled: !!showTpSl });
  } catch (e) { /* ignore */ }

  // Public version: only expose what the UI actually shows.
  const publicData = (visibleRows || []).map(row => {
    const base = {
      symbol: row.symbol,
      direction: row.direction,
      confidence: row.confidence,
      status: row.status,
      hit_time: row.hit_time,
      sent_at: row.sent_at,
      created_at: row.created_at || row.sent_at,
      bar_time: row.bar_time,
      timeframe: row.timeframe,
      family: row.family,
      sl_proximity: row.sl_proximity
    };
    if (includePriceFields) {
      base.entry_price = row.entry_price;
      base.sl_price = row.sl_price;
      base.tp_price = row.tp_price;
    }
    return base;
  });

  // Response shape stays compatible with the existing dashboard, which
  // already accepts either a bare array or { signals: [...] } (see
  // index.html's poll()/renderGrid() — both branch on Array.isArray(data)).
  // Wrapping lets us carry the global exit_display_mode/candle_exit_bars
  // settings alongside the per-signal rows without adding a new endpoint.
  return res.status(200).json({
    signals: publicData,
    exit_display_mode: exitDisplayMode,
    candle_exit_bars: candleExitBars
  });
}
