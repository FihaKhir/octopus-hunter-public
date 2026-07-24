# PROJECT OVERVIEW

Project Name

Octopus Hunter

----------------------------------------

DESCRIPTION

Octopus Hunter is a professional MT5 trading signal ecosystem.

The project detects high-probability trading opportunities inside MetaTrader 5, sends them to a cloud backend, stores them in Supabase, and presents them through a public dashboard and owner tools.

The system is designed for long-term maintainability, analytics, and continuous improvement.

----------------------------------------

MAIN COMPONENTS

1. MT5 Expert Advisor (Private)

Language:
MQL5

Responsibilities:

- Detect market opportunities
- Generate signals
- Track active trades
- Monitor TP/SL
- Collect analytics
- Send HTTP requests

----------------------------------------

2. Backend API

Platform:
Vercel

Language:
JavaScript

Responsibilities:

- Receive MT5 requests
- Store live signals
- Update trade history
- Serve dashboard endpoints
- Authenticate admin features

----------------------------------------

3. Database

Platform:
Supabase

Main Tables:

- signals
- trade_history
- heartbeat
- near_misses
- access_codes
- display_config

----------------------------------------

4. Dashboard

Technologies:

- HTML
- CSS
- JavaScript

Pages include:

- Public Dashboard
- History
- Admin
- Lab

----------------------------------------

CURRENT DEVELOPMENT STAGE

Phase:

Analytics Integration

Recent work includes:

- MT5 analytics
- Backend analytics support
- Supabase migration
- Dashboard analytics
- AI documentation
- Recovery system

----------------------------------------

PROJECT OBJECTIVES

Primary Objectives

- Stable signal delivery
- Reliable trade tracking
- Professional analytics
- Backward compatibility
- Easy maintenance

Secondary Objectives

- Performance optimization
- Better statistics
- Strategy comparison
- Faster debugging
- AI-assisted development

----------------------------------------

SUCCESS CRITERIA

A successful build must:

- Compile without errors
- Preserve existing functionality
- Store all analytics
- Display accurate dashboard data
- Remain fully documented

----------------------------------------

LAST MAJOR MILESTONE

Analytics Pipeline completed.

Remaining blocker:

History authentication.
