# Octopus Hunter — Trading Strategy Specification

Version: 1.0.0
Status: Strategy Documentation Baseline
Document Owner: Octopus Hunter Project

---

# 1. Document Purpose

## 1.1 Objective

This document defines the trading strategy used by the Octopus Hunter system.

The purpose is to document:

* Strategy concepts.
* Decision-making process.
* Trading components.
* Risk management principles.
* Future optimization framework.

This document serves as the reference point for:

* Developers.
* AI assistants.
* Strategy reviewers.
* Future improvements.

---

# 1.2 Strategy Documentation Rule

This document must only contain verified strategy information.

No assumption, estimated value, or untested idea should become part of the official strategy specification.

Any experimental feature must be clearly marked as:

* Testing.
* Proposed.
* Rejected.
* Approved.

---

# 2. Strategy Overview

## 2.1 General Concept

Octopus Hunter is a pattern-based trading system designed to analyze instruments that display repeated movement behaviors.

The strategy focuses on identifying opportunities created by statistical patterns in instrument behavior.

The system does not rely only on traditional market direction prediction.

Instead, it analyzes:

* Movement timing.
* Price displacement.
* Volatility conditions.
* Pattern repetition.
* Market behavior.

---

# 2.2 Trading Objective

The objective of the strategy is:

To identify high-probability movement opportunities while maintaining controlled risk.

The strategy prioritizes:

1. Signal quality.
2. Risk control.
3. Consistency.
4. Repeatable behavior.

Signal quantity is secondary to reliability.

---

# 3. Trading Philosophy

## 3.1 Behavior-Based Analysis

Octopus Hunter is built around the idea that some instruments demonstrate recurring behaviors.

The strategy attempts to identify moments where historical behavior suggests an increased probability of movement.

---

# 3.2 Probability Over Prediction

The system does not attempt to predict every market movement.

Instead, it evaluates whether current conditions match previously observed favorable conditions.

---

# 3.3 Evidence-Based Development

Strategy improvements must follow:

```text
Hypothesis

↓

Implementation

↓

Testing

↓

Measurement

↓

Decision
```

No strategy component should be accepted without validation.

---

# 4. Strategy Components

The strategy consists of several logical components.

---

## 4.1 Market Data Analysis

Purpose:

Collect and analyze incoming market information.

Includes:

* Price movement.
* Tick behavior.
* Symbol activity.

---

## 4.2 Pattern Detection

Purpose:

Identify possible trading opportunities based on instrument behavior.

Includes:

* Movement analysis.
* Timing analysis.
* Pattern recognition.

---

## 4.3 Signal Evaluation

Purpose:

Determine whether detected opportunities qualify as signals.

Evaluation considers multiple factors before creating a signal.

---

## 4.4 Confidence System

Purpose:

Assign a quality measurement to potential signals.

Confidence combines multiple evaluation factors.

The exact calculation is documented after verification from the implementation.

---

## 4.5 Risk Management

Purpose:

Control trade exposure.

Includes:

* Entry management.
* Stop Loss.
* Take Profit.
* Trade monitoring.

---

## 4.6 Strategy Filters

Filters are additional conditions used to improve signal quality.

Examples:

* Volatility filters.
* Momentum confirmation.
* Market condition filters.

Each filter must be tested independently before acceptance.
# 5. Instrument Classification

## 5.1 Purpose

Octopus Hunter does not treat all instruments as identical.

Different instruments may demonstrate different movement behaviors.

The strategy uses classification to adapt analysis to instrument characteristics.

---

# 5.2 Behavior-Based Classification

Classification is based on observed behavior rather than traditional asset categories.

The system analyzes characteristics such as:

* Movement frequency.
* Movement size.
* Timing patterns.
* Volatility behavior.
* Historical reactions.

---

# 5.3 Instrument Profiles

Each instrument can have its own behavioral profile.

A profile may include:

* Expected movement characteristics.
* Historical activity patterns.
* Suitable strategy parameters.

The purpose of classification is to improve decision quality.

---

# 6. Symbol Families

## 6.1 Overview

Octopus Hunter uses symbol families to group instruments with similar behavioral characteristics.

