# Octopus Hunter Testing Protocol

Version: 1.0.0

Status: Active

---

# 1. Purpose

This document defines how every modification to Octopus Hunter is tested.

No strategy change may be accepted without measurable evidence.

The objective is to ensure that every optimization improves the robot based on data rather than intuition.

---

# 2. Testing Philosophy

Every change must answer one question:

Did this improve the robot?

If the answer cannot be measured, the change cannot be accepted.

---

# 3. Baseline Rule

Current reference version:

Octopus Hunter v1.0.0 Baseline

Every future version must be compared against this baseline before it is accepted.

---

# 4. Types of Testing

## Backtesting

Purpose:

Validate historical behavior.

Used for:

- Major strategy changes
- Indicator evaluation
- Risk model testing

---

## Forward Testing

Purpose:

Measure live performance.

Used for:

- Signal quality
- Stability
- Reliability
- Commercial readiness

---

## Regression Testing

Purpose:

Ensure new changes do not break existing functionality.

Every release should confirm:

- Signals still generate
- History still records
- Dashboard still updates
- Backend still communicates
- Licensing still works

---

# 5. Standard Test Procedure

Every experiment follows:

Hypothesis

↓

Implementation

↓

Backtest (if applicable)

↓

Forward Test

↓

Performance Analysis

↓

Decision

---

# 6. Required Test Information

Every test must record:

Date

Strategy Version

Files Changed

Purpose

Test Duration

Symbols Tested

Settings Used

Market Conditions

Results

Conclusion

Decision

---

# 7. Primary Performance Metrics

Signal Quality

- Win Rate

Profitability

- Net Profit

Risk

- Maximum Drawdown

Reliability

- Duplicate Signals
- Missing History Entries
- Backend Errors

Activity

- Signals per Day
- Family Distribution

---

# 8. Feature Testing Rule

Only one significant strategy change should be tested at a time.

Examples:

Good:

Baseline

↓

Enable RSI

↓

Test

Bad:

Enable RSI

+

Change SL

+

Change Confidence

+

Modify BBW

↓

Impossible to identify what caused the result.

---

# 9. Acceptance Criteria

A feature is accepted only if:

Performance improves

OR

Reliability improves

OR

Maintainability improves

without introducing unacceptable regressions.

---

# 10. Rollback Rule

Every feature must be removable.

If testing shows negative results:

Disable

↓

Retest

↓

Return to previous baseline

---

# 11. Test Status

Every completed test receives one status:

✅ Accepted

🔄 Needs More Testing

❌ Rejected

---

# 12. Continuous Improvement

The objective is not to find the perfect strategy.

The objective is to continuously improve the current strategy using measurable evidence.
