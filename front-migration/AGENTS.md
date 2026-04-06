<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Purpose

This document defines the working rules for agents contributing to the
`front-migration` project. Follow these rules before making code changes.

## Project Snapshot

- Framework: Next.js `16.2.2`
- React: `19.2.4`
- Language: TypeScript with `strict: true`
- Linting: ESLint 9 + `eslint-config-next`
- Styling: Tailwind CSS 4
- Import alias: `@/*`

## Target Structure

As the migration grows, prefer a structure like this:

```text
front-migration/
  app/
    (routes)/
    api/
    globals.css
    layout.tsx
  components/
    ui/
    shared/
  features/
    home/
    item/
    map/
    quest/
    community/
  lib/
    api/
    config/
    utils/
    constants/
  hooks/
  types/
    api/
    domain/
    ui/
  public/
```

## Directory Responsibilities

- `app/`: routing, layouts, route-level pages, metadata, and server-first entry
  points.
- `components/ui/`: reusable presentational primitives shared across domains.
- `components/shared/`: cross-feature composites shared by multiple screens.
- `features/`: domain-oriented code for a specific area such as `item`, `quest`,
  or `community`.
- `lib/api/`: fetch clients, request helpers, response parsing, and endpoint
  grouping.
- `lib/config/`: environment variables, runtime config, and endpoint base setup.
- `lib/utils/`: framework-agnostic helper functions.
- `lib/constants/`: shared constants that are not environment-specific.
- `hooks/`: reusable React hooks shared across multiple features.
- `types/`: shared type definitions that need reuse across modules.

## Route and Feature Boundaries

- Keep route files in `app/` thin; move page-specific business logic into
  `features/*`.
- A route should assemble data and UI, not own large transformation logic.
- Prefer colocating feature-specific components, hooks, and helpers inside the
  relevant `features/<domain>/` folder.
- Promote code to `components/shared`, `hooks`, `lib`, or `types` only after it
  is used by multiple domains or clearly represents shared infrastructure.

## Types Strategy

Use `types` only for genuinely shared contracts. Do not move every local type
into a global folder.

- `types/api/`: request and response DTOs shaped around backend contracts.
- `types/domain/`: core business models used across multiple features after
  mapping API data into app-friendly shapes.
- `types/ui/`: shared component view models or reusable UI state contracts.
- Feature-local types: reusable types used inside one feature only.
- Component-local types: props and local UI state used by a single component.

Prefer these rules when placing types:

1. Keep a type next to the feature when it is used in only one feature.
2. Move a type to `types/api` when it mirrors a backend response reused in
   several places.
3. Move a type to `types/domain` when multiple features depend on the same
   normalized business entity.
4. Keep component-only props near the component unless reused broadly.

Example direction:

- Endpoint response from `/api/item/info` -> `types/api/item.ts`
- Normalized item model used in list/detail/search UIs -> `types/domain/item.ts`
- Table row or card view model used by shared item UI -> `types/ui/item.ts`

Example placement rules:

```text
features/
  item/
    components/
      ItemCard.tsx
      ItemFilter.tsx
    types.ts
    api.ts
    mapper.ts

types/
  api/
    item.ts
  domain/
    item.ts
  ui/
    item.ts
```

```ts
// Good: component-only props stay close to the component
// features/item/components/ItemCard.tsx
type ItemCardProps = {
  item: ItemSummary;
  showPrice?: boolean;
};
```

```ts
// Good: feature-local types stay inside the feature
// features/item/types.ts
export type ItemSortOption = "price" | "name" | "updatedAt";

export interface ItemFilterForm {
  keyword: string;
  minPrice?: number;
  maxPrice?: number;
}
```

```ts
// Good: raw backend contracts live in types/api
// types/api/item.ts
export interface ItemDetailResponse {
  itemId: number;
  itemName: string;
  fleaPrice: number | null;
}
```

```ts
// Good: app-facing domain models live in types/domain
// types/domain/item.ts
export interface ItemDetail {
  id: number;
  name: string;
  price: number | null;
}
```

