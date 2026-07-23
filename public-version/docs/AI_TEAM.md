# Octopus Hunter AI Team Context

## Project

Octopus Hunter is a professional MetaTrader 5 signal generation platform.

The project consists of:

- MT5 Expert Advisor (MQ5)
- Supabase PostgreSQL database
- Supabase Edge Functions (/api)
- Static HTML Dashboard
- GitHub repository

---

## Current Architecture

MT5 EA

↓

api/signal.js

↓

Supabase

↓

Dashboard

Other API endpoints:

heartbeat.js

near-miss.js

history.js

latest.js

verify-code.js

generate-code.js

list-codes.js

symbol-visibility.js

---

## Current Development Stage

Version:
3.0 Development

Current Sprint:
Analytics Pipeline

Status:

✅ EA Analytics

✅ API Analytics

⏳ Database Migration

⬜ Dashboard Analytics

---

## Project Goals

Primary goal:

Improve signal quality.

Secondary goal:

Build a complete analytics platform.

Future goal:

AI-assisted strategy optimization.

---

## Important Rules

Never change trading logic unless explicitly requested.

Never change endpoint URLs.

Always maintain backward compatibility.

Preserve existing functionality.

Prefer adding features instead of rewriting code.

Every change must compile.

Every change must be production-ready.

---

## Coding Style

Small focused changes.

Clear comments.

No duplicated logic.

No unnecessary refactoring.

Backward compatible.

---

## AI Collaboration

Different AI assistants may contribute.

Before changing code:

Understand existing architecture.

Avoid assumptions.

Review existing implementation first.

Explain why a change is needed.

When finished:

Summarize changes.

List affected files.

List required SQL migrations.

List testing steps.

Never modify unrelated files.

---

## Repository Structure

api/

docs/

assets/

dashboard html

MQ5 Expert Advisor

Supabase database

---

## Current Analytics Fields

trade_duration_seconds

mfe

mae

trading_session

trading_weekday

---

## Owner

Project Owner:

Younes

Architecture decisions should prioritize:

Reliability

Maintainability

Performance

Free/open-source services whenever possible.
# Octopus Hunter AI Team Context

## Project

Octopus Hunter is a professional MetaTrader 5 signal generation platform.

The project consists of:

- MT5 Expert Advisor (MQ5)
- Supabase PostgreSQL database
- Supabase Edge Functions (/api)
- Static HTML Dashboard
- GitHub repository

---

## Current Architecture

MT5 EA

↓

api/signal.js

↓

Supabase

↓

Dashboard

Other API endpoints:

heartbeat.js

near-miss.js

history.js

latest.js

verify-code.js

generate-code.js

list-codes.js

symbol-visibility.js

---

## Current Development Stage

Version:
3.0 Development

Current Sprint:
Analytics Pipeline

Status:

✅ EA Analytics

✅ API Analytics

⏳ Database Migration

⬜ Dashboard Analytics

---

## Project Goals

Primary goal:

Improve signal quality.

Secondary goal:

Build a complete analytics platform.

Future goal:

AI-assisted strategy optimization.

---

## Important Rules

Never change trading logic unless explicitly requested.

Never change endpoint URLs.

Always maintain backward compatibility.

Preserve existing functionality.

Prefer adding features instead of rewriting code.

Every change must compile.

Every change must be production-ready.

---

## Coding Style

Small focused changes.

Clear comments.

No duplicated logic.

No unnecessary refactoring.

Backward compatible.

---

## AI Collaboration

Different AI assistants may contribute.

Before changing code:

Understand existing architecture.

Avoid assumptions.

Review existing implementation first.

Explain why a change is needed.

When finished:

Summarize changes.

List affected files.

List required SQL migrations.

List testing steps.

Never modify unrelated files.

---

## Repository Structure

api/

docs/

assets/

dashboard html

MQ5 Expert Advisor

Supabase database

---

## Current Analytics Fields

trade_duration_seconds

mfe

mae

trading_session

trading_weekday

---

## Owner

Project Owner:

Younes

Architecture decisions should prioritize:

Reliability

Maintainability

Performance

Free/open-source services whenever possible.
