# Dreamspeak Command Center — Project Status

**Updated:** 2026-07-19  
**Current phase:** Phase 2 — Character, Encouragement, and Image Modules

**Phase state:** Implementation complete; ready for review and physical-iPad acceptance

**Current production version:** Dreamspeak Command Center Phase 1 / service-worker cache `20260719-1`

**Phase 2 candidate:** service-worker cache `20260719-2`

**Production:** <https://teresaonhercompy.github.io/quiet-draft/>

**Repository:** <https://github.com/teresaonhercompy/quiet-draft>

**Recovery tag:** `quiet-draft-v1-baseline-2026-07-19`

## Completed work

### Phase 0 — Audit and safeguard

- Audited the Quiet Draft architecture, Git history, deployment workflow, browser storage, and private/public asset boundary.
- Confirmed that the manuscript, Wiki, character art, and personal audio remain outside the public repository.
- Published the known-good recovery tag and received physical-iPad acceptance, including Airplane Mode.

### Phase 1 — Dark Command-Center shell

- Added the dark responsive Command Center, compact header, highlights strip, three-column landscape layout, and editor-first portrait layout.
- Embedded Quiet Draft without changing its localStorage keys, IndexedDB database/store names, exports, atmosphere controls, focus mode, or offline behavior.
- Added placeholders for future supporting modules and updated the installable PWA identity.
- Merged pull request #3 and deployed cache `20260719-1` through GitHub Pages.
- Received physical-iPad acceptance for all nine test steps, including Airplane Mode.

### Phase 2 — Supporting modules

- Replaced the Tabi/Norielle placeholder with a data-driven fact card supporting speaker, category, non-canon labeling, random launch content, and **Next Fact**.
- Added private JSON library import. Manuscript-derived facts are stored in the existing browser database under a new store and are never bundled or deployed.
- Replaced the Mabel placeholder with a data-driven authored library, random launch content, and **Next Message**.
- Replaced the image placeholder with a working gallery supporting random launch, previous, random, and next navigation, titles, captions, and missing-image fallback.
- Added local gallery-image import into a separate IndexedDB store.
- Added the four user-approved public background scenes as the bundled offline gallery.
- Prepared `Dreamspeak_Codex/private-import/Dreamspeak_Phase2_Content.json` outside the public repository for private iPad/Mac import.
- Bumped the service-worker cache to `20260719-2` and explicitly cached the Phase 2 data files and four included gallery images.
- Preserved all production draft, atmosphere, background, and typing-sound storage identifiers.

## In-progress work

- Review and publication of the Phase 2 candidate branch.
- Physical-iPad acceptance of private library import, local gallery import, navigation, persistence, and Airplane Mode.

## Known observations

- The public `data/facts.json` is deliberately empty. Canon facts remain private and become available after importing the separate device-local JSON library.
- Reimporting a fact/message library replaces the previous private library of the same type. The bundled generic Mabel messages remain available.
- Locally imported gallery images currently use their filename as the title and do not have an in-app caption editor. Caption editing is not required by Phase 2.
- The four included backgrounds still appear both as named backgrounds and as files discovered from `backgrounds/backgrounds.json`. This cosmetic duplication is unchanged from Phase 1.
- Clearing Safari website data or deleting the installed PWA may remove drafts and imported assets. Original JSON, image, audio, and exported draft files remain the required backup.

## Next approved task

No Phase 3 implementation is approved. The next task is Phase 2 review, deployment, and physical-iPad acceptance only.

## Last tested candidate

- **Local candidate:** service-worker cache `20260719-2`
- **Syntax/data validation:** passed for JavaScript and all JSON files
- **iPad landscape:** 1180×820, three columns, no horizontal overflow
- **iPad portrait:** 820×1180, editor first, supporting modules visible, no horizontal overflow
- **Editor regression:** title/body autosave and reload recovery passed; 15-word test draft restored exactly
- **Module behavior:** Mabel next-message and bundled gallery navigation passed
- **Offline relaunch:** editor, saved draft, Mabel library, gallery metadata, and included gallery image passed with the local server stopped
- **Console:** no app-specific warnings or errors
- **Current production `main`:** `f103c1a`; Phase 1 shell
- **Phase 2 branch:** `agent/phase-2-supporting-modules`

## Phase 1 iPad acceptance

- [x] Existing real draft appeared in the new Command Center shell.
- [x] Landscape and portrait layouts worked without horizontal scrolling.
- [x] Header and draft controls remained comfortable with the Magic Keyboard.
- [x] Autosave survived closing and reopening the installed PWA.
- [x] Export, backgrounds, custom typing sounds, focus mode, and theme persistence passed.
- [x] Airplane Mode launched the new shell with the current draft intact.

**Acceptance recorded:** 2026-07-19. The user reported that all nine Phase 1 test steps worked and the app looked beautiful.

## Phase 2 iPad acceptance checklist

- [ ] Existing real draft remains intact after the update.
- [ ] The private JSON library imports from Files without uploading it.
- [ ] **Next Fact** rotates Tabi/Norielle content and shows speaker/category labels.
- [ ] **Next Message** rotates Mabel encouragement.
- [ ] The bundled gallery loads and previous/random/next controls work.
- [ ] Private gallery images import from Files and survive relaunch.
- [ ] Portrait keeps the editor ahead of the supporting cards.
- [ ] Focus mode, export, backgrounds, and typing sounds remain unchanged.
- [ ] Airplane Mode launches with the draft, imported facts/messages, and gallery images intact.
