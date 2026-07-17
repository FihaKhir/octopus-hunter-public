// api/history.js
// Returns the permanent trade history log (every signal ever fired, with
// its outcome once resolved). This is an owner-facing analytics endpoint,
// protected by ADMIN_SECRET — not a regular access code — since it's meant
// for performance review, not for regular dashboard viewers. Keeping this
// separate from /api/latest matters especially here on the Public version,
// where hiding entry/SL/TP on the live dashboard would otherwise be
// pointless if this endpoint leaked the same detail to anyone with a code.

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });

  const adminSecret = req.query.admin_secret;
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  // ?since=<unix_seconds> lets the caller ask for a real time-bounded slice
  // (e.g. "last 1h") instead of always getting whatever the most recent N
  // rows happen to be. Without this, a capped row limit silently truncates
  // any time-range filtering done client-side once signal volume is high
  // enough that the cap covers less than the requested window.
  let query = supabase
    .from('trade_history')
    .select('*')
    .order('opened_at', { ascending: false });

  const since = req.query.since ? parseInt(req.query.since, 10) : null;
  if (since && !Number.isNaN(since)) {
    query = query.gte('opened_at', since).limit(5000);
  } else {
    query = query.limit(500);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase error:', error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
