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

  // TEMPORARY DIAGNOSTIC: Replace validation with diagnostic response
  return res.status(200).json({
    received: adminSecret,
    received_length: adminSecret ? adminSecret.length : 0,
    env_exists: !!process.env.ADMIN_SECRET,
    env_length: process.env.ADMIN_SECRET ? process.env.ADMIN_SECRET.length : 0,
    matches: adminSecret === process.env.ADMIN_SECRET
  });

  // Supabase's REST layer (PostgREST) silently caps every single request at
  // its configured "Max Rows" (default 1000), regardless of any .limit()
  // value requested in code. At this project's signal volume, a single
  // request stopped covering even "last 1h" accurately, which is why every
  // wider time-range button was returning the identical truncated slice.
  // Fix: page through with .range() until a page comes back short (meaning
  // we've reached the real end), accumulating everything server-side before
  // responding. PAGE_SIZE assumes the project default of 1000 but works
  // correctly even if that dashboard setting is later raised or lowered.
  const since = req.query.since ? parseInt(req.query.since, 10) : null;
  const PAGE_SIZE = 1000;
  const HARD_CAP = 10000; // safety valve — see note in the response below if hit

  let rows = [];
  let offset = 0;
  try {
    while (true) {
      let query = supabase
        .from('trade_history')
        .select('*')
        .order('opened_at', { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);

      if (since && !Number.isNaN(since)) {
        query = query.gte('opened_at', since);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Supabase error:', error);
        return res.status(500).json({ error: error.message });
      }

      rows = rows.concat(data);
      if (data.length < PAGE_SIZE || rows.length >= HARD_CAP) break;
      offset += PAGE_SIZE;
    }
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }

  return res.status(200).json({
    rows,
    truncated: rows.length >= HARD_CAP // true = there's more data than HARD_CAP; narrow the time range for exact numbers
  });
}
