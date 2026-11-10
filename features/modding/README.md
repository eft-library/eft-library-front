# Weapon modding

- Routes: `/modding` (weapon list) and `/modding/[id]` (source weapon item ID); navigation: Item → Weapon modding. Selection pushes browser history; direct detail URLs initialize the matching weapon. The shared modding layout keeps draft state across list/detail navigation, including browser back/forward.
- Contracts: `eft-library-history/velog/dev_docs/gun_preset/weapon_modding_openapi.json` and `weapon_modding_static_json.md`. Types follow the exported V3 OpenAPI and static page-merging contract.
- Airflow publishes files to the shared `public/static/modding/v3` directory, using the same runtime-serving model as trader. No frontend-side generation or copying step is needed. The running frontend must have the generated directory mounted at this path.
- The `beforeFiles` rewrite sends `/static/modding/v3/*` to the Node route handler. It reads files at request time, including new generations published after Next.js starts. Only known JSON paths inside the real domain directory are served. Index and error responses use `no-store`; UUID snapshot files use immutable caching.
- The manifest request bypasses browser/CDN caches with `no-store` and a timestamp query, matching trader. Use manifest URLs rather than constructing snapshot paths.
- Load the full weapon list and only the selected weapon snapshot. Keep that generation for the active workbench; do not silently replace a user's build during a background refresh. If a snapshot was cleaned up and returns 404, read a fresh manifest and retry once. If static data is missing, unreadable, malformed or incomplete after recovery, fall back to the documented V3 modding API. Valid empty results remain successful and do not cause extra fallback requests.
- Candidate lists are server-generated slot-filter results, not whole-build validation. Mount state uses parent paths; replacing a parent clears descendants. Recursive expansion guards against cycles and excessive depth.
- Presets display flat components and source completed stats separately. No automatic slot placement or final stat calculation is implemented. User build storage/sharing is a separate live API integration described below.
- Theme tokens and responsive Tailwind styles cover the unified layout. Copy supports Korean, English and Japanese.

## User builds (contract implementation; live verification pending)

- Contract: `user_weapon_builds_frontend_api.md` and `user_weapon_builds_openapi.json` in the same history documentation folder, including optional authentication, comments revision checks, error models and Retry-After updates dated 2026-11-10.
- Runtime endpoints: `/api/modding/v3/builds` and its documented V3 subroutes. No user interaction uses Airflow/static JSON. API requests use the existing configured API base URL, `private/no-store` semantics, and existing auth recovery. Writes are never automatically replayed after token recovery. React Query does not retry these queries automatically.
- Available in development. Production is **off by default**: set `NEXT_PUBLIC_MODDING_BUILDS_ENABLED=true` at build time only after the backend and initial user-build tables are ready. No `.env.local` settings were changed. Existing static weapon modding remains available with the feature off.
- UI: create/edit/delete/reload, automatic public sharing on save and copy, own list, public latest/BEST with week/month/all scoring and optional current-weapon filter, public preview, vote/unvote, paginated flat comments with edit/delete permissions and copy-to-customize. There is no private visibility toggle or manual publication/unpublication control in the frontend.
- Drafts use explicit stored nodes as canonical state. Preserve IDs, array order, attributes, repeated item instances and missing source metadata. Only request fields are sent on save, never `item` snapshots. Replacing a parent removes its subtree; previewing a public build never replaces a draft. Replacing a dirty draft asks for confirmation. Current edits remain in memory when switching internal tabs. Reload/navigation is not durable local storage.
- A complete draft contents section preserves visibility/removal of nodes whose source slots disappeared or are beyond the workbench's exploration depth. An unavailable current weapon snapshot does not prevent reviewing or saving an already loaded draft.
- Save and share persists the workspace and immediately publishes its returned version. Version conflicts preserve local input, fetch the latest workspace and offer explicit comparison/load-latest/keep-local choices; keeping local edits prepares a new explicit save against the reviewed server version. No automatic overwrites.
- Account/view/revision-specific private query keys, no persistent browser storage, abortable reads, cache cancellation/removal and editor reset on account change. Public lists contain no personalized fields. Successful mutations invalidate build lists, details and comments.
- Creation/copy/comment intents retain request IDs for manual retry with unchanged content; successful intents are retired so another deliberate identical operation gets a fresh ID. Comments use the selected public revision in GET and writes. Revision conflicts refresh details; new public revisions require review before further public mutations while preserving typed comments. Retry-After drives the comment cooldown; build-count limits do not invent a retry deadline.
- No HTML rendering of user input. Permission-dependent buttons follow server `is_mine`/`can_delete`, and self-voting is disabled. All builds remain labelled unvalidated (`structure_only`).

