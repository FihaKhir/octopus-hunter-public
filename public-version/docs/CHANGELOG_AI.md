# AI Change Log

---

## 2026-07-24

### Author

GitHub Copilot

### Summary

Added analytics support for completed trades.

### Files Changed

- api/signal.js
- migrations/001_add_trade_resolution_fields.sql

### Changes

- Added support for:
  - trade_duration_seconds
  - mfe
  - mae
  - trading_session
  - trading_weekday
- Preserved backward compatibility.
- Added SQL migration.
- Existing trading logic unchanged.

### Reviewed By

ChatGPT

### Status

Approved

### Next Task

Run the SQL migration in Supabase.

---
