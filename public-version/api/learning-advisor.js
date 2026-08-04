import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {

  if (req.method !== 'POST' && req.method !== 'GET') {
  return res.status(405).json({ error: 'Only POST or GET allowed' });
}

const input = req.method === 'GET'
  ? req.query
  : req.body;

const { symbol, family, direction } = input;

  const { symbol, family, direction } = req.body;

  if (!symbol || !family || !direction) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const { data: rows, error } = await supabase
    .from('trade_history')
    .select('outcome, confidence')
    .eq('symbol', symbol)
    .eq('family', family)
    .eq('direction', direction)
    .not('outcome', 'in', '("open","invalidated")');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  const total = rows.length;

  const wins = rows.filter(r => r.outcome === 'win').length;
  const losses = rows.filter(r => r.outcome === 'loss').length;

  const winRate = total
    ? Math.round((wins * 100) / total)
    : 0;

  const averageConfidence = total
    ? Math.round(
        rows.reduce((sum, r) => sum + (r.confidence || 0), 0) / total
      )
    : 0;

  return res.status(200).json({
    symbol,
    family,
    direction,
    totalTrades: total,
    wins,
    losses,
    winRate,
    averageConfidence
  });
}
