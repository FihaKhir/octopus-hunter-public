# AI RULES

Project: Octopus Hunter

Last Updated: 2026-07-24

==================================================

PURPOSE

These rules apply to every AI assistant working on this project.

They exist to preserve architecture, maintainability, and project continuity.

==================================================

GENERAL RULES

1.

Read the Recovery documents before making any code changes.

2.

Never assume.

If something is unknown, investigate first.

3.

Always preserve backward compatibility.

4.

Never remove existing functionality unless explicitly instructed by the Project Owner.

5.

Return COMPLETE updated files whenever code changes are requested.

Do not return partial snippets unless specifically requested.

6.

Avoid unrelated refactoring while fixing a bug.

7.

Every completed feature must update the documentation.

==================================================

COLLABORATION

Project Owner

• Defines goals
• Prioritizes work
• Performs final approval

--------------------------------------------------

ChatGPT

• Technical Lead
• Architecture
• Planning
• Debugging
• Code Review
• Documentation

--------------------------------------------------

GitHub Copilot

• Repository search
• Repository editing
• Large file updates
• Code implementation

==================================================

IMPLEMENTATION WORKFLOW

Project Owner

↓

ChatGPT

(Planning)

↓

GitHub Copilot

(Implementation)

↓

ChatGPT

(Code Review)

↓

Project Owner

(Approval)

==================================================

DEBUGGING RULES

Always identify the root cause before changing code.

Never apply speculative fixes.

Verify the deployment before assuming code changes are active.

Document resolved issues.

==================================================

DOCUMENTATION

After significant work, update:

PROJECT_STATE.md

VERSION.md

CHANGELOG_AI.md

If the work is a milestone, create a new CHECKPOINT file.

==================================================

PROJECT GOAL

Maintain a production-quality MT5 trading ecosystem with complete documentation, stable architecture, and recoverable development history.
