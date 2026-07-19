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

