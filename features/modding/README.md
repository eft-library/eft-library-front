# Weapon modding

Current workbench: the React Flow v3 implementation below supersedes the historical 1340px grid, side-region wrapping and fixed statistics-height notes. Contract: `Desktop/dev/modding-workbench-handoff.md` and `modding-workbench-flow.html` (2026-11-14).

- Routes: `/modding` (weapon list) and `/modding/[id]` (source weapon item ID); navigation: Item → Weapon modding. Selection pushes browser history; direct detail URLs initialize the matching weapon. The shared modding layout keeps draft state across list/detail navigation, including browser back/forward.
- Contracts: `eft-library-history/velog/dev_docs/gun_preset/weapon_modding_openapi.json` and `weapon_modding_static_json.md`. Types follow the exported V3 OpenAPI and static page-merging contract.
- Airflow publishes files to the shared `public/static/modding/v3` directory, using the same runtime-serving model as trader. No frontend-side generation or copying step is needed. The running frontend must have the generated directory mounted at this path.
- The `beforeFiles` rewrite sends `/static/modding/v3/*` to the Node route handler. It reads files at request time, including new generations published after Next.js starts. Only known JSON paths inside the real domain directory are served. Index and error responses use `no-store`; UUID snapshot files use immutable caching.
- The manifest request bypasses browser/CDN caches with `no-store` and a timestamp query, matching trader. Use manifest URLs rather than constructing snapshot paths.
- Load the full weapon list and only the selected weapon snapshot. Keep that generation for the active workbench; do not silently replace a user's build during a background refresh. If a snapshot was cleaned up and returns 404, read a fresh manifest and retry once. If static data is missing, unreadable, malformed or incomplete after recovery, fall back to the documented V3 modding API. Valid empty results remain successful and do not cause extra fallback requests.
- Candidate lists are server-generated slot-filter results, not whole-build validation. Mount state uses parent paths; replacing a parent clears descendants. Recursive expansion guards against cycles and excessive depth.
- Presets retain flat source components and completed stats. Complete backend-provided inferred reconstruction candidates can be imported after explicit selection/confirmation; the frontend does not infer attachment positions or stat formulas. The live calculation API provides current-build statistics separately from source preset values. User build storage/sharing is a separate live API integration described below.
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


## Game preset reconstruction import — 2026-11-11

- Contract: `preset_reconstruction.md` and updated `weapon_modding_openapi.json`. `composition_type: flat_source_list` still describes the original component list; optional `reconstruction` is the separate inferred attachment tree. Legacy payloads without this field remain readable and have no import control. Unknown algorithm versions are not imported.
- The game-preset panel supports a unique candidate, explicit radio selection between ambiguous candidates, and incomplete-search candidates without presenting them as unique. At the user’s request, inferred imports immediately replace current attachments without a confirmation dialog; Undo restores the previous configuration.
- Only `can_import=true` complete candidates in supported states can be imported. Partial previews, unplaced components and localized issue explanations remain visible for incomplete/unavailable results; no ammunition is discarded or assigned a synthetic slot.
- Before import, validate exact source-component/unit coverage, quantities, attributes, unique instance IDs, a single matching weapon root, valid connected parents, no cycles and one part per parent slot. Metadata comes from each source component. Backend tracking fields are not sent to user-build APIs.
- Import is one local attachment-history step; Undo restores the previous configuration. Keep a non-empty current title and existing description; an empty title is initialized from the preset name. Import does not write to the server or publish automatically. Save and share remains the explicit persistence action.
- Static uses the bundled reconstruction. API fallback loads preset detail and bounded/cached component-owner details for slot-label previews. No reconstruction is generated on the frontend.
- Verification: all 34 offline tests passed. The local static checker validated all 401 presets: 308 unique, 71 ambiguous, 22 incomplete, 379 importable presets with 492 complete candidates and no legacy records. Counts are verification results, never UI constants. Native Edge confirmed M4A1 import produces 13 nodes and 12 mounted parts, then Cmd+Z restores the previous one-node state. No production writes were made.

```sh
pnpm dlx tsx@4.20.6 --test features/modding/api.test.ts features/modding/builds/*.test.ts
pnpm dlx tsx@4.20.6 script/check-preset-reconstruction.ts
```

## Default preset preview and initialization — 2026-11-11

