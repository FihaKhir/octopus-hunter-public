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
# 13. Trading Strategy Overview

## 13.1 Strategy Concept

Octopus Hunter is a spike-detection trading system designed specifically for instruments that exhibit repeated price movement patterns.

The strategy does not attempt to predict traditional market direction.

Instead, it analyzes the behavior of the instrument itself and searches for statistical opportunities based on previous movement characteristics.

---

# 13.2 Trading Philosophy

The strategy is based on the idea that certain instruments create recurring movement patterns.

The EA studies:

* Time between movements.
* Price displacement.
* Movement intensity.
* Market compression.
* Momentum conditions.
* Historical behavior.

The objective is to identify moments where the probability of a significant movement increases.

---

# 13.3 Instrument Classification

Octopus Hunter analyzes instruments using movement families.

Current families include:

```text
GainX
PainX
SwitchX
BreakX
TrendX
```

These families represent different behavioral patterns.

Each instrument has characteristics such as:

* Expected movement size.
* Average distance between events.
* Typical volatility behavior.

---

# 13.4 Signal Generation Overview

The signal process follows this general flow:

```text
Market Tick Data

↓

Movement Tracking

↓

Pattern Analysis

↓

Condition Evaluation

↓

Confidence Calculation

↓

Signal Decision

↓

Risk Calculation

↓

Signal Transmission
```

---

# 13.5 Core Analysis Components

The strategy evaluates multiple factors.

## Movement Analysis

The EA tracks:

* Price movement.
* Tick behavior.
* Distance between significant movements.
* Current position relative to expected behavior.

---

## Volatility Analysis

The strategy evaluates market conditions using volatility measurements.

Purpose:

* Detect suitable environments.
* Avoid poor trading conditions.
* Improve signal quality.

---

## Momentum Analysis

Momentum indicators are used as additional confirmation layers.

Examples:

* RSI.
* Other optional indicators.

Their role is filtering and confirmation, not primary signal generation.

---

## Compression Analysis

Compression measures whether the market is becoming more concentrated before a possible movement.

The objective:

Identify periods where movement potential may increase.

---

# 13.6 Confidence System

Each potential signal receives a confidence evaluation.

Confidence is influenced by multiple factors including:

* Pattern quality.
* Timing conditions.
* Market state.
* Confirmation indicators.

The confidence score helps determine whether a setup is strong enough to become an official signal.

---

# 13.7 Risk Management Overview

Risk management is separated from signal generation.

The strategy manages:

* Entry point.
* Stop Loss.
* Take Profit.
* Trade monitoring.

The objective is to balance:

* Signal accuracy.
* Risk exposure.
* Reward potential.

---

# 13.8 Strategy Versioning

Every meaningful strategy modification must create a new version.

Examples:

```text
v1.0 Baseline

v1.1 RSI Filter

v1.2 BBW Filter

v1.3 Risk Adjustment
```

This allows objective comparison between versions.

---

# 13.9 Strategy Development Rules

Any strategy modification must:

1. Have a clear hypothesis.

2. Have measurable expected improvement.

3. Be tested against the current baseline.

4. Record results.

5. Be accepted, revised, or rejected.

---

# 13.10 Strategy Limitations

Current strategy development requires continuous testing.

No indicator, filter, or parameter should be considered beneficial without statistical validation.

The goal is not to create more signals.

The goal is to create better signals.

```
```
# 14. Current Development Status

## 14.1 Project Stage

Octopus Hunter is currently in the development and validation phase.

The main architecture is already established:

* MT5 Expert Advisor.
* Backend API.
* Supabase database.
* Web dashboard.
* License management system.
* Testing infrastructure.

The current priority is improving reliability, measuring performance, and preparing the system for future commercial development.

---

# 14.2 Completed Components

## MT5 Expert Advisor

Status:

Implemented.

Current capabilities:

* Market monitoring.
* Tick analysis.
* Symbol analysis.
* Spike detection.
* Signal generation.
* Confidence evaluation.
* SL/TP calculation.
* Backend communication.