Current known families:

```text id="v4x8kl"
GainX

PainX

SwitchX

BreakX

TrendX
```

Each family represents a different type of price behavior.

---

# 6.2 GainX

Purpose:

Represents instruments or patterns associated with upward movement behavior.

The exact detection rules and parameters must be verified from the EA implementation.

---

# 6.3 PainX

Purpose:

Represents instruments or patterns associated with downward movement behavior.

The exact detection rules and parameters must be verified from the EA implementation.

---

# 6.4 SwitchX

Purpose:

Represents situations where movement behavior changes direction or state.

The exact detection rules and parameters must be verified from the EA implementation.

---

# 6.5 BreakX

Purpose:

Represents breakout-style movement behavior.

The exact detection rules and parameters must be verified from the EA implementation.

---

# 6.6 TrendX

Purpose:

Represents instruments or conditions where directional movement behavior is detected.

The exact detection rules and parameters must be verified from the EA implementation.

---

# 6.7 Symbol Family Development Rule

A family should only be modified when:

* The reason is documented.
* The expected improvement is defined.
* Testing is performed.
* Results are measured.

---

# 7. Spike Detection Logic

## 7.1 Concept

The core idea of Octopus Hunter is detecting potential significant movements based on repeated instrument behavior.

The strategy analyzes movement patterns and searches for conditions where a spike becomes more probable.

---

# 7.2 Tick-Based Analysis

The EA uses tick-level information to understand movement behavior.

Tick analysis helps evaluate:

* Movement timing.
* Activity changes.
* Distance between events.

---

# 7.3 Expected Movement Gap

The strategy uses historical behavior to estimate when another significant movement may occur.

The concept is based on comparing:

Current market state

against

Previously observed movement intervals.

---

# 7.4 Spike Detection Process

General process:

```text id="9bqj1z"
Tick Data

↓

Movement Tracking

↓

Pattern Measurement

↓

Expected Behavior Comparison

↓

Opportunity Evaluation

↓

Signal Decision
```

---

# 7.5 Spike Detection Rules

Spike detection must consider:

* Current movement conditions.
* Historical behavior.
* Risk conditions.
* Confirmation factors.

A detected movement possibility does not automatically become a signal.

It must pass the complete strategy evaluation process.

---

# 7.6 Future Documentation Requirements

The following details must be added after reviewing the EA code:

* Exact spike detection formula.
* Tick counting algorithm.
* Threshold values.
* Movement classification rules.
* Reset conditions.
# 8. Scoring System

## 8.1 Purpose

The scoring system evaluates the quality of a detected trading opportunity.

Instead of relying on a single condition, Octopus Hunter combines multiple factors to determine whether a setup is acceptable.

---

# 8.2 Multi-Factor Evaluation

A signal decision is based on several evaluation components.

Examples of possible factors:

* Movement behavior.
* Pattern quality.
* Market conditions.
* Confirmation signals.
* Risk conditions.

Each factor contributes to the final evaluation.

---

# 8.3 Scoring Philosophy

The scoring system exists to:

* Reduce low-quality signals.
* Compare different opportunities.
* Create measurable signal quality.
* Allow controlled optimization.

---

# 8.4 Scoring Flow

```text id="e1m9b2"
Detected Opportunity

↓

Factor Evaluation

↓

Score Calculation

↓

Confidence Assessment

↓

Signal Decision
```

---

# 8.5 Scoring Rules

The scoring system must:

* Remain measurable.
* Avoid unnecessary complexity.
* Be testable.
* Have documented changes.

---

# 8.6 Future Scoring Documentation

The following must be documented after code verification:

* Exact scoring formula.
* Individual factor weights.
* Minimum required score.
* Score normalization method.
* Score history.

---

# 9. Confidence Calculation

## 9.1 Purpose

Confidence represents the estimated quality level of a potential signal.

It is used to decide whether an opportunity is strong enough to be presented or executed.

---

# 9.2 Confidence vs Score

The score represents the internal evaluation result.

Confidence represents the final interpreted quality value.

They may be related but should remain conceptually separated.

---

# 9.3 Confidence Usage

