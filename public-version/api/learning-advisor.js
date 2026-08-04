import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { symbol, family, direction } = req.body;
  const { data: rows, error } = await supabase
  .from('trade_history')
  .select('outcome, confidence')
  .eq('symbol', symbol)
  .eq('family', family)
  .eq('direction', direction)
  .not('outcome', 'in', '("open","invalidated")');

  if (!symbol || !family || !direction) {
    return res.status(400).json({ error: 'Missing data' });
  }

}
