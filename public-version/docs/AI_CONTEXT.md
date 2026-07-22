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

# 9. System Architecture

## 9.1 High-Level Architecture Overview

Octopus Hunter is built as a distributed trading platform composed of four main layers:

1. MT5 Expert Advisor (Trading Intelligence)
2. Backend API Layer (Communication and Data Management)
3. Database Layer (Data Storage)
4. Frontend Dashboard Layer (User Interface)

Each component has a specific responsibility.

The main architectural principle is:

* Trading decisions happen inside the MT5 Expert Advisor.
* Backend manages communication and data processing.
* Database stores system information and history.
* Frontend displays information to users.

---

## 9.2 System Architecture Flow

```
Financial Markets
        |
        v
MT5 Expert Advisor
        |
        v
Backend API
        |
        v
Supabase Database
        |
        v
Web Dashboard
```

---

# 9.3 Component Responsibilities

## MT5 Expert Advisor

Role:

The main trading intelligence engine.

Responsibilities:

* Read market data.
* Analyze price movement.
* Detect trading opportunities.
* Apply strategy rules.
* Calculate confidence.
* Generate trading signals.
* Calculate Stop Loss and Take Profit.
* Send signal information to the backend.

The EA is the only component responsible for trading decisions.

---

## Backend API

Role:

The communication and management layer.

Responsibilities:

* Receive signals from MT5.
* Validate incoming data.
* Update current signal status.
* Store trade history.
* Provide information to the dashboard.
* Manage licensing.
* Manage administrative configuration.

The backend does not decide when to trade.

---

## Supabase Database

Role:

Permanent data storage.

Responsibilities:

Stores:

* Current signals.
* Historical trades.
* Diagnostic information.
* License information.
* Configuration settings.

The database acts as the memory of the system.

---

## Frontend Dashboard

Role:

User interface layer.

Responsibilities:

* Display active signals.
* Display trade history.
* Display statistics.
* Provide administrative tools.
* Allow users to interact with the system.

The frontend does not contain trading strategy logic.

---

# 9.4 Data Flow

## Signal Generation Flow

```
Market Data

↓

MT5 Analysis

↓

Strategy Evaluation

↓

Signal Created

↓

Backend API

↓

Signals Database

↓

Dashboard Display
```

---

## Trade Completion Flow

```
Active Signal

↓

TP or SL Reached

↓

MT5 Sends Update

↓

Backend Processes Result

↓

Trade History Updated

↓

Performance Analysis
```

---

## License Validation Flow

```
User

↓

Enter Access Code

↓

Frontend

↓

Verify-Code API

↓

License Database

↓

Access Granted
```

---

# 9.5 Architecture Rules

The following rules must always be respected:

1. Trading logic belongs only inside MT5.

2. Backend manages data and communication, not trading decisions.

3. Frontend displays information and does not calculate strategy decisions.

4. Database stores information and does not contain trading logic.

5. Every component should remain replaceable without requiring a complete system rewrite.

6. Any future modification must respect these boundaries.

```
```
# 10. Repository Structure & File Responsibilities

## 10.1 Repository Overview

The Octopus Hunter project is divided into several main areas:

```
Octopus Hunter

├── MT5 Expert Advisor
│
├── Backend API
│
├── Frontend Dashboard
│
├── Database
│
└── Documentation
```

Each area has a separate responsibility.

---

# 10.2 MT5 Expert Advisor

## Purpose

The MT5 Expert Advisor is the core trading engine.

It is responsible for:

* Market analysis.
* Pattern detection.
* Signal generation.
* Risk calculations.
* Communication with backend services.

The EA contains the trading strategy.

---

## EA Responsibilities

The EA should handle:

* Tick processing.
* Symbol analysis.
* Spike detection.
* Indicator calculations.
* Confidence scoring.
* Entry decisions.
* Stop Loss calculation.
* Take Profit calculation.
* Signal transmission.

---

## EA Restrictions

