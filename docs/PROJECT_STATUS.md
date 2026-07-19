# Dreamspeak Command Center — Project Status

**Updated:** 2026-07-19  
**Current phase:** Phase 1 — Dark Command-Center Shell

**Phase state:** Implementation complete; ready for user acceptance on iPad

**Current app version:** Dreamspeak Command Center Phase 1 / service-worker cache `20260719-1`
**Production:** <https://teresaonhercompy.github.io/quiet-draft/>  
**Repository:** <https://github.com/teresaonhercompy/quiet-draft>  
**Recovery tag:** `quiet-draft-v1-baseline-2026-07-19`

## Completed work

### Phase 0 — Audit and safeguard

- Audited the Quiet Draft files, architecture, Git history, deployment workflow, and browser storage.
- Confirmed that the Dreamspeak manuscript, Wiki database, Wiki source, character art, and personal audio are outside the public Quiet Draft repository.
- Confirmed that personal audio formats are ignored by Git and that GitHub Pages deploys from a fresh tracked checkout.
- Confirmed that the only large media in the repository are the four user-approved public fallback backgrounds.
- Verified that a discarded local-only commit containing one WAV file was never received by GitHub. It is not reachable from a branch or tag and cannot be deployed.
- Validated the original editor, export path, atmosphere settings, reload recovery, and offline behavior.
- Published the known-good recovery tag and merged the accepted Phase 0 documentation through pull request #2.
- Received user acceptance after successful physical-iPad testing, including Airplane Mode.

### Phase 1 — Dark Command-Center shell

- Added a dark-by-default design system with reusable color tokens while preserving the saved light/dark preference.
- Added a compact header, quiet highlights strip, and responsive three-column desktop/iPad-landscape shell.
- Embedded the existing Quiet Draft editor as the widest, primary center workspace.
- Added visibly disabled placeholders for character facts, Mabel encouragement, image preview, discography, tool switching, and the separate local Wiki.
- Added a local/offline status indicator without introducing a new storage key or network service.
- Updated the installable PWA identity to Dreamspeak Command Center and bumped the app-shell cache to `20260719-1`.
- Preserved every production localStorage key, IndexedDB database/store name, and draft/export behavior.
- Validated autosave, reload recovery, counts, manual save, copy, export, backgrounds, typing-sound preferences, theme persistence, focus mode, and offline launch.
- Validated responsive layouts at desktop 1440×900, iPad landscape 1180×820, and iPad portrait 820×1180 with no horizontal overflow.
- Confirmed no Quiet Draft-specific console warnings or errors during the tested flows.

## In-progress work

- User acceptance testing of the Phase 1 shell on the physical iPad in landscape, portrait, focus mode, and Airplane Mode.
- Review and merge of the Phase 1 pull request.

## Known observations

- No Phase 1 application bugs were found in local desktop or simulated iPad-size testing.
- The four included backgrounds appear twice in the Scene menu: once as named built-ins and once as files discovered from `backgrounds/backgrounds.json`. This is cosmetic and does not block drafting or offline use. De-duplication is deferred unless explicitly approved.
- Browser data is tied to the exact site address. Moving from GitHub Pages to another domain would create a separate, empty storage area unless a migration/export plan is completed first.
- Version 1 stores one current draft. Export remains the permanent backup path.
- Locally imported images and sounds are not synchronized between the Mac and iPad; each device receives its own private imported copy.

## Next approved task

No Phase 2 implementation is approved. After Phase 1 user acceptance and merge, the next proposed task is Phase 2: add data-driven character facts, Mabel encouragement, and the bundled image-preview module.

## Last tested deployment

- **Live URL checked:** 2026-07-19
- **HTTP result:** `200 OK`
- **HTTPS:** enforced
- **GitHub Pages mode:** GitHub Actions workflow
- **Current production service worker:** `20260718-5` until Phase 1 is reviewed and merged
- **Phase 1 candidate service worker:** `20260719-1`, verified on an isolated local origin
- **Current production `main`:** `32e3708`; Phase 0 documentation merged with no runtime change
- **Phase 1 branch:** `agent/phase-1-command-center-shell`

## Phase 0 iPad acceptance

- [x] Existing draft, autosave, export, copy, backgrounds, typing sounds, focus mode, and Magic Keyboard behavior passed.
- [x] Installed PWA launched with the current draft intact in Airplane Mode.

**Acceptance recorded:** 2026-07-19. The user reported that Quiet Draft worked exactly as required on the iPad, including in Airplane Mode.

## Phase 1 iPad acceptance checklist

- [ ] Existing real draft appears in the new Command Center shell.
- [ ] Landscape shows the left rail, wide center editor, and right rail without horizontal scrolling.
- [ ] Portrait places the editor before the stacked supporting placeholders.
- [ ] Header and draft controls remain comfortable with the Magic Keyboard attached.
- [ ] Autosave survives closing and reopening the installed PWA.
- [ ] **Export .txt** creates a file that opens with the complete title and body.
- [ ] Background and custom typing-sound preferences remain available.
- [ ] Focus mode hides the Command Center shell and exits cleanly.
- [ ] Dark/light preference survives relaunch.
- [ ] Airplane Mode launches the new shell with the current draft intact.
