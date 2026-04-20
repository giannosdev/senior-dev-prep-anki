import type { Card } from '../../study/types'
import { allJdItems } from './jd-items'
import { priorityCardIds } from './priority-card-ids'
import { joinLines, makeCard } from '../utils/card-factory'
import { validateCards } from '../utils/card-validation'

const rawCards: Card[] = [
  makeCard(
    'card-0001',
    'Interview patterns: Answer templates',
    'Tradeoff judgment',
    'Template',
    'Answer template: Definition / concept question',
    joinLines(
      'Use this when the question sounds like: **What is X?**, **Explain X**, **What does X mean?**',
      '',
      'Define — start with a one-sentence definition of the concept.',
      'Explain — say why it matters in a real frontend system, not just in theory.',
      'Separate — contrast it with the nearby concept interviewers often confuse it with.',
      'Concrete — end with one practical example from your experience, such as real-time updates, auth flows, or large data-heavy tables.',
      '',
      '---',
      '',
      'Example — **What causes a React component to rerender?**',
      'A React component rerenders when its **state**, **props**, or consumed **context** change, or when its parent rerenders and React needs to evaluate it again.',
      'It matters because rerender scope affects performance and predictability in data-heavy UIs.',
      'The key distinction is that a rerender is not the same as a DOM update.',
      'In practice, on trading or admin-style interfaces, I care about where state lives and whether high-frequency updates are causing unnecessary work lower in the tree.',
      '',
      '---',
      '',
      'Senior upgrade: call out the common pitfall, the failure mode, or the production impact.'
    ),
    ['template', 'definition']
  ),
  makeCard(
    'card-0002',
    'Interview patterns: Answer templates',
    'Tradeoff judgment',
    'Template',
    'Answer template: Comparison question',
    joinLines(
      'Use this when the question sounds like: **X vs Y?**, **Difference between X and Y?**, **When would you use X instead of Y?**',
      '',
      'Frame — say what both options are trying to solve.',
      'Real difference — name the single biggest difference between them.',
      'Apply X — say when you would choose the first option.',
      'Move to Y — say when you would choose the second option.',
      'End tradeoff — finish with the real tradeoff, such as simplicity vs flexibility, local clarity vs global coordination, or cleaner history vs safer collaboration.',
      '',
      '---',
      '',
      'Example — **REST vs GraphQL**',
      'Both REST and GraphQL solve frontend-to-backend data access.',
      'The main difference is that REST is usually endpoint and resource oriented, while GraphQL lets the client request a specific data shape through a schema.',
      'I would use REST when the domain is straightforward and the contracts are stable.',
      'I would use GraphQL when screens need flexible composition across multiple entities.',
      'The tradeoff is REST simplicity versus GraphQL flexibility and added schema and client complexity.',
      '',
      '---',
      '',
      'Senior upgrade: make your decision criteria explicit and say what would make you switch the choice.'
    ),
    ['template', 'comparison']
  ),
  makeCard(
    'card-0003',
    'Interview patterns: Answer templates',
    'LLD strength',
    'Template',
    'Answer template: Implementation / LLD question',
    joinLines(
      'Use this when the question sounds like: **How would you implement...**, **Build...**, **Refactor...**, **Design this component or hook...**',
      '',
      'Start simple — solve the main flow with the simplest correct version.',
      'Contain state — keep state close to where it is used unless there is a clear sharing need.',
      'Organize responsibilities — separate rendering, validation, data-fetching, and side effects so one component does not own everything.',
      'Protect edge cases — call out loading, error, empty, retry, validation, or stale-data behavior.',
      'Evolve extraction — explain what you would extract later if the pattern repeats.',
      '',
      '---',
      '',
      'Example — **How would you structure a complex form in React?**',
      'I would start with a minimal correct version using controlled inputs, clear submit state, and explicit validation boundaries.',
      'I would keep field state close to the form unless it needs broader sharing.',
      'I would separate rendering, validation, and submission logic so the component does not become a mixed-responsibility block.',
      'I would handle edge cases like server validation errors, disabled submit, and retry behavior.',
      'If the pattern repeats, I would extract focused field primitives or hooks instead of jumping to a giant generic form abstraction.',
      '',
      '---',
      '',
      'Senior upgrade: say what you would intentionally not abstract yet and why.'
    ),
    ['template', 'lld']
  ),
  makeCard(
    'card-0004',
    'Interview patterns: Answer templates',
    'HLD awareness',
    'Template',
    'Answer template: HLD / architecture question',
    joinLines(
      'Use this when the question sounds like: **How would you structure...**, **Design the frontend architecture...**, **How would this scale?**',
      '',
      'Scope constraints — clarify domains, users, workflows, routing complexity, shared UI needs, permissions, and data access patterns.',
      'Partition system — split the system into app shell, domain features, shared primitives, data boundaries, and cross-cutting concerns like auth and error handling.',
      'Locate boundaries — keep domain logic close to the feature that owns it, and keep shared code limited to patterns that are already stable.',
      'Identify risks — call out unclear ownership, bloated shared layers, or state leaking across domains.',
      'Transition path — explain how the design can evolve as the team and product grow.',
      '',
      '---',
      '',
      'Example — **How would you structure a large React app?**',
      'First I would clarify domain boundaries, team ownership, routing complexity, shared UI needs, and how much growth is expected.',
      'Then I would split the app into shell, domain features, shared primitives, data-access boundaries, and cross-cutting concerns like auth and error handling.',
      'I would keep domain logic close to the features that own it, while shared code would stay limited to stable repeated patterns.',
      'The main risks are unclear ownership, a bloated shared layer, and state leaking across domains.',
      'I would evolve the design by tightening boundaries as the codebase and team grow.',
      '',
      '---',
      '',
      'Senior upgrade: talk about team ownership, migration path, and the cost of getting the shared layer wrong.'
    ),
    ['template', 'hld']
  ),
  makeCard(
    'card-0005',
    'Interview patterns: Answer templates',
    'Tradeoff judgment',
    'Template',
    'Answer template: Tradeoff / decision question',
    joinLines(
      'Use this when the question sounds like: **Why did you choose X?**, **When would you use X?**, **What are the tradeoffs?**',
      '',
      'Criteria — make the decision criteria concrete: ownership, sharing scope, lifetime, update frequency, complexity growth, debugging needs, and cost of change later.',
      'Lean choice — state the choice clearly and explain why it fits the current constraints.',
      'Examine alternatives — name the realistic alternatives for this case.',
      'Avoid weaker paths — explain why those alternatives were weaker here, not weaker in general.',
      'Revisit trigger — end with what would make you revisit the decision.',
      '',
      '---',
      '',
      'Example — **Why did you keep this state local instead of global?**',
      'I would decide based on ownership, sharing scope, lifetime, update frequency, and how expensive a later change would be.',
      'In this case, I would keep it local because the workflow is self-contained and does not need cross-screen coordination.',
      'The alternatives are Context or a broader store.',
      'I would avoid them here because they add indirection before the sharing need is real.',
      'The tradeoff is simplicity now versus being slightly less prepared for expansion later.',
      'I would revisit the decision if the state starts crossing feature boundaries or needs persistence.',
      '',
      '---',
      '',
      'Senior upgrade: never stop at “it depends”; say exactly what it depends on.'
    ),
    ['template', 'tradeoff']
  ),
  makeCard(
    'card-0006',
    'Interview patterns: Answer templates',
    'Execution ownership',
    'Template',
    'Answer template: Debugging / diagnosis question',
    joinLines(
      'Use this when the question sounds like: **Why is this failing?**, **Why is this slow?**, **Why does it work locally but not in CI?**',
      '',
      'Verify symptom — confirm the actual symptom precisely instead of assuming the first explanation is correct.',
      'Isolate source — narrow it down to state, effects, context, props, environment config, network behavior, build output, or pipeline differences.',
      'Inspect evidence — check the right source of truth, such as React DevTools, browser network traces, logs, container output, or CI job logs.',
      'Fix root cause — correct the real cause, not the most visible symptom.',
      'Validate result — rerun the failing path, use a focused reproduction, or profile again to confirm the fix.',
      '',
      '---',
      '',
      'Example — **Why is this component rerendering too much?**',
      'First I would verify whether the problem is truly excessive rerendering or expensive work happening during render.',
      'Then I would isolate whether it comes from parent renders, local state churn, context updates, or unstable props and callbacks.',
      'I would inspect React DevTools, component boundaries, and whether object or function references are changing unnecessarily.',
      'Once confirmed, I would fix the actual trigger rather than adding memoization everywhere.',
      'Then I would validate with profiling and a focused reproduction.',
      '',
      '---',
      '',
      'Senior upgrade: make it obvious that your debugging process is disciplined, not guess-driven.'
    ),
    ['template', 'debugging']
  ),
  makeCard(
    'card-0007',
    'Interview patterns: Answer templates',
    'Execution ownership',
    'Template',
    'Answer template: Process / delivery question',
    joinLines(
      'Use this when the question sounds like: **What is your workflow?**, **What should run in CI?**, **How do you release safely?**',
      '',
      'Flow — describe a concrete delivery flow: local validation, focused pull request, CI checks, review, and safe release.',
      'Locks and checks — say which checks matter most for frontend delivery: install, linting, type-checking, tests, production build, and where relevant dependency or image scanning.',
      'Observe risks — call out flaky CI, environment drift, hidden config differences, and weak rollback confidence.',
      'Win condition — end with the delivery outcome you want: fewer predictable failures and more trust in the release process.',
      '',
      '---',
      '',
      'Example — **What should run in a frontend CI pipeline?**',
      'My normal expectation is install, linting, type-checking, tests, and a production build.',
      'If the project needs it, I would also add bundle checks, dependency scanning, or image scanning when Docker is part of the flow.',
      'I pay attention to flaky jobs, environment differences, and false-signal checks because people stop trusting pipelines that are noisy.',
      'The goal is to block predictable failures before merge without creating unnecessary friction.',
      '',
      '---',
      '',
      'Senior upgrade: connect process to release reliability, not bureaucracy.'
    ),
    ['template', 'process']
  ),
  makeCard(
    'card-0008',
    'Interview patterns: Answer templates',
    'Execution ownership',
    'Template',
    'Answer template: Ownership / experience story',
    joinLines(
      'Use this when the question sounds like: **Tell me about a time...**, **Describe a project you owned...**, **What did you personally do?**',
      '',
      'Context — start with the business and technical setting.',
      'Accountability — make your real scope explicit: what you owned, influenced, or were accountable for.',
      'Risk or tension — state the actual tradeoff, such as delivery speed vs maintainability, reuse vs overengineering, or local optimization vs platform consistency.',
      'Execution — describe the design or delivery decisions you made and why they mattered.',
      'Result — end with the outcome and the lesson that proves judgment, not just activity.',
      '',
      '---',
      '',
      'Example — **Tell me about a frontend feature or system you owned.**',
      'The context was a workflow-heavy product area where the frontend needed stronger consistency and reuse across screens.',
      'My responsibility was not just implementation, but shaping the frontend structure so multiple contributors could build on it safely.',
      'The challenge was balancing immediate delivery with long-term maintainability.',
      'I handled it by defining boundaries, standardizing repeated patterns, and keeping domain-specific logic close to the owning feature.',
      'The result was a more consistent foundation and less repeated problem-solving across the team.',
      'What mattered was that the system could keep evolving instead of collapsing under the next set of features.',
      '',
      '---',
      '',
      'Senior upgrade: make your decisions visible, not just the project summary.'
    ),
    ['template', 'ownership']
  ),
  makeCard(
    'card-0009',
    'Interview patterns: Answer templates',
    'Execution ownership',
    'Template',
    'Answer template: Behavioral / conflict question',
    joinLines(
      'Use this when the question sounds like: **Tell me about a disagreement**, **Tell me about a mistake**, **Tell me about feedback**.',
      '',
      'Problem — state the issue directly instead of making it sound abstract or harmless.',
      'Initial view — explain your starting position honestly.',
      'Value conflict — name the real tradeoff underneath the disagreement or mistake.',
      'Own response — show how you handled it with criteria, communication, or a changed approach.',
      'Takeaway — end with the outcome and what changed in how you operate now.',
      '',
      '---',
      '',
      'Example — **Tell me about a disagreement in a technical discussion.**',
      'The issue was whether to generalize a solution early or keep it narrower for the current feature.',
      'My initial view was to stay narrower until the reuse pattern became concrete.',
      'The tension came from balancing future flexibility against present delivery clarity.',
      'I handled it by making the decision criteria explicit: expected reuse, abstraction cost, and likelihood of near-term change.',
      'The outcome was that we kept the first version focused and only extracted the parts that were already clearly shared.',
      'The lesson was that many technical disagreements improve once you replace preference language with decision criteria.',
      '',
      '---',
      '',
      'Senior upgrade: show accountability and changed behavior, not polished storytelling only.'
    ),
    ['template', 'behavioral']
  ),
  makeCard(
    'card-0010',
    'Interview patterns: Answer templates',
    'Execution ownership',
    'Template',
    'Answer template: Security / DevSecOps question',
    joinLines(
      'Use this when the question sounds like: **What does DevSecOps mean?**, **How do you handle secrets?**, **What security checks belong in CI?**',
      '',
      'Security in flow — treat security as part of delivery, not a final approval step.',
      'Attack areas — speak about real frontend concerns: dependency risk, public vs secret config, auth or session handling, unsafe rendering, and artifact integrity.',
      'Filters in CI — say which automated checks make sense in CI.',
      'Eliminate bad practice — call out the practices you would avoid outright.',
      'Reduce risk — keep the focus on lowering avoidable risk while preserving a delivery flow the team can actually use.',
      '',
      '---',
      '',
      'Example — **How do you handle secrets in frontend delivery?**',
      'I separate public build-time configuration from actual secrets.',
      'Anything shipped to the browser should be treated as visible, so real secrets should stay on the backend or in secure deployment systems.',
      'In CI/CD, I would expect secrets to come from the platform’s secret store and never from hardcoded files or committed config.',
      'The goal is reducing avoidable exposure while keeping delivery reproducible.',
      '',
      '---',
      '',
      'Senior upgrade: tie the answer to concrete delivery risk, not generic security language.'
    ),
    ['template', 'security']
  ),
  makeCard(
    'card-0011',
    'Interview patterns: Question recognition',
    'Tradeoff judgment',
    'Definition',
    'If the interview question sounds like: What is X? / Explain X',
    joinLines(
      'Use: **DESC = Define → Explain → Separate → Concrete**',
      '',
      'Define — say what the concept is in one sentence.',
      'Explain — say why it matters in a real system.',
      'Separate — contrast it with the nearby concept people confuse it with.',
      'Concrete — end with one practical example.',
      '',
      '---',
      '',
      'Example match — **What causes a React component to rerender?**',
      'Define: a rerender is when React runs the component again to compute the next UI.',
      'Explain: rerender scope affects performance and predictability in data-heavy interfaces.',
      'Separate: rerendering is not the same as a DOM update.',
      'Concrete: I look at state placement, parent renders, context updates, and unstable props before trying to optimize.',
      '',
      '---',
      '',
      'Use this structure whenever the question is asking you to define or explain a concept.'
    ),
    ['recognition']
  ),
  makeCard(
    'card-0012',
    'Interview patterns: Question recognition',
    'Tradeoff judgment',
    'Comparison',
    'If the interview question sounds like: Difference between X and Y?',
    joinLines(
      'Use: **FRAME = Frame → Real difference → Apply X → Move to Y → End tradeoff**',
      '',
      'Frame — say what both options solve.',
      'Real difference — name the biggest difference between them.',
      'Apply X — say when you would choose the first option.',
      'Move to Y — say when you would choose the second option.',
      'End tradeoff — finish with the real tradeoff.',
      '',
      '---',
      '',
      'Example match — **REST vs GraphQL**',
      'Frame: both solve frontend-to-backend data access.',
      'Real difference: REST is usually endpoint and resource oriented, while GraphQL lets the client ask for a specific schema-driven shape.',
      'Apply X: use REST when contracts are straightforward and stable.',
      'Move to Y: use GraphQL when screens need flexible composition across multiple entities.',
      'End tradeoff: REST simplicity versus GraphQL flexibility and added complexity.',
      '',
      '---',
      '',
      'Use this structure whenever the interviewer is asking you to compare two valid options.'
    ),
    ['recognition']
  ),
  makeCard(
    'card-0013',
    'Interview patterns: Question recognition',
    'Tradeoff judgment',
    'Design',
    'If the interview question sounds like: How would you design or structure this?',
    joinLines(
      'Use: **SPLIT = Scope constraints → Partition system → Locate boundaries → Identify risks → Transition path**',
      '',
      'Scope constraints — clarify domains, users, workflows, routing, permissions, and data access patterns.',
      'Partition system — split the system into its major parts.',
      'Locate boundaries — say what should stay domain-owned and what can be shared.',
      'Identify risks — call out the architecture failure modes.',
      'Transition path — explain how the design evolves as the team and product grow.',
      '',
      '---',
      '',
      'Example match — **How would you structure a large React app?**',
      'Scope constraints: domains, team ownership, routing complexity, shared UI needs, and expected growth.',
      'Partition system: shell, domain features, shared primitives, data-access boundaries, and cross-cutting concerns.',
      'Locate boundaries: keep domain logic close to the owning feature and shared code limited to stable patterns.',
      'Identify risks: unclear ownership, bloated shared layers, and state leaking across domains.',
      'Transition path: tighten boundaries as the codebase and team grow.',
      '',
      '---',
      '',
      'Use this structure whenever the prompt is about designing or structuring something larger than a single component.'
    ),
    ['recognition']
  ),
  makeCard(
    'card-0014',
    'Interview patterns: Question recognition',
    'Execution ownership',
    'Behavioral',
    'If the interview question sounds like: Tell me about a time...',
    joinLines(
      'Use: **CARER = Context → Accountability → Risk/tension → Execution → Result**',
      '',
      'Context — give the business and technical setting.',
      'Accountability — make your scope clear.',
      'Risk/tension — name the real tradeoff or pressure in the situation.',
      'Execution — explain what you actually did and decided.',
      'Result — end with the outcome and what it proves.',
      '',
      '---',
      '',
      'Example match — **Tell me about a frontend system you owned.**',
      'Context: a workflow-heavy product area needed stronger consistency and reuse.',
      'Accountability: shape the frontend structure, not just implement screens.',
      'Risk/tension: immediate delivery versus long-term maintainability.',
      'Execution: defined boundaries, standardized repeated patterns, and kept domain logic close to the owning feature.',
      'Result: a more consistent foundation and less repeated problem-solving.',
      '',
      '---',
      '',
      'Use this structure whenever the question is asking for a real story, not a theoretical answer.'
    ),
    ['recognition']
  ),
  makeCard(
    'card-0015',
    'Interview patterns: Question recognition',
    'Execution ownership',
    'Debugging',
    'If the interview question sounds like: Why is this failing / slow / different in CI or Docker?',
    joinLines(
      'Use: **VIIFV = Verify → Isolate → Inspect → Fix → Validate**',
      '',
      'Verify — confirm the symptom precisely.',
      'Isolate — narrow the likely source.',
      'Inspect — check the right evidence.',
      'Fix — correct the root cause.',
      'Validate — confirm the result with a focused check.',
      '',
      '---',
      '',
      'Example match — **Why is this component rerendering too much?**',
      'Verify: confirm whether it is truly excessive rerendering or expensive render work.',
      'Isolate: parent renders, local state churn, context updates, or unstable props and callbacks.',
      'Inspect: React DevTools, component boundaries, and changing object or function references.',
      'Fix: address the actual trigger instead of adding memoization everywhere.',
      'Validate: profile again and confirm the specific hot path improved.',
      '',
      '---',
      '',
      'Use this structure whenever the interviewer wants to see how you debug instead of guess.'
    ),
    ['recognition']
  ),
  makeCard(
    'card-0016',
    'React',
    'LLD strength',
    'Definition',
    'What causes a React component to rerender?',
    joinLines(
      'A component rerenders when React runs it again to compute the next UI based on current **props**, **state**, or **context**.',
      'Common triggers are local state updates, parent rerenders, context value changes, or external store updates.',
      'A rerender does **not** automatically mean the DOM changes.',
      'In practice, I focus on unnecessary expensive rerenders, unstable props, oversized context values, and state placed too high in the tree.'
    ),
    ['react', 'rerender'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0017',
    'React',
    'LLD strength',
    'Definition',
    'What is reconciliation in React, conceptually?',
    joinLines(
      'Reconciliation is React’s process for comparing the new render output with the previous one to determine the minimal UI updates needed.',
      'It matters because rerendering a component is not the same as fully rebuilding the DOM.',
      'In practice, this is why keys, stable structure, and avoiding unnecessary remounts matter.'
    ),
    ['react', 'reconciliation'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0018',
    'React',
    'LLD strength',
    'Definition',
    'What is the difference between rerendering and remounting?',
    joinLines(
      'Rerendering means React runs the component again with the same identity to calculate the next UI.',
      'Remounting means the old component instance is removed and a new one is created.',
      'Remounting resets local state and lifecycle-related behavior.',
      'In practice, unstable keys or changing component identity can cause remounts when you only expected rerenders.'
    ),
    ['react', 'rerender', 'remount'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0019',
    'React: State management',
    'Tradeoff judgment',
    'Comparison',
    'When should you derive state during render instead of storing it in state?',
    joinLines(
      'Both approaches help represent UI data, but the main difference is whether the value is **computed from existing inputs** or needs its own lifecycle.',
      'Derive it during render when it can be calculated from **props**, **state**, or **server data** without side effects.',
      'Store it only when it has an independent lifecycle or user interaction history.',
      'The tradeoff is **simplicity and correctness** versus **extra state that can drift out of sync**.',
      'Common pitfall: storing filtered lists, booleans, or counts that could be computed directly.'
    ),
    ['state', 'derived-state'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0020',
    'React',
    'LLD strength',
    'Comparison',
    'When does logic belong in an event handler instead of useEffect?',
    joinLines(
      'Use an event handler when the logic is a direct response to a **user action**.',
      'Use **useEffect** when you need to synchronize with something **external** like a timer, subscription, browser API, or network-related side effect.',
      'The tradeoff is clarity versus accidental indirect behavior.',
      'Common pitfall: putting click-driven logic into **useEffect** just because state changed first.'
    ),
    ['react', 'useeffect', 'events'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0021',
    'React',
    'LLD strength',
    'Definition',
    'How should you think about useEffect dependencies?',
    joinLines(
      'Dependencies describe which values the effect reads from render scope and therefore which changes should cause re-synchronization.',
      'It matters because incorrect dependencies create stale closures, repeated side effects, or hidden bugs.',
      'The key distinction is that dependencies are not an optimization tool; they are part of correctness.',
      'In practice, if the dependency list feels wrong, the effect design is often wrong too.'
    ),
    ['react', 'useeffect', 'dependencies'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0022',
    'React',
    'LLD strength',
    'Definition',
    'What is a stale closure in React?',
    joinLines(
      'A stale closure happens when a callback or effect captures an older value from render scope and later runs with outdated assumptions.',
      'It matters because async work, timers, subscriptions, and event handlers can behave incorrectly even though the UI looks current.',
      'The key distinction is between the latest render state and the values captured when the function was created.',
      'In practice, this often shows up in timers, subscriptions, or effects with missing dependencies.'
    ),
    ['react', 'closures', 'async'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0023',
    'React: State management',
    'Tradeoff judgment',
    'Decision',
    'How do you decide where state should live?',
    joinLines(
      'I decide based on **ownership**, **sharing scope**, **lifetime**, **update frequency**, and **persistence needs**.',
      'Keep state as low as possible while still available where needed.',
      'Lift it only when multiple parts of the UI truly need the same source of truth.',
      'The tradeoff is local simplicity versus shared coordination.',
      'Failure mode: putting state too high creates rerender spread and unclear ownership.'
    ),
    ['state', 'ownership'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0024',
    'React: State management',
    'Tradeoff judgment',
    'Comparison',
    'When is Context enough, and when is it not?',
    joinLines(
      'Context is enough when shared data is relatively stable, limited in scope, and does not require complex update patterns.',
      'It becomes weak when updates are frequent, the state is broad, or consumers need selective subscriptions and stronger tooling.',
      'The tradeoff is lower setup cost versus scaling pain.',
      'Warning signs: provider sprawl, rerender pain, and business logic spreading into many consumers.'
    ),
    ['context', 'state'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0025',
    'Data fetching: API integration',
    'Tradeoff judgment',
    'Comparison',
    'What is the difference between server state and client state?',
    joinLines(
      'Server state is owned by the backend and fetched by the client.',
      'Client state is owned by the frontend and represents UI-specific behavior.',
      'The main difference is **ownership** and how freshness, caching, retries, and synchronization are handled.',
      'Use dedicated server-state patterns for fetched data.',
      'Use local or shared client state for UI behavior like open panels, selected tabs, or draft inputs.'
    ),
    ['api', 'server-state', 'client-state'],
    'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs'
  ),
  makeCard(
    'card-0026',
    'Data fetching: API integration',
    'LLD strength',
    'Definition',
    'What is cache invalidation in frontend data fetching?',
    joinLines(
      'Cache invalidation is the process of marking cached data as stale or outdated so it can be refreshed after mutations or relevant changes.',
      'It matters because showing outdated backend data causes correctness issues even when the UI renders fine.',
      'In practice, it is one of the main reasons server-state libraries are useful: they centralize invalidation, refetching, and stale-data control.'
    ),
    ['api', 'cache', 'invalidation'],
    'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs'
  ),
  makeCard(
    'card-0027',
    'Data fetching: API integration',
    'Tradeoff judgment',
    'Decision',
    'When are optimistic updates a good idea?',
    joinLines(
      'Optimistic updates are useful when the action is common, latency matters to UX, and the failure rate is low enough to justify temporarily assuming success.',
      'The main tradeoff is responsiveness versus rollback complexity and consistency risk.',
      'I would use them when the interaction benefits clearly from perceived speed and the rollback path is manageable.',
      'I would avoid them when operations are high risk, conflict-prone, or hard to reconcile.'
    ),
    ['api', 'optimistic-updates'],
    'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs'
  ),
  makeCard(
    'card-0028',
    'Data fetching: API integration',
    'Tradeoff judgment',
    'Comparison',
    'When would you use a server-state library instead of manual fetch state?',
    joinLines(
      'A server-state library becomes worthwhile when you need caching, retries, invalidation, background refresh, deduplication, and consistent async state handling across the app.',
      'Manual fetch state is fine for very small or isolated cases.',
      'The tradeoff is extra abstraction versus more reliable data handling at scale.',
      'At senior level, the real question is whether the app’s async complexity justifies centralization.'
    ),
    ['api', 'react-query', 'server-state'],
    'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs'
  ),
  makeCard(
    'card-0029',
    'React: Performance',
    'LLD strength',
    'Definition',
    'How do you think about performance for large list rendering?',
    joinLines(
      'The main concern is not only rerenders but also how many DOM nodes and layout calculations the browser has to manage.',
      'For truly large lists, virtualization usually matters more than micro-optimizing child renders.',
      'I first check item count, render cost per row, state placement, and whether the browser is doing too much work.',
      'Common pitfall: adding memoization everywhere without addressing DOM scale.'
    ),
    ['performance', 'lists', 'virtualization'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0030',
    'React: Performance',
    'Tradeoff judgment',
    'Comparison',
    'What are common mistakes with useMemo?',
    joinLines(
      'The main mistake is using it by default without proving that recomputation or reference instability is actually causing a problem.',
      '**useMemo** helps when an expensive derived value or stable reference is needed for a real reason.',
      'The tradeoff is possible performance benefit versus extra cognitive load and false confidence.',
      'Common pitfall: treating **useMemo** as a general rerender prevention tool.'
    ),
    ['performance', 'usememo'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0031',
    'React: Performance',
    'LLD strength',
    'Definition',
    'Why can Context cause unnecessary rerenders?',
    joinLines(
      'When a provider value changes, all consuming components that read that context are eligible to rerender.',
      'It matters because large or frequently changing context values can spread work through the tree.',
      'In practice, reducing rerender spread may require smaller contexts, more stable provider values, or a different state-sharing approach.'
    ),
    ['performance', 'context', 'rerender'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0032',
    'React',
    'LLD strength',
    'Definition',
    'Why do keys matter in React lists?',
    joinLines(
      'Keys help React identify list item identity across renders.',
      'They matter because stable identity affects reconciliation, preserved state, and whether items rerender or remount correctly.',
      'In practice, bad keys can cause lost input state, animation glitches, or confusing bugs.',
      'Common pitfall: using array index as key for reorderable or stateful lists.'
    ),
    ['react', 'keys', 'lists'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0033',
    'React',
    'Tradeoff judgment',
    'Comparison',
    'Controlled vs uncontrolled components',
    joinLines(
      'Controlled components keep their value driven by React state.',
      'Uncontrolled components let the DOM keep the current value and are usually accessed via refs or form submission.',
      'Controlled is better when validation, conditional UI, or synchronized state matters.',
      'Uncontrolled can be simpler for very lightweight or native-style form handling.',
      'The tradeoff is React-level control versus lower setup and less rerender coupling.'
    ),
    ['react', 'forms', 'controlled'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0034',
    'React: Component design',
    'HLD awareness',
    'Definition',
    'What is a headless component pattern, and when is it useful?',
    joinLines(
      'A headless component separates behavior and state management from visual presentation.',
      'It is useful when the same interaction logic needs different UI treatments.',
      'The tradeoff is flexibility versus more complex composition and API design.',
      'It works best when behavior is stable and styling needs vary across contexts.'
    ),
    ['components', 'headless'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0035',
    'React: Component design',
    'LLD strength',
    'Definition',
    'What are compound components?',
    joinLines(
      'Compound components are a pattern where multiple related components work together through shared state or implicit coordination, such as tabs or accordions.',
      'They matter because they can produce expressive APIs and clearer composition.',
      'The tradeoff is API elegance versus more internal coordination complexity.',
      'They are useful when the parts belong together semantically and structurally.'
    ),
    ['components', 'compound-components'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0036',
    'Frontend architecture: System design',
    'HLD awareness',
    'Comparison',
    'Feature-based vs layer-based frontend structure',
    joinLines(
      'Feature-based structure groups files by business or domain ownership.',
      'Layer-based structure groups files by technical type, such as components, hooks, and services.',
      'Feature-based tends to scale better for larger apps with multiple domains and teams.',
      'Layer-based can feel simpler in smaller apps.',
      'The tradeoff is stronger ownership boundaries versus easier early discoverability.'
    ),
    ['architecture', 'folder-structure'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0037',
    'Frontend architecture: System design',
    'Tradeoff judgment',
    'Decision',
    'When should you extract a shared component or hook?',
    joinLines(
      'Extract it when the repeated pattern is stable, understood, and the abstraction reduces future cost.',
      'Do not extract just because two usages look similar once.',
      'The tradeoff is reuse versus abstraction cost and hidden coupling.',
      'A good test is whether the shared API makes the calling sites clearer, not just drier.'
    ),
    ['architecture', 'abstraction', 'shared-components'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0038',
    'React: Forms',
    'LLD strength',
    'Design',
    'How would you structure a complex form in React?',
    joinLines(
      'I would start with controlled inputs, explicit validation boundaries, submit state, and separation between rendering, validation rules, and submission logic.',
      'I would keep field concerns close unless they need reuse or cross-form behavior.',
      'The main risks are giant form components, mixed responsibilities, and fragile validation flow.',
      'I would evolve it by extracting focused field primitives or hooks rather than jumping to a giant form abstraction too early.'
    ),
    ['forms', 'react', 'validation'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0039',
    'React',
    'LLD strength',
    'Definition',
    'What do React error boundaries do, and what do they not do?',
    joinLines(
      'Error boundaries catch rendering errors in their child tree and show a fallback UI instead of crashing the whole app section.',
      'They do not catch every kind of error, such as event handler errors or many async errors by default.',
      'They matter because they create UI fault isolation.',
      'In practice, they should be used for resilience, not as a replacement for actual debugging.'
    ),
    ['react', 'error-boundary'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0040',
    'React',
    'HLD awareness',
    'Definition',
    'What is Suspense conceptually?',
    joinLines(
      'Suspense is a React mechanism for coordinating asynchronous waiting with declarative fallback UI.',
      'It matters because it changes how loading states can be structured when the data or code-loading model supports it.',
      'The key distinction is that it is not just a spinner tool; it is about render coordination.',
      'At senior level, the important thing is knowing where it fits and where it adds complexity.'
    ),
    ['react', 'suspense'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0041',
    'Frontend fundamentals: Accessibility',
    'Execution ownership',
    'Decision',
    'What do you watch for when building custom interactive components?',
    joinLines(
      'I start with native semantics where possible.',
      'If I build custom behavior like a dialog, menu, tabs, or combobox, I check keyboard interaction, focus movement, labels, roles, and screen-reader-relevant structure.',
      'The tradeoff is design flexibility versus accessibility complexity.',
      'Common pitfall: building a clickable div and then trying to patch semantics afterward.'
    ),
    ['accessibility', 'custom-components'],
    'Strong proficiency in HTML5 and CSS'
  ),
  makeCard(
    'card-0042',
    'Frontend quality: Testing',
    'Tradeoff judgment',
    'Decision',
    'How do you decide what to test in a React app?',
    joinLines(
      'I prioritize critical user flows, state transitions, risky logic, and regressions that are expensive to miss.',
      'I prefer testing behavior over implementation details.',
      'The tradeoff is confidence versus maintenance cost and noise.',
      'I avoid writing tests that mainly lock down internal structure without protecting meaningful behavior.'
    ),
    ['testing', 'strategy'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0043',
    'Frontend quality: Testing',
    'Tradeoff judgment',
    'Comparison',
    'Unit vs integration vs end-to-end testing',
    joinLines(
      'Unit tests isolate small pieces of logic.',
      'Integration tests verify multiple parts working together.',
      'End-to-end tests validate full user flows in a more realistic environment.',
      'The tradeoff is speed and isolation versus realism and coverage.',
      'A strong strategy uses the cheapest layer that still protects the risk you care about.'
    ),
    ['testing', 'unit', 'integration', 'e2e'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0044',
    'Data fetching: API integration',
    'HLD awareness',
    'Design',
    'Why might you add an API mapping layer between backend responses and UI models?',
    joinLines(
      'A mapping layer isolates backend shape changes, normalizes awkward payloads, and gives the UI a more stable model.',
      'It matters because raw backend responses spread coupling through components.',
      'The tradeoff is one more abstraction layer versus cleaner UI code and safer contract changes.',
      'It is especially useful when backend payloads are inconsistent or not UI-friendly.'
    ),
    ['api', 'mapping-layer', 'architecture'],
    'Collaborate closely with backend engineers to integrate REST and/or GraphQL APIs'
  ),
  makeCard(
    'card-0045',
    'React: Patterns',
    'Tradeoff judgment',
    'Comparison',
    'Render props vs custom hooks',
    joinLines(
      'Both help reuse behavior.',
      'Render props reuse behavior through composition in JSX, while custom hooks reuse stateful logic directly inside function components.',
      'Hooks are usually simpler for modern React code.',
      'Render props still help when render-time control and explicit composition matter.',
      'The tradeoff is ergonomics versus flexibility of render-time composition.'
    ),
    ['react', 'patterns', 'hooks', 'render-props'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0046',
    'Seniority: Ownership and judgment',
    'Tradeoff judgment',
    'Opinion',
    'How do you avoid overengineering in frontend work?',
    joinLines(
      'I try to match the solution to the proven complexity, not the imagined future complexity.',
      'I look at current requirements, likelihood of reuse, cost of later change, and whether the abstraction makes today’s code clearer or harder to understand.',
      'The tradeoff is future-readiness versus present complexity.',
      'A common senior mistake is using architecture to feel safe instead of to reduce actual cost.'
    ),
    ['seniority', 'overengineering'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0047',
    'Seniority: Ownership and judgment',
    'Execution ownership',
    'Behavioral',
    'What do you focus on in code review?',
    joinLines(
      'I focus first on correctness, state ownership, side effects, maintainability, and whether the code shape will survive likely future changes.',
      'I separate meaningful issues from stylistic preferences.',
      'The goal is to improve both the code and the engineer’s reasoning.',
      'A noisy review process lowers signal and slows the team down.'
    ),
    ['seniority', 'code-review'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0048',
    'Frontend architecture: System design',
    'HLD awareness',
    'Design',
    'How would you design a large admin dashboard frontend used by multiple teams?',
    joinLines(
      'First I would clarify domains, ownership boundaries, shared workflows, auth and permissions, routing complexity, data-loading patterns, and expected growth.',
      'Then I would split the app into shell, domain features, shared primitives, data-access boundaries, and cross-cutting concerns.',
      'The main risks are unclear ownership, overgrown shared layers, and inconsistent async or UI patterns.',
      'I would start with explicit feature boundaries and only extract shared infrastructure where repetition is real.'
    ),
    ['architecture', 'system-design', 'dashboard'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0049',
    'Frontend delivery: CI/CD and DevSecOps',
    'Execution ownership',
    'Process',
    'What should a frontend CI/CD pipeline include?',
    joinLines(
      'At minimum, I expect dependency install, linting, type-checking, tests, and a production build.',
      'If the project needs it, I would also add dependency scanning, bundle checks, and image scanning when Docker is part of the flow.',
      'The goal is to block predictable failures before merge or release without creating a pipeline people want to bypass.',
      'I also watch for flaky jobs and environment drift because unreliable CI weakens team discipline.'
    ),
    ['ci', 'cd', 'pipeline', 'devsecops'],
    'Implement CI/CD best practices and support DevSecOps processes'
  ),
  makeCard(
    'card-0050',
    'Frontend delivery: CI/CD and DevSecOps',
    'Execution ownership',
    'Definition',
    'What does DevSecOps mean in practice for frontend work?',
    joinLines(
      'It means security is part of the normal delivery flow, not a late manual step.',
      'For frontend work, that usually means dependency risk awareness, safe handling of configuration, correct auth and session behavior, and checks in CI where they add real value.',
      'I do not treat it as security theater. The point is to reduce avoidable risk while keeping delivery workable.',
      'A practical example is keeping secrets out of the client bundle and using automated scanning where the team can trust the results.'
    ),
    ['devsecops', 'security', 'frontend-delivery'],
    'Implement CI/CD best practices and support DevSecOps processes'
  ),
  makeCard(
    'card-0051',
    'Platform awareness: Docker',
    'Execution ownership',
    'Design',
    'How would you package a frontend app for containerized deployment?',
    joinLines(
      'I would usually use a multi-stage build.',
      'The build stage uses Node to install dependencies and generate the production assets.',
      'The runtime stage serves the built files with a smaller image, often Nginx or another static server.',
      'The main goals are reproducibility, smaller runtime images, and a clean separation between build concerns and runtime concerns.'
    ),
    ['docker', 'multi-stage', 'deployment'],
    'Build and deploy containerized applications using Docker'
  ),
  makeCard(
    'card-0052',
    'Platform awareness: Linux',
    'Execution ownership',
    'Debugging',
    'How would you debug a frontend app that works locally but fails in a Linux environment?',
    joinLines(
      'First I would compare Node version, package manager version, environment variables, file paths, and build commands.',
      'Linux often exposes issues around case-sensitive paths, missing environment configuration, permissions, or different runtime assumptions.',
      'I would inspect logs, reproduce inside the same container or host environment if possible, and isolate whether the failure is build-time, runtime, or integration-related.',
      'The important thing is narrowing the environmental difference rather than randomly changing code.'
    ),
    ['linux', 'debugging', 'environment'],
    'Support Linux-based environments and application integration'
  ),
  makeCard(
    'card-0053',
    'Team process: Cross-functional delivery',
    'Execution ownership',
    'Process',
    'What does agile mean in practice on a cross-functional team?',
    joinLines(
      'In practice, it means short feedback loops, visible priorities, and small deliverable slices of work.',
      'I care less about ceremony for its own sake and more about whether planning, refinement, reviews, and retros actually reduce confusion and delivery risk.',
      'On cross-functional teams, that means aligning early with product, design, backend, and QA rather than discovering conflicts at the end.',
      'The goal is adaptable delivery with enough engineering discipline that speed does not turn into chaos.'
    ),
    ['agile', 'cross-functional', 'delivery'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0054',
    'Professional experience: Senior frontend scope',
    'Execution ownership',
    'Behavioral',
    'How has your frontend engineering approach changed over the years?',
    joinLines(
      'Earlier in my career, I focused more on implementing the immediate task correctly.',
      'Over time, I became more focused on boundaries, state ownership, maintainability, delivery risk, and how other engineers will work with the code later.',
      'I now think more in terms of systems and tradeoffs, not just isolated features.',
      'That shift is one of the clearest differences between simply having years of experience and operating with senior judgment.'
    ),
    ['seniority', 'experience', 'frontend'],
    '7+ years of experience as a Front-End Engineer'
  ),
  makeCard(
    'card-0055',
    'React: Professional depth',
    'LLD strength',
    'Decision',
    'What common React mistakes do even experienced developers still make?',
    joinLines(
      'Common mistakes include overusing useEffect, storing derived state, memoizing too early, putting state too high in the tree, and using Context for problems it does not scale well for.',
      'The deeper issue is usually not syntax. It is weak reasoning about ownership, rendering, and side effects.',
      'Senior React depth shows up in knowing when to keep things simple and when a pattern is actually justified.',
      'A strong answer here should sound like judgment, not a list of hook names.'
    ),
    ['react', 'senior-depth', 'pitfalls'],
    '3+ years of hands-on experience with React.js (JavaScript or TypeScript)'
  ),
  makeCard(
    'card-0056',
    'Frontend tooling: Node.js',
    'LLD strength',
    'Definition',
    'What role does Node.js play in modern frontend engineering?',
    joinLines(
      'Even when the product runs in the browser, Node often powers the development, build, and delivery toolchain.',
      'That includes package scripts, test runners, linting, bundlers, code generation, local dev servers, and CI tasks.',
      'So a frontend engineer does not need to be a backend specialist to benefit from solid Node understanding.',
      'The practical value is being able to reason about tooling, builds, dependencies, and automation without treating them as black boxes.'
    ),
    ['node', 'tooling', 'build'],
    '3+ years of experience with Node.js'
  ),
  makeCard(
    'card-0057',
    'Frontend fundamentals: HTML/CSS',
    'LLD strength',
    'Definition',
    'What is semantic HTML and why does it matter?',
    joinLines(
      'Semantic HTML means choosing elements based on meaning and behavior, not only appearance.',
      'It matters because accessibility, keyboard behavior, screen readers, SEO, and even default browser behavior depend on structure and semantics.',
      'In practice, using the right native element often reduces custom code and improves usability at the same time.',
      'Strong frontend engineers should treat this as a foundation, not as a minor detail below React.'
    ),
    ['html', 'semantic-html', 'css'],
    'Strong proficiency in HTML5 and CSS'
  ),
  makeCard(
    'card-0058',
    'Frontend delivery: Git and CI/CD',
    'Execution ownership',
    'Comparison',
    'Merge vs rebase: how do you think about the tradeoff?',
    joinLines(
      'Both integrate changes from one branch into another, but they preserve history differently.',
      'Merge keeps branch history intact and creates an explicit merge point.',
      'Rebase rewrites the branch on top of a new base, usually producing a cleaner linear history.',
      'I follow team convention, but I care most about safe collaboration, understandable history, and not rewriting shared history carelessly.'
    ),
    ['git', 'merge', 'rebase', 'ci'],
    'Experience with CI/CD pipelines and source control tools such as Git'
  ),
  makeCard(
    'card-0059',
    'Platform awareness: Docker',
    'Execution ownership',
    'Debugging',
    'How do you debug a Docker build or runtime issue for a frontend app?',
    joinLines(
      'First I separate build-stage problems from runtime problems.',
      'Build problems often come from dependency installation, lockfiles, missing files, or incorrect build arguments.',
      'Runtime problems often come from env configuration, static asset paths, server config, or incorrect assumptions about what is inside the final image.',
      'I inspect build logs, run the container locally, check the final filesystem, and validate that the expected process and files exist.'
    ),
    ['docker', 'debugging', 'runtime'],
    'Experience building and deploying Docker containers'
  ),
  makeCard(
    'card-0060',
    'Platform awareness: Linux',
    'Execution ownership',
    'Process',
    'Which Linux workflows matter most for frontend delivery and troubleshooting?',
    joinLines(
      'The most useful ones are log inspection, environment validation, file and path checking, process inspection, and simple network verification.',
      'In practice, that means being comfortable with shell access, tailing logs, checking env vars, using curl, and spotting permission or path issues.',
      'A frontend engineer does not need to be a Linux administrator, but they do need enough confidence to debug where the app actually runs.',
      'That matters most in CI, containers, staging, and production support.'
    ),
    ['linux', 'cli', 'logs', 'curl'],
    'Experience working in Linux environments'
  ),
  makeCard(
    'card-0061',
    'Architecture: Microservices and APIs',
    'HLD awareness',
    'Definition',
    'How does microservices architecture affect frontend work?',
    joinLines(
      'Microservices affect frontend work because the UI may depend on multiple services with different contracts, owners, release cycles, and failure modes.',
      'That increases the importance of contract clarity, async state handling, partial failure behavior, and data composition boundaries.',
      'Without a good boundary, frontend code can become tightly coupled to too many service details.',
      'Senior frontend engineers should understand the impact even if they are not designing the backend services themselves.'
    ),
    ['microservices', 'architecture', 'frontend'],
    'Experience with microservices architecture'
  ),
  makeCard(
    'card-0062',
    'Architecture: Microservices and APIs',
    'Tradeoff judgment',
    'Comparison',
    'REST vs GraphQL: when would you choose each?',
    joinLines(
      'I would choose based on data access shape, frontend composition needs, team familiarity, and operational complexity.',
      'REST is often a simpler fit when resources and operations map cleanly to endpoints.',
      'GraphQL becomes more attractive when screens need flexible nested data or data from multiple related entities.',
      'The senior answer is not that one is universally better. It is how the constraints change the tradeoff.'
    ),
    ['rest', 'graphql', 'apis'],
    'Working knowledge of REST / GraphQL APIs'
  ),
  makeCard(
    'card-0063',
    'Team process: Jira and Confluence',
    'Execution ownership',
    'Process',
    'How do you use Jira and Confluence in engineering work?',
    joinLines(
      'I use Jira to keep scope, dependencies, and progress visible, especially when work spans multiple people or functions.',
      'I use Confluence or similar documentation for information that needs to outlive chat: technical decisions, setup notes, integration assumptions, and operational references.',
      'The main goal is not writing more documents. It is reducing ambiguity and making coordination easier.',
      'Good documentation and ticket hygiene are especially valuable in larger enterprise teams.'
    ),
    ['jira', 'confluence', 'process'],
    'Familiarity with Atlassian tools (Jira, Confluence)'
  ),
  makeCard(
    'card-0064',
    'Collaboration: Growth mindset',
    'Execution ownership',
    'Behavioral',
    'How do you show growth mindset as a senior engineer?',
    joinLines(
      'For me, growth mindset is not pretending not to know anything. It is being honest about gaps, closing them fast, and adjusting based on feedback or evidence.',
      'As a senior engineer, that also means changing your own approach when a pattern or assumption is not serving the team well.',
      'I try to make learning practical: clarify the unknown, test assumptions, ask targeted questions, and then fold the learning back into better decisions.',
      'That is more useful than treating growth mindset as a generic positive attitude.'
    ),
    ['collaboration', 'growth-mindset', 'seniority'],
    'Strong collaboration skills and growth mindset'
  ),
  makeCard(
    'card-0065',
    'Frontend delivery: Git and CI/CD',
    'Execution ownership',
    'Process',
    'How do you structure a good pull request?',
    joinLines(
      'A good pull request is focused, reviewable, and explicit about what changed, why it changed, and how to validate it.',
      'I prefer smaller, coherent PRs over large mixed ones because review quality drops when too many concerns are packed together.',
      'I also try to make tradeoffs or follow-ups visible so reviewers understand the decision context, not just the diff.',
      'That makes code review more effective and integration safer.'
    ),
    ['git', 'pull-request', 'code-review'],
    'Experience with CI/CD pipelines and source control tools such as Git'
  ),
  makeCard(
    'card-0066',
    'Frontend fundamentals: HTML/CSS',
    'LLD strength',
    'Comparison',
    'Flexbox vs Grid: when would you use each?',
    joinLines(
      'Flexbox is best for one-dimensional layout where the main concern is arranging items in a row or column.',
      'Grid is better for two-dimensional layout where rows and columns both matter together.',
      'I choose based on the structure of the problem rather than treating one as universally better.',
      'A strong frontend engineer should be comfortable with both and know when each keeps layout logic simpler.'
    ),
    ['css', 'flexbox', 'grid'],
    'Strong proficiency in HTML5 and CSS'
  ),
  makeCard(
    'card-0067',
    'Collaboration: Growth mindset',
    'Execution ownership',
    'Behavioral',
    'How do you collaborate with backend, product, design, and QA without losing engineering quality?',
    joinLines(
      'I try to make constraints, dependencies, and assumptions visible early so decisions do not drift in different directions.',
      'That means clarifying contract details with backend, expected behavior with product and design, and validation expectations with QA before the end of implementation.',
      'Good collaboration is not agreeing with everything immediately. It is aligning early enough that the team can move without unnecessary rework.',
      'The goal is shared delivery, not isolated functional success.'
    ),
    ['collaboration', 'backend', 'product', 'qa'],
    'Strong collaboration skills and growth mindset'
  ),
  makeCard(
    'card-0068',
    'Professional experience: Senior frontend scope',
    'HLD awareness',
    'Behavioral',
    'What makes someone senior rather than just experienced?',
    joinLines(
      'Seniority is not only time spent writing code. It is the ability to make better decisions across implementation, architecture, tradeoffs, and delivery.',
      'A senior engineer improves team output, not just personal output.',
      'That shows up in clearer boundaries, better judgment under constraints, better debugging discipline, and stronger ownership of outcomes.',
      'Years help, but they matter only if they changed how you think and operate.'
    ),
    ['seniority', 'experience', 'ownership'],
    '7+ years of experience as a Front-End Engineer'
  ),
  makeCard(
    'card-0069',
    'Role fit: Why this job',
    'HLD awareness',
    'Behavioral',
    'Why is designing front-end solutions for large-scale enterprise environments attractive to you?',
    joinLines(
      'Because the most interesting frontend problems for me are not simple screens. They are workflow-heavy systems with shared entities, permissions, data-heavy interfaces, and long-term change pressure.',
      'Large-scale enterprise environments force better thinking around boundaries, reuse, ownership, and maintainability, which is the kind of frontend work I enjoy most.',
      'That also matches the strongest parts of my background: building configurable foundations, not just isolated pages.',
      'So the attraction is not scale as a buzzword. It is the quality and complexity of the frontend problems that come with that scale.'
    ),
    ['role-fit', 'enterprise', 'frontend-architecture'],
    'You will play a key role in designing and building modern, scalable front-end solutions used in large-scale enterprise environments.'
  ),
  makeCard(
    'card-0070',
    'Role fit: Why this job',
    'Execution ownership',
    'Behavioral',
    'Why is working with React, Node.js, cloud platforms, and containerized applications appealing to you?',
    joinLines(
      'Because modern frontend engineering is not just about React components anymore. The surrounding tooling, delivery path, and runtime environment affect the quality of the product too.',
      'React is the core implementation layer, but Node.js, cloud delivery, and containers are what make the work feel complete rather than artificially narrowed to the browser only.',
      'I like roles where frontend engineers are expected to understand the whole flow from implementation to release, because that produces better technical decisions.',
      'That combination also matches how I already like to work: strong on frontend, but comfortable enough with the surrounding platform to not treat it as somebody else’s problem.'
    ),
    ['role-fit', 'react', 'node', 'cloud', 'containers'],
    'You will work with advanced technologies such as React, Node.js, cloud platforms, and containerized applications.'
  ),
  makeCard(
    'card-0071',
    'Role fit: Why this job',
    'Execution ownership',
    'Behavioral',
    'Why is collaborating with experienced engineers and contributing to technical decisions attractive?',
    joinLines(
      'Because the best engineering environments are the ones where frontend decisions are treated as real engineering decisions, not only implementation tasks.',
      'I want to be in teams where tradeoffs, architecture, and delivery quality are discussed seriously, because that is where I add the most value and where I keep improving fastest.',
      'Working with experienced engineers also means stronger feedback loops, better technical standards, and fewer superficial decisions.',
      'That is much more attractive to me than being in a ticket factory where the frontend is expected to just wire screens together.'
    ),
    ['role-fit', 'collaboration', 'technical-decisions'],
    'You will collaborate with experienced engineers in a dynamic, agile team and contribute to important technical decisions.'
  ),
  makeCard(
    'card-0072',
    'Role fit: Why this job',
    'Execution ownership',
    'Behavioral',
    'Why is mentoring others while continuing to grow professionally attractive to you?',
    joinLines(
      'Because that is one of the clearest signs that the role expects real senior contribution instead of just individual output.',
      'Mentoring is valuable because it forces you to explain reasoning clearly, not just arrive at the right answer privately.',
      'At the same time, I do not want a role where growth stops because I already have experience. I want both: the chance to raise the level around me and the chance to keep stretching technically.',
      'That combination usually means the environment has enough maturity to value leverage, not just raw throughput.'
    ),
    ['role-fit', 'mentoring', 'growth'],
    'You will have the opportunity to mentor others and share your expertise while continuing to grow professionally.'
  ),
  makeCard(
    'card-0073',
    'Role fit: Why this job',
    'Execution ownership',
    'Behavioral',
    'Why is working on impactful solutions for global communication and media companies attractive?',
    joinLines(
      'Because the more operationally important the system is, the more frontend quality actually matters.',
      'In products with real scale and business importance, decisions around usability, reliability, performance, and maintainability are not cosmetic. They affect real workflows and real outcomes.',
      'That makes the engineering work more meaningful and usually leads to better technical problems than low-impact internal prototypes.',
      'I am more motivated by systems where the frontend has visible consequence than by products where the interface is treated as a thin wrapper.'
    ),
    ['role-fit', 'impact', 'industry'],
    'You will work on impactful solutions that support leading global communication and media companies.'
  ),
  makeCard(
    'card-0074',
    'Role fit: Why this job',
    'Execution ownership',
    'Behavioral',
    'How would you speak about culture, flexibility, and professional growth without sounding generic?',
    joinLines(
      'I would talk about whether the environment makes strong engineering easier, not about culture in an abstract way.',
      'A supportive culture matters when it improves feedback quality, cross-team collaboration, and the ability to raise technical concerns early without unnecessary friction.',
      'Flexibility matters when it helps people sustain good work consistently, not when it is used as a vague perk line.',
      'Professional growth matters when the role gives you broader ownership, better technical problems, and stronger people around you, not just more years in the seat.'
    ),
    ['role-fit', 'culture', 'growth', 'flexibility'],
    'Amdocs offers a supportive culture, flexible work environment, and excellent benefits that help you grow both professionally and personally.'
  ),
  makeCard(
    'card-0075',
    'Resume stories: FxPro CRM and platform foundation',
    'Execution ownership',
    'Behavioral',
    'Tell me about the unified CRM you built from scratch at FxPro and why it mattered.',
    joinLines(
      'Context: legacy desktop tools were limiting multiple workflows and making the operational landscape harder to evolve.',
      'My role: I led the design and development of a unified, configurable web-based CRM from scratch.',
      'Hard part: it had to support dealer operations, marketing workflows, role-based routing, and multiple team-owned domains on the same core entities without turning into a generic mess.',
      'What I did: I defined the application shell, role-based routing, modular page composition, and the shared UI and data foundations the rest of the system could build on.',
      'Result: the frontend became a reusable operational foundation that supported automations like Trade Reconciliation and managed content across trading and investing products.',
      '',
      '---',
      '',
      'Proof points',
      '- Replaced legacy desktop tools with a unified web-based CRM.',
      '- Supported dealer operations and marketing workflows on the same core entities.',
      '- Defined role-based routing, modular page composition, and shared UI/data foundations.',
      '- Designed for new departments, evolving workflows, and multiple team-owned domains.',
      '',
      '---',
      '',
      'Likely follow-up — **What was the hardest architecture tradeoff?**',
      'The hardest part was creating enough shared structure for configurability and reuse without flattening different workflows into one over-generalized model that became harder to reason about.'
    ),
    ['resume', 'fxpro', 'crm', 'architecture'],
    '7+ years of experience as a Front-End Engineer'
  ),
  makeCard(
    'card-0076',
    'Resume stories: FxPro reusable table system',
    'Execution ownership',
    'Behavioral',
    'Tell me about the reusable table library you built at FxPro.',
    joinLines(
      'Context: older table tooling was limiting consistency and performance across data-heavy interfaces.',
      'My role: I built and rolled out a reusable MUI plus TanStack Table foundation to replace the aging mui-datatables setup.',
      'What I did: I standardized filtering and sorting behavior and used virtualization, memoization, and batched updates to keep complex tables responsive at scale.',
      'Result: the table foundation became a reusable capability later adopted by two internal projects, not just a one-off rewrite.',
      '',
      '---',
      '',
      'Proof points',
      '- Replaced the aging mui-datatables setup.',
      '- Standardized filtering and sorting behavior across data-heavy interfaces.',
      '- Used virtualization, memoization, and batched updates for responsiveness.',
      '- Later adopted by 2 internal projects.',
      '',
      '---',
      '',
      'Likely follow-up — **How did you avoid overengineering it?**',
      'I kept the abstraction focused on repeated table concerns that were already real, like sorting, filtering, and responsiveness, instead of trying to make one component solve every possible table variation from day one.'
    ),
    ['resume', 'fxpro', 'tables', 'mui', 'tanstack-table'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0077',
    'Resume stories: FxPro real-time performance',
    'Execution ownership',
    'Behavioral',
    'Tell me about keeping a UI responsive under high-frequency updates.',
    joinLines(
      'Context: market-facing interfaces receive frequent streaming updates, so weak rendering boundaries show up quickly as UI lag or instability.',
      'My role: I focused on rendering behavior and data flow under real-time updates coming through Solace and gRPC with Protobuf.',
      'What I did: I optimized rendering and data and state flow so frequent updates did not force unnecessary work across unrelated parts of the interface.',
      'Result: the UI stayed more responsive and predictable under real-time conditions.',
      '',
      '---',
      '',
      'Proof points',
      '- Real-time streaming via Solace plus gRPC and Protobuf.',
      '- Focused on rendering behavior and state/data flow, not only isolated micro-optimizations.',
      '- Kept UIs responsive under high-frequency market updates.',
      '',
      '---',
      '',
      'Likely follow-up — **What was the real performance lesson?**',
      'The biggest lesson was that performance was mostly about structure and ownership: where state lives, how far updates spread, and how much unrelated UI work gets triggered.'
    ),
    ['resume', 'fxpro', 'real-time', 'solace', 'grpc', 'protobuf'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0078',
    'Resume stories: FxPro auth and identity',
    'Execution ownership',
    'Behavioral',
    'Tell me about implementing single sign-on with Azure AD at FxPro.',
    joinLines(
      'Context: account management and trading platform flows needed a robust end-to-end SSO experience instead of fragmented auth behavior.',
      'My role: I implemented OpenID Connect with Azure AD and worked closely with backend and technical leadership to make the full flow reliable.',
      'What I did: I defined the OIDC configuration and handled fallback flows plus error-code mapping and handling so the frontend behavior stayed explicit under success and failure cases.',
      'Result: the platform gained a stronger, more consistent SSO experience across connected applications.',
      '',
      '---',
      '',
      'Proof points',
      '- OIDC with Azure AD.',
      '- SSO across the account management application and the trading platform.',
      '- Defined OIDC configuration, fallback flows, and error-code mapping and handling.',
      '- Collaborated with backend and technical leadership, not only frontend implementation.',
      '',
      '---',
      '',
      'Likely follow-up — **What was hardest beyond the happy path?**',
      'The hardest part was making frontend behavior explicit when authentication did not resolve cleanly, so fallback paths and errors behaved predictably instead of turning into vague broken flows.'
    ),
    ['resume', 'fxpro', 'oidc', 'azure-ad', 'sso'],
    'Implement CI/CD best practices and support DevSecOps processes'
  ),
  makeCard(
    'card-0079',
    'Resume stories: FxPro delivery quality',
    'Execution ownership',
    'Behavioral',
    'Tell me about improving delivery reliability and team consistency at FxPro.',
    joinLines(
      'Context: fast-moving frontend teams often suffer not only from implementation complexity, but from uneven delivery discipline and inconsistent engineering habits.',
      'My role: I helped improve delivery reliability through CI/CD quality gates, code reviews, onboarding, and shared engineering standards.',
      'What I did: I pushed for stronger validation around linting, type checks, automated test execution, production build verification, and release-readiness signals, while also using review and onboarding to make expectations more consistent across the team.',
      'Result: delivery became more reliable and team consistency improved, which matters especially when multiple people contribute to the same foundations.',
      '',
      '---',
      '',
      'Proof points',
      '- Strengthened CI/CD quality gates around buildability, code quality, type-safety, and automated validation.',
      '- Paired pipeline discipline with code reviews, onboarding, and shared standards.',
      '- Improved delivery reliability and team consistency rather than only one feature area.',
      '',
      '---',
      '',
      'Likely follow-up — **Why is this a strong senior example?**',
      'Because it improved the quality and reliability of many future changes, not just the implementation of one feature.'
    ),
    ['resume', 'fxpro', 'ci-cd', 'quality', 'standards'],
    'Experience with CI/CD pipelines and source control tools such as Git'
  ),
  makeCard(
    'card-0080',
    'Resume stories: Amdocs core refactor',
    'Execution ownership',
    'Behavioral',
    'Tell me about the frontend refactor you contributed to at Amdocs.',
    joinLines(
      'Context: CatalogONE relied on shared frontend foundations, so improvements to the core layer had broad impact across the product.',
      'My role: I contributed to a major refactor by extending the shared core layer with a builder-pattern-inspired API and reusable services.',
      'What I did: I worked on capabilities for dynamic entity rendering, state handling, and route composition so the platform could support more complex workflows more consistently.',
      'Result: the shared frontend foundations became stronger and more reusable across higher-level application features.',
      '',
      '---',
      '',
      'Proof points',
      '- Extended the shared core layer, not only feature-level code.',
      '- Added a builder-pattern-inspired API plus reusable services.',
      '- Worked on dynamic entity rendering, state handling, and route composition.',
      '- Impact applied across the product because the work lived in shared foundations.',
      '',
      '---',
      '',
      'Likely follow-up — **Why was a builder-style approach useful?**',
      'Because the platform had dynamic entity and workflow needs, so a structured way to compose behavior was more maintainable than repeated custom wiring for each case.'
    ),
    ['resume', 'amdocs', 'refactor', 'builder-pattern', 'platform'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0081',
    'Resume stories: Amdocs collaboration workflows',
    'Execution ownership',
    'Behavioral',
    'Tell me about a collaboration-heavy feature from Amdocs.',
    joinLines(
      'Context: telecom catalog workflows involved shared entities, multiple users, and permission-sensitive operations.',
      'My role: I implemented collaboration capabilities including multi-user conflict handling and RBAC for catalog entities and workspace workflows.',
      'What I did: I treated the frontend as part of the coordination model, not just the rendering layer, so the UI could reflect conflicts, permissions, and workflow constraints clearly.',
      'Result: the platform handled collaboration-heavy scenarios more safely and predictably.',
      '',
      '---',
      '',
      'Proof points',
      '- Multi-user conflict handling.',
      '- RBAC for catalog entities and workspace workflows.',
      '- Frontend had to reflect permissions and collaboration constraints, not only hide or show buttons.',
      '',
      '---',
      '',
      'Likely follow-up — **How is that different from just conditional rendering?**',
      'Because the real problem was not only visibility of actions. It was keeping workflow behavior correct when permissions, entity state, and collaboration conditions all affected what the user should be allowed or able to do next.'
    ),
    ['resume', 'amdocs', 'rbac', 'conflict-handling', 'collaboration'],
    'Strong collaboration skills and growth mindset'
  ),
  makeCard(
    'card-0082',
    'Resume stories: Amdocs reliability and search',
    'Execution ownership',
    'Behavioral',
    'Tell me about improving reliability or search-heavy workflows at Amdocs.',
    joinLines(
      'Context: CatalogONE had search and retrieval flows backed by Elasticsearch and required strong release confidence because it supported enterprise workflows.',
      'My role: I worked on Elasticsearch-backed search integration, resolved high-priority issues, expanded automated test coverage, supported release flows, and partnered with QA on validation and regression testing.',
      'What I did: I connected indexed search behavior into frontend workflows while also improving confidence through testing and release support.',
      'Result: search-related workflows were better integrated and release quality improved through stronger validation.',
      '',
      '---',
      '',
      'Proof points',
      '- Elasticsearch-backed search and retrieval flows.',
      '- Wrote queries for indexed entities and integrated results into frontend workflows.',
      '- Expanded Jest and React Testing Library coverage.',
      '- Supported release flows and partnered with QA on validation and regression testing.',
      '',
      '---',
      '',
      'Likely follow-up — **Why is this a good senior example?**',
      'Because it combines feature work, reliability work, and cross-functional delivery support instead of treating them as separate concerns.'
    ),
    ['resume', 'amdocs', 'elasticsearch', 'testing', 'qa'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0083',
    'Interview exercises: Live coding',
    'LLD strength',
    'Design',
    'How would you implement a small todo or task list in React during a live coding interview?',
    joinLines(
      'I would first define a minimal state shape, for example an array of items with id, text, and completed state plus a controlled input for new item text.',
      'Then I would implement add, toggle, and delete flows with straightforward immutable updates before thinking about abstraction.',
      'After the main flow works, I would handle edge cases like empty input, empty state, and stable keys.',
      'If time allows, I would then mention how I would refactor rendering or helpers, but only after correctness and clarity are in place.'
    ),
    ['live-coding', 'todo', 'react'],
    '3+ years of hands-on experience with React.js (JavaScript or TypeScript)'
  ),
  makeCard(
    'card-0084',
    'Interview exercises: Live coding',
    'LLD strength',
    'Design',
    'How would you implement search and filtering in a list UI?',
    joinLines(
      'I would keep the query state local and derive the filtered result from the source list during render instead of storing redundant filtered state.',
      'I would normalize both the query and searchable fields so the basic behavior is predictable before adding anything more advanced.',
      'If filtering is local, I would only add memoization if the list is large enough that the cost is real. If filtering is remote, I would think about debouncing, cancellation, and empty or loading states.',
      'This is a good place to show that I understand derived state, user input flow, and when optimization is actually justified.'
    ),
    ['live-coding', 'search', 'filtering'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0085',
    'Interview exercises: Live coding',
    'LLD strength',
    'Debugging',
    'How would you fix a useEffect bug in a live interview?',
    joinLines(
      'I would start by saying what the effect is supposed to synchronize with, because that usually reveals whether the logic belongs in an effect at all.',
      'Then I would inspect whether the issue comes from missing dependencies, unstable dependencies, stale closures, or derived state being pushed into an effect unnecessarily.',
      'If the effect is doing event-driven logic, I would move that logic to the handler. If it is syncing external behavior, I would make the dependency logic explicit and correct.',
      'The key interview signal is that I understand the design mistake underneath the bug, not just the local patch.'
    ),
    ['live-coding', 'useeffect', 'debugging'],
    '3+ years of hands-on experience with React.js (JavaScript or TypeScript)'
  ),
  makeCard(
    'card-0086',
    'Interview exercises: Code review',
    'Execution ownership',
    'Behavioral',
    'What do you look for first in a React code review?',
    joinLines(
      'First I look for correctness, ownership of state, side effects, and whether the structure will survive likely future changes.',
      'Only after that do I worry about smaller stylistic or cosmetic issues.',
      'That keeps review signal high and helps the team focus on the issues that actually change reliability or maintenance cost.',
      'This is especially important in senior interviews because they want to see prioritization, not only criticism.'
    ),
    ['code-review', 'priorities', 'react'],
    'Work in an agile, cross-functional team delivering high-quality enterprise software'
  ),
  makeCard(
    'card-0087',
    'Interview exercises: Code review',
    'Execution ownership',
    'Behavioral',
    'How do you review a pull request without turning it into preference policing?',
    joinLines(
      'I distinguish between correctness and maintainability issues, architectural concerns, and pure preferences.',
      'I push on the first two strongly because they affect reliability and future change cost.',
      'I try not to create noise around preferences unless they violate an agreed team convention or make the code harder to reason about.',
      'That helps reviews stay useful and makes collaboration healthier.'
    ),
    ['code-review', 'pull-request', 'collaboration'],
    'Experience with CI/CD pipelines and source control tools such as Git'
  ),
  makeCard(
    'card-0088',
    'Platform awareness: Cloud and delivery',
    'Execution ownership',
    'Definition',
    'What changes for frontend delivery when cloud platforms are involved?',
    joinLines(
      'Cloud platforms change where frontend delivery problems appear: artifact creation, static hosting, CDN distribution, environment-specific configuration, and release promotion across environments.',
      'That means frontend engineers need to care about more than the bundle itself. They need to care about how that bundle is served, cached, configured, and verified after deployment.',
      'The practical value is not memorizing cloud product names. It is understanding how cloud delivery affects performance, rollout safety, and production behavior.',
      'In other words, cloud makes delivery architecture part of frontend engineering, not just an external concern.'
    ),
    ['cloud', 'delivery', 'cdn'],
    'You will work with advanced technologies such as React, Node.js, cloud platforms, and containerized applications.'
  ),
  makeCard(
    'card-0089',
    'Platform awareness: Cloud and delivery',
    'Execution ownership',
    'Process',
    'How do you think about environment-specific frontend configuration in cloud deployments?',
    joinLines(
      'I separate public configuration from actual secrets immediately, because anything shipped to the browser should be treated as visible.',
      'Then I think about how dev, staging, and production differ without letting builds become inconsistent or hard to reproduce.',
      'In practice, the main risks are hidden environment drift, wrong base URLs, mismatched feature flags, and builds that behave differently because configuration was handled loosely.',
      'The goal is predictable deployment behavior, not just passing the right variables somewhere in the pipeline.'
    ),
    ['cloud', 'config', 'environments'],
    'You will work with advanced technologies such as React, Node.js, cloud platforms, and containerized applications.'
  ),
  makeCard(
    'card-0090',
    'Platform awareness: Cloud and delivery',
    'Tradeoff judgment',
    'Comparison',
    'Why does CDN or edge delivery matter for frontend applications?',
    joinLines(
      'Because users feel the network before they feel React. If assets arrive slowly or cache behavior is wrong, frontend quality is already damaged before the app finishes booting.',
      'CDN or edge delivery matters because it improves latency, geographic distribution, and cache efficiency for static assets and sometimes dynamic edge behavior too.',
      'For frontend engineers, the important part is understanding how cache headers, asset versioning, and invalidation interact with rollout and rollback strategy.',
      'The strong answer here is not infrastructure trivia. It is understanding how delivery decisions affect the real user experience.'
    ),
    ['cloud', 'cdn', 'performance'],
    'You will work with advanced technologies such as React, Node.js, cloud platforms, and containerized applications.'
  ),
  makeCard(
    'card-0091',
    'Role fit: Company and role',
    'Execution ownership',
    'Behavioral',
    'Why does this Amdocs role fit your background especially well?',
    joinLines(
      'Because the role sits exactly at the intersection where I am strongest: React and TypeScript implementation, workflow-heavy enterprise UI, architecture contribution, and delivery discipline around CI/CD, Docker, and Linux-aware environments.',
      'It is not a narrow UI-only frontend role, and that is part of why it fits. My background already spans data-heavy interfaces, reusable foundations, backend integration, and platform-minded frontend work.',
      'It also fits because I already know what it is like to work in enterprise environments where frontend systems need to survive changing workflows, shared ownership, and operational pressure.',
      'So the fit is strong not just on technology, but on the kind of engineering problems the role actually contains.'
    ),
    ['role-fit', 'amdocs', 'background-fit'],
    'You will collaborate with experienced engineers in a dynamic, agile team and contribute to important technical decisions.'
  ),
  makeCard(
    'card-0092',
    'Role fit: Company and role',
    'Execution ownership',
    'Behavioral',
    'Why would you want to work at Amdocs again?',
    joinLines(
      'Because I already know the company operates in enterprise-grade, workflow-heavy environments where frontend decisions actually matter at system level.',
      'That matters to me more than brand familiarity. I am interested in returning only if the role uses my current level better than before, especially around architecture, reusable foundations, and senior contribution.',
      'The attraction is that I can bring a much stronger level of frontend ownership now than when I was there earlier in my career.',
      'So the story is not about returning to something familiar. It is about re-entering at a much stronger level with clearer value to offer.'
    ),
    ['role-fit', 'amdocs', 'returning'],
    'Amdocs offers a supportive culture, flexible work environment, and excellent benefits that help you grow both professionally and personally.'
  ),
  makeCard(
    'card-0093',
    'Role fit: Company and role',
    'Execution ownership',
    'Behavioral',
    'What value would you aim to bring in the first months of this role?',
    joinLines(
      'I would expect to contribute first by understanding the product and existing frontend boundaries quickly, then by raising clarity and consistency around the areas where senior frontend engineers have the most leverage.',
      'That usually means state and data-flow decisions, reusable UI patterns, code review signal, and delivery reliability around the frontend workflow.',
      'I would not try to prove impact by changing everything fast. I would prove it by improving the quality of decisions and reducing repeated friction around the codebase.',
      'That is usually the most credible and durable way to add value early in an enterprise frontend role.'
    ),
    ['role-fit', 'value', 'first-months'],
    'You will have the opportunity to mentor others and share your expertise while continuing to grow professionally.'
  ),
  makeCard(
    'card-0094',
    'Frontend architecture: Advanced system design',
    'HLD awareness',
    'Design',
    'How would you design a configurable CRM or backoffice frontend that serves multiple departments on the same core entities?',
    joinLines(
      'I would start by identifying the core entities, the workflows each department performs on them, and which parts of the system must stay shared versus domain-specific.',
      'Then I would separate the system into an application shell, role-based routing, domain-owned workflow modules, shared primitives, and stable data-access boundaries.',
      'The main risk is building a shared layer that is so generic it stops representing real workflow differences clearly.',
      'So I would optimize for shared foundation plus domain-owned behavior, not one giant configuration engine pretending every workflow is the same.'
    ),
    ['system-design', 'crm', 'backoffice', 'configurable'],
    'You will play a key role in designing and building modern, scalable front-end solutions used in large-scale enterprise environments.'
  ),
  makeCard(
    'card-0095',
    'Frontend architecture: Advanced system design',
    'HLD awareness',
    'Design',
    'How would you design a frontend for high-frequency real-time updates without making the whole UI unstable?',
    joinLines(
      'I would first identify which parts of the interface truly need high-frequency freshness and which parts only need occasional synchronization.',
      'Then I would isolate frequently changing data so it does not force rerender spread across unrelated UI.',
      'That usually means careful state placement, narrow subscriptions, explicit rendering boundaries, and avoiding giant shared state that updates everything at once.',
      'The architectural goal is not only speed. It is predictability under load.'
    ),
    ['system-design', 'real-time', 'performance'],
    'Develop, enhance, and maintain responsive front-end applications using React.js and modern JavaScript/TypeScript'
  ),
  makeCard(
    'card-0096',
    'Frontend architecture: Advanced system design',
    'HLD awareness',
    'Design',
    'How would you build shared frontend foundations that multiple teams can use without the shared layer turning into a dumping ground?',
    joinLines(
      'I would keep the shared layer narrow and stable: primitives, consistent data-access helpers, and patterns that have already proven reusable across domains.',
      'I would keep domain logic owned by the domain teams instead of pushing every repeated shape into shared code too early.',
      'The main risk is that shared code grows faster than its ownership and becomes a place where unclear abstractions accumulate.',
      'So I would define clear criteria for what becomes shared and review that boundary continuously.'
    ),
    ['system-design', 'shared-foundations', 'multi-team'],
    'Participate in architecture discussions and contribute to technical design decisions'
  ),
  makeCard(
    'card-0097',
    'Frontend architecture: Advanced system design',
    'HLD awareness',
    'Design',
    'How would you design a frontend auth flow that spans multiple connected applications with SSO and fallback behavior?',
    joinLines(
      'I would treat auth as a system boundary first, not as a single screen concern.',
      'The design needs clear session state, predictable routing behavior, explicit fallback or recovery paths, and error handling that maps backend or identity-provider outcomes into understandable frontend behavior.',
      'I would also keep the frontend contract around auth state explicit so connected applications do not drift into inconsistent assumptions.',
      'The main goal is robustness under failure, not just a clean happy path.'
    ),
    ['system-design', 'auth', 'sso', 'oidc'],
    'Implement CI/CD best practices and support DevSecOps processes'
  ),
  makeCard(
    'card-0098',
    'Frontend architecture: Advanced system design',
    'HLD awareness',
    'Design',
    'How would you design a collaboration-heavy enterprise workflow with RBAC and entity conflicts?',
    joinLines(
      'I would model permissions, workflow state, and conflict states as first-class parts of the UI architecture rather than hiding them inside scattered conditional rendering.',
      'The interface should make it obvious what the user can do, what state the entity is in, and where collaboration changes the safe next action.',
      'I would keep permission interpretation and workflow rules centralized enough to stay consistent, while letting feature modules own their domain behavior.',
      'The goal is a UI that reflects coordination rules clearly instead of pretending every workflow is single-user and synchronous.'
    ),
    ['system-design', 'rbac', 'collaboration', 'conflicts'],
    'Strong collaboration skills and growth mindset'
  ),
]

export const cards = validateCards(rawCards, {
  allJdItems,
  priorityCardIds,
})