```ts
// Good: shared UI-specific models live in types/ui
// types/ui/item.ts
export interface ItemCardView {
  id: number;
  title: string;
  subtitle?: string;
  priceLabel: string;
}
```

```ts
// Good: transform API contracts into domain models before broad reuse
// features/item/mapper.ts
import type { ItemDetailResponse } from "@/types/api/item";
import type { ItemDetail } from "@/types/domain/item";

export function toItemDetail(data: ItemDetailResponse): ItemDetail {
  return {
    id: data.itemId,
    name: data.itemName,
    price: data.fleaPrice,
  };
}
```

Decision shortcut:

- Used by one component only -> declare near that component.
- Used by multiple files in one feature only -> `features/<domain>/types.ts`
- Matches backend request/response shape -> `types/api/*`
- Represents normalized business meaning -> `types/domain/*`
- Represents reusable UI-ready shape -> `types/ui/*`

## API Layer Direction

- Avoid hardcoding endpoint strings directly inside pages or components.
- Centralize endpoint constants and request functions under `lib/api/` and
  `lib/config/`.
- Separate raw API response types from transformed domain models.
- When migrating existing endpoint maps, consider grouping by domain such as
  `item`, `quest`, `community`, and `user` instead of keeping one very large
  flat object.

## Naming Guidance

- Use domain-first names for features: `features/item`, `features/quest`.
- Use singular filenames for model/type definitions when they represent one
  entity shape: `item.ts`, `quest.ts`.
- Use clear suffixes when helpful: `ItemResponse`, `ItemDetail`, `ItemCardView`.
- Avoid vague names like `common.ts`, `helper.ts`, or `data.ts` when a more
  specific name is possible.

## Core Workflow

1. Read the relevant Next.js documentation in `node_modules/next/dist/docs/`
   before using framework APIs that may have changed.
2. Inspect the existing code around the target area before editing.
3. Prefer small, focused changes over broad refactors.
4. Run validation after changes when possible.

## Commands

- Development: `npm run dev`
- Lint: `npm run lint`
- Auto-fix lint issues: `npm run lint:fix`
- Production build: `npm run build`

## Coding Rules

- Use TypeScript throughout; keep code compatible with `strict` mode.
- Prefer explicit types at module boundaries and for exported APIs.
- Use `@/` imports when they improve clarity over deep relative paths.
- Prefer `type` imports where applicable.
- Avoid introducing `any`; if unavoidable, keep the scope narrow and explain
  why in code comments.
- Keep components and functions small and purpose-specific.
- Preserve existing patterns unless there is a clear reason to change them.
- Prefer server components by default, and add client behavior only where the
  UI truly needs it.
- Keep fetch logic, data mapping, and rendering concerns separated when
  possible.

## Next.js Rules

- Verify App Router conventions against the installed Next.js version before
  adding routes, layouts, metadata, or data fetching logic.
- Prefer framework-native features over custom workarounds.
- Do not introduce deprecated APIs if the installed version provides a newer
  pattern.
- Treat server/client boundaries carefully and add `"use client"` only where
  necessary.

## UI and Styling Rules

- Use Tailwind utility classes first unless the local codebase establishes a
  different pattern.
- Keep styling consistent with existing spacing, typography, and layout
  choices.
- Do not introduce large visual rewrites unless explicitly requested.
- Prefer semantic HTML and accessible interactions by default.

## Lint Expectations

The current lint configuration includes these expectations:

- `console.warn` and `console.error` are allowed; other `console` usage should
  generally be avoided.
- Unused variables should either be removed or intentionally prefixed with `_`.
- `@typescript-eslint/consistent-type-imports` must pass.
- Raw `<img>` usage is discouraged; prefer Next.js image patterns unless there
  is a specific reason not to.

## Change Safety

- Do not edit unrelated files.
- Do not silently upgrade dependencies.
- Do not remove existing behavior without confirming the impact.
- If a framework behavior is unclear, check the installed docs first instead of
  assuming older Next.js behavior still applies.

## Delivery Checklist

Before finishing work, agents should:

1. Confirm the change matches the request.
2. Run `npm run lint` when feasible.
3. Note any assumptions, skipped checks, or follow-up work in the handoff.
