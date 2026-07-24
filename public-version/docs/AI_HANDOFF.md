# AI_HANDOFF.md

# Octopus Hunter
AI Handoff Document

Last Updated: 2026-07-24

---

# PURPOSE

This file allows any AI assistant to continue development without requiring previous chat history.

Read this document completely before making any code changes.

---

# PROJECT

Octopus Hunter

Professional MT5 Trading Signal Platform

---

# COMPONENTS

Component 1

Private MT5 Expert Advisor

Language

MQL5

Purpose

Detects trading opportunities.

Tracks active trades.

Sends HTTP requests to backend.

---

Component 2

Backend

Platform

Vercel Serverless Functions

Language

JavaScript

Purpose

Receives MT5 requests.

Stores signals.

Updates trade history.

Communicates with Supabase.

---

Component 3

Database

Supabase

Purpose

Persistent storage.

---

Component 4

Dashboard

Public HTML + JavaScript

Purpose

Display live signals.

Display history.

Owner analytics.

---

# DATABASE TABLES

signals

trade_history

near_misses

heartbeat

access_codes

display_config

---

# RECENTLY COMPLETED

Analytics implemented.

The MT5 EA now sends:

trade_duration_seconds

mfe

mae

trading_session

trading_weekday

Backend updated.

signal.js accepts new analytics fields.

Supabase migration completed.

History page updated to display analytics.

---

# CURRENT BLOCKER

History authentication.

Symptoms

History page asks for password.

Correct ADMIN_SECRET entered.

Returns

401 Unauthorized

Admin page works.

Lab page works.

History fails.

Current status

Not resolved.

---

# FILES VERIFIED

MT5

Analytics module

Compiled successfully.

Backend

signal.js

Updated.

Migration

001_add_trade_resolution_fields.sql

Executed successfully.

History API

Authentication logic reviewed.

No obvious bug found.

history.html

Password flow reviewed.

Stores password.

Calls /api/history.

Clears password after authentication failure.

---

# THINGS ALREADY RULED OUT

Wrong password.

Wrong repository.

Wrong Vercel project.

Wrong GitHub repository.

Missing migration.

Missing analytics columns.

Missing signal.js changes.

---

# DEVELOPMENT RULES

Never remove existing functionality.

Always preserve backward compatibility.

Always return COMPLETE files.

Never return partial snippets.

Never rewrite unrelated code.

Review every Copilot change before approving.

---

# AI RESPONSIBILITIES

ChatGPT

Architecture

Code review

Planning

Debugging

Decision making

Documentation

GitHub Copilot

Repository access

Large file editing

Bulk code generation

Repository search

---

# NEXT TASK

Resolve History authentication.

Complete end-to-end analytics testing.

Verify MT5

↓

Backend

↓

Supabase

↓

Dashboard

pipeline.

---

END OF HANDOFF
