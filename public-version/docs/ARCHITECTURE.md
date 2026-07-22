# Octopus Hunter — System Architecture Documentation

Version: 1.0.0
Status: Internal Architecture Baseline
Document Owner: Octopus Hunter Project

---

# 1. Document Purpose

## 1.1 Objective

This document describes the internal architecture of the Octopus Hunter trading platform.

The purpose is to provide a complete technical understanding of:

* System components.
* Component responsibilities.
* Data flow.
* Communication paths.
* Internal processes.
* Design decisions.

This document is intended for:

* Developers.
* AI assistants.
* Code reviewers.
* Future maintainers.

---

# 1.2 Architecture Philosophy

Octopus Hunter follows a modular architecture where each component has a clearly defined responsibility.

The system is designed around these principles:

* Trading logic remains separated from user interfaces.
* Data management remains separated from decision making.
* Components communicate through controlled interfaces.
* Each module should be replaceable without rewriting the entire system.
* Changes should minimize technical debt.

---

# 1.3 Scope

This document covers:

* MT5 Expert Advisor architecture.
* Backend API architecture.
* Database architecture.
* Frontend architecture.
* Communication flows.
* Security boundaries.
* Future scalability considerations.

---

# 1.4 Relationship With Other Documents

This document works together with:

## AI_CONTEXT.md

Purpose:

Provides the general project knowledge and operating context.

---

## STRATEGY.md

Purpose:

Contains the complete trading strategy specification.

Includes:

* Indicators.
* Formulas.
* Scoring logic.
* Risk management rules.

---

## TEST_RESULTS.md

Purpose:

Stores experiment results and validation data.

---

# 1.5 Architecture Maintenance

This document must be updated when:

* Major components are added.
* System responsibilities change.
* Communication methods change.
* Database architecture changes.
* Important design decisions are modified.

Architecture documentation is part of development, not an optional activity.
# 2. System Overview

## 2.1 Architecture Summary

Octopus Hunter is a distributed trading platform composed of multiple independent components working together.

The system consists of:

1. MT5 Expert Advisor
2. Backend API Layer
3. Database Layer
4. Frontend Dashboard Layer

Each component has a dedicated responsibility.

The architecture follows a separation-of-concerns model:

```text
Trading Intelligence
        |
        v
MT5 Expert Advisor

Communication & Processing
        |
        v
Backend API

Permanent Storage
        |
        v
Database

Visualization & User Interaction
        |
        v
Frontend Dashboard
```

---

# 2.2 Component Responsibilities

## MT5 Expert Advisor

Primary responsibility:

Trading intelligence.

The EA is responsible for:

* Receiving market data.
* Monitoring instruments.
* Detecting movement patterns.
* Evaluating strategy conditions.
* Generating trading signals.
* Calculating risk parameters.
* Sending information to the backend.

The EA is the only component allowed to make trading decisions.

---

## Backend API

Primary responsibility:

Communication and system management.

The backend is responsible for:

* Receiving data from MT5.
* Validating requests.
* Updating database records.
* Providing information to frontend applications.
* Managing licensing features.
* Supporting administration.

The backend does not create trading decisions.

---

## Database

Primary responsibility:

Data persistence.

The database stores:

* Active signals.
* Historical trades.
* Diagnostic information.
* License information.
* Configuration data.

The database does not contain strategy logic.

---

## Frontend Dashboard

Primary responsibility:

User interface.

The frontend provides:

* Signal visualization.
* History display.
* Administrative controls.
* User interaction.

The frontend does not analyze markets.

---

# 2.3 System Boundaries

The system follows strict boundaries:

```text
Market Analysis
        |
        |
        v
      MT5
        |
        |
        v
    Backend
        |
        |
        v
   Database
        |
        |
        v
  Frontend
```

Information flows through controlled layers.

No component should bypass another component's responsibility.

---

# 3. Complete Architecture Diagram

## 3.1 High-Level Architecture

