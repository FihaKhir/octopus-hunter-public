# Octopus Hunter Engineering Guidelines

Version: 1.0.0

Status: Active

Owner: CTO

---

# 1. Purpose

This document defines the engineering standards for the Octopus Hunter project.

Its purpose is to ensure that every modification maintains a professional, reliable, scalable, and maintainable codebase.

These guidelines apply to all contributors, including:

- ChatGPT
- GitHub Copilot
- Claude
- Gemini
- Any future AI
- Human developers

---

# 2. Core Engineering Principles

Every change must improve at least one of the following:

- Reliability
- Signal quality
- Maintainability
- Performance
- Scalability
- Commercial readiness

If a change increases complexity without measurable value, it should be rejected or postponed.

---

# 3. Project Philosophy

Octopus Hunter is developed as a long-term commercial software product.

Short-term fixes that create technical debt should be avoided.

Always prefer:

Simple > Complex

Measurable > Assumed

Documented > Implicit

Modular > Monolithic

Reliable > Clever

---

# 4. Development Workflow

Every feature follows the same lifecycle.

Idea

↓

Analysis

↓

Architecture Decision

↓

Choose Best AI

↓

Implementation

↓

Code Review

↓

Testing

↓

Approval

↓

Merge

No shortcuts.

---

# 5. AI Responsibilities

ChatGPT acts as:

- CTO
- Software Architect
- Project Manager
- Strategy Reviewer
- Code Reviewer

Claude may be used for:

- Large code generation
- Refactoring
- Alternative implementations

GitHub Copilot may be used for:

- Boilerplate
- Auto-completion
- Small repetitive tasks

Every AI-generated change must be reviewed before merging.

---

# 6. Coding Standards

Code must be:

- Readable
- Modular
- Self-explanatory
- Efficient
- Consistent

Avoid:

- Duplicate logic
- Magic numbers
- Hardcoded configuration
- Hidden side effects
- Deep nesting

Prefer helper functions over repeated code.

---

# 7. Architecture Rules

Business logic belongs in the EA.

The backend manages communication and persistence.

The frontend displays information.

The database stores information.

No layer should take responsibilities that belong to another.

---

# 8. Strategy Rules

The strategy must remain modular.

Each component should be independently enabled, disabled, tested, and measured.

Examples:

- RSI
- BBW
- Confidence
- Stop Loss
- Take Profit
- Compression
- Velocity

Each should be isolated whenever possible.

---

# 9. Versioning

Format:

Major.Minor.Patch

Examples:

v1.0.0

v1.1.0

v1.1.2

Major:

Architecture or strategy redesign.

Minor:

New features.

Patch:

Bug fixes.

Every strategy version must also generate a unique strategy identifier.

---

# 10. Testing Requirements

No feature is accepted without testing.

Testing must include:

- Strategy version
- Test duration
- Symbols tested
- Settings
- Results
- Conclusion

Performance must be compared against the baseline.

---

# 11. Review Checklist

Before merging:

✓ Architecture respected

✓ No duplicated logic

✓ Naming consistent

✓ Documentation updated

✓ Backward compatibility checked

✓ Test completed

✓ Rollback possible

---

# 12. Definition of Done

A task is complete only when:

- Code is implemented
- Code reviewed
- Documentation updated
- Tests completed
- Results analyzed
- Approved by CTO

Until then, the task remains in progress.

---

# 13. Decision Outcomes

Every task ends with one of:

✅ Accepted

🔄 Needs Revision

❌ Rejected

No change is merged without a decision.

---

# 14. Long-Term Vision

The objective is not to create the most complicated trading robot.

The objective is to create the most reliable, maintainable, and continuously improving trading platform possible.

Engineering quality always takes priority over feature quantity.