The EA should not:

* Manage user accounts.
* Manage licenses.
* Store permanent history.
* Handle dashboard logic.

Those responsibilities belong to the backend.

---

# 10.3 Backend API

## Purpose

The backend is the communication layer between MT5, the database, and the dashboard.

Location:

```
api/
```

---

## API Responsibilities

The backend handles:

* Signal receiving.
* Data validation.
* Database operations.
* License management.
* Dashboard data delivery.
* Administrative actions.

---

## Main API Files

### signal.js

Purpose:

Receives trading signals from MT5.

Responsibilities:

* Store current signal state.
* Update signals table.
* Create trade history records.
* Process TP/SL updates.

---

### latest.js

Purpose:

Provides current signals to the dashboard.

Responsibilities:

* Retrieve active signals.
* Apply visibility rules.
* Return dashboard data.

---

### history.js

Purpose:

Provides historical trading information.

Responsibilities:

* Retrieve completed trades.
* Provide performance data.

---

### heartbeat.js

Purpose:

Monitors EA connectivity.

Responsibilities:

* Confirm the robot is active.
* Store last communication time.

---

### near-miss.js

Purpose:

Stores potential opportunities that did not become signals.

Responsibilities:

* Preserve diagnostic information.
* Help improve strategy decisions.

---

### verify-code.js

Purpose:

Validates user access codes.

Responsibilities:

* Check subscription validity.
* Activate codes on first use.
* Return access status.

---

### generate-code.js

Purpose:

Creates new access codes.

Responsibilities:

* Generate licenses.
* Assign duration.
* Store license information.

---

### list-codes.js

Purpose:

Administrative license overview.

Responsibilities:

* Display all access codes.
* Calculate current status.
* Show expiration information.

---

### symbol-visibility.js

Purpose:

Controls dashboard visibility.

Responsibilities:

* Manage hidden symbols.
* Control public display settings.

---

### reset-history.js

Purpose:

Administrative cleanup tool.

Responsibilities:

* Remove testing history.
* Reset selected strategy versions.

---

# 10.4 Frontend Dashboard

## Purpose

The frontend provides the user interface.

It displays information but does not make trading decisions.

---

## Main Pages

### index.html

Purpose:

Main public dashboard.

Responsibilities:

* User access.
* Display live signals.
* Show robot status.
* Present trading information.

---

### history.html

Purpose:

Historical performance view.

Responsibilities:

* Display previous trades.
* Show results.
* Analyze performance.

---

### admin.html

Purpose:

Administrative interface.

Responsibilities:

* Manage licenses.
* Manage system settings.
* Perform administrative actions.

---

### lab.html

Purpose:

Strategy testing interface.

Responsibilities:

* Review experiments.
* Compare strategy versions.
* Analyze testing results.

---

# 10.5 Documentation Folder

Location:

```
docs/
```

Purpose:

Contains all project knowledge and decisions.

Main documents:

```
AI_CONTEXT.md
ARCHITECTURE.md
STRATEGY.md
ROADMAP.md
BUGS.md
CHANGELOG.md
TEST_RESULTS.md
```

---

# 10.6 File Modification Rules

Before modifying any file:

1. Confirm the responsibility of the file.

2. Avoid adding unrelated functionality.

3. Prefer modifying the correct layer.

Examples:

Wrong:

Adding trading calculations inside frontend.

Correct:

Adding trading calculations inside MT5 EA.

---

Wrong:

Adding license logic inside MT5.

Correct:

Keeping licensing inside backend.

---

Wrong:

Storing temporary UI state inside database.

Correct:

Keeping UI state inside frontend.

---

Every modification must respect the existing architecture.

```
```
# 11. Database Architecture

## 11.1 Database Overview

Octopus Hunter uses Supabase PostgreSQL as the permanent data storage layer.

The database stores:

* Current trading state.
* Historical trading results.
* Diagnostic information.
* Licensing information.
* Dashboard configuration.