```text
                         Financial Markets
                                |
                                |
                                v

                    +-----------------------+
                    |    MT5 Expert Advisor |
                    |                       |
                    | - Tick Processing     |
                    | - Symbol Analysis     |
                    | - Strategy Engine     |
                    | - Risk Management     |
                    | - Signal Generation   |
                    +-----------+-----------+
                                |
                                |
                         HTTP Communication
                                |
                                v

                    +-----------------------+
                    |      Backend API      |
                    |                       |
                    | - Signal Reception    |
                    | - Data Processing     |
                    | - License System      |
                    | - Dashboard API       |
                    +-----------+-----------+
                                |
                                |
                                v

                    +-----------------------+
                    |      Supabase         |
                    |     PostgreSQL        |
                    |                       |
                    | - Signals             |
                    | - Trade History       |
                    | - Licenses            |
                    | - Configuration       |
                    +-----------+-----------+
                                |
                                |
                                v

                    +-----------------------+
                    |   Web Dashboard       |
                    |                       |
                    | - Live Signals        |
                    | - History             |
                    | - Admin Panel         |
                    +-----------------------+
```

---

# 4. MT5 Expert Advisor Architecture

## 4.1 Overview

The MT5 Expert Advisor is the core intelligence component of Octopus Hunter.

It is responsible for transforming raw market information into trading decisions.

The EA architecture should remain modular to allow strategy improvements without creating technical debt.

---

# 4.2 Internal EA Responsibilities

The EA contains several logical modules:

```text
MT5 Expert Advisor

|
├── Market Data Module
|
├── Symbol Analysis Module
|
├── Pattern Detection Module
|
├── Strategy Evaluation Module
|
├── Confidence Calculation Module
|
├── Risk Management Module
|
├── Signal Management Module
|
└── Backend Communication Module
```

---

# 4.3 Market Data Module

Purpose:

Collect and process incoming market information.

Responsibilities:

* Receive tick updates.
* Track price movement.
* Monitor symbol behavior.
* Provide data to analysis modules.

---

# 4.4 Symbol Analysis Module

Purpose:

Understand individual instrument behavior.

Responsibilities:

* Analyze symbol characteristics.
* Identify movement families.
* Track expected behavior.
* Maintain symbol-specific information.

---

# 4.5 Pattern Detection Module

Purpose:

Identify possible trading opportunities.

Responsibilities:

* Detect movement patterns.
* Measure movement distance.
* Analyze timing relationships.
* Identify possible spike conditions.

---

# 4.6 Strategy Evaluation Module

Purpose:

Apply trading rules.

Responsibilities:

* Evaluate conditions.
* Apply filters.
* Calculate strategy score.
* Determine signal validity.

The strategy engine should remain independent from communication and display systems.

---

# 4.7 Confidence Calculation Module

Purpose:

Measure signal quality.

Responsibilities:

* Combine evaluation factors.
* Produce confidence value.
* Determine whether the setup reaches the required threshold.

---

# 4.8 Risk Management Module

Purpose:

Calculate trade protection parameters.

Responsibilities:

* Calculate Stop Loss.
* Calculate Take Profit.
* Apply risk rules.

Risk management should remain separate from signal generation.

---

# 4.9 Signal Management Module

Purpose:

Control signal lifecycle.

Responsibilities:

* Create signals.
* Track active signals.
* Monitor outcomes.
* Update signal status.

---

# 4.10 Backend Communication Module

Purpose:

Send information outside MT5.

Responsibilities:

* Format API requests.
* Send signals.
* Send updates.
* Handle communication errors.

The communication module should not modify strategy decisions.
# 5. Signal Lifecycle Architecture

## 5.1 Overview

A signal in Octopus Hunter follows a controlled lifecycle from detection until completion.

The lifecycle must remain consistent between:

* MT5 EA.
* Backend.
* Database.
* Dashboard.

The system should always have a single source of truth for signal status.

---

# 5.2 Signal Lifecycle Flow

```text id="z8v6mw"
Market Analysis

↓

Opportunity Detected

↓

Strategy Evaluation

↓

Confidence Calculation

↓

Signal Created

↓

Signal Sent To Backend

↓

Signal Stored

↓

Dashboard Display

↓

Signal Monitoring

↓

TP / SL Event

↓

Trade Result Recorded
```

---

# 5.3 Signal Creation Stage

A signal is created only when:

* Market conditions satisfy strategy rules.
* Confidence reaches required threshold.
* Risk parameters can be calculated.

