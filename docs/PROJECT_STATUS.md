# Dreamspeak Command Center — Project Status

**Updated:** 2026-07-19

**Current phase:** Phase 4 — Writing Metrics and Highlights

**Phase state:** Local implementation complete; ready for publication and physical-iPad acceptance

**Current production version:** Dreamspeak Command Center Phase 3 / service-worker cache `20260719-6`

**Phase 4 candidate:** service-worker cache `20260719-7`

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

## In-progress work

- Publication of the Phase 4 candidate branch.
- Physical-iPad acceptance of metrics, persistence, export timing, local-date behavior, layout, and offline use.

## Known observations

- The browser test surface could load and inspect local WAV metadata but could not output audio. Audible playback and playback-through-focus-mode require physical-iPad acceptance.
- Tagged MP3 titles, artist, album, track number, and embedded art are read locally. Other formats use the import-field and filename fallbacks.
- Tagged MP3 track numbers determine album order; unnumbered tracks retain import order.
- Browser storage capacity and eviction behavior depend on available iPad storage and Safari. Original music and artwork must remain in Files or on the Mac.
- Reimporting a file with the same filename into the same artist/album is skipped as a duplicate.
- The four included backgrounds remain cosmetically duplicated in the Atmosphere menu, unchanged from prior phases.

## Next approved task

No Phase 5 implementation is approved. The next task is Phase 4 deployment and physical-iPad acceptance only.

## Last tested candidate

- **Local candidate:** service-worker cache `20260719-7`
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
- **Current production `main`:** `c159632`; Phase 3
- **Phase 4 branch:** `feature/phase-4-writing-metrics`

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

- [ ] Existing draft and all Phase 2/3 local imports remain intact.
- [ ] Project, scene/chapter, and manual manuscript total can be edited and persist.
- [ ] Draft highlight follows the Quiet Draft title.
- [ ] Session words update with net additions/removals and reset after relaunch.
- [ ] Today’s words update with net additions/removals and persist after relaunch.
- [ ] Last autosave changes after autosave or **Save Locally**.
- [ ] Last export changes after **Export .txt**.
- [ ] Landscape Highlights remain quiet and every side module still scrolls.
- [ ] Portrait keeps the editor first and allows horizontal Highlights scrolling.
- [ ] Focus Mode, music, backgrounds, sounds, and export remain functional.
- [ ] Airplane Mode restores the draft and persisted Highlights.