The database does not contain trading strategy logic.

Trading decisions remain inside the MT5 Expert Advisor.

---

# 11.2 Database Design Principles

The database follows these principles:

1. Store information, not decisions.

2. Keep live state separate from historical records.

3. Avoid duplicated data.

4. Preserve historical information for analysis.

5. Allow strategy versions to be compared.

6. Store enough diagnostics to improve future versions.

---

# 11.3 Database Tables Overview

Main tables:

```text
signals

trade_history

near_misses

access_codes

display_config

heartbeat
```

Each table has a different responsibility.

---

# 11.4 signals Table

## Purpose

The `signals` table stores the current live state of trading signals.

It represents what is happening now.

It is not a historical table.

---

## Data Lifecycle

```text
MT5 EA

↓

signal.js API

↓

signals table

↓

latest.js API

↓

Dashboard
```

---

## Responsibilities

The table stores:

* Active signals.
* Current signal status.
* Symbol information.
* Entry information.
* SL/TP information.
* Strategy metadata.

---

## Important Rule

Old signals should not accumulate indefinitely.

Historical information belongs in:

```text
trade_history
```

---

# 11.5 trade_history Table

## Purpose

The `trade_history` table stores completed and tracked trading events.

It is the historical record of strategy performance.

---

## Data Lifecycle

```text
Signal Created

↓

trade_history Record

↓

TP or SL Event

↓

Trade Closed

↓

Performance Analysis
```

---

## Responsibilities

Stores:

* Entry information.
* Exit information.
* Outcome.
* Strategy version.
* Performance metrics.
* Diagnostic values.

---

## Main Uses

The table supports:

* Performance analysis.
* Strategy comparison.
* Testing.
* Future optimization.

---

# 11.6 near_misses Table

## Purpose

The `near_misses` table stores opportunities that were detected but did not become official signals.

---

## Why It Exists

A rejected opportunity can contain valuable information.

Examples:

* Conditions were almost satisfied.
* Confidence was close to threshold.
* Market behavior matched partially.

---

## Uses

Near misses help answer:

* Were filters too strict?
* Did we reject profitable opportunities?
* Are thresholds too conservative?

---

# 11.7 access_codes Table

## Purpose

Stores user licenses and subscription codes.

---

## Responsibilities

Stores:

* Generated access codes.
* Subscription duration.
* Redemption information.
* License metadata.

---

## Lifecycle

```text
Admin Creates Code

↓

User Redeems Code

↓

Subscription Starts

↓

Validation Checks
```

---

# 11.8 display_config Table

## Purpose

Stores dashboard display settings.

---

## Responsibilities

Currently manages:

* Hidden symbols.
* Public visibility configuration.

---

## Important Rule

This table controls display only.

It does not control:

* EA scanning.
* Signal generation.
* Trading decisions.

---

# 11.9 heartbeat Table

## Purpose

Stores robot connectivity information.

---

## Responsibilities

Used to determine:

* Whether the EA is online.
* Last communication time.
* System availability.

---

# 11.10 Data Separation Rules

The following boundaries must always be respected:

## Live Data

Stored in:

```text
signals
```

---

## Historical Data

Stored in:

```text
trade_history
```

---

## Diagnostic Data

Stored in:

```text
near_misses
```

and diagnostic fields.

---

## License Data

Stored in:

```text
access_codes
```

---

## Configuration Data

Stored in:

```text
display_config
```

---

# 11.11 Database Modification Rules

Before adding a new database field:

Evaluate:

1. Why is this data needed?

2. Who consumes it?

3. Can it be calculated instead?

4. Does it improve testing or product functionality?

5. Does it introduce unnecessary duplication?

Database changes must support measurable value.

```
```
# 12. API Architecture

## 12.1 API Overview

The Octopus Hunter backend API is the communication layer between:

* MT5 Expert Advisor
* Supabase Database
* Frontend Dashboard
* Administrative Tools

The API is responsible for:

