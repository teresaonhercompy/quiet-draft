# Dreamspeak Command Center — Project Status

**Updated:** 2026-07-19

**Current phase:** Phase 6 — Canon Search Integration Study and Prototype

**Phase state:** Strategy B approved; read-only local canon-search prototype in implementation and test

**Current production version:** Dreamspeak Command Center Phase 5 / service-worker cache `20260719-8`

**Phase 6 candidate:** service-worker cache `20260719-9`

**Production:** <https://teresaonhercompy.github.io/quiet-draft/>

**Repository:** <https://github.com/teresaonhercompy/quiet-draft>

**Recovery tag:** `quiet-draft-v1-baseline-2026-07-19`

## Completed work

### Phase 0 — Audit and safeguard

- Audited the architecture, deployment, browser storage, and private/public asset boundary.
- Confirmed that manuscripts, Wiki data, character art, and personal audio remain outside the public repository.
- Published the recovery tag and received physical-iPad acceptance, including Airplane Mode.

### Phase 1 — Dark Command-Center shell

- Added the responsive dark Command Center while preserving the complete Quiet Draft storage and behavior contract.
- Merged pull request #3, deployed cache `20260719-1`, and received physical-iPad acceptance.

### Phase 2 — Character, encouragement, and image modules

- Added data-driven facts, authored Mabel messages, local private-library import, and the image gallery.
- Added private gallery-image import and reused the four approved public scenes as the bundled offline gallery.
- Merged pull request #4 and deployed cache `20260719-2`.
- Received physical-iPad acceptance for the complete test sequence, including private imports, persistence, and Airplane Mode.

### Phase 3 — Discography player

- Replaced the music placeholder with a local album-and-track player.
- Added explicit track import with user-entered artist/album metadata and filename-derived track titles.
- Added optional local album-art import.
- Added album/track selection, play/pause, previous/next, seek, volume, shuffle, repeat-all, and repeat-one controls.
- Added track and album removal controls with confirmation.
- Added graceful empty-library, unsupported-file, missing-track, and storage-quota handling.
- Added remembered album, track, approximate position, volume, shuffle, and repeat state without autoplay.
- Added `music-tracks` and `music-artwork` stores to the existing `quiet-draft-assets` database and upgraded it from version 3 to version 4 without renaming existing stores.
- Added the versioned `dreamspeak.music-player.v1` preference key without changing any production Quiet Draft or Phase 2 key.
- Added an empty public `data/albums.json` metadata shell and bumped the service-worker cache to `20260719-3`.
- Confirmed that audio blobs are never placed in the app-shell/service-worker cache and no audio file is tracked by Git.
- Deployed the Phase 3 shell and two iPad landscape scrolling fixes through cache `20260719-5`.
- Added local ID3v2 MP3 parsing for title, artist, album, track number, and embedded artwork.
- Added foreground-only playback so closing or backgrounding the app pauses audio while preserving position.
- Received physical-iPad acceptance for music import, embedded MP3 metadata/artwork, playback, offline use, foreground pausing, and the complete supporting-module regression checks.

### Phase 4 — Writing metrics and highlights

- Replaced the placeholder highlights with editable current project and scene/chapter context.
- Added current draft, session words, today’s net words, last autosave, last export, and manual manuscript total.
- Added the additive local-only `dreamspeak.writing-metrics.v1` record without changing existing draft or IndexedDB storage.
- Added local-calendar rollover, net word-change accounting, and New Draft baseline protection.
- Documented single-device, current-editor, and browser-storage limitations.
- Merged pull request #9, deployed cache `20260719-7`, and received complete physical-iPad acceptance.

### Phase 5 — Tool Center

- Replaced disabled placeholders with a seven-tool, data-driven registry.
- Kept Write as the launch default and added clear active-tool state.
- Routed Images and Music to their existing private local modules.
- Added device-local configurable launchers for Wiki, Motifs, Timeline, and Notebook.
- Added an editable prepared Notebook question with explicit clipboard copy.
- Forced a local draft save before every tool switch and external launch.
- Limited external launchers to validated `http` and `https` addresses opened with new-tab and opener protections.
- Added the additive `dreamspeak.tool-center.v1` record without changing any draft, metric, atmosphere, content, gallery, or music storage.
- Merged pull request #10, deployed cache `20260719-8`, and received complete physical-iPad acceptance.

### Phase 6 — Canon search integration study

- Compared the external Streamlit Wiki, a device-local browser index, and a private authenticated backend.
- Audited the existing Wiki schema without reading or publishing manuscript prose.
- Confirmed 4,644 chronologically numbered chunks, retained track/chapter titles, SQLite FTS5 search, notes, context, and motif-report behavior.
- Recommended an explicit-import, device-local browser index that keeps generated canon data out of Git, hosting, fetches, and the service-worker cache.
- Defined a read-only first prototype boundary while keeping the Mac Streamlit Wiki authoritative for notes and motif reports.
- Documented current official Streamlit, browser-storage, Cloudflare Access, Workers, and D1 constraints in `docs/PHASE_6_ARCHITECTURE_STUDY.md`.
- Recorded the user's explicit approval of Strategy B and the read-only prototype scope.
- Added a generic SQLite-to-canon-package Mac exporter and validated it against synthetic data.
- Added strict package validation, separate local canon storage, atomic replacement, local removal, word and quoted-phrase search, chronological results, and neighboring context.
- Preserved the authoritative Mac Wiki launcher for deferred notes and motif-report behavior.
- Kept generated canon packages out of Git, fetches, and the service-worker cache; only synthetic search data appears in tests.
- Generated and validated a private 4,644-passage package outside the public repository for physical-iPad acceptance.