- Weapon cards and My builds prefer the completed `default_preset.image`, with the original item image as fallback. The editor shows the bare item after removing all parts. These images identify the weapon; they are not composited previews of local edits.
- A fresh weapon starts in its explicit default-reference preset. A supported unique inferred tree is applied immediately; ambiguous candidates require a choice, and incomplete trees remain previews. Saved workspaces, browser navigation and Remove all parts do not restart initialization. Import and removing all parts each remain undoable.
- Static summaries require the new nullable default-preset metadata. Missing/older static falls back to V3 API, and API weapon details derive the default from `link.is_default_reference`. No first-preset heuristic is used for initialization.
- Verification: 38 offline tests, TypeScript and production build passed. Static validation checked 172 weapons, 164 default references and all 401 reconstructions. The read-only live checker forced static 404s and loaded weapons, M4A1 default preset (13 nodes), slots and public builds from production API with no writes. New visual behavior was not browser-verified in this session because browser access was unavailable.


## Workbench stage and live statistics — 2026-11-13

- Implements the supplied `weapon-modding-spec.md` and design HTML using a unified responsive component. The desktop stage is 1340 × 600px, with 92px part tiles, a central default-preset reference image, slot-kind regions, and extra rows for overflow. Narrow screens scroll the same stage horizontally; the candidate dialog adapts its columns to the viewport.
- Known slot kinds normalize numeric suffixes with or without underscores. Unknown and mount slots inherit the parent's region. Occupancy checks prevent overlap with other slots and the central weapon image. Only slots reachable through currently mounted parts are shown; the existing recursion guard and complete draft contents remain intact.
- Clicking a tile toggles one candidate dialog immediately below it. A body portal avoids clipping by the horizontally scrolling stage. The dialog follows scrolling/resizing, supports Escape/close with focus restoration, and provides a None choice, equipped marking, multilingual name search and default/ergonomics/recoil/weight sorting. Equipping a different candidate closes the dialog. Clicking the equipped candidate again, the Remove part header button, or None removes that subtree and keeps the dialog, search and sorting open for the next attachment. Hover/focus previews the same removal action for an equipped candidate. Parent replacement/removal uses the existing subtree rules and undo history.
- No short-name collection or API field was added. Existing localized full names use two-line truncation; titles and the candidate footer expose the full name. Part chips show source ergonomics and recoil modifier × 100, with signed values and theme-aware favorable/unfavorable colors. Missing source values are never assumed to be zero.
- Source list, slots, candidates and preset reconstruction remain static-first, with the existing V3 API fallback. The additive nullable `ballistics` field is typed from the updated OpenAPI and remains optional for older generations.
- Current and hover/keyboard-focus preview statistics call anonymous `POST /api/modding/v3/calculate` with canonical instance nodes and null ammo selection (backend default ammo). Requests send no item snapshots, title or description and never save/publish the build. Preview removes descendants exactly as an actual parent replacement would.
- Requests debounce for 150ms. React Query consumes AbortSignal and keys results by static generation and complete request; results/errors from the previous hovered part are hidden during debounce. Retry is explicit, automatic retries are off, stale results are revalidated and unused queries expire after one minute. Responses' source revisions are opaque and are never compared chronologically.
- Six statistics display exact API values, preserving actual zero and showing null as unavailable with localized reasons. Comparison bars are visual scales, not clamping of displayed values; preview changes use signed deltas and favorable/unfavorable hatching. Fire modes, caliber and RPM are displayed separately. Compatibility is shown independently of arithmetic results, with a warning for invalid/unknown configurations and the backend's limited scope explained.
- The old build-tab sidebar, slot cards and candidate table are replaced; complete-preset browsing/import, save/share, undo/redo and canonical build state remain in their existing implementations. The central image is a reference image, not a composited preview of attachments.

Verification: TypeScript, targeted ESLint and 45 offline regression tests passed. Live calculation returned HTTP 200. Native Edge rendered the M4 default 13-node build with 2.849kg, ergonomics 55 and recoil 78/224; a later 25-node configuration also displayed updated calculated values. No production build was saved or published. The observed theme was dark; mobile and light-theme interaction QA remain to be completed. A full production build was not run in this change.

Data limitation: the supplied M4 snapshot has the `ballistics` field but null source values. The live calculation correspondingly returns null accuracy with `MISSING_SOURCE_VALUE`, and null muzzle velocity with the documented unverified-formula/missing-source reasons. The frontend preserves these nulls. Airflow/source ingestion must populate missing values to make supported metrics available; a verified velocity formula is a separate backend requirement.


## Delete from build lists — 2026-11-13

