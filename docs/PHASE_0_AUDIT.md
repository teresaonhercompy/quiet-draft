# Phase 0 Audit and Safeguard Record

**Audit date:** 2026-07-19  
**Audited baseline:** `d150326847f29a038b32ccdd2144dac63caad669`  
**Recovery tag:** `quiet-draft-v1-baseline-2026-07-19`

## 1. Repository and architecture inventory

Quiet Draft is a static, dependency-free Progressive Web App:

| Area | Files | Responsibility |
| --- | --- | --- |
| Page structure | `index.html` | Editor, controls, Atmosphere panel, PWA metadata |
| Presentation | `styles.css` | Responsive iPad layout, light/dark themes, Dark Glass, focus mode |
| Application logic | `app.js` | Draft saving, counts, export/copy, backgrounds, sounds, preferences |
| Installation | `manifest.webmanifest`, `icon.svg` | Home Screen identity and standalone display |
| Offline behavior | `service-worker.js` | Versioned app-shell cache and same-origin runtime caching |
| Public backgrounds | `backgrounds/` | Four approved fallback images plus generated manifest |
| Deployment | `.github/workflows/pages.yml`, `.nojekyll` | Fresh checkout, background-manifest generation, GitHub Pages upload |
| User guidance | `README.md`, `IPAD_SETUP.md` | Mac hosting, iPad installation, private asset import, backups |
| Project governance | `docs/` | PRD, status, decisions, and this audit |

There is no framework, build system, package manager, server, external API, account, analytics, or cloud-sync code.

### Separate local Wiki

The Dreamspeak Wiki remains outside this repository in `/Users/Dumpster Rhapsody/Desktop/Dreamspeak_Codex`. Its local implementation uses Python/Streamlit, a DOCX ingestion path, and a SQLite FTS database. The manuscript, extracted text, and database are not descendants of the `quiet-draft` Git root and are not inputs to its Pages workflow.

## 2. Browser-storage contract

These identifiers are production data and must not be renamed, removed, or cleared without an approved migration.

### localStorage

| Key | Value | Purpose |
| --- | --- | --- |
| `quiet-draft.current.v1` | JSON object: `{ title, body, updatedAt }` | The single current Version 1 draft and last-save timestamp |
| `quiet-draft.theme.v1` | `"light"` or `"dark"` | Selected interface theme |
| `quiet-draft.atmosphere.v1` | JSON object described below | Background, editor appearance/strength, and sound preferences |
| `quiet-draft.folder-backgrounds.v1` | JSON array of `{ url, name }` | Cached list of host-discovered background files; no image binary data |

Current `quiet-draft.atmosphere.v1` fields:

| Field | Current meaning |
| --- | --- |
| `background` | Built-in ID, `folder:<absolute-url>`, or `custom-background:<id>` |
| `editorAppearance` | `dark-glass` or `light-paper` |
| `editorOpacity` | Panel-strength number, clamped from 25 to 90 |
| `soundEnabled` | Boolean; defaults to `false` |
| `soundMuted` | Boolean |
| `soundVolume` | Number from 0 to 100 |
| `soundStyle` | Built-in ID or `custom:<id>` |

### IndexedDB

| Database | Version | Object store | Key | Record shape |
| --- | ---: | --- | --- | --- |
| `quiet-draft-assets` | 2 | `sounds` | `id` | `{ id, name, type, blob, addedAt }` |
| `quiet-draft-assets` | 2 | `backgrounds` | `id` | `{ id, name, type, blob, addedAt }` |

The Blob fields contain private copies imported through the device file picker. The app does not transmit them.

### Cache Storage

The current cache is `quiet-draft-20260718-5`. Installation caches the app shell. Successful same-origin GET responses are cached at runtime, including a background after it is requested. Draft and IndexedDB values are not HTTP responses and are not placed in the service-worker cache.

### Data not persisted

Focus mode, whether the Atmosphere panel is open, generated Web Audio buffers, and temporary object URLs are session-only. Exported text is handed to the browser as a download; copied text is handed to the clipboard.

### Origin warning

All browser storage is scoped to the exact origin. `https://teresaonhercompy.github.io` and a future Cloudflare/custom domain are different storage locations. A hosting migration must never be described as data loss until the old origin has been checked, and it must begin with a successful draft export and local-asset backup.

