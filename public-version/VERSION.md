# Octopus Hunter

## Project Version

Current Version: 3.1.0-dev

Status: Research & Forward Testing

Current Sprint: Strategy Optimization

Current Task:
Evaluate strategy variants using forward-tested datasets and identify the highest-performing configuration before implementing adaptive improvements.

---

## Components

EA Version:
3.1-dev

Dashboard Version:
2.1

Database Schema:
v2

API Version:
2.1

---

## Repository

Repository:
FihaKhir/octopus-hunter-public

Branch:
main

---

## Environment

Database:
Supabase PostgreSQL

Backend:
Vercel Serverless API + Supabase

Frontend:
Static HTML

---

## Current Stable Strategy

Baseline:
v1_baseline_baselineSL_reentryguard

Completed Experiments:

- v1_baseline_baselineSL_reentryguard
- v1_baseline_baselineSL_rsi_reentryguard
- v1_baseline_baselineSL_bbw_reentryguard

---

## Forward Test Results

Baseline
- 230 signals
- 28.9% win rate

RSI
- 222 signals
- 41.2% win rate

BBW
- 244 signals
- 43.7% win rate

Current Best Performer:
Baseline + BBW

---

## Next Planned Experiment

Version:
v1_baseline_baselineSL_rsi_bbw_reentryguard

Goal:
Enable both RSI and BBW simultaneously while keeping every other parameter identical to determine whether both filters complement each other or interfere with each other.

---

## Constraints

- Free-tier services only.
- Preserve backward compatibility.
- Never change trading logic unless explicitly approved.
- One strategy change per experiment.
- Every experiment must be forward tested before drawing conclusions.

---

## Major Milestones

✅ MT5 Expert Advisor

✅ Public Dashboard

✅ Admin Panel

✅ History Page

✅ Lab Analytics

✅ CSV Export

✅ Strategy Version Tracking

✅ Project Backup System

✅ First Controlled Strategy Comparison (Baseline vs RSI vs BBW)

---

Last Updated:
2026-07-25
