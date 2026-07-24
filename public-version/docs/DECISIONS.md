# DECISIONS

Project: Octopus Hunter

Last Updated: 2026-07-24

==================================================

DECISION 001

Title

AI Collaboration Workflow

Status

ACTIVE

Decision

ChatGPT is responsible for:

• Architecture
• Planning
• Debugging
• Code Review
• Documentation

GitHub Copilot is responsible for:

• Repository search
• Repository editing
• Large file modifications
• Code implementation

Reason

Each AI is used according to its strengths.

Date

2026-07-24

--------------------------------------------------

DECISION 002

Title

Backward Compatibility

Status

PERMANENT

Decision

No feature may break existing functionality.

Every implementation must preserve compatibility with previous versions.

Reason

Project stability is more important than rapid feature development.

Date

2026-07-24

--------------------------------------------------

DECISION 003

Title

Documentation First

Status

ACTIVE

Decision

Every completed feature updates:

PROJECT_STATE.md

VERSION.md

CHANGELOG_AI.md

Major milestones require a new CHECKPOINT document.

Reason

Project knowledge must never depend on a single conversation.

Date

2026-07-24

--------------------------------------------------

DECISION 004

Title

Analytics Architecture

Status

IMPLEMENTED

Decision

Analytics are generated inside the MT5 EA.

The backend only stores analytics.

The dashboard only displays analytics.

Reason

Keep responsibilities separated.

MT5 computes.

Backend stores.

Dashboard displays.

Date

2026-07-24

--------------------------------------------------

DECISION 005

Title

Recovery System

Status

ACTIVE

Decision

The project maintains Recovery documentation so development can continue after losing conversations or changing AI assistants.

Reason

Ensure long-term continuity.

Date

2026-07-24

--------------------------------------------------

END
