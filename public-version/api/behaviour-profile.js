import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method_not_allowed' });
  }// Load similar historical trades for this symbol
const { data: similarRows, error: similarError } = await supabase
  .from('trade_history')
  .select('*')
  .eq('symbol', symbol)
  .order('opened_at', { ascending: false })
  .limit(10);

// Load ALL trades for learning statistics
const { data: learningRows, error: learningError } = await supabase
  .from('trade_history')
  .select('outcome, confidence')
  .eq('symbol', symbol);

if (similarError) {
  console.error("Similar trades error:", similarError);
}

if (learningError) {
  console.error("Learning rows error:", learningError);
}

console.log("Similar rows:", similarRows);

const similarData = similarRows || [];
const learningData = learningRows || [];

// ---------------- Similar Behaviours ----------------

json.SimilarBehaviours = similarData.map(r => ({
  date: new Date(r.opened_at * 1000).toISOString().slice(0, 10),
  symbol: r.symbol,
  direction: r.direction,
  confidence: r.confidence,
  result: r.outcome,
  duration: `${Math.round((r.trade_duration_seconds || 0) / 60)} min`,
  mfe: r.mfe,
  mae: r.mae
}));

// ---------------- Historical Learning ----------------

const completed = learningData.filter(
  r => r.outcome === "win" || r.outcome === "loss"
);

const wins = completed.filter(r => r.outcome === "win").length;

json.Learning = {
  historicalMatches: completed.length,

  historicalWinRate: completed.length
    ? Math.round((wins * 100) / completed.length)
    : null,

  averageProfit: null, // Stage 2

  averageConfidence: completed.length
    ? Math.round(
        completed.reduce((sum, r) => sum + (r.confidence || 0), 0) /
        completed.length
      )
    : null
};
    
    return res.status(200).json(json);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message || 'Unexpected server error'
    });
  }
}