---

## Backend System

Status:

Implemented.

Current capabilities:

* Receive MT5 signals.
* Store signal information.
* Manage history.
* Handle licensing.
* Provide dashboard APIs.
* Store diagnostic information.

---

## Frontend System

Status:

Implemented.

Current capabilities:

* Public dashboard.
* Signal display.
* Historical information display.
* Administrative interface.
* User access system.

---

## Database

Status:

Implemented.

Current capabilities:

* Live signal storage.
* Historical trade storage.
* License storage.
* Configuration storage.
* Diagnostic storage.

---

# 14.3 Current Development Focus

The current focus areas are:

## Strategy Validation

Goal:

Determine which strategy components genuinely improve performance.

Focus:

* Signal quality.
* Win rate.
* Risk/reward balance.
* False signal reduction.

---

## Data Collection

Goal:

Collect enough information to make objective decisions.

Important data:

* Signal outcomes.
* Strategy versions.
* Indicator states.
* Market conditions.
* Failed opportunities.

---

## System Reliability

Goal:

Ensure the platform behaves consistently.

Areas:

* Signal lifecycle.
* History recording.
* Re-entry protection.
* Backend communication.
* Data accuracy.

---

# 14.4 Known Development Challenges

Current challenges include:

## Signal Quality

Some signals may require additional filtering to improve accuracy.

Possible improvement areas:

* Additional confirmation indicators.
* Better scoring.
* Improved market condition detection.

---

## Stop Loss Optimization

The SL system requires continuous testing.

The objective is finding the balance between:

* Avoiding premature stops.
* Protecting capital.
* Maintaining acceptable risk.

---

## Signal Frequency

Increasing the number of signals is not the primary goal.

The priority is:

Quality over quantity.

Any increase in signal frequency must not reduce reliability.

---

## Testing Methodology

A structured testing process is required.

Future improvements must be measured through:

* Forward testing.
* Historical analysis.
* Strategy comparison.

---

# 14.5 Current Strategy Versions

Strategy development uses versioning.

Examples:

```text
v1.0 Baseline

v1.1 RSI Testing

v1.2 BBW Testing

v1.3 Combined Filters
```

Each version should remain identifiable and comparable.

---

# 14.6 Development Priorities

Current priority order:

1. Stabilize existing system.
2. Improve data collection.
3. Validate strategy changes.
4. Improve trading performance.
5. Prepare commercial features.

---

# 14.7 Development Philosophy

The project should avoid uncontrolled feature growth.

A feature should only be added when it provides measurable value.

The main objective is not to create a more complicated robot.

The objective is to create a more reliable trading product.

```
```
# 15. Development Environment & Technology Stack

## 15.1 Technology Overview

Octopus Hunter uses a combination of trading, backend, database, and web technologies.

The technology choices are based on:

* Reliability.
* Low maintenance.
* Scalability.
* Fast development.
* Compatibility with MT5.

---

# 15.2 Trading Platform

## MetaTrader 5

Technology:

MQL5 Expert Advisor

Purpose:

The core execution and analysis environment.

Responsibilities:

* Receive market data.
* Analyze symbols.
* Execute strategy logic.
* Manage trades.
* Communicate with backend services.

MT5 is the only environment responsible for trading decisions.

---

# 15.3 Backend Infrastructure

## Vercel Serverless Platform

Purpose:

Hosts the backend API layer.

Responsibilities:

* Deploy API endpoints.
* Handle requests from MT5.
* Provide data to frontend.
* Connect with database services.

Advantages:

* Simple deployment.
* Automatic scaling.
* Low infrastructure management.

---

# 15.4 Database Platform

## Supabase

Technology:

PostgreSQL Database

Purpose:

Permanent storage layer.

Responsibilities:

* Store signals.
* Store trade history.
* Store licenses.
* Store configurations.
* Store diagnostic information.

Supabase provides:

* Database management.
* Authentication capabilities.
* API connectivity.
* Data persistence.

---

# 15.5 Frontend Technology

