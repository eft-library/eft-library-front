# Frontend Migration Guidance

The frontend is being migrated due to a complete redesign of the PostgreSQL schema through normalization.
FastAPI has already been fully migrated to the new schema (V3).
This document defines the rules for migrating the Next.js frontend.

Please use `nvm use 24` because pnpm install at node 24.

Check website design in https://eftlibrary.com

Make sure to account for both light mode and dark mode in the implementation.

All UI work must account for both light mode and dark mode. Avoid theme-specific hardcoding unless explicitly required. Every visual state, including default, hover, focus, active, disabled, and empty states, must remain readable and visually polished in both themes.

---

## Package Manager Rules

Use `pnpm` as the package manager.

Do not use `npm` or `yarn`.

Commands:

- install: `pnpm install`
- add dependency: `pnpm add <package>`
- add dev dependency: `pnpm add -D <package>`

---

## Source of Truth

The following are the only valid sources of truth:

1. Backend API: current FastAPI (V3)
2. API contract: FastAPI Swagger / OpenAPI
3. Actual API response data

The legacy frontend is **reference-only** for UI behavior and layout.

Do NOT use legacy frontend code as a source of truth for:

- field names
- response structure
- nested JSON format
- API endpoints

---

## Migration Workspace

All migration work must be done inside:

Rules:

- Do NOT modify the legacy frontend as the primary migration approach
- Do NOT delete legacy code
- Keep legacy code for reference
- Replace legacy usage only after verification

---

## API Rules (V3 Only)

All API integrations must use V3 endpoints.

- Do NOT use V1 or V2 APIs
- Do NOT assume backward compatibility
- Do NOT reuse legacy API calls without verification

Before implementing any feature:

- check FastAPI Swagger (OpenAPI)
- verify endpoint path
- verify request/response schema
- confirm actual API response when necessary

If Swagger and actual response differ:

- follow the actual server response

---

## Frontend Refactor Principles

- Do NOT reuse legacy data assumptions
- Do NOT assume old table structures still exist
- Always verify API response before implementation
- Rebuild data mapping based on V3 response
- Prefer clean implementation over patching old logic

If reusing UI:

- reuse only presentation
- rebuild data binding

---

## Library Migration Rules

The following libraries must NOT be used in the migrated frontend:

- `react-photoswipe-gallery`
- `downshift`

Rules:

- remove these dependencies during migration
- reimplement required behavior using current stack (React + Next.js + local components)

When replacing behavior:

- preserve expected UX
- consider keyboard interaction and accessibility where applicable

Do not keep a legacy dependency unless explicitly required and justified.

---

## Component Structure Rules

Do NOT split components by device (mobile/desktop).

❌ Avoid patterns like:

- `wipe-card.tsx`
- `wipe-card-m.tsx`

✅ Instead:

- use a single component file
- implement responsive UI using Tailwind CSS
- keep logic and markup unified

Rules:

- do NOT create mobile-only or desktop-only components
- do NOT split components due to layout differences only

Exception:

- allowed ONLY if responsibility or behavior is fundamentally different

---

## Responsive UI Rules

- Use Tailwind CSS breakpoints (`sm`, `md`, `lg`, etc.)
- Handle layout differences via styles, not file separation
- Minimize conditional rendering unless necessary

---

## Affected Areas

Migration impacts:

- page routing
- layout structure
- API fetching logic
- TypeScript interfaces
- data mapping logic
- component props
- state management
- loading/error handling
- i18n bindings
- list/detail rendering

---

## Date Handling Rules

Do not use date libraries such as `dayjs`.

Use native JavaScript APIs instead:

- `Date`
- `Intl.DateTimeFormat`

For advanced use cases:

- use `Temporal API` (with polyfill if needed)

Avoid introducing external date/time dependencies.

---

## TypeScript Rules

- Do NOT infer types from legacy frontend
- Define types from FastAPI V3 response only
- Avoid `any`
- Avoid outdated optional assumptions
- Keep types explicit and strict

---

## Implementation Rules

Before implementing any page:

1. Identify V3 API endpoint
2. Check Swagger schema
3. Verify actual response
4. Define TypeScript types
5. Implement UI
6. Map data explicitly

Do NOT:

- implement based on guess
- copy legacy API usage blindly
- patch old transformation logic

---

## Completion Criteria

A migrated module is complete only when:

- it uses V3 API
- it matches actual backend response
- it does not rely on legacy assumptions
- TypeScript types match real data
- UI behavior is verified

---

## Migration Policy

- keep legacy code
- verify behavior
- replace gradually

Do NOT:

- delete old code first
- mix legacy schema with new code
- partially migrate without verification

---

## Summary

- V3 API only
- Swagger + actual response = source of truth
- legacy frontend = UI reference only
- no library reuse (`photoswipe`, `downshift`)
- no mobile/desktop component split
- use Tailwind for responsive UI
- implement clean, not patched logic
