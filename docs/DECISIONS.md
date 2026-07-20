# Dreamspeak Command Center — Decision Log

## DCC-001 — Public application shell; proprietary content remains device-local

**Date:** 2026-07-19  
**Decision:** The static application code may be publicly hosted. Proprietary manuscripts, Wiki content/indexes, personal wallpapers, character images, and music files must not be committed or deployed. They will be imported separately on each device and stored in browser-managed local storage in later approved phases.

**Reason:** This preserves convenient HTTPS/PWA hosting without making private creative material accessible to anyone who finds the site URL.

**Alternatives considered:** A private server containing all assets; a public repository containing private media; Cloudflare Zero Trust protecting the full site.

**Consequences:** The public shell is not, by itself, a confidentiality boundary. Private modules must be useful only after local import. Assets do not sync automatically, and originals must be retained as backups.

## DCC-002 — Keep GitHub Pages for Phase 0; defer Cloudflare hosting decisions

**Date:** 2026-07-19  
**Decision:** Keep the validated Quiet Draft site on GitHub Pages during Phase 0. Cloudflare Pages and Cloudflare Zero Trust remain possible later choices but are not introduced without a migration plan and explicit approval.

**Reason:** GitHub Pages already provides HTTPS, installation, and offline delivery. Changing the origin now would not protect separately local assets and would make existing browser data appear missing at the new address.

**Alternatives considered:** Immediate Cloudflare Pages migration; Cloudflare Access in front of the shell; a Mac-only local server.

**Consequences:** The shell and approved fallback images remain public. A future hosting change must include draft export, asset backup, storage-origin warnings, service-worker checks, and iPad reinstall testing.

## DCC-003 — Existing Quiet Draft storage identifiers are production data

**Date:** 2026-07-19  
**Decision:** Preserve all current localStorage keys, IndexedDB database/store names, and record shapes. Any future rename or restructuring requires a backward-compatible migration and verified export first.

**Reason:** Existing drafts and personal assets are stored under these identifiers. Changing them can make valid local data appear lost.

**Alternatives considered:** Rename keys for the Command Center; replace IndexedDB; clear Version 1 data during the redesign.

**Consequences:** Phase 1 must embed or adapt the current editor without changing its storage contract. The authoritative map is in `docs/PHASE_0_AUDIT.md`.

## DCC-004 — Dreamspeak Wiki remains a separate local tool during Phase 0

**Date:** 2026-07-19  
**Decision:** Do not move or modify the existing Python/SQLite Dreamspeak Wiki in Phase 0. Phase 1 will provide only a Wiki placeholder unless a later integration task is explicitly approved.

**Reason:** The Wiki contains proprietary manuscript-derived content and currently lives safely outside the deployed repository. Integration requires a separate cross-device and privacy design.

**Alternatives considered:** Bundle the Wiki database into the PWA; host the Streamlit app publicly; immediately rewrite the Wiki as browser code.

**Consequences:** The Command Center will not access canon data in Phase 0. Future integration must keep the manuscript/index private and define how both Mac and iPad receive local data.

## DCC-005 — Local audio files are the primary music source

**Date:** 2026-07-19  
**Decision:** The discography module will primarily use audio imported locally on each device. A hidden or automatic YouTube Music integration is not part of the approved architecture.

**Reason:** Local audio supports privacy, offline travel use, predictable playback, and a library of fewer than 100 songs without depending on an external service.

**Alternatives considered:** YouTube embeds; YouTube Music streaming; links that open public tracks externally.

**Consequences:** Later phases need a local library import/index design and must avoid preloading the full catalog. Clearly visible external links to public music may be considered separately, but they are not the primary player.

## DCC-006 — Four included fallback backgrounds are approved public assets

**Date:** 2026-07-19  
**Decision:** `forest-desk.jpg`, `night-sky.jpg`, `rainy-window.jpg`, and `warm-paper.jpg` may remain in the public repository.

**Reason:** The user confirmed that these files are not proprietary.

**Alternatives considered:** Remove every image from the public shell; gate the fallback images.

**Consequences:** These four files may be viewed or downloaded publicly. All other personal backgrounds should use private in-app import unless separately approved for publication.

## DCC-007 — Preserve the known-good Version 1 baseline with a remote tag

**Date:** 2026-07-19  
**Decision:** Tag commit `d150326` as `quiet-draft-v1-baseline-2026-07-19` before adding Command Center documentation or features.

**Reason:** The tagged version passed the Phase 0 desktop/offline baseline and provides a simple recovery point.

**Alternatives considered:** Rely only on the moving `main` branch; create a release archive outside Git.

**Consequences:** The tag must remain immutable. Restore instructions are recorded in the Phase 0 audit.

## DCC-008 — Phase 1 supporting modules are structural placeholders only

**Date:** 2026-07-19

