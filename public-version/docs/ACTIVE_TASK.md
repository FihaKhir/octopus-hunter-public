# ACTIVE_TASK.md

# Active Task

Last Updated: 2026-07-24

---

## Current Objective

Resolve the History page authentication issue.

---

## Status

IN PROGRESS

Priority: CRITICAL

---

## Problem Summary

The History page requests the ADMIN_SECRET.

The correct password is entered.

The request returns:

401 Unauthorized

After the failed request, the password is removed from localStorage.

---

## Verified

✓ MT5 analytics compile successfully.

✓ signal.js updated and deployed.

✓ Supabase migration executed successfully.

✓ Analytics columns exist.

✓ Dashboard analytics implemented.

✓ Admin page authenticates correctly.

✓ Lab page authenticates correctly.

✗ History page authentication fails.

---

## Current Investigation

Determine why the History page receives a 401 Unauthorized response while the same ADMIN_SECRET works for the Admin and Lab pages.

---

## Files Most Likely Involved

- public-version/api/history.js
- public-version/history.html

---

## Success Criteria

- History accepts ADMIN_SECRET.
- Trade history loads successfully.
- Analytics display correctly.
- End-to-end pipeline verified.

---

## After Completion

Update:

- PROJECT_MEMORY.md
- PROJECT_STATE.md
- VERSION.md
- CHANGELOG_AI.md

Create a new checkpoint if this is a major milestone.
