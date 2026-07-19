# Dreamspeak Command Center — Project Status

**Updated:** 2026-07-19  
**Current phase:** Phase 0 — Audit and Safeguard Existing Quiet Draft  
**Phase state:** Complete; user-accepted on iPad  
**Current app version:** Quiet Draft Version 1 / service-worker cache `20260718-5`  
**Production:** <https://teresaonhercompy.github.io/quiet-draft/>  
**Repository:** <https://github.com/teresaonhercompy/quiet-draft>  
**Recovery tag:** `quiet-draft-v1-baseline-2026-07-19`

## Completed work

- Audited the Quiet Draft files, architecture, Git history, deployment workflow, and browser storage.
- Confirmed that the Dreamspeak manuscript, Wiki database, Wiki source, character art, and personal audio are outside the public Quiet Draft repository.
- Confirmed that personal audio formats are ignored by Git and that GitHub Pages deploys from a fresh tracked checkout.
- Confirmed that the only large media in the repository are the four user-approved public fallback backgrounds.
- Verified that a discarded local-only commit containing one WAV file was never received by GitHub (the remote commit lookup returned `404 Not Found`). It is not reachable from a branch or tag and cannot be deployed.
- Validated the current editor on an isolated localhost origin: typing, counts, autosave, manual save, reload recovery, focus mode, Dark Glass, persistent atmosphere settings, typing-sound preferences, and dynamically discovered folder backgrounds.
- Triggered `.txt` export and observed Quiet Draft's successful export confirmation. The test harness did not expose the resulting browser blob as a captured file, so opening the downloaded file remains part of the iPad acceptance check.
- Stopped the local server and successfully reloaded the cached app, draft, settings, and selected background offline.
- Verified the public GitHub Pages configuration, enforced HTTPS, and deployed service-worker version.
- Published a recovery tag for the known-good pre-Command-Center baseline.
- Added the approved PRD, decision log, and detailed Phase 0 audit documentation.
- Received user acceptance after successful testing on the physical iPad, including offline operation in Airplane Mode.

No application HTML, CSS, JavaScript, manifest, service-worker, or asset behavior was changed in Phase 0.

## In-progress work

- Review and merge of the Phase 0 documentation pull request.

## Known observations

- The four included backgrounds appear twice in the Scene menu: once as named built-ins and once as files discovered from `backgrounds/backgrounds.json`. This is cosmetic and does not block drafting or offline use. De-duplication is deferred unless explicitly approved.
- Browser data is tied to the exact site address. Moving from GitHub Pages to another domain would create a separate, empty storage area unless a migration/export plan is completed first.
- Version 1 stores one current draft. Export remains the permanent backup path.
- Locally imported images and sounds are not synchronized between the Mac and iPad; each device receives its own private imported copy.

## Next approved task

No Phase 1 implementation is approved yet. After Phase 0 user acceptance and merge, the next proposed task is Phase 1: build the dark Command Center shell with placeholders, including the approved Wiki placeholder, while preserving the existing editor and storage keys.

## Last tested deployment

- **Live URL checked:** 2026-07-19
- **HTTP result:** `200 OK`
- **HTTPS:** enforced
- **GitHub Pages mode:** GitHub Actions workflow
- **Deployed service worker:** `20260718-5`
- **Latest verified successful runtime deployment:** commit `4a0de41` (`Initial Quiet Draft PWA`)
- **Current `main`:** `d150326`; its later changes are documentation-only and do not alter runtime files

## iPad acceptance checklist

- [x] Existing real draft appears before any test edits.
- [x] Typing with Magic Keyboard remains responsive.
- [x] Autosave survives closing and reopening the Home Screen app.
- [x] **Save Locally** reports success.
- [x] **Export .txt** creates a file that opens and contains the title and body.
- [x] **Copy All** pastes the complete title and body into a temporary note.
- [x] Background selection and Dark Glass remain readable in portrait and landscape.
- [x] A locally imported background remains available after relaunch.
- [x] A locally imported typing sound plays only after sounds are enabled.
- [x] Mute, volume, Space, and Enter variations work.
- [x] Focus mode enters and exits with touch and keyboard controls.
- [x] Airplane Mode launch succeeds after one online launch.
- [x] Current draft remains present after the Airplane Mode test.

**Acceptance recorded:** 2026-07-19. The user reported that the app works exactly as required on the iPad, including in Airplane Mode.
