# SYSTEM ARCHITECTURE

Project: Octopus Hunter

Last Updated: 2026-07-24

==================================================

SYSTEM FLOW

                MT5 Expert Advisor
                       │
                       │ HTTP POST
                       ▼
             Vercel Serverless API
                       │
                       ▼
                Supabase Database
                  │           │
                  │           │
                  ▼           ▼
          Public Dashboard   Admin/Lab

==================================================

COMPONENT 1

MT5 Expert Advisor

Language

MQL5

Responsibilities

• Scan market

• Detect opportunities

• Generate signals

• Track active trades

• Calculate analytics

• Send HTTP requests

Analytics Sent

• Trade Duration

• MFE

• MAE

• Trading Session

• Trading Weekday

==================================================

COMPONENT 2

Backend API

Platform

Vercel

Language

JavaScript

Main Responsibilities

• Receive new signals

• Receive TP/SL updates

• Update signals table

• Update trade_history

• Authenticate admin pages

Main Endpoints

/api/signal

/api/latest

/api/history

/api/admin

/api/lab

/api/heartbeat

/api/near-miss

==================================================

COMPONENT 3

Database

Platform

Supabase

Primary Tables

signals

trade_history

heartbeat

near_misses

access_codes

display_config

==================================================

COMPONENT 4

Dashboard

Public Pages

Dashboard

History

Owner Pages

Admin

Lab

==================================================

DATA FLOW

Market

↓

MT5 detects opportunity

↓

Signal generated

↓

POST /api/signal

↓

signals updated

↓

trade_history opened

↓

Trade monitored

↓

TP or SL reached

↓

Status update sent

↓

trade_history updated

↓

Dashboard refreshed

==================================================

DESIGN PRINCIPLES

• Backward compatibility

• Modular components

• Server-side persistence

• Minimal coupling

• High observability

• AI-assisted maintenance

==================================================

CURRENT KNOWN ISSUE

History authentication returns 401 Unauthorized while Admin and Lab authenticate successfully.

Status: Under investigation.