## In-progress work

- Publish the locally validated Strategy B candidate and provide the physical-iPad acceptance sequence.

## Known observations

- The browser test surface could load and inspect local WAV metadata but could not output audio. Audible playback and playback-through-focus-mode require physical-iPad acceptance.
- Tagged MP3 titles, artist, album, track number, and embedded art are read locally. Other formats use the import-field and filename fallbacks.
- Tagged MP3 track numbers determine album order; unnumbered tracks retain import order.
- Browser storage capacity and eviction behavior depend on available iPad storage and Safari. Original music and artwork must remain in Files or on the Mac.
- Reimporting a file with the same filename into the same artist/album is skipped as a duplicate.
- The four included backgrounds remain cosmetically duplicated in the Atmosphere menu, unchanged from prior phases.

## Next approved task

Complete local validation of the approved Strategy B prototype, publish the candidate, and hand off a private iPad import/search test sequence.

## Last tested production baseline

- **Production baseline:** service-worker cache `20260719-8`
- **Syntax/data validation:** passed for JavaScript and JSON
- **Privacy:** no tracked audio; no audio in the service-worker app shell; test fixture hook removed before commit
- **Empty library:** silent, stable, and all unavailable transport controls disabled
- **Local library:** two-track private fixture loaded from IndexedDB with album and track selection
- **Player state:** next track, shuffle, repeat-one, and 35% volume persisted across reload
- **Autoplay:** restored track remained paused after every reload
- **MP3 metadata:** synthetic ID3v2.3 title, artist, album, track 7, and embedded PNG artwork parsed correctly in the browser
- **Background playback:** visibility and page-hide paths now pause before saving playback position
- **Editor regression:** test title/body autosaved and restored exactly with the player loaded
- **Focus mode:** player code does not pause on focus entry; audible continuation requires iPad verification
- **iPad landscape:** 1180×820, three columns, no horizontal overflow
- **iPad portrait:** 820×1180, editor first, music controls visible, no horizontal overflow
- **Offline relaunch:** draft, selected local track, local track count, gallery, and Phase 3 shell restored with the server stopped
- **Console:** no app-specific warnings or errors
- **Phase 4 metrics:** +6 words updated session/today; deleting three showed a net −3 session change; restoring them returned the session to zero
- **Metric persistence:** project, scene, manual total, today’s words, autosave, and export timestamps survived reload; session reset to zero
- **Local date:** date keys use local year/month/day and are checked whenever the app loads, returns to the foreground, or records typing
- **Phase 4 layouts:** 1180×820 has no page or Highlights overflow; 820×1180 keeps the editor first and makes Highlights horizontally scrollable
- **Phase 4 offline:** draft and every persisted highlight restored with the local server stopped
- **Phase 5 registry:** seven tools rendered; Write active by default after every reload
- **Draft preservation:** the exact test draft was saved before switching and survived launcher navigation, reload, and offline relaunch
- **Launcher configuration:** Wiki address changed to Ready, opened through a protected external-link action, and persisted across reload
- **Prepared question:** edited text copied exactly to the clipboard and persisted across offline relaunch
- **Internal tools:** Images remained aligned at the top of the landscape media rail; Music scrolled that rail to its complete card while preserving the active state
- **Phase 5 landscape:** 1180×820, no horizontal/page overflow; all seven tabs fit; expanded Notebook panel leaves a 316px editor and Focus Mode restores 820px
- **Phase 5 portrait:** 820×1180, no horizontal overflow; editor remains ahead of supporting modules and normal page scrolling reaches them
- **Phase 5 offline:** seven tools, exact draft, and prepared question restored with the local server stopped; no app warnings or errors
- **Phase 6 package contract:** schema, count, unique identifiers, chronology, word search, quoted-phrase search, and rejection paths passed synthetic automated tests
- **Phase 6 exporter:** synthetic SQLite export preserved titles and emitted passages in numeric manuscript order
- **Phase 6 private package:** the local 4,644-passage export validated successfully without entering the repository
- **Phase 6 empty state:** import is available while search and removal remain disabled until an archive exists
- **Phase 6 layouts:** 1180×820 and 820×1180 have no horizontal overflow; the Wiki workspace scrolls correctly
- **Phase 6 Focus Mode:** entering Focus from Wiki safely selects Write and presents the full editor
- **Phase 6 persistence:** Write remains the launch default and the optional Mac Wiki address survives reload
- **Phase 6 offline:** the Phase 6 shell and all seven tool tabs restored with the preview server stopped and no app warnings or errors
- **Phase 6 cache boundary:** canon packages are absent from the app shell and explicitly excluded from runtime caching
- **Current production `main`:** `e90b012`; Phase 5
- **Phase 6 study branch:** `feature/phase-6-canon-search-study`

