// api/near-miss.js
// Receives diagnostic "near miss" events from the EA — setups whose
// confidence landed within InpNearMissBand points of the threshold but
// didn't cross it. Purely additive: never touches the signals or
// trade_history tables, never visible on the public dashboard. Exists so
// "are we filtering out valid setups" can be answered with real session
// data instead of guesswork. No auth required to receive, matching
// /api/signal's existing model (server-to-server from the EA only, not
// browser-facing) — see SECURITY.md for the accepted-risk reasoning that
// already applies to /api/signal.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const {
      symbol, direction, confidence,
      primary_score, compression_score, velocity_score, rsi_value,
      strategy_version, logged_at
    } = req.body;

    if (!symbol) {
      return res.status(400).json({ error: 'Missing required field: symbol' });
    }

    const row = { symbol, direction, confidence, primary_score, compression_score, velocity_score, strategy_version, logged_at };
    if (rsi_value !== undefined) row.rsi_value = rsi_value;

    const { error } = await supabase.from('near_misses').insert(row);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