## Web Dashboard

Technology:

HTML / CSS / JavaScript

Purpose:

User interface layer.

Responsibilities:

* Display live signals.
* Display history.
* Display analytics.
* Provide administration tools.

The frontend remains separated from trading logic.

---

# 15.6 Development Tools

Current development workflow may include:

## Code Editors

Used for:

* MQL5 development.
* JavaScript development.
* Configuration editing.

---

## Version Control

Purpose:

Track project changes.

Responsibilities:

* Preserve history.
* Compare versions.
* Allow rollback.

---

## AI Development Assistants

Possible AI team members:

### ChatGPT

Role:

* CTO guidance.
* Architecture decisions.
* Code review.
* Strategy evaluation.
* Documentation.

---

### GitHub Copilot

Role:

* Code completion.
* Implementation assistance.
* Refactoring support.

---

### Claude

Role:

* Large code analysis.
* Alternative implementation review.
* Complex debugging assistance.

---

### Gemini

Role:

* Additional analysis.
* Research support.
* Independent review.

---

# 15.7 AI Collaboration Rules

AI tools should not directly replace engineering decisions.

The workflow is:

```text
Problem

↓

Architecture Analysis

↓

Choose Appropriate AI

↓

Generate Solution

↓

Review

↓

Test

↓

Accept or Reject
```

---

# 15.8 Environment Principles

The project should prioritize:

* Stable technologies over trendy technologies.
* Minimal dependencies.
* Clear separation of responsibilities.
* Easy maintenance.
* Long-term reliability.

Technology changes should only happen when there is a clear measurable benefit.

```
```
# 16. Testing & Experimentation Framework

## 16.1 Testing Philosophy

Octopus Hunter development follows a data-driven testing approach.

No strategy modification should be accepted based only on observation or short-term results.

Every important change must be:

* Defined.
* Versioned.
* Tested.
* Measured.
* Reviewed.

---

# 16.2 Experiment Lifecycle

Every experiment follows this process:

```text
Idea

↓

Hypothesis

↓

Architecture Review

↓

Implementation

↓

Strategy Version Created

↓

Forward Testing

↓

Performance Analysis

↓

Decision
```

---

# 16.3 Experiment Definition

Before implementing a change, the following must be documented:

## Experiment ID

Unique identifier.

Example:

```text
EXP-001
```

---

## Objective

What problem is being solved?

Example:

"Reduce false signals during low volatility periods."

---

## Hypothesis

Expected result.

Example:

"Adding BBW filtering will reduce bad entries without significantly reducing profitable signals."

---

## Expected Impact

The expected improvement must be defined.

Possible goals:

* Higher win rate.
* Better profit factor.
* Lower drawdown.
* Better signal quality.
* Improved stability.

---

# 16.4 Testing Metrics

Every strategy version should be evaluated using measurable metrics.

Important metrics include:

## Trading Performance

* Total trades.
* Winning trades.
* Losing trades.
* Win rate.
* Profit factor.
* Net profit.
* Maximum drawdown.

---

## Signal Quality

* Number of signals.
* Signal accuracy.
* False signals.
* Missed opportunities.
* Average confidence.

---

## Risk Metrics

* Stop Loss frequency.
* Take Profit frequency.
* Average reward/risk ratio.
* Maximum losing streak.

---

# 16.5 Strategy Version Testing

Every meaningful modification receives a version identifier.

Examples:

```text
v1.0 Baseline

v1.1 RSI Filter

v1.2 BBW Filter

v1.3 Combined Filters
```

Each version must be compared against the previous baseline.

---

# 16.6 Testing Rules

A strategy change should not be accepted if:

* Testing period is too short.
* Trade sample size is too small.
* Results cannot be compared.
* The improvement cannot be measured.

---

# 16.7 Forward Testing

Forward testing is required because live market behavior may differ from historical assumptions.

Forward testing should evaluate:

* Real execution.
* Real spreads.
* Real signal timing.
* Real market conditions.

---

# 16.8 Experiment Decision

