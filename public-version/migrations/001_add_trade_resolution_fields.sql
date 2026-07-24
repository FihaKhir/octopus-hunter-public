-- Migration: Add trade resolution fields to trade_history table
-- Description: Adds optional fields captured from MT5 EA status updates (TP/SL hit)
-- preserving backward compatibility with existing data

ALTER TABLE trade_history
  ADD COLUMN IF NOT EXISTS trade_duration_seconds INTEGER,
  ADD COLUMN IF NOT EXISTS mfe DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS mae DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS trading_session TEXT,
  ADD COLUMN IF NOT EXISTS trading_weekday SMALLINT;

-- Create indexes for efficient querying on trading session and weekday
CREATE INDEX IF NOT EXISTS idx_trade_history_trading_session ON trade_history(trading_session);
CREATE INDEX IF NOT EXISTS idx_trade_history_trading_weekday ON trade_history(trading_weekday);
