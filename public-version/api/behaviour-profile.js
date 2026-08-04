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
  }

  const symbol = decodeURIComponent(req.query.symbol || '');

  if (!symbol) {
    return res.status(400).json({ error: 'missing_symbol' });
  }

  try {
    // List every file inside the symbol folder
    const { data: files, error: listError } = await supabase
      .storage
      .from('mie-data')
      .list(`Profiles/${symbol}/PERIOD_M1`, {
        limit: 100
      });

    if (listError) {
      console.error('List error:', listError);
      return res.status(500).json({ error: listError.message });
    }

    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'No behaviour profiles found.' });
    }

    // Keep only JSON files
    const jsonFiles = files
      .filter(f => f.name.toLowerCase().endsWith('.json'))
      .sort((a, b) => b.name.localeCompare(a.name));

    if (jsonFiles.length === 0) {
      return res.status(404).json({ error: 'No JSON files found.' });
    }

    const newestFile = jsonFiles[0].name;

    const filePath = `Profiles/${symbol}/PERIOD_M1/${newestFile}`;

    console.log('Loading profile:', filePath);

    const { data, error } = await supabase
      .storage
      .from('mie-data')
      .download(filePath);

    if (error) {
      console.error('Download error:', error);
      return res.status(500).json({ error: error.message });
    }

    const buffer = await data.arrayBuffer();

    const decoder = new TextDecoder("utf-16le");
    
    const text = decoder.decode(buffer).replace(/^\uFEFF/, "");
    
    const json = JSON.parse(text);

// Load similar historical trades for this symbol
const { data: similarRows, error: similarError } = await supabase
  .from('trade_history')
  .select('*')
  .eq('symbol', symbol)
  .order('opened_at', { ascending: false })
  .limit(10);
const { data: learningRows, error: learningError } = await supabase
  .from('trade_history')
  .select('outcome, confidence')
  .eq('symbol', symbol);
if (similarError) {
  console.error("Similar trades error:", similarError);
}

console.log("Similar rows:", similarRows);

// Similar Behaviours
json.SimilarBehaviours = (similarRows || []).map(r => ({
  date: new Date(r.opened_at * 1000).toISOString().slice(0, 10),
  symbol: r.symbol,
  direction: r.direction,
  confidence: r.confidence,
  result: r.outcome,
  duration: `${Math.round(r.trade_duration_seconds / 60)} min`,
  mfe: r.mfe,
  mae: r.mae
}));

// Historical Learning
const total = similarRows ? similarRows.length : 0;

const completed = (learningRows || []).filter(
  r => r.outcome === "win" || r.outcome === "loss"
);

const wins = completed.filter(r => r.outcome === "win").length;
json.Learning = {
  historicalMatches: completed.length,
historicalWinRate: completed.length
  ? Math.round((wins * 100) / completed.length)
  : null,
  averageProfit: null,
  averageConfidence: completed.length
  ? Math.round(
      completed.reduce((sum, r) => sum + (r.confidence || 0), 0) / completed.length
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
