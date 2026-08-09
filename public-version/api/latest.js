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

  // Symbol visibility: which symbols the owner has chosen to show on the
  // public dashboard, set via admin.html -> /api/symbol-visibility. This is
  // independent of which symbols the EA actually scans/reports on — a
  // hidden symbol still gets tracked and logged normally, it just isn't
  // returned here. A failure reading this config fails OPEN (shows
  // everything) rather than closed, so a display_config hiccup can never
  // take down the whole dashboard the way failing closed would.
  let hiddenSymbols = [];
  let showTpSl = false; // default to hidden
  try {
    const { data: configRow, error: configError } = await supabase
      .from('display_config')
      .select('hidden_symbols, maintenance_mode, show_tp_sl')
      .eq('id', 1)
      .maybeSingle();
    if (configError) {
      // IMPORTANT: per requirements, if display_config lookup fails, TP/SL must remain hidden.
      console.error('display_config read error (show_tp_sl will be treated as false):', configError);
    } else {
      if (configRow?.maintenance_mode) {
        return res.status(200).json({ maintenance: true, signals: [] });
      }
      if (configRow?.hidden_symbols) {
        hiddenSymbols = configRow.hidden_symbols;
      }
      // Strictly treat show_tp_sl as true only when it's exactly true.
      const showTpSlValue = configRow?.show_tp_sl;
      showTpSl = (showTpSlValue === true);
    }
  } catch (err) {
    console.error('display_config read failed (show_tp_sl will be treated as false):', err);
  }

  const visibleRows = hiddenSymbols.length
    ? data.filter(row => !hiddenSymbols.includes(row.symbol))
    : data;

  // Public version: only expose what the UI actually shows — no entry/SL/TP,
  // no confirmation count, no compression/velocity/family breakdown. This is
  // real server-side hiding, not just a UI restriction someone could bypass
  // by reading the network request directly.
  const publicData = visibleRows.map(row => {
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
    if (showTpSl) {
      // Include these fields only when show_tp_sl is explicitly true in DB
      base.entry_price = row.entry_price;
      base.sl_price = row.sl_price;
      base.tp_price = row.tp_price;
    }
    return base;
  });

  return res.status(200).json(publicData);
}