## 3. Privacy and deployment audit

### Confirmed public/deployable

- Static app source and documentation.
- The four approved public fallback images listed in Decision DCC-006.
- The filenames and display labels contained in the public background manifest.

### Confirmed excluded

- Dreamspeak manuscript DOCX.
- Extracted manuscript text and SQLite Wiki index.
- Dreamspeak Wiki Python source and local environment.
- Personal sound files, including local `.wav` files.
- Locally imported backgrounds and sounds held in IndexedDB.
- Draft title/body held in localStorage.

Git ignores `.wav`, `.caf`, `.aif`, `.aiff`, `.mp3`, `.m4a`, `.aac`, and `.ogg` files, plus macOS `.DS_Store` metadata. No audio, DOCX, database, or manuscript-derived text file is tracked in any reachable branch/tag history.

The Pages workflow runs on GitHub from a fresh repository checkout and uploads that tracked tree. Therefore untracked files on the Mac cannot enter a deployment artifact.

A local unreachable setup commit containing `stick_hit_6.wav` was found during the object audit. It has no branch or tag reference. GitHub's API returned `404 Not Found` for its commit identifier, confirming the remote never received it. The published baseline tag does not reference or transfer the object.

No tracked private-key, common API-token, password-assignment, manuscript-title, Wiki-database, or sampled manuscript-marker pattern was found in the repository audit.

## 4. Baseline validation results

Validation used a new localhost origin so no existing production draft or asset library was touched.

| Check | Result | Evidence/notes |
| --- | --- | --- |
| App shell loads | Pass | Editor and all Version 1 controls rendered |
| Typing and counts | Pass | 11 words / 70 characters for the isolated test text |
| Autosave | Pass | Save status updated after the 650 ms delay |
| Reload recovery | Pass | Test title/body and counts returned after reload |
| Manual save | Pass | Save control reported local success |
| Export | Pass with manual follow-up | Export action reported `Text file exported`; opening the downloaded file is in the iPad checklist |
| Focus mode | Pass | Entered and exited; body focus-mode state changed correctly |
| Dark Glass | Pass | `dark-glass` remained applied across reload |
| Background persistence | Pass | Built-in and folder-discovered selections applied and persisted |
| Dynamic folder discovery | Pass | All four manifest images appeared with `folder:` values |
| Sound preferences | Pass | Opt-in enabled state and selected Mechanical style persisted across reload |
| Custom sound playback | Manual iPad check | No personal file was imported into the disposable test origin |
| Offline launch | Pass | Server was stopped; cached app, draft, settings, and chosen background reloaded |
| Live deployment | Pass | GitHub Pages returned `200`, enforced HTTPS, and served service worker `20260718-5` |
| Private-content exposure | Pass | Tracked/history/API checks described above |

Browser-harness network diagnostics belonging to the host application were excluded from Quiet Draft results. No Quiet Draft application error was observed during the tested flows.

## 5. Recovery procedure

The baseline tag restores app source; it does not contain or restore browser drafts or locally imported assets.

1. Export any accessible draft from the current site before changing deployments.
2. Keep the originals of personal backgrounds and audio outside the repository.
3. Create a recovery branch from `quiet-draft-v1-baseline-2026-07-19`.
4. Deploy the recovery branch only after reviewing the diff and confirming that its service-worker cache version/update path is appropriate.
5. Open the restored site at the original GitHub Pages address to regain access to storage belonging to that origin.

Example non-destructive recovery branch:

```bash
git fetch --tags origin
git switch -c recovery/quiet-draft-v1 quiet-draft-v1-baseline-2026-07-19
```

Never force-reset a working branch as the first recovery step.

## 6. Phase 0 acceptance state

- Existing Quiet Draft still works: **pass on isolated desktop baseline and user-confirmed physical iPad test**.
- Existing drafts remain accessible: **pass; storage contract preserved, isolated reload passed, and iPad behavior accepted by the user**.
- Source control can restore the app: **pass; remote recovery tag published**.
- Storage keys are documented: **pass**.
- Baseline offline test succeeds: **pass on isolated desktop baseline and user-confirmed iPad Airplane Mode test**.

Phase 0 was accepted by the user on 2026-07-19. Phase 1 must not begin until the user explicitly authorizes it.