- My builds uses compact selectable rows and a Delete selected action, with Select this page and a selected count. Public build cards retain individual delete buttons only for IDs present in the authenticated owner's list. Public list responses remain anonymous; paginated private ownership lookup is account-scoped and ephemeral, and does not infer ownership from a nickname or published revision.
- The existing confirmation now accepts an explicit target ID/title/workspace version. It explains that the workspace, publication, votes and comments are removed together, and warns about unsaved edits when the target is the open workspace. Card navigation and deletion are separate sibling buttons.
- DELETE uses the reviewed workspace version, without automatic replay or refreshing a version to silently retry. Existing 409 handling refreshes the lists and preserves edits. Successful deletion invalidates build queries; deleting the last entry on a later page moves back one page. An unrelated open workspace is preserved.
- Ownership pagination/error handling and existing build API/undo/storage behavior are covered by offline tests. No live build was deleted during implementation.


### Selected deletion in My builds

- Selection is scoped to account/view/page and submitted only for visible rows. A single confirmation lists all selected titles and explains removal of workspace/publication/votes/comments plus any open unsaved edits. Public-list per-card deletion remains available.
- Uses the existing versioned DELETE sequentially, with one final query invalidation. Per-record 404/409 failures do not prevent deleting other selections; authentication, service, permission and network failures stop remaining requests. Requests are never automatically retried or replayed with a newer version.
- Successes are removed; failures/unattempted rows remain selected if still present. The result reports deleted/not-deleted counts, and a fully emptied later page moves back one page. Only a successfully deleted open workspace is cleared; unrelated edits and a failed current target are preserved.
- Batch sequencing, expected-version preservation, partial conflicts and stopping after authentication/service/network failures are covered by mocked regression tests. No production records were deleted during verification.


## Build-list search and compact public filters — 2026-11-13

- My builds sends submitted title searches and optional selected-weapon filters to `/api/modding/v3/builds/mine?word=...&weapon_item_id=...&page=...&page_size=20`. The backend supplies filtered totals and pages. Search/Enter or weapon changes reset to page one; clearing restores the list. Public and private search/page/filter states stay separate. The former local filtering helper was removed.
- Selection/deletion is limited to visible search results; changing the submitted search clears selection. Existing batch version checks and partial-failure handling remain in place.
- Public title search, sort, vote period and selected-weapon filter form one desktop row. Narrow layouts wrap naturally. The formerly full-width period explanation is an accessible inline help icon/description. Inputs and selects retain theme-aware focus and foreground styles.


### Server-side My builds search

Requires deployment of the updated `/mine` backend contract (optional word and weapon_item_id). Private query keys include account, submitted search, selected weapon, page and page size; requests are authenticated/no-store and abortable. Only the visible page is loaded in My builds. Public ownership detection separately retains its unfiltered private pagination. Batch selection is scoped to search and weapon filters and continues using reviewed versions. Contract tests verify encoding of literal %, _, &, multilingual text, omitted blank filters and server totals/pages.


## Stable statistics layout

Statistics headers, unavailable-reason rows, metadata rows and compatibility summaries retain their space while calculations are pending or fail. Expanded compatibility details scroll within a fixed-height body. Candidate preview footers also reserve name/delta space. Programmatic focus restoration uses preventScroll, and the statistics panel is excluded from scroll anchoring. Calculations still hide stale results while pending; no previous-part statistics are presented as a new result.


## Statistics simplification and stage width

The workbench statistics panel displays weight/ergonomics in the first row and vertical/horizontal recoil together in the second, including narrow screens. Accuracy and muzzle velocity are omitted from this panel; the API contract and source preset data remain unchanged. The stage fills available width with 13 proportional column pitches (minimum 1340px), so the background and slot distribution no longer stop at a fixed-width strip on larger screens. Narrow screens retain horizontal scrolling; the central reference image spans the same three columns.


## Balanced stage and URL-selected view

- The weapon stays in center columns 5–7. Left/right categories wrap into multiple rows on their own side. Surviving slot paths retain their allocated cells during edits; removed children leave gaps until new slots use them. New child slots prefer a nearby free cell in their region. The mounted workbench retains its maximum height during removals to avoid scrolling jumps. A newly mounted stage starts a fresh layout.
- Workbench and source-preset views use `?tab=build` / `?tab=presets`. Native history integrates with Next useSearchParams, preserving view choice on refresh and back/forward without a full page navigation. Explicit preset-view URLs are not overwritten by automatic default initialization. Unspecified ambiguous/incomplete defaults still open preset selection. This only preserves the view; unsaved attachments are not persisted across refresh.