* Receiving data.
* Validating requests.
* Managing database operations.
* Providing information to users.

The API does not contain trading strategy logic.

---

# 12.2 API Design Principles

The backend follows these rules:

1. The EA generates trading decisions.

2. The API transports and stores information.

3. The database preserves state and history.

4. The frontend consumes API data.

5. Administrative actions require authentication.

---

# 12.3 API Endpoint Overview

Main endpoints:

```text
api/

├── signal.js
├── latest.js
├── history.js
├── heartbeat.js
├── near-miss.js
├── verify-code.js
├── generate-code.js
├── list-codes.js
├── symbol-visibility.js
└── reset-history.js
```

---

# 12.4 signal.js

## Purpose

Main communication endpoint between MT5 and the backend.

---

## Responsibilities

* Receive signals from the EA.
* Update live signal state.
* Create trade history records.
* Process TP/SL updates.

---

## Data Flow

```text
MT5 EA

↓

signal.js

↓

signals table

↓

trade_history table

↓

Dashboard / Analytics
```

---

## Important Rules

signal.js should not:

* Calculate trading signals.
* Modify strategy logic.
* Decide whether a trade is good or bad.

The EA remains responsible for those decisions.

---

# 12.5 latest.js

## Purpose

Provides current signal information to the frontend.

---

## Responsibilities

* Retrieve active signals.
* Apply visibility settings.
* Return dashboard data.

---

## Data Flow

```text
signals table

↓

latest.js

↓

Frontend Dashboard
```

---

## Important Rule

latest.js displays information.

It does not create or modify trading signals.

---

# 12.6 history.js

## Purpose

Provides historical trading information.

---

## Responsibilities

* Retrieve completed trades.
* Provide performance information.
* Support historical analysis.

---

## Data Source

```text
trade_history table
```

---

# 12.7 heartbeat.js

## Purpose

Monitors EA availability.

---

## Responsibilities

* Receive robot heartbeat.
* Confirm communication status.
* Track last connection time.

---

## Usage

The dashboard uses heartbeat information to determine whether the robot is online.

---

# 12.8 near-miss.js

## Purpose

Stores rejected opportunities and diagnostic events.

---

## Responsibilities

* Save near-miss situations.
* Support strategy analysis.
* Provide information for future optimization.

---

# 12.9 verify-code.js

## Purpose

Validates user access codes.

---

## Responsibilities

* Check whether a code exists.
* Activate unused codes.
* Verify subscription validity.
* Return access status.

---

## Data Source

```text
access_codes table
```

---

# 12.10 generate-code.js

## Purpose

Creates new subscription codes.

---

## Responsibilities

* Generate license codes.
* Assign subscription duration.
* Store license information.

---

## Access

Administrative only.

---

# 12.11 list-codes.js

## Purpose

Administrative license management.

---

## Responsibilities

* Display all access codes.
* Show license status.
* Show expiration information.

---

## Access

Administrative only.

---

# 12.12 symbol-visibility.js

## Purpose

Controls dashboard symbol visibility.

---

## Responsibilities

* Manage hidden symbols.
* Update display configuration.

---

## Important Rule

This endpoint controls presentation only.

It does not affect:

* EA scanning.
* Strategy calculations.
* Trade execution.

---

# 12.13 reset-history.js

## Purpose

Administrative testing cleanup tool.

---

## Responsibilities

* Remove selected historical records.
* Reset testing data.
* Support controlled experiments.

---

## Access

Administrative only.

---

# 12.14 API Security Rules

All administrative endpoints must:

* Require authentication.
* Validate input.
* Avoid exposing database credentials.
* Return meaningful errors.

---

# 12.15 API Modification Rules

Before modifying an endpoint:

Evaluate:

1. Does this responsibility belong to this endpoint?

2. Can another component handle it better?

3. Does it affect existing clients?

4. Can the change be tested?

5. Can it be rolled back?

API changes must preserve existing architecture.

```
```