Confidence can be used for:

* Signal filtering.
* Signal ranking.
* User display.
* Performance analysis.

---

# 9.4 Confidence Requirements

Confidence calculation should:

* Be consistent.
* Be explainable.
* Be measurable.
* Avoid fixed values without justification.

---

# 9.5 Future Confidence Documentation

The following details must be verified from implementation:

* Formula.
* Limits.
* Scaling method.
* Relationship with scoring.
* Display rules.

---

# 10. Entry Logic

## 10.1 Entry Philosophy

A detected pattern is not automatically a trade signal.

The strategy separates:

1. Opportunity detection.
2. Signal validation.
3. Entry decision.

---

# 10.2 Entry Flow

```text id="w2j8v1"
Market Monitoring

↓

Pattern Detected

↓

Strategy Evaluation

↓

Risk Evaluation

↓

Signal Created

↓

Entry Available
```

---

# 10.3 Entry Conditions

A valid entry requires:

* A detected opportunity.
* Strategy conditions satisfied.
* Acceptable risk conditions.
* Required confidence level.

---

# 10.4 Entry Separation Principle

Entry logic should remain independent from:

* Dashboard display.
* Database storage.
* User interface.

This keeps the trading engine maintainable.

---

# 10.5 Future Entry Documentation

The following must be added after implementation review:

* Exact entry formula.
* Long conditions.
* Short conditions.
* Timing rules.
* Re-entry rules.
* Duplicate prevention rules.
# 11. Stop Loss Logic

## 11.1 Purpose

Stop Loss management protects the trading system from invalidated setups and uncontrolled losses.

The objective of Stop Loss is not only loss limitation but also maintaining a balanced relationship between:

* Risk.
* Market behavior.
* Expected movement.

---

# 11.2 Stop Loss Philosophy

A Stop Loss should:

* Protect capital.
* Allow normal market movement.
* Avoid unnecessary premature exits.
* Adapt to instrument behavior when appropriate.

---

# 11.3 Stop Loss Design Principles

The Stop Loss system should consider:

* Market volatility.
* Instrument characteristics.
* Signal quality.
* Risk parameters.

---

# 11.4 Dynamic Stop Loss Concept

Octopus Hunter may use dynamic risk calculations instead of a single fixed Stop Loss distance.

Dynamic methods can adapt to changing market conditions.

---

# 11.5 Future Stop Loss Documentation

The following must be verified from the EA:

* Exact formula.
* ATR relationship.
* Multipliers.
* Minimum and maximum limits.
* Modification rules.
* Trailing behavior if implemented.

---

# 12. Take Profit Logic

## 12.1 Purpose

Take Profit management defines when a successful trade should be considered complete.

The goal is to capture expected movement while maintaining controlled risk.

---

# 12.2 Take Profit Philosophy

Take Profit should balance:

* Probability of reaching target.
* Reward compared with risk.
* Market behavior.

---

# 12.3 Take Profit Design Principles

The system should avoid:

* Targets too close to ignore opportunity.
* Targets too far to become unrealistic.

---

# 12.4 Exit Management

Trade exits may occur through:

* Take Profit.
* Stop Loss.
* Strategy invalidation.
* Other approved exit rules.

---

# 12.5 Future Take Profit Documentation

The following must be verified from the EA:

* Exact formula.
* TP calculation method.
* Risk/reward relationship.
* Dynamic adjustment rules.

---

# 13. Risk Management

## 13.1 Purpose

Risk management ensures that strategy performance is evaluated together with capital protection.

A profitable strategy must also survive unfavorable conditions.

---

# 13.2 Risk Principles

Octopus Hunter prioritizes:

1. Capital preservation.
2. Controlled exposure.
3. Consistent execution.
4. Long-term stability.

---

# 13.3 Risk Factors

Risk evaluation may consider:

* Stop Loss distance.
* Market volatility.
* Signal confidence.
* Instrument behavior.
* Trade frequency.

---

# 13.4 Risk Separation

Risk management should remain separate from:

* Signal generation.
* User interface.
* Database operations.

This allows independent optimization.

---

# 13.5 Future Risk Documentation

The following must be verified:

