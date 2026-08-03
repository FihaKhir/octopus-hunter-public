// api/behaviour-profile.js
// Serves a single Behaviour Profile JSON file from Supabase Storage
// (bucket: mie-data) for the Behaviour Explorer panel in lab.html.
// Mirrors api/history.js's client setup and response conventions.

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

  const symbol = req.query.symbol;
  if (!symbol) {
    return res.status(400).json({ error: 'missing_symbol' });
  }

  // Phase 1: fixed to today's M1 profile. Date/period can become query
  // params later without changing this endpoint's shape.
  const filePath = `Profiles/${symbol}/PERIOD_M1/2026-08-03.json`;

  try {
    const { data, error } = await supabase
      .storage
      .from('mie-data')
      .download(filePath);

    if (error) {
      console.error('Supabase storage error:', error);
      return res.status(500).json({ error: error.message });
    }

    const text = await data.text();
    const json = JSON.parse(text);

    return res.status(200).json(json);
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}
