# Octopus Hunter — AI Context Documentation

Version: 1.0 Draft  
Document Type: Master Project Knowledge Base  
Purpose: Provide complete technical context for AI assistants and developers.

---

# 1. Project Identity

## Project Name

Octopus Hunter

## Project Type

Professional MT5 automated trading system with:

- MetaTrader 5 Expert Advisor (EA)
- Backend API infrastructure
- Supabase database
- Web-based monitoring dashboard
- Strategy testing and analytics system

---

# 2. Project Vision

Octopus Hunter is not designed as a simple trading script.

The objective is to develop a professional trading product that is:

- Reliable
- Maintainable
- Scalable
- Data-driven
- Testable
- Commercially viable

The project focuses on building a complete trading ecosystem rather than only an entry/exit algorithm.

---

# 3. Core Philosophy

Development decisions must follow these principles:

1. Evidence over assumptions.
2. Testing over opinions.
3. Simplicity over unnecessary complexity.
4. Architecture before implementation.
5. Every strategy change must be measurable.
6. Every important modification must be versioned.
7. No feature should be added without evaluating:
   - profitability impact
   - reliability impact
   - maintenance cost
   - testing possibility

---

# 4. Main Objective

The main objective of Octopus Hunter is:

Create an automated MT5 trading system capable of identifying and managing spike-based trading opportunities while providing:

- Signal generation
- Risk management
- Live monitoring
- Historical analysis
- Strategy experimentation
- Future commercial licensing

---

# 5. Current System Overview

The project consists of four major components:

## 5.1 MT5 Expert Advisor

Role:

The trading intelligence layer.

Responsibilities:

- Market monitoring
- Tick analysis
- Pattern detection
- Signal generation
- Entry calculation
- SL/TP calculation
- Signal transmission

The EA contains the core trading strategy.

---

## 5.2 Backend System

Technology:

- Serverless API
- Vercel deployment
- Supabase integration

Responsibilities:

- Receive signals from MT5
- Store live signal state
- Store trade history
- Manage licensing
- Provide dashboard data
- Manage configuration

---

## 5.3 Database

Technology:

Supabase PostgreSQL

Main data categories:

- Current signals
- Historical trades
- Diagnostic information
- License codes
- Dashboard configuration

---

## 5.4 Frontend Dashboard

Responsibilities:

- Display active signals
- Show historical performance
- Provide administrative tools
- Provide user access through licensing

The frontend does not contain trading logic.

---

# 6. Development Role of AI

AI assistants working on Octopus Hunter must act as:

- Chief Technical Officer
- Software Architect
- Project Manager
- Trading Strategy Reviewer
- Code Reviewer

AI responsibilities:

- Understand existing architecture before suggesting changes.
- Avoid unnecessary refactoring.
- Challenge ideas when better solutions exist.
- Never invent missing information.
- Request clarification when information is insufficient.
- Review all modifications before acceptance.

---

# 7. Project Development Workflow

Every feature follows:

Idea

↓

Analysis

↓

Architecture Decision

↓

Select Best AI Tool

↓

Implementation Plan

↓

Development

↓

Code Review

↓

Testing

↓

Decision

↓

Merge or Revision

---

# 8. Decision States

Every completed task receives one final status:

✅ Accepted

The change is approved and can become part of the project.

🔄 Needs Revision

The idea or implementation requires improvement.

❌ Rejected

The change does not provide enough value or introduces unacceptable risk.

---
