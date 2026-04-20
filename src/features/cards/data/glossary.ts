import type { GlossaryEntry } from '../../study/types'

export const glossaryEntries: readonly GlossaryEntry[] = [
  {
    term: 'ownership',
    definition: 'Who should control a piece of logic, state, or behavior and be responsible for changing it.',
  },
  {
    term: 'boundaries',
    definition: 'Clear separation lines between features, layers, or responsibilities so change stays localized instead of spreading everywhere.',
  },
  {
    term: 'domain',
    definition: 'A business area or problem space with its own rules, workflows, and concepts.',
  },
  {
    term: 'shared layer',
    definition: 'A common code area reused across multiple features or teams. It should stay narrow, stable, and well-owned.',
  },
  {
    term: 'shared foundations',
    definition: 'Reusable primitives and patterns that multiple teams or feature areas can build on consistently.',
  },
  {
    term: 'state ownership',
    definition: 'Where state should live and which part of the UI or system should control updates to it.',
  },
  {
    term: 'server state',
    definition: 'Data owned by the backend that the frontend fetches, caches, invalidates, and resynchronizes.',
  },
  {
    term: 'client state',
    definition: 'State owned by the UI itself, such as open panels, selected tabs, local drafts, or temporary interaction state.',
  },
  {
    term: 'derived state',
    definition: 'A value computed from existing props or state rather than stored separately as its own source of truth.',
  },
  {
    term: 'stale closure',
    definition: 'When a callback or effect uses an older captured value from a previous render instead of the current one.',
  },
  {
    term: 'reconciliation',
    definition: 'React’s process for comparing previous and next render output to decide what UI updates are actually needed.',
  },
  {
    term: 'remounting',
    definition: 'Destroying and recreating a component instance, which resets local state and lifecycle-related behavior.',
  },
  {
    term: 'render scope',
    definition: 'The values and functions captured during a specific render pass of a component.',
  },
  {
    term: 'cross-cutting concerns',
    definition: 'Concerns used across many features, such as auth, logging, error handling, telemetry, or configuration.',
  },
  {
    term: 'artifact',
    definition: 'The built output that gets deployed, such as static assets, bundles, or a container image.',
  },
  {
    term: 'artifact immutability',
    definition: 'Deploying the same built artifact across environments instead of rebuilding different outputs for each environment.',
  },
  {
    term: 'fallback flow',
    definition: 'A backup path the system or user can follow when the normal or happy path does not complete successfully.',
  },
  {
    term: 'contract',
    definition: 'The agreed shape and behavior between two parts of a system, commonly between frontend and backend.',
  },
  {
    term: 'invalidation',
    definition: 'Marking cached data as stale so the system knows it should refresh it.',
  },
  {
    term: 'optimistic updates',
    definition: 'Updating the UI before the server confirms success, then rolling back if the request fails.',
  },
  {
    term: 'unions',
    definition: 'TypeScript types that allow a value to be one of several possible shapes or primitives.',
  },
  {
    term: 'intersections',
    definition: 'TypeScript types that combine multiple type requirements into one resulting type.',
  },
  {
    term: 'tuples',
    definition: 'Fixed-length array-like TypeScript types where each position has a known meaning and type.',
  },
  {
    term: 'mapped types',
    definition: 'TypeScript utilities that transform one type into another by iterating over its keys.',
  },
]