* Position sizing logic.
* Maximum exposure rules.
* Daily limits.
* Loss protection mechanisms.
* Account protection features.

---

# 14. Indicators

## 14.1 Indicator Philosophy

Indicators are supporting tools, not the complete strategy.

They should improve decision quality without adding unnecessary complexity.

---

# 14.2 Confirmed Indicator Categories

The strategy has used or evaluated:

## ATR

Purpose:

Measure volatility and support risk calculations.

---

## RSI

Purpose:

Evaluate momentum or market condition.

---

## Bollinger Band Width (BBW)

Purpose:

Evaluate volatility expansion and compression conditions.

---

# 14.3 Indicator Integration Rules

Every indicator addition must answer:

* What problem does it solve?
* What improvement is expected?
* How will success be measured?
* Does it justify additional complexity?

---

# 14.4 Indicator Testing Process

New indicators follow:

```text id="p7y9mx"
Problem Identification

↓

Indicator Proposal

↓

Implementation

↓

Forward Testing

↓

Performance Comparison

↓

Decision
```

---

# 14.5 Future Indicator Documentation

The following must be documented after verification:

* Exact settings.
* Formula usage.
* Weight in scoring.
* Enabled/disabled state.
* Test results.
# 15. Strategy Versioning

## 15.1 Purpose

Strategy versioning allows Octopus Hunter to track changes, compare results, and safely improve the trading system.

Every important strategy modification must receive a version identifier.

---

# 15.2 Versioning Principles

A new strategy version should be created when changing:

* Trading logic.
* Indicators.
* Filters.
* Risk calculations.
* Entry conditions.
* Exit conditions.

---

# 15.3 Version Example

Example:

```text id="9f3k2m"
v1.0.0

Baseline strategy


v1.1.0

New filter added


v1.2.0

Risk management improvement
```

---

# 15.4 Version Comparison

Every new version should be compared against the previous approved version.

Comparison should include:

* Number of signals.
* Accuracy.
* Profitability.
* Drawdown.
* Stability.

---

# 15.5 Rollback Principle

Any strategy modification must be reversible.

A previous stable version should always remain available.

---

# 16. Optimization Process

## 16.1 Optimization Philosophy

Strategy optimization is performed through controlled experiments.

The objective is not to create maximum complexity.

The objective is measurable improvement.

---

# 16.2 Optimization Workflow

```text id="q8v2px"
Problem Identification

↓

Hypothesis

↓

Strategy Change

↓

Testing

↓

Performance Analysis

↓

Decision
```

---

# 16.3 Experiment Requirements

Every experiment should define:

* Problem being solved.
* Expected improvement.
* Components affected.
* Testing period.
* Success criteria.

---

# 16.4 Testing Methods

Optimization may use:

## Backtesting

Purpose:

Evaluate historical behavior.

---

## Forward Testing

Purpose:

Evaluate real-time performance.

---

## Comparative Testing

Purpose:

Compare strategy versions.

---

# 16.5 Optimization Rules

A change should only be accepted if:

* Results are measurable.
* Improvement is consistent.
* Complexity is justified.
* Negative side effects are understood.

---

# 16.6 Failed Optimization Handling

Failed experiments should not be deleted.

They should be documented because they provide valuable information.

---

# 17. Known Limitations

## 17.1 Purpose

This section documents current limitations of the Octopus Hunter strategy.

Knowing limitations helps guide future improvements.

---

# 17.2 Strategy Limitations

Current areas requiring continued evaluation:

* Pattern reliability.
* Market condition changes.
* False signal reduction.
* Signal frequency optimization.

---

# 17.3 Technical Limitations

Areas requiring future verification:

* Exact strategy formulas.
* Parameter optimization.
* Performance across different instruments.
* Long-term stability.

---

# 17.4 Development Limitations

Some strategy components require further testing before becoming permanent:

* Additional indicators.
* Advanced filters.
* New scoring methods.
* Automated optimization.

---

# 17.5 Improvement Philosophy

Limitations are treated as development opportunities.

Every limitation should eventually become:

* A tested improvement.
* A documented decision.
* Or an accepted design tradeoff.