Every experiment receives one final status:

## Accepted

The change provides measurable improvement and can become part of the strategy.

---

## Needs Revision

The idea has potential but requires modification or additional testing.

---

## Rejected

The change does not provide sufficient improvement or introduces unnecessary complexity.

---

# 16.9 Testing Documentation

Results should be stored in:

```text
TEST_RESULTS.md
```

Each record should include:

* Experiment ID.
* Strategy version.
* Date.
* Configuration.
* Test duration.
* Results.
* Conclusion.

---

# 16.10 Research Principle

The goal is not to create the most complicated strategy.

The goal is to create the most reliable strategy supported by evidence.

```
```
# 17. AI Collaboration Rules & Future Development Guidelines

## 17.1 AI Role

Any AI working on Octopus Hunter should act as:

* Technical Architect.
* Code Reviewer.
* Development Assistant.
* Strategy Analyst.
* Project Management Support.

The AI should help improve the product, not simply provide answers.

---

# 17.2 Core AI Rules

Every AI must follow these principles:

## Understand Before Changing

Before suggesting modifications:

* Understand the existing architecture.
* Review related files.
* Identify dependencies.
* Confirm the purpose of the change.

Never modify a component without understanding its role.

---

## Never Assume Missing Information

If important information is unavailable:

Ask questions first.

Do not invent:

* File structures.
* Database fields.
* Existing features.
* Strategy behavior.

---

## Architecture Before Code

Every feature follows:

```text id="48u6xm"
Idea

↓

Analysis

↓

Architecture Decision

↓

Implementation Plan

↓

Code

↓

Review

↓

Testing

↓

Approval
```

---

# 17.3 AI Team Responsibilities

## ChatGPT

Primary role:

* CTO guidance.
* Architecture decisions.
* Documentation.
* Strategy evaluation.
* Code review.

---

## GitHub Copilot

Primary role:

* Code completion.
* Implementation assistance.
* Local refactoring.

Copilot output must still be reviewed.

---

## Claude

Primary role:

* Large code analysis.
* Debugging support.
* Alternative solutions.

---

## Gemini

Primary role:

* Independent review.
* Research assistance.
* Additional analysis.

---

# 17.4 Feature Evaluation Rules

Before accepting any new feature, evaluate:

## Business Value

Does it improve:

* Profitability?
* Reliability?
* User experience?
* Commercial potential?

---

## Technical Value

Does it improve:

* Maintainability?
* Performance?
* Scalability?
* Security?

---

## Complexity Cost

Does the benefit justify:

* Additional code?
* Additional dependencies?
* Additional maintenance?

---

# 17.5 Code Review Rules

Before merging code:

Verify:

* Correct architecture placement.
* No duplicated logic.
* No unnecessary complexity.
* Clear naming.
* Error handling.
* Testing completed.

---

# 17.6 Strategy Modification Rules

Trading strategy changes require extra discipline.

Every change must include:

* Reason for change.
* Expected improvement.
* Strategy version.
* Testing plan.
* Performance comparison.

No strategy change should become permanent without evidence.

---

# 17.7 Documentation Rules

Every important modification should update:

* CHANGELOG.md
* BUGS.md (if fixing an issue)
* TEST_RESULTS.md (if testing was performed)
* Relevant architecture documents

Documentation is part of development, not an optional task.

---

# 17.8 Development Priorities

The project priorities are:

1. Reliability.
2. Data accuracy.
3. Strategy validation.
4. Maintainability.
5. User experience.
6. Commercial features.

Short-term gains should not damage long-term stability.

---

# 17.9 Final Development Principle

Octopus Hunter is developed as a professional software product.

The objective is not:

"Add more features."

The objective is:

"Build the most reliable and maintainable trading system possible through disciplined engineering and evidence-based improvement."

```
```
---

# Document Control

Version:
1.0.0

Status:
Internal Documentation Baseline

Document Owner:
Octopus Hunter Project

Review Status:
Approved Baseline

Last Updated:
2026-07-22