**Decision:** Phase 1 provides responsive card structure and clearly disabled controls for character facts, Mabel encouragement, image preview, discography, the tool center, and the Wiki. It does not add their data libraries, navigation logic, playback, image rotation, or search behavior.

**Reason:** The approved phase is the Command Center shell. Implementing real module behavior now would bypass the incremental delivery plan and increase regression and privacy risk around the working editor.

**Alternatives considered:** Build each visible module fully; omit the future modules entirely; add sample private data to make the shell appear complete.

**Consequences:** The shell communicates the intended layout without pretending future tools work. Phase 2 and later phases can replace each placeholder independently without redesigning the center editor.

## DCC-009 — Dark is the default only when no saved theme exists

**Date:** 2026-07-19

**Decision:** The Command Center loads dark by default for a new installation. Existing `quiet-draft.theme.v1` values continue to win, and the light-theme control remains available.

**Reason:** The PRD requires a dark-first interface, while preservation requirements prohibit overriding a user's established preference.

**Alternatives considered:** Remove light mode; force every installation to dark once; continue following the operating-system preference for new installs.

**Consequences:** New users receive the intended cinematic dark shell. Existing users see no theme reset, and no storage migration or new key is required.

## DCC-010 — Command Center PWA identity; Quiet Draft storage contract remains unchanged

**Date:** 2026-07-19

**Decision:** Update the document and manifest identity to Dreamspeak Command Center while keeping the same PWA scope, start location, GitHub Pages origin, draft keys, atmosphere keys, IndexedDB database, and object stores.

**Reason:** The installed shell now represents the broader workspace, but preserving the origin and data identifiers is necessary for existing iPad drafts and local assets to reappear after the update.

**Alternatives considered:** Publish a second PWA at another path; rename all browser-storage identifiers; keep the installed name Quiet Draft indefinitely.

**Consequences:** The installed product presents the Command Center identity without copying or migrating user content. Quiet Draft remains the named editor module inside the shell.

## DCC-011 — Phase 2 proprietary content uses explicit device-local import

**Date:** 2026-07-19

**Decision:** The public application contains the Phase 2 module code, an empty public fact file, and generic authored Mabel messages. Manuscript-derived facts and private gallery images are imported explicitly on each device and stored in new object stores inside the existing `quiet-draft-assets` IndexedDB database.

**Reason:** A static JSON fact library derived from the manuscript would be publicly downloadable if deployed through GitHub Pages. Explicit import preserves the approved public-shell/private-content boundary and still supports offline use.

**Alternatives considered:** Commit manuscript-derived facts; omit facts until private hosting exists; create a backend; place private files beside the public app and rely on an unlisted URL.

**Consequences:** Facts and personal images do not synchronize automatically. The user must keep the source JSON and image files as backups and import them on both Mac and iPad. The existing `sounds` and `backgrounds` stores remain unchanged; Phase 2 adds `command-center-content` and `gallery` while upgrading the database from version 2 to version 3.

## DCC-012 — Reuse the four approved public scenes as the bundled Phase 2 gallery

**Date:** 2026-07-19

**Decision:** The initial bundled gallery references the four public background images already approved in DCC-006. Additional character and project images remain device-local.

**Reason:** Phase 2 requires an included offline image preview, but no private artwork may be deployed. Reusing approved files satisfies offline and missing-asset testing without widening the public asset set.

**Alternatives considered:** Ship no bundled gallery; publish private character art; add newly generated public artwork; use remote image URLs.

**Consequences:** The gallery works immediately and offline after installation. It begins with atmospheric scenes rather than character art, and private images appear only after local import.

## DCC-013 — Phase 3 music is an explicitly imported device-local library

**Date:** 2026-07-19

**Decision:** Music tracks and album artwork are imported through browser file pickers and stored in new `music-tracks` and `music-artwork` object stores inside the existing `quiet-draft-assets` IndexedDB database. Artist and album metadata are entered at import time; track titles derive from filenames.

**Reason:** The approved primary music source is private local audio. Explicit imports preserve privacy, work offline, avoid external services, and support the user's sub-100-song library without publishing any files.

**Alternatives considered:** Commit audio to GitHub; stream from YouTube Music; require a catalog server; parse embedded tags with an external library; use temporary file handles that may not survive relaunch.

**Consequences:** Each device needs its own import. Audio consumes browser storage, originals must remain backed up, and availability depends on Safari codec support. IndexedDB upgrades from version 3 to version 4 while every existing store and record remains intact.

## DCC-014 — Remember playback state, never playback intent

**Date:** 2026-07-19

**Decision:** Store the last album, track, approximate position, volume, shuffle, and repeat mode in `dreamspeak.music-player.v1`. Do not store or restore a playing state. Audio begins only after an explicit Play action.

**Reason:** The PRD requires continuity without autoplay. Restoring location is useful; restoring sound would be disruptive and may violate browser media policies.