Offline checks:

```sh
source "$HOME/.nvm/nvm.sh"
nvm use 24
pnpm exec tsc --noEmit
pnpm dlx tsx@4.20.6 --test features/modding/builds/tree.test.ts features/modding/builds/api.test.ts
```

Offline tests use local typed fixtures and mocked fetch, not production writes. The earlier full build was blocked by the offline backend; after the production API was deployed on 2026-11-10, `pnpm build` passed in full (all 67 static pages). Browser visual/interaction QA and authenticated writes remain pending.

When the backend is available:

1. Verify the deployed OpenAPI and actual anonymous list/detail/comments response, optional-token rejection, and registered-account authentication. Confirm the initial migration is applied before enabling production.
2. Create an incomplete draft, edit it, reload it and compare complete node order/IDs/attributes. Test duplicate part instances and removed source items/slots, plus 200-node/payload limits and 100-build cap.
3. Save versus publish independently; confirm draft-only edits do not change the public snapshot. Republish and verify a new revision with new vote/comment counts, and test unpublishing/deleting.
4. Exercise vote/unvote/self-vote rejection and latest/BEST scoring periods. Write/edit/delete comments as author, build owner and administrator; verify permissions and Retry-After.
5. Copy the public tree to a fresh private ID, preserve attribution and missing source metadata, and ensure editing the copy does not change the original. Confirm dirty-draft replacement prompts and idempotent retries after ambiguous connection loss.
6. Use two tabs to provoke draft/comment version conflicts and republishing during comment reads/writes; confirm inputs survive and explicit review is required. Exercise logout/account switching, auth-provider 503 and storage 503 without false success or forced logout.
7. Complete full build and browser QA at mobile/desktop widths in light/dark themes, including keyboard navigation and confirmation-dialog focus restoration.

## Source-data API fallback

- Static remains first choice. Manifest/list failures fall back to `/api/modding/v3/weapons`. A selected weapon whose snapshot is unavailable falls back independently, even when the static list worked.
- API lists collect all pages with `page_size=100`; check totals, page metadata, duplicate rows and owner/slot context. Missing pages and backend errors are surfaced, never converted to successful empty data.
- Fallback initializes only the root item and its full preset reference list. The workbench lazily requests selected/mounted item details, the active `(owner item, slot)` candidate list and the selected preset detail. It does not recursively download all reachable parts or synthesize a full static snapshot.
- React Query keys include the item ID, owner/slot pair or preset ID. API source data has a five-minute cache and bounded lifetime. Source requests are read-only, anonymous V3 calls with `no-store`; at most four source API requests run concurrently. Queued and in-flight requests respect cancellation, and cancellation never starts fallback work.
- API loading/error states stay distinct from empty candidates/presets. A slot 404 refreshes its owning item definition. Canonical user-build nodes, including missing-source nodes, remain in the editor regardless of source read failures. Candidate summaries are sufficient to mount a part while its detail loads.
- Offline fallback tests: `pnpm dlx tsx@4.20.6 --test features/modding/api.test.ts features/modding/builds/tree.test.ts features/modding/builds/api.test.ts`. Verify the actual deployed V3 responses and browser flows when the server returns; no live fallback verification is claimed while it is offline.

## Live read-only verification — 2026-11-10

Run `pnpm dlx tsx@4.20.6 script/check-modding-live.ts` to force static 404s in the verification process and exercise the actual frontend clients against `https://back.eftlibrary.com`. The script permits only anonymous GET requests and never modifies static files or server data. An optional first argument selects another API base URL; the environment override exists only in that process.

Verified with 13 V3 GET requests: 172 weapons across all pages, M4A1 root and mounted-part detail, two owner/slot candidate queries including the receiver rear sight, 19 preset references and 13 default-preset component rows. Both latest and weapon-filtered weekly BEST public build listings returned valid successful empty pages. Anonymous nonexistent public detail/comments returned the documented 404; anonymous `/mine` returned `401 LOGIN_REQUIRED`.

