// api/symbol-visibility.js
// Lets the owner choose, from admin.html, which symbols actually appear on
// the public dashboard — independent of which symbols the EA is scanning.
// GET returns every symbol currently seen in the signals table plus which
// ones are currently hidden, so the admin UI can render a checklist. POST
// saves a new hidden list. Both protected by ADMIN_SECRET, same pattern as
// generate-code.js / list-codes.js. The actual enforcement of "hidden
// symbols don't reach the public dashboard" happens server-side in
// latest.js, not here — this endpoint only manages the setting.

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
      .select('hidden_symbols')
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
      hidden_symbols: configRow?.hidden_symbols || []
    });
  }

  if (req.method === 'POST') {
    const { admin_secret, hidden_symbols } = req.body;

    if (!admin_secret || admin_secret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    if (!Array.isArray(hidden_symbols)) {
      return res.status(400).json({ error: 'hidden_symbols must be an array' });
    }

    const { error } = await supabase
      .from('display_config')
      .upsert({ id: 1, hidden_symbols });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ ok: true, hidden_symbols });
  }

  return res.status(405).json({ error: 'method_not_allowed' });
}