The EA creates:

* Symbol.
* Direction.
* Entry price.
* Stop Loss.
* Take Profit.
* Confidence.
* Strategy version.

---

# 5.4 Signal Active Stage

After creation:

The signal becomes active.

During this stage:

MT5 monitors:

* Current price.
* TP conditions.
* SL conditions.
* Signal validity.

The backend stores the external representation of the signal.

---

# 5.5 Signal Completion Stage

A signal finishes when:

* Take Profit is reached.
* Stop Loss is reached.
* Manual cancellation occurs.
* Expiration rules are triggered.

The final result is stored in historical records.

---

# 5.6 Signal State Rules

A signal should have a clearly defined state.

Example:

```text id="xk6l8z"
CREATED

↓

ACTIVE

↓

TP_REACHED

or

↓

SL_REACHED

or

↓

EXPIRED
```

A signal should never exist in an undefined state.

---

# 5.7 Signal Synchronization Rules

Important architecture rule:

MT5 is the authority for trading events.

The backend records and distributes information.

The dashboard only displays information.

No frontend action should modify trading state.

---

# 6. Backend Architecture

## 6.1 Backend Role

The backend acts as the communication and management layer between:

* MT5 Expert Advisor.
* Database.
* Frontend applications.

The backend does not contain trading intelligence.

---

# 6.2 Backend Flow

```text id="l2m6pu"
MT5 EA

↓

API Endpoint

↓

Validation

↓

Database Operation

↓

Response

↓

Frontend
```

---

# 6.3 Backend Responsibilities

The backend manages:

* Signal reception.
* Data validation.
* Database communication.
* License management.
* Dashboard data delivery.
* Administrative functions.

---

# 6.4 Backend Components

```text id="2oyk0g"
Backend API

|
├── Signal Management
|
├── History Management
|
├── License Management
|
├── Configuration Management
|
└── Monitoring
```

---

# 6.5 Backend Design Rules

The backend must:

* Remain independent from strategy decisions.
* Validate incoming data.
* Protect database operations.
* Return clear responses.
* Maintain backward compatibility.

---

# 7. Database Architecture

## 7.1 Database Role

Supabase PostgreSQL is the permanent storage layer.

The database preserves system information.

It does not make trading decisions.

---

# 7.2 Main Database Structure

```text id="r0h7g8"
Database

|
├── signals
|
├── trade_history
|
├── near_misses
|
├── access_codes
|
├── display_config
|
└── heartbeat
```

---

# 7.3 signals Table

Purpose:

Stores current active signal information.

Used by:

* Backend.
* Dashboard.

Contains information such as:

* Symbol.
* Direction.
* Entry.
* SL.
* TP.
* Confidence.
* Status.

---

# 7.4 trade_history Table

Purpose:

Permanent record of completed trading events.

Used for:

* Performance analysis.
* Strategy comparison.
* Testing.

Contains:

* Entry information.
* Exit information.
* Result.
* Strategy version.
* Diagnostic information.

---

# 7.5 near_misses Table

Purpose:

Stores rejected or incomplete opportunities.

Used for:

* Strategy analysis.
* Filter evaluation.
* Future improvements.

---

# 7.6 access_codes Table

Purpose:

Stores licensing information.

Used by:

* License validation.
* Subscription management.

---

# 7.7 display_config Table

Purpose:

Stores dashboard configuration.

Controls:

* Visibility.
* Display settings.

Does not control trading.

---

# 7.8 heartbeat Table

Purpose:

Stores robot connectivity information.

Used to determine:

* EA availability.
* Last communication time.

---

# 7.9 Database Rules

The database must:

* Store information only.
* Avoid business logic.
* Preserve historical accuracy.
* Support analysis.
* Maintain data consistency.
# 8. Frontend Architecture

## 8.1 Frontend Role

The frontend is the user interaction layer of Octopus Hunter.

Its responsibility is to present information from the backend in a clear and usable way.

The frontend does not:

* Analyze markets.
* Generate signals.
* Calculate trading decisions.
* Modify strategy logic.

---

# 8.2 Frontend Structure

The dashboard consists of several interfaces:

```text id="q1j5r9"
Frontend

|
├── Public Dashboard
|
├── History Page
|
├── Admin Panel
|
└── Testing/Lab Interface
```