Deployed business schemas and endpoint parameters/security match the supplied contracts. The deployed framework `ValidationError` schema omits two optional diagnostic fields (`input`, `ctx`) from the exported files; application behavior does not depend on them. Source and user-build CORS checks passed for both the production origin and `http://localhost:4000`, including JSON GET preflight. User-build responses use `Cache-Control: private, no-store`.

There are currently no public builds, so successful public detail/comments, revision conflicts and authenticated create/update/publish/vote/comment/copy/delete could not be verified against existing live data. No production records were created. The production user-build flag remains off by default; read-only verification does not claim completion of authenticated or browser QA.

## Readability and route QA — 2026-11-10

- Secondary text in the modding list, workbench and build interactions uses opaque theme foreground in light mode and white in dark mode. Candidate thumbnails remain compact; initial weapon cards use a full-width 160–176px image within a 208–224px image area instead of the old 80×56px thumbnail.
- Native Edge QA confirmed list search → M4A1 card → `/modding/5447a9cd4bdc2dbd208b4567`, browser back to `/modding`, forward to the detail, and detail refresh/direct initialization. A locally mounted receiver survived back/forward because the draft provider now lives in `app/modding/layout.tsx`. This state is still not durable across a full refresh without saving.
- Inspected list imagery and detail text in dark and light themes; restored the original dark theme. No user build was saved and no production data was changed. TypeScript, all 17 offline tests and the full production build (68 static pages) passed.

## Click interception fix — 2026-11-10

The shared side ads used positions calculated for a 1280px body, while modding uses a 1600px workbench. Their fixed 160×600px interactive containers could overlap the workbench, including a transparent/no-fill ad area over right-hand sort and equip controls. Modding now uses 1600px-aware rail positions and only shows rails from 2016px, leaving 32px between ads and the workbench plus 16px outer margins. Hidden rails have no hit area. Other routes retain their existing ad layout.

Native Edge verification: clicked the sort dropdown, selected weight ascending and observed ordered 0.11/0.117/0.12kg rows; clicked the right-hand equip button with the mouse and observed the slot/assembly update. Restored the previously selected magazine afterwards. The dropdown now says Name / Weight: low to high / Ergonomics: high to low instead of the ambiguous Part label. No server writes were made.

## Always-public save policy — 2026-11-10

At the user's request, Save and share now creates/updates a workspace and immediately calls the V3 publication endpoint. Copy also publishes its new workspace. The backend contract remains a two-request workflow; unsaved local edits are not published, and existing server records are not bulk-changed. Manual publish/unpublish controls were removed.

A successful persistence response updates the local ID/version before publication. If publication fails, the editor states that saving succeeded but sharing failed and enables Save and share even without new edits. A retry reads the current workspace, compares its content, then publishes that version; if it is already the current published revision, it does not publish again. Unexpected content/version changes require explicit conflict review. A failed save cannot publish anything, and failed writes are never replayed automatically by auth recovery. Successful operations invalidate discovery, BEST and personalized queries.

Publication regression tests: `pnpm dlx tsx@4.20.6 --test features/modding/builds/publication.test.ts`. These use mocked responses; no production builds are created or made public during testing.

## Attachment undo/redo — 2026-11-10

- Workbench Undo/Redo buttons and Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl+Y shortcuts operate on attachment changes. Removing or replacing a parent and all descendants is one reversible step; clearing the build is also one step. Node IDs, attributes, source item snapshots and array order are restored together. Up to 50 steps are kept in memory.
- Title fields use their native text undo. Modifiers are ignored during composition, key repeats, input/select/contenteditable focus, modal dialogs, API writes and non-editor views. A new attachment change clears the redo branch. No-op mounts and text changes do not add attachment history entries.
- Save/publication metadata sync retains attachment history; undo after a save only changes local edits and does not undo a server publication. Loading a different workspace, reloading saved content, starting another weapon, copying, deleting or changing accounts clears history. Internal list/detail browser navigation retains it through the shared provider.
- Regression tests in `builds/history.test.ts` cover subtree restoration, title/redo independence, reset/save sync, load boundaries, bounded history and shortcut guards. Native Edge checks verified mounting, Cmd+Z, Cmd+Shift+Z, the Undo button and native title undo in a separate unsaved test tab. No production data was written.