## Phase 2 iPad acceptance

- [x] Existing draft remained intact.
- [x] Private fact/message library imported from Files and persisted.
- [x] Fact and Mabel rotation worked.
- [x] Bundled and private gallery images worked and persisted.
- [x] Portrait, focus mode, export, backgrounds, and typing sounds remained correct.
- [x] Airplane Mode launched with the draft and imported Phase 2 content intact.

**Acceptance recorded:** 2026-07-19. The user reported that every Phase 2 test passed and Phase 2 worked perfectly.

## Phase 3 iPad acceptance checklist

- [x] Existing draft and all Phase 2 private imports remain intact after the update.
- [x] Tracks import from Files into the chosen artist and album.
- [x] Album artwork imports and survives relaunch.
- [x] Play/pause produces audible playback only after tapping Play.
- [x] Previous/next and album/track selectors work.
- [x] Seek and volume controls work.
- [x] Shuffle, repeat-all, and repeat-one work.
- [x] Selected track and approximate position survive relaunch without autoplay.
- [x] Writing and focus mode do not unexpectedly stop playback.
- [x] Remove Track and Remove Album affect only the imported browser copies.
- [x] Airplane Mode launches with imported music and artwork available.

**Acceptance recorded:** 2026-07-19. The user reported that Phase 3, including the MP3 metadata/artwork and playback-pausing refinements, worked perfectly.

## Phase 4 iPad acceptance checklist

- [x] Existing draft and all Phase 2/3 local imports remain intact.
- [x] Project, scene/chapter, and manual manuscript total can be edited and persist.
- [x] Draft highlight follows the Quiet Draft title.
- [x] Session words update with net additions/removals and reset after relaunch.
- [x] Today’s words update with net additions/removals and persist after relaunch.
- [x] Last autosave changes after autosave or **Save Locally**.
- [x] Last export changes after **Export .txt**.
- [x] Landscape Highlights remain quiet and every side module still scrolls.
- [x] Portrait keeps the editor first and allows horizontal Highlights scrolling.
- [x] Focus Mode, music, backgrounds, sounds, and export remain functional.
- [x] Airplane Mode restores the draft and persisted Highlights.

**Acceptance recorded:** 2026-07-19. The user reported that Phase 4 worked perfectly across the complete iPad test sequence.

## Phase 5 iPad acceptance checklist

- [x] Existing draft, metrics, atmosphere, private images/content, and music remain intact.
- [x] Write is active whenever the app launches or reloads.
- [x] Switching to every tool preserves and locally saves the current draft.
- [x] Images and Music move to their existing modules.
- [x] Wiki, Motifs, Timeline, and Notebook each show the correct launcher.
- [x] A valid `http` or `https` address changes the launcher to **Ready** and persists.
- [x] Open actions launch separately without replacing or losing the draft on iPad.
- [x] Notebook prepared-question editing and **Copy Question** work and persist.
- [x] Landscape and portrait remain usable with launcher details expanded.
- [x] Focus Mode hides the Tool Center and retains the full-screen editor.
- [x] Airplane Mode restores the Tool Center, draft, and stored launcher configuration.

**Acceptance recorded:** 2026-07-19. The user reported that Phase 5 worked as intended across the complete iPad test sequence.

## Phase 6 architecture gate

- [x] Compare external Streamlit, device-local browser index, and private authenticated backend.
- [x] Document privacy, hosting, offline behavior, performance, complexity, cost, exposure risk, and migration effort.
- [x] Confirm chronology and track-title preservation paths.
- [x] Define a basic-search path that uses no AI API.
- [x] Document preserved and deferred existing Wiki behavior.
- [x] User explicitly approves Strategy B and the read-only prototype scope.
- [x] Prototype work begins only after that approval is recorded.
- [ ] Synthetic, responsive, persistence, privacy, and offline validation passes.
- [ ] Physical-iPad acceptance passes with a privately transferred canon package.

## Phase 6 iPad acceptance checklist

- [ ] Existing draft, metrics, atmosphere, private images/content, and music remain intact.
- [ ] Write remains selected after launch or reload.
- [ ] Wiki shows the private canon-search workspace and no archive is bundled automatically.
- [ ] The private `.dreamspeak-canon.json` package imports from Files and shows 4,644 passages.
- [ ] A one-word search returns chronological results with retained track/chapter titles.
- [ ] A quoted-phrase search requires the complete phrase.
- [ ] Previous/current/next context opens beneath a result.
- [ ] Closing and reopening the app preserves the archive and search still works.
- [ ] Airplane Mode relaunches and searches the imported archive.
- [ ] Focus Mode entered from Wiki safely returns to the full Quiet Draft editor.
- [ ] Replacing the package works; canceling a file choice leaves the current archive intact.
- [ ] Remove Local Archive clears only the browser copy and disables search.

**Acceptance pending.**
