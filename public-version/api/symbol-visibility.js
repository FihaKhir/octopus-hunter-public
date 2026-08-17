// api/symbol-visibility.js
// Lets the owner choose, from admin.html, which symbols actually appear on
// the public dashboard — independent of which symbols the EA is scanning.
// GET returns every symbol currently seen in the signals table plus which
// ones are currently hidden, so the admin UI can render a checklist. POST
// saves a new hidden list. Both protected by ADMIN_SECRET, same pattern as
// generate-code.js / list-codes.js. The actual enforcement of "hidden
// symbols don't reach the public dashboard" happens server-side in
// latest.js, not here — this endpoint only manages the setting.
//
// Also carries the "Exit / Signal Display Mode" setting (exit_display_mode:
// 'sltp' | 'candle' | 'none', default 'sltp') and its companion
// candle_exit_bars value (default 20). Same read/write pattern as
// hidden_symbols/show_tp_sl above — this endpoint only manages the setting;
// enforcement of what the public card shows happens in latest.js/index.html,
// and enforcement of the actual candle-based trade close must happen in the
// EA (see EXIT_DISPLAY_MODES note below).
const EXIT_DISPLAY_MODES = ['sltp', 'candle', 'none'];
const DEFAULT_EXIT_DISPLAY_MODE = 'sltp';
const DEFAULT_CANDLE_EXIT_BARS = 20;

import { createClient } from '@supabase/supabase-js';

const SUPPORTED_SYMBOLS = [
  'BreakX 600',
  'BreakX 1200',
  'BreakX 1800',
  'GainX 400',
  'GainX 600',
  'GainX 800',
  'GainX 999',
  'GainX 1200',
  'PainX 400',
  'PainX 600',
  'PainX 800',
  'PainX 999',
  'PainX 1200',
  'SwitchX 600',
  'SwitchX 1200',
  'SwitchX 1800',
  'TrendX 600',
  'TrendX 1200',
  'TrendX 1800',
  'FX Vol 20',
  'FX Vol 40',
  'FX Vol 60'
];

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const adminSecret = req.query.admin_secret;
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'unauthorized' });
    }

    const { data: symbolRows, error: symbolsError } = await supabase
      .from('signals')
      .select('symbol')
      .order('symbol', { ascending: true });

    if (symbolsError) {
      console.error('Supabase error:', symbolsError);
      return res.status(500).json({ error: symbolsError.message });
    }

    const { data: configRow, error: configError } = await supabase
      .from('display_config')
      .select('hidden_symbols, show_tp_sl, exit_display_mode, candle_exit_bars')
      .eq('id', 1)
      .maybeSingle();

    if (configError) {
      console.error('Supabase error:', configError);
      return res.status(500).json({ error: configError.message });
    }

    const dbSymbols = (symbolRows || []).map(r => r.symbol);
    const combinedSymbols = Array.from(new Set([...SUPPORTED_SYMBOLS, ...dbSymbols])).sort();

    return res.status(200).json({
      all_symbols: combinedSymbols,
      hidden_symbols: configRow?.hidden_symbols || [],
      show_tp_sl: configRow?.show_tp_sl ?? false,
      exit_display_mode: configRow?.exit_display_mode || DEFAULT_EXIT_DISPLAY_MODE,
      candle_exit_bars: configRow?.candle_exit_bars ?? DEFAULT_CANDLE_EXIT_BARS
    });
  }

  if (req.method === 'POST') {
    const { admin_secret, hidden_symbols, show_tp_sl, exit_display_mode, candle_exit_bars } = req.body;

    if (!admin_secret || admin_secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!Array.isArray(hidden_symbols)) {
      return res.status(400).json({ error: 'hidden_symbols must be an array' });
    }
    if (exit_display_mode !== undefined && !EXIT_DISPLAY_MODES.includes(exit_display_mode)) {
      return res.status(400).json({ error: 'exit_display_mode must be one of: ' + EXIT_DISPLAY_MODES.join(', ') });
    }
    if (candle_exit_bars !== undefined && (!Number.isInteger(candle_exit_bars) || candle_exit_bars <= 0)) {
      return res.status(400).json({ error: 'candle_exit_bars must be a positive integer' });
    }

    // exit_display_mode/candle_exit_bars are optional on this request so that
    // a caller that only knows about hidden_symbols/show_tp_sl (e.g. an
    // older cached admin UI) doesn't silently reset these new settings back
    // to their defaults every time it saves. When omitted, fall back to
    // whatever is already stored (or the default, on first-ever save).
    let existingExitMode = DEFAULT_EXIT_DISPLAY_MODE;
    let existingCandleBars = DEFAULT_CANDLE_EXIT_BARS;
    if (exit_display_mode === undefined || candle_exit_bars === undefined) {
      const { data: existingRow } = await supabase
        .from('display_config')
        .select('exit_display_mode, candle_exit_bars')
        .eq('id', 1)
        .maybeSingle();
      if (existingRow?.exit_display_mode) existingExitMode = existingRow.exit_display_mode;
      if (existingRow?.candle_exit_bars) existingCandleBars = existingRow.candle_exit_bars;
    }

    const resolvedExitMode = exit_display_mode !== undefined ? exit_display_mode : existingExitMode;
    const resolvedCandleBars = candle_exit_bars !== undefined ? candle_exit_bars : existingCandleBars;

    // upsert hidden_symbols, show_tp_sl, exit_display_mode and candle_exit_bars
    const upsertObj = {
      id: 1,
      hidden_symbols,
      show_tp_sl: !!show_tp_sl,
      exit_display_mode: resolvedExitMode,
      candle_exit_bars: resolvedCandleBars
    };

    const { error } = await supabase
      .from('display_config')
      .upsert(upsertObj);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      ok: true,
      hidden_symbols,
      show_tp_sl: !!show_tp_sl,
      exit_display_mode: resolvedExitMode,
      candle_exit_bars: resolvedCandleBars
    });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