---

# 8.3 Public Dashboard

Purpose:

Display live system information.

Responsibilities:

* Show active signals.
* Display robot status.
* Present current information.

Data source:

```text
Backend API
```

---

# 8.4 History Page

Purpose:

Display historical performance.

Responsibilities:

* Show completed trades.
* Display results.
* Support analysis.

Data source:

```text
trade_history
```

---

# 8.5 Admin Panel

Purpose:

Administrative management.

Responsibilities:

* Manage licenses.
* Manage configuration.
* Perform authorized actions.

Access must be protected.

---

# 8.6 Frontend Rules

The frontend must:

* Remain independent from trading logic.
* Consume backend data.
* Avoid direct database manipulation.
* Validate user inputs.

---

# 9. Communication Architecture

## 9.1 Communication Overview

Octopus Hunter uses controlled communication channels between components.

Main communication paths:

```text id="h0k7zq"
MT5 EA

↓

Backend API

↓

Database

↓

Frontend
```

---

# 9.2 MT5 To Backend Communication

Purpose:

Send trading information from the EA.

Data examples:

* Signals.
* Trade updates.
* Heartbeat information.

Flow:

```text id="q6x4gs"
EA

↓

HTTP Request

↓

API Endpoint

↓

Database Update
```

---

# 9.3 Backend To Database Communication

Purpose:

Store and retrieve system information.

The backend manages:

* Insert operations.
* Updates.
* Queries.
* Validation.

The database remains isolated from external users.

---

# 9.4 Frontend To Backend Communication

Purpose:

Provide dashboard information.

Flow:

```text id="j9n8lm"
User

↓

Frontend

↓

Backend API

↓

Database

↓

Response

↓

Frontend Display
```

---

# 9.5 Communication Rules

Communication must:

* Use defined interfaces.
* Validate incoming data.
* Handle failures safely.
* Avoid exposing internal systems.

---

# 10. Security Architecture

## 10.1 Security Principles

Security is based on separation of access.

Each component receives only the permissions it requires.

---

# 10.2 MT5 Security

The EA should:

* Use protected communication methods.
* Avoid exposing sensitive credentials.
* Handle API failures safely.

---

# 10.3 Backend Security

The backend must:

* Validate requests.
* Protect administrative endpoints.
* Avoid exposing database credentials.
* Handle errors safely.

---

# 10.4 Database Security

The database must:

* Restrict unauthorized access.
* Protect sensitive information.
* Maintain data integrity.

---

# 10.5 Frontend Security

The frontend must:

* Avoid storing secrets.
* Validate user actions.
* Protect administrative functions.

---

# 11. Scalability & Future Design

## 11.1 Scalability Goal

Octopus Hunter should be capable of growing from a personal trading system into a commercial product.

Future growth should not require a complete rewrite.

---

# 11.2 Possible Future Expansion

Potential improvements:

* Multi-user accounts.
* Advanced analytics.
* Mobile dashboard.
* Subscription management.
* Multiple strategy versions.
* Automated reporting.

---

# 11.3 Scalability Principles

Future development should maintain:

* Modular components.
* Clear responsibilities.
* Stable APIs.
* Version control.
* Documentation.

---

# 11.4 Commercial Readiness Considerations

Before commercial release, the system should have:

* Reliable licensing.
* Stable infrastructure.
* Documentation.
* Monitoring.
* Error handling.
* User management.

---

# 12. Architecture Rules

The following rules define the permanent architecture principles.

---

## Rule 1

Trading intelligence belongs only inside MT5.

---

## Rule 2

Backend manages communication and data, not trading decisions.

---

## Rule 3

Frontend displays information, it does not create trading logic.

---

## Rule 4

Database stores information, it does not contain strategy decisions.

---

## Rule 5

Every component must have a clear responsibility.

---

## Rule 6

Changes must improve the system without creating unnecessary complexity.

---

## Rule 7

Architecture changes require review before implementation.

---

## Final Architecture Principle

Octopus Hunter should evolve as a professional software system.

The objective is not maximum complexity.

The objective is:

A reliable, maintainable, scalable trading platform built through disciplined engineering.
