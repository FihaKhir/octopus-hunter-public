# KNOWN ISSUES

Project: Octopus Hunter

Last Updated: 2026-07-24

==================================================

ISSUE 001

Title

History Authentication

Status

OPEN

Priority

CRITICAL

Symptoms

History page requests ADMIN_SECRET.

Correct password entered.

Returns:

401 Unauthorized

Observed

Admin page works.

Lab page works.

History page fails.

Current Understanding

history.html correctly stores the password.

history.html correctly calls:

/api/history

The password is removed from localStorage after the API returns 401.

Root Cause

UNKNOWN

Next Investigation

Verify the deployed history.js is reading the correct environment variable.

--------------------------------------------------

ISSUE 002

Title

End-to-End Analytics Validation

Status

PENDING

Priority

HIGH

Description

Analytics implementation completed but full production validation has not yet been completed.

Items to Verify

Trade Duration

MFE

MAE

Trading Session

Trading Weekday

Pipeline

MT5

↓

signal.js

↓

Supabase

↓

History Dashboard

--------------------------------------------------

ISSUE 003

Title

Repository Synchronization

Status

MONITOR

Priority

MEDIUM

Description

Large repository changes are implemented through GitHub Copilot.

Every implementation must be reviewed before approval.

Reason

Prevent accidental regressions.

--------------------------------------------------

END