## React Flow workbench v3 — 2026-11-14

- Uses the installed `@xyflow/react` renderer with custom tile/weapon nodes and orthogonal route edges; no additional dependency or layout engine. The fixed-height canvas supports wheel zoom, drag pan, initial fit, explicit Fit all/100%, percentage display, standard controls and a connection toggle. Attribution remains visible. Edits preserve viewport position/zoom and surviving slot coordinates.
- Source-driven coordinates use 96×104px tiles, a 296×104px weapon, and 110×118px pitch. The weapon occupies axis columns 0–2. Front axis: receiver → barrel → handguard → gas block → muzzle chain, filled slots first. Rear axis follows the stock chain. Other slots use DFS parent anchoring and unlimited upper/lower rows; no pixel or coordinate metadata is added to the DB.
- Mount orientation comes from the mounted item's child-slot definitions, or a vote over loaded candidates' scope/rail slot definitions. Missing API-fallback definitions conservatively use the lower region. Optic-mounted tactical/flashlight accessories use the document's recommended upper-region exception. Existing cells are reserved before new cells are found; removed branches do not compact surviving nodes.
- Parent-child edges have orthogonal routes, attachment endpoints and dashed lines for empty slots. Hover/focus/open-slot ancestry and immediate children are emphasized. Tiles include localized full names, signed E/R% chips, filled/total child counts, parent context for ambiguous empty slot names and a 2.4-second indication for newly added slots. Nodes remain keyboard accessible; edges are decorative.
- Candidate popups remain body portals at unscaled screen-pixel size. Their anchor is recalculated on flow movement, page scroll and resize. Outside clicks—including the canvas background—dismiss them, while slot clicks retain toggle/switch semantics. Vertical scrollbar space and flexible grid tracks prevent horizontal overflow. Equipping closes; removal/re-clicking the mounted candidate keeps search, sort and popup open. Existing live calculation previews are retained.
- Compact non-sticky statistics now precede the canvas: weight/ergonomics, vertical/horizontal recoil, then fire modes/RPM/caliber. Null reasons appear only for unavailable values. Light fills use orange gradients, dark fills use neutral white gradients and an orange value boundary; comparison hatching and signed deltas remain.
- Save build beside the navigation opens a native dialog containing the existing editor panel. It focuses the title on open, restores trigger focus on close, and supports X/Escape/backdrop dismissal except during writes or confirmation. The former always-visible editor panel is removed. Storage/publication, version conflicts, complete canonical node contents, undo/redo, public/my build lists and source-preset importing remain in their existing implementations.
- Runtime API/static contracts are unchanged. No DB migration, Airflow change or new stat formula is required. User-build writes still occur only on explicit save/delete actions.

Verification: TypeScript and targeted ESLint passed; all 56 modding tests passed. `script/check-workbench-flow.ts` validated 45 actual source configurations (M4A1, SCAR-H and the supplied 25-node SCAR reference) without missing parts, overlapping rectangles, or non-axis nodes on row zero. The SCAR reference calculation returned HTTP 200, 4.93kg/35.2/102/257 and valid stored constraints. Native Edge verified light/dark rendering, candidate search/equip/undo with retained zoom, and save-dialog title focus/Escape/focus restoration. Local attachment test changes were undone; no build was saved or published. Mobile touch/pinch and a full production build have not been verified in this change.

```sh
pnpm dlx tsx@4.20.6 --test features/modding/*.test.ts features/modding/builds/*.test.ts
pnpm dlx tsx@4.20.6 script/check-workbench-flow.ts
# Optional third argument: {"base":"weapon-id","mounted":{"root/slot-id":"item-id"}}
# pnpm dlx tsx@4.20.6 script/check-workbench-flow.ts /path/to/reference-selection.json
```


### Region colors and simplified controls

At user request, manual fit/100% controls and the zoom percentage are removed. Initial automatic fit and the standard React Flow zoom-in/out and fit-view controls remain. Connections now use muted blue-gray (light #638398 / dark #8babbc), a 2px non-scaling stroke and 3px orange emphasis; empty-slot links remain dashed. The reference's Region display toggle is implemented and initially enabled: axis/rear axis orange, upper sky, rail emerald, rear violet, lower amber, all with 10% tile overlays. A textual color legend accompanies the toggle; turning it off returns neutral tiles without changing geometry.