**Alternatives considered:** Start the last track automatically; forget all playback state; remember only volume; rely on the audio element's transient state.

**Consequences:** Relaunching always shows a paused player at the remembered position. Focus mode and editor interactions do not intentionally pause playback, but iPadOS may still apply operating-system media policies.

## DCC-015 — Service worker never caches the private music library

**Date:** 2026-07-19

**Decision:** Cache only the lightweight public `data/albums.json` shell with the app. Imported audio and artwork remain IndexedDB blobs and are never added to the service-worker app-shell list.

**Reason:** Explicit local imports are already offline and private. Duplicating the full library in Cache Storage would waste space and complicate deletion and quota behavior.

**Alternatives considered:** Automatically cache every imported track; publish and cache remote music; implement per-album service-worker downloads.

**Consequences:** The app shell remains lightweight. Removing an imported track deletes its authoritative local blob without leaving a second service-worker copy.

## DCC-016 — Read MP3 tags locally and pause outside the foreground

**Date:** 2026-07-19

**Decision:** Parse common ID3v2 MP3 frames locally for title, artist, album, track number, and embedded artwork. Use the manual artist/album fields, filename-derived title, and artwork picker as fallbacks. Pause playback on `visibilitychange` and `pagehide` while preserving the current position.

**Reason:** The private discography already contains useful embedded metadata, and audio continuing after the Home Screen app closes is surprising. A small first-party parser preserves the no-dependency and local-only architecture.

**Alternatives considered:** Continue requiring manual metadata; add an external tag-reading library; upload files to a metadata service; allow operating-system background playback.

**Consequences:** ID3-tagged MP3 imports need less manual setup and sort by track number. M4A and other tag formats still use fallbacks. Existing imported tracks are unchanged until removed and imported again. Leaving the app pauses music, while entering Focus Mode inside the app does not.

## DCC-017 — Phase 4 metrics use one additive local-only record

**Date:** 2026-07-19

**Decision:** Store editable project context, manual manuscript total, the local calendar date, today’s net word delta, and last export timestamp under `dreamspeak.writing-metrics.v1`. Keep the current draft and last autosave authoritative in the existing `quiet-draft.current.v1` record. Session words remain in memory and reset on launch or reload.

**Reason:** Phase 4 needs useful highlights without modifying production draft storage or implying that a single-device browser metric is a complete manuscript history.

**Alternatives considered:** Add fields to the existing draft record; store every keystroke event; calculate metrics from the manuscript archive; synchronize metrics; retain session count across app launches.

**Consequences:** Existing drafts and assets require no migration. Today’s words are net editor-input changes on this device and reset on the next observed local date. New Draft clearing is excluded. Metrics do not include Scrivener, other devices, or work outside Quiet Draft, and browser-data deletion removes them.

## DCC-018 — Phase 5 launchers store configuration, never manuscript content

**Date:** 2026-07-19

**Decision:** Define Phase 5 tools in a JavaScript registry. Keep Write as the launch default, route Images and Music to their existing local modules, and provide configurable `http`/`https` launchers for Wiki, Motifs, Timeline, and Notebook. Store only launcher addresses and the prepared Notebook question under `dreamspeak.tool-center.v1`.

**Reason:** The Tool Center needs to be extensible without publishing proprietary files or pretending that a hosted PWA can freely read iPad Files. External notebooks and future reports can be reached safely without integrating unsupported services.

**Alternatives considered:** Embed every destination in an iframe; hard-code personal URLs; automate NotebookLM; upload the Wiki into the public shell; persist the last active tool; add a backend.

**Consequences:** Every switch saves the draft, but Write returns on launch. External tools require a complete address configured separately on each device and need connectivity unless the destination has its own offline support. The app never transmits the draft, stores credentials, scrapes NotebookLM, or makes private files public.

## DCC-019 — Phase 6 uses an explicit-import, read-only browser index

**Date:** 2026-07-19

**Decision:** The user approved Strategy B and its read-only prototype scope. A generic Mac exporter creates a versioned private canon package from the existing SQLite `chunks` table. The iPad imports that package explicitly into a separate `dreamspeak-canon` IndexedDB database and performs word and quoted-phrase search entirely in the browser.

**Reason:** This keeps manuscript prose on the user's devices, supports Airplane Mode, preserves chronological chunk order and titles, and adds no backend, account, cloud sync, AI, or hosting cost.

**Alternatives considered:** Keep search solely in the external Streamlit Wiki; place the corpus behind a private authenticated backend; publish an obfuscated or unlisted data file.

**Consequences:** Generated canon packages are excluded from Git and the service-worker cache. Imports, replacements, removals, search, snippets, and neighboring context are local. The Mac Streamlit Wiki remains authoritative for editable notes and motif reports. Each device requires its own import, and the original database/package remains the backup because Safari may evict browser data.
