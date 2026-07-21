// api/reset-history.js
// Deletes rows from trade_history (and optionally near_misses). This is a
// genuinely destructive, irreversible action — protected by ADMIN_SECRET
// like every other admin endpoint, and scoped so a mistake can be limited
// to a single strategy_version rather than always wiping everything.
//
// scope: 'all'     -> deletes every trade_history row
//        'version' -> deletes only rows matching strategy_version
//                     (pass strategy_version: null to target the
//                     pre-tracking/untagged rows specifically)

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const { admin_secret, scope, strategy_version, also_clear_near_misses } = req.body;

  if (!admin_secret || admin_secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  if (scope !== 'all' && scope !== 'version') {
    return res.status(400).json({ error: 'scope must be "all" or "version"' });
  }

  let deletedCount = 0;

  try {
    if (scope === 'all') {
      const { error, count } = await supabase
        .from('trade_history')
        .delete({ count: 'exact' })
        .gte('id', 0); // matches every row — supabase-js requires an explicit filter, no unconditional delete
      if (error) throw error;
      deletedCount = count ?? 0;
    } else {
      let query = supabase.from('trade_history').delete({ count: 'exact' });
      query = (strategy_version === null || strategy_version === undefined)
        ? query.is('strategy_version', null)
        : query.eq('strategy_version', strategy_version);
      const { error, count } = await query;
      if (error) throw error;
      deletedCount = count ?? 0;
    }

    let nearMissDeletedCount = 0;
    if (also_clear_near_misses) {
      if (scope === 'all') {
        const { error, count } = await supabase.from('near_misses').delete({ count: 'exact' }).gte('id', 0);
        if (error) throw error;
        nearMissDeletedCount = count ?? 0;
      } else {
        let nmQuery = supabase.from('near_misses').delete({ count: 'exact' });
        nmQuery = (strategy_version === null || strategy_version === undefined)
          ? nmQuery.is('strategy_version', null)
          : nmQuery.eq('strategy_version', strategy_version);
        const { error, count } = await nmQuery;
        if (error) throw error;
        nearMissDeletedCount = count ?? 0;
      }
    }

    return res.status(200).json({ ok: true, deletedCount, nearMissDeletedCount });
  } catch (err) {
    console.error('reset-history error:', err);
    return res.status(500).json({ error: err.message || 'Unexpected server error' });
  }
}
