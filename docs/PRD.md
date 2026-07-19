# Dreamspeak Command Center — Product Requirements Document

**Document version:** 1.0  
**Product status:** Planned  
**Primary user:** Teresa Silva-Torres  
**Working product name:** Dreamspeak Command Center  
**Initial platforms:** iPadOS Safari/PWA and desktop browsers  
**Primary development tool:** Codex  
**Early deployment:** Static HTTPS hosting; no backend unless explicitly approved later

---

## 1. Product Summary

Dreamspeak Command Center is a private, dark-themed, local-first creative workspace for writing and managing the *Dreamspeak* universe, including *Inheritance Dust* and future related works.

It combines:

- A distraction-free writing environment
- Writing-session and manuscript metrics
- Access to a searchable canon/wiki
- A rotating image gallery
- A music player for The Calamities and Stillfire
- Character-driven facts and encouragement
- A launcher/workspace for additional creative tools

It is **not** intended to replace Scrivener. Scrivener remains the primary manuscript repository on macOS. The Command Center is a portable drafting and creative environment, especially for iPad use during travel.

The writing editor is the heart of the application. Every other module must support writing without distracting from it.

---

## 2. Product Vision

Create one private site or installed PWA that allows the user to:

1. See the current novel, writing metrics, artwork, music, canon tools, and editor.
2. Write directly in the dashboard or enter full-screen focus mode.
3. Access supporting tools without leaving the creative environment when practical.
4. Preserve draft text locally unless the user explicitly exports or uploads it.
5. Enjoy atmospheric and character-specific elements that make the app feel personal.
6. Use the core writing experience offline.

The app should feel like a private author’s studio, not enterprise software, even though its information architecture is inspired by a Salesforce record page.

---

## 3. Core Product Principles

### 3.1 Writing First

The editor must remain the clearest and most prominent element.

No module may:

- Interrupt typing
- Autoplay sound without permission
- Obscure the editor unexpectedly
- Create modal interruptions during active writing
- Compete visually with manuscript text
- Require network access for basic drafting

### 3.2 Dark Theme by Default

The command center must be dark-themed from the beginning.

Use:

- Near-black and deep-charcoal surfaces
- Warm off-white or soft-gray text
- Muted purple as the primary accent
- Restrained green, teal, or amber for status indicators
- Subtle panel boundaries
- Minimal glare
- Album art and Dreamspeak imagery as major sources of color

Do not build a light-first interface and invert it later. A light theme is not required initially.

### 3.3 Local First

Draft text, preferences, notes, and session data should remain on the device whenever practical.

Early phases must not require:

- User accounts
- Cloud sync
- A database server
- External APIs
- Analytics
- Tracking
- Automatic manuscript uploads

### 3.4 Reliable Export

Local browser storage must never be the only practical copy of important writing.

The app must provide clear export tools and visible backup status.

### 3.5 Modular Architecture

Each major dashboard feature should be an independent component/module.

The project may jokingly call these modules “LWCs,” but they are not Salesforce Lightning Web Components.

Core modules:

- Highlights Panel
- Quiet Draft Editor
- Tool Switcher
- Character Fact Card
- Mabel Encouragement Card
- Image Preview
- Discography Player
- Canon Search

### 3.6 Incremental Delivery

Codex must implement one approved phase at a time.

Future-phase features must not be built early unless strictly required by the current task.

### 3.7 Preserve Working Behavior

Refactors must not break:

- Existing drafts
- Existing local-storage keys
- Export behavior
- Offline PWA behavior
- Background selection
- Typing sounds
- Existing user preferences

Before any storage migration, verify a working backup/export path.

---

## 4. Primary User and Use Cases

### 4.1 Primary User

A novelist using:

- iPad Air with Magic Keyboard during business travel
- MacBook Air as the main home writing machine
- Scrivener on macOS as the primary manuscript repository
- Dreamspeak Command Center as a portable drafting and creative workspace

### 4.2 Primary Use Cases

1. Draft a scene on iPad while traveling.
2. Enter focus mode with an atmospheric background and optional typing sounds.
3. Export the draft as plain text for later import into Scrivener.
4. See today’s and current-session word counts.
5. Search *Dreamspeak* canon while writing *Inheritance Dust*.
6. View a random Dreamspeak or *Inheritance Dust* image.
7. Listen to The Calamities or Stillfire while drafting.
8. Receive a random novel fact from Anime Tabi or Norielle.
9. Receive concise encouragement from Anime Mabel.
10. Launch additional project tools from one central workspace.

---

## 5. Scope

### 5.1 In Scope

- Dark-themed responsive command-center interface
- Three-column desktop/iPad-landscape layout
- Collapsible or stacked portrait/narrow layout
- Existing Quiet Draft functionality
- Full-screen focus mode
- Local draft autosave
- Plain-text export
- Copy-all functionality
- Background image selection
- Optional keystroke sounds
- Writing metrics
- Rotating artwork
- Music playback
- Character facts and encouragement
- Tool launcher/switcher
- Canon/wiki integration in an approved form
- Offline-capable PWA shell
- Static HTTPS deployment for early phases

### 5.2 Out of Scope for Initial Releases

- Replacing Scrivener
- Scrivener project-file editing
- Automatic Scrivener synchronization
- Real-time collaboration
- Multi-user accounts
- Public social features
- Automatic cloud manuscript sync
- Unsupported NotebookLM scraping
- Browser automation against NotebookLM
- AI-generated prose inside the editor
- Automatic writing suggestions
- Public publication of manuscript content
- Native iPad development
- App Store distribution
- Backend infrastructure before it is justified

---

## 6. Layout and Experience

### 6.1 Desktop and iPad Landscape

Primary layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ Header / Product Navigation                                  │
├──────────────────────────────────────────────────────────────┤
│ Highlights Panel                                             │
├───────────────┬─────────────────────────────┬────────────────┤
│ Left Rail     │ Main Workspace              │ Right Rail     │
│               │                             │                │
│ Character     │ Tool Switcher               │ Image Preview  │
│ Fact Card     │                             │                │
│               │ Writing Editor              │ Music Player   │
│ Mabel Card    │                             │                │
└───────────────┴─────────────────────────────┴────────────────┘
```

Suggested proportions:

- Left rail: 18–22%
- Center workspace: 56–64%
- Right rail: 18–22%

The center column is always the widest.

### 6.2 Portrait and Narrow Screens

- Editor remains first priority.
- Side modules may collapse into drawers, tabs, accordions, or stacked sections.
- Focus mode remains available.
- Normal use must not require horizontal scrolling.

### 6.3 Header

May include:

- Product name
- Current project
- Current tool
- Focus-mode control
- Settings
- Export status
- Offline/PWA indicator

Keep it compact.

### 6.4 Highlights Panel

Possible data:

- Novel title
- Current draft
- Current chapter/entry/scene
- Total manuscript word count
- Today’s word count
- Current session word count
- Writing streak
- Last autosave
- Last export
- Target word count
- Completion percentage

Early phases may use only a subset.

---

## 7. Visual Design Requirements

### 7.1 Tone

The app should feel:

- Dark
- Intimate
- Atmospheric
- Literary
- Modern
- Calm
- Personal
- Slightly cinematic

It must not feel:

- Corporate
- Clinical
- Bright
- Busy
- Neon-heavy
- Like a generic admin template

### 7.2 Design Tokens

Use reusable CSS variables rather than scattered hard-coded colors.

Suggested categories:

```text
--color-bg
--color-surface
--color-surface-elevated
--color-border
--color-text
--color-text-muted
--color-accent
--color-accent-soft
--color-success
--color-warning
--color-error
```

### 7.3 Typography

- Highly readable editor type
- Comfortable line height
- No excessively small UI text
- Minimal font variety
- Configurable editor typography later
- No decorative font for manuscript text

### 7.4 Motion

Animations must be subtle and optional.

Do not:

- Animate constantly
- Distract during typing
- Use bouncing counters
- Auto-rotate images too rapidly
- Add celebratory effects during writing

Respect reduced-motion preferences.

---

## 8. Functional Modules

### 8.1 Quiet Draft Writing Editor

The existing Quiet Draft editor becomes the primary center module.

Required capabilities:

- Draft title
- Large writing area
- Local autosave
- Manual local save
- Export `.txt`
- Copy all
- New draft
- Word count
- Character count
- Session word count
- Background image selection
- Focus mode
- Dark writing surface
- Optional typing sounds
- Volume and mute controls
- Persistent preferences
- iPad Magic Keyboard support

#### Focus Mode

Focus mode must:

- Fill the available display
- Hide side rails
- Hide or minimize highlights
- Preserve background and typing sounds
- Provide a clear exit control
- Avoid accidental exit during typing
- Continue autosaving

#### Draft Safety

The editor must:

- Preserve existing storage keys unless migration is approved
- Display autosave status
- Make export obvious
- Avoid silently replacing an existing draft
- Confirm destructive actions
- Never send draft content to the host

---

### 8.2 Highlights Panel

Initial fields:

- Current novel
- Current draft/phase
- Today’s words
- Current session words
- Last autosave
- Last export

Later fields:

- Total manuscript word count
- Current chapter
- Writing streak
- Target word count
- Completion percentage
- Weekly word count
- Average words per writing day

Initial manuscript total may be entered manually.

---

### 8.3 Tool Switcher / Tool Center

Possible tools:

- Write
- Canon Search
- Motif Report
- Timeline
- Scene Board
- Discography
- Image Library
- Open Full Wiki
- Open NotebookLM/Gemini Notebook

Requirements:

- Clear active-tool state
- No draft loss when switching
- Tools load in the center workspace when feasible
- External tools may open in a new tab
- Tool configuration should be data-driven
- Future tools should be addable without redesigning the app

---

### 8.4 Image Preview Module

Initial behavior:

- Load images from an app-managed folder
- Display one random image on launch
- Next/Previous/Random controls
- Preserve aspect ratio
- Optional title and caption
- Graceful missing-image behavior
- Never visually overpower the editor

Suggested metadata:

```json
[
  {
    "file": "assets/gallery/example.jpg",
    "title": "Optional title",
    "caption": "Optional caption",
    "collection": "Inheritance Dust"
  }
]
```

Possible collections:

- Dreamspeak
- Inheritance Dust
- Stillfire
- The Calamities
- Anime AU
- Covers
- Locations

Future options:

- Collection filters
- Slideshow interval
- Favorites
- Fullscreen preview

---

### 8.5 Discography Player

Initial capabilities:

- Album artwork
- Artist
- Album title
- Track title
- Play/pause
- Previous/next
- Seek control
- Volume
- Shuffle
- Repeat
- Album selection
- Remember last track
- Remember playback position when practical

Suggested catalog format:

```json
{
  "albums": [
    {
      "id": "dreamspeak",
      "artist": "The Calamities",
      "title": "Dreamspeak",
      "cover": "assets/music/dreamspeak/cover.jpg",
      "tracks": [
        {
          "title": "Example Track",
          "file": "assets/music/dreamspeak/example.mp3"
        }
      ]
    }
  ]
}
```

Offline strategy:

- App shell works offline.
- Music may stream while online.
- Do not cache the full discography automatically.
- Explicit offline album download may be considered later.

Do not place private audio assets in a public repository without explicit approval.

---

### 8.6 Anime Tabi / Norielle Fact Module

Behavior:

- Random fact on launch
- Next Fact control
- Speaker identity
- Character image/avatar
- Category support
- Static data file
- No AI API

Categories:

- Canon
- Character history
- Songs
- Behind the scenes
- Deep cuts
- Humor
- Anime AU

Non-canon facts must be marked clearly.

---

### 8.7 Anime Mabel Encouragement Module

Initial behavior:

- Random encouragement on launch
- Next Message control
- Static authored library
- Mabel image/avatar
- No external AI service

Possible future triggers:

- Zero words typed
- 250 words
- 500 words
- 1,000 words
- Long idle period
- Successful export
- Missed export
- New writing streak

Tone:

- Dry
- Concise
- Intelligent
- Blunt
- Never cruel
- Affectionately severe
- Encouraging without sentimentality

---

### 8.8 Canon / Wiki Integration

The current Dreamspeak archive uses Python, Streamlit, SQLite, and full-text search. It cannot be embedded unchanged in a purely static PWA.

Approved strategies to evaluate:

#### Strategy A: External Wiki Launcher

- Open the existing wiki separately.
- Best when running locally on Mac.
- Limited on iPad unless separately hosted.

#### Strategy B: Browser-Based Static Canon Index

A Mac build script converts the archive into browser-readable data.

Benefits:

- Works on iPad
- May work offline
- Integrates into command center

Risks:

- Static manuscript data may be downloadable
- Obscurity is not security
- Large index size

#### Strategy C: Private Authenticated Backend

Benefits:

- Better privacy
- Better future AI/Q&A support
- Centralized data

Costs:

- Authentication
- Backend development
- Hosting
- Security responsibility
- Maintenance

Initial decision:

- Keep the existing wiki separate.
- Build launcher/tool-switcher support.
- Do not deploy the full manuscript publicly.
- Revisit integration in a dedicated later phase.

---

### 8.9 NotebookLM / Gemini Notebook

Direct chat integration is not part of initial scope.

Unless a documented supported API is available and approved:

- Do not scrape NotebookLM.
- Do not automate its browser UI.
- Do not use unsupported iframe embedding.
- Do not store Google credentials.
- Do not reverse-engineer private endpoints.

Initial supported behavior:

- Notebook title
- Description
- Open Notebook button
- Prepared question
- Copy Question button
- Open in New Tab

---

## 9. Data and Storage

### 9.1 Local Data

Early versions may use:

- `localStorage` for small preferences and metadata
- IndexedDB for larger structured local data
- Static JSON for facts, encouragement, gallery, and music metadata

### 9.2 Draft Storage

Drafts must:

- Remain local by default
- Autosave
- Be exportable
- Survive ordinary restarts
- Never be bundled into deployed source
- Never be logged to console
- Never be sent to analytics

### 9.3 Storage-Key Stability

Existing Quiet Draft storage keys are production data.

Codex must:

- Inspect and document current keys
- Preserve them during refactoring
- Add migration logic before renaming
- Test migration with sample data
- Never clear old keys until migration is verified

### 9.4 Export

Required:

- Export current draft as `.txt`
- Use title and date in filename
- Copy all text

Future:

- Export all drafts
- Export metrics
- Export settings
- ZIP backup
- Markdown export

---

## 10. PWA and Offline Requirements

### 10.1 Installation

Remain installable through Safari’s Add to Home Screen.

### 10.2 Offline Minimum

After caching, these must work offline:

- App shell
- Editor
- Existing local draft
- Autosave
- Word count
- Export
- Copy all
- Included backgrounds
- Included typing sounds
- Character facts
- Mabel encouragement

Music and large gallery assets may remain online-only initially.

### 10.3 Service Worker

The service worker must:

- Cache the app shell
- Use a clear cache version
- Never cache private draft content
- Fail gracefully
- Provide an update/reload path
- Avoid caching the entire music library by default

### 10.4 Safari Data Warning

Communicate that:

- Clearing Safari website data may remove local drafts.
- Changing domains creates separate storage.
- Exporting important work is essential.

Keep warnings visible but not intrusive.

---

## 11. Accessibility and Input

- Keyboard navigation where practical
- Visible focus indicators
- Sufficient contrast
- iPad-sized touch targets
- Labeled controls
- Reduced-motion support
- No information conveyed only by color
- Screen-reader-friendly names
- No hover-only behavior
- Optional, user-enabled typing sounds
- No sound autoplay

---

## 12. Technical Direction

### 12.1 Initial Architecture

Continue with plain:

- HTML
- CSS
- JavaScript
- PWA manifest
- Service worker

Refactor into modules as needed.

Suggested structure:

```text
/
├── index.html
├── manifest.webmanifest
├── service-worker.js
├── assets/
│   ├── backgrounds/
│   ├── characters/
│   ├── gallery/
│   ├── music/
│   └── sounds/
├── data/
│   ├── facts.json
│   ├── encouragement.json
│   ├── gallery.json
│   └── albums.json
├── src/
│   ├── app.js
│   ├── components/
│   ├── services/
│   └── styles/
└── docs/
    ├── PRD.md
    ├── PROJECT_STATUS.md
    └── DECISIONS.md
```

Adapt to the existing project where necessary.

### 12.2 Framework Decision

Do not migrate to React, Vue, Svelte, or another framework merely because the app is growing.

Propose a framework only when:

- The current architecture causes concrete maintenance problems
- State management is producing bugs
- Testing/reuse would materially improve
- A migration plan preserves local data
- The user explicitly approves it

### 12.3 Backend Decision

Do not add a backend during early phases.

A backend may be considered only for:

- Authenticated private canon access
- Supported AI Q&A
- Cross-device sync
- Secure cloud backups
- Private media hosting

Every backend proposal must include:

- Purpose
- Privacy implications
- Cost
- Maintenance burden
- Authentication design
- Migration plan
- Static/local alternative

---

## 13. Privacy and Security

The app must not:

- Upload drafts silently
- Include drafts in deployed files
- Log manuscript text
- Use analytics without approval
- Send text to AI APIs
- Store secrets in client-side JavaScript
- Treat an obscure URL as authentication

Static deployments may expose:

- HTML
- CSS
- JavaScript
- Bundled images
- Bundled MP3s
- Static JSON
- Any manuscript index included in deployment

Therefore:

- Never deploy full manuscript text without approval.
- Never upload private files accidentally.
- Never commit secrets.
- Never assume a private repository makes a deployed site private.

---

## 14. Metrics Definitions

### Session Word Count

Net words added since the current session began.

### Today’s Word Count

Net word-count change on the current local calendar date.

### Total Manuscript Word Count

Initially entered manually. Later may be calculated from imported files.

### Last Autosave

Timestamp of the last successful local save.

### Last Export

Timestamp of the last successful manual export.

### Writing Streak

Future metric. A day counts after a configurable minimum word count.

---

## 15. Phased Delivery Plan

### Phase 0 — Audit and Safeguard Existing Quiet Draft

**Goal:** Protect current functionality before restructuring.

Requirements:

- Inventory files and architecture
- Document local-storage keys
- Verify export and offline behavior
- Create Git repository if absent
- Commit/tag working baseline
- Add this PRD
- Add `PROJECT_STATUS.md`
- Add `DECISIONS.md`
- Confirm no drafts/private content are deployable

Acceptance criteria:

- Existing Quiet Draft still works
- Existing drafts remain accessible
- Source control can restore the app
- Storage keys are documented
- Baseline offline test succeeds

---

### Phase 1 — Dark Command-Center Shell

**Goal:** Build the responsive shell without changing editor behavior.

Requirements:

- Dark design tokens
- Compact header
- Highlights panel
- Three-column layout
- Wide center workspace
- Existing editor embedded in center
- Focus mode
- Responsive narrow layout
- Placeholder modules for:
  - Character facts
  - Mabel encouragement
  - Image preview
  - Music player
  - Tool switcher
- Preserve drafts, backgrounds, sounds, exports, and storage keys

Acceptance criteria:

- Works on desktop
- Works on iPad landscape
- Usable in iPad portrait
- Focus mode enters/exits correctly
- Existing drafts survive
- Export still works
- Offline shell works
- No future modules are overbuilt

---

### Phase 2 — Character, Encouragement, and Image Modules

**Goal:** Add low-risk supporting modules.

Requirements:

- Data-driven Tabi/Norielle fact card
- Data-driven Mabel card
- Random content on launch
- Manual next controls
- Image preview from bundled gallery
- Random image on launch
- Image navigation
- Optional captions
- Missing-asset handling

Acceptance criteria:

- Content loads from data files
- Facts/images can be added without source-code changes
- Missing content does not crash the app
- Modules do not interfere with typing
- Included assets work offline

---

### Phase 3 — Discography Player

**Goal:** Add music without bloating the PWA.

Requirements:

- Data-driven albums/tracks
- Artwork and metadata
- Play/pause
- Previous/next
- Seek
- Volume
- Shuffle
- Repeat
- Remember track
- No autoplay
- No automatic full-library caching
- Graceful missing-file behavior

Acceptance criteria:

- Works in desktop browsers
- Works in iPad Safari/PWA
- Writing continues during playback
- Focus mode does not unexpectedly stop playback
- No sound without user action
- App shell stays lightweight

---

### Phase 4 — Writing Metrics and Highlights

**Goal:** Make the highlights panel useful.

Requirements:

- Current project
- Current draft/phase
- Current scene/chapter
- Session words
- Today’s words
- Last autosave
- Last export
- Manual manuscript total
- Local persistence
- Metric limitations documented

Acceptance criteria:

- Metrics update during typing
- Reload does not corrupt metrics
- Local-date behavior is tested
- Export timestamp updates correctly
- Manual total persists
- Metrics remain visually quiet

---

### Phase 5 — Tool Center

**Goal:** Add an extensible launcher/workspace.

Requirements:

- Write
- Wiki launcher
- Motif report launcher
- Timeline placeholder/launcher
- Discography
- Image library
- NotebookLM/Gemini Notebook launcher
- Prepared-question copy
- Active-tool state
- Preserve draft when switching
- Data-driven tool registry where practical

Acceptance criteria:

- Switching does not lose draft text
- External tools open safely
- New launchers are easy to add
- Unsupported NotebookLM integration is not attempted
- Writing remains the default tool

---

### Phase 6 — Canon Search Integration Study and Prototype

**Goal:** Choose a safe iPad canon-search architecture.

Compare:

1. External Streamlit wiki
2. Static browser index
3. Private authenticated backend

Document for each:

- Privacy
- Hosting
- Offline behavior
- Performance
- Complexity
- Ongoing cost
- Manuscript exposure risk
- Migration effort

Acceptance criteria:

- User explicitly approves architecture
- Manuscript is not publicly deployed accidentally
- Search remains chronological
- Track titles remain included
- Existing wiki behavior is preserved or documented
- Basic search does not require an AI API

---

### Phase 7 — Advanced Creative Tools

Possible future tools:

- Motif report
- Character pages
- Song database
- Timeline explorer
- Scene board
- Dialogue explorer
- Continuity checker
- Repetition detector
- Canon notes
- Project watchlists
- Browser manuscript import

Each requires its own scoped requirements before implementation.

---

### Phase 8 — Optional Private Intelligence Layer

Not approved by default.

Potential capabilities:

- Grounded manuscript Q&A
- Private authenticated canon server
- API-based AI assistant
- Cross-device sync
- Encrypted cloud backup

Before implementation, provide:

- Threat model
- Privacy review
- Cost estimate
- Data-flow diagram
- Authentication plan
- Vendor/API terms
- Local-only alternative
- Explicit user approval

---

## 16. Testing Requirements

After every phase verify:

- Existing draft loads
- Typing works
- Autosave works
- Export works
- Copy all works
- Background selection works
- Typing sounds work after user activation
- Focus mode works
- Reload preserves data
- Offline launch works
- No normal-use console errors

Minimum targets:

- Desktop Chrome
- Desktop Safari
- iPad Safari
- Installed iPad PWA
- iPad landscape
- iPad portrait
- Magic Keyboard
- Airplane Mode after caching

Performance requirements:

- Fast startup
- Responsive typing
- No large blocking scripts
- Lazy-load large media
- Do not index the manuscript during editor startup
- Do not preload all MP3s

---

## 17. Deployment Requirements

Early static hosts may include:

- Netlify
- Cloudflare Pages
- GitHub Pages
- Vercel

Before deployment verify:

- `index.html` is in the correct root
- Asset paths work
- Service-worker scope is correct
- Manifest paths work
- No localhost references
- No drafts included
- No secrets included
- No private manuscript index included without approval
- App/cache version updated when required

Before major updates:

- Export current drafts
- Verify storage migration
- Test on staging when practical

---

## 18. Documentation Requirements

Maintain:

```text
docs/
├── PRD.md
├── PROJECT_STATUS.md
└── DECISIONS.md
```

### `PROJECT_STATUS.md`

Include:

- Current phase
- Completed work
- In-progress work
- Known bugs
- Next approved task
- Last tested deployment
- Current app version

### `DECISIONS.md`

Each entry includes:

- Decision number
- Date
- Decision
- Reason
- Alternatives considered
- Consequences

---

## 19. Codex Operating Instructions

Before making changes, Codex must:

1. Read this PRD.
2. Read `PROJECT_STATUS.md`.
3. Read `DECISIONS.md`.
4. Inspect the current implementation.
5. Identify the current approved phase.
6. Preserve drafts and storage keys.
7. Limit changes to the requested task.
8. Avoid unrelated refactors.
9. Run relevant tests.
10. Update `PROJECT_STATUS.md`.
11. Record meaningful architectural decisions.
12. Summarize changed files and tests.

Standard implementation instruction:

```text
Read docs/PRD.md, docs/PROJECT_STATUS.md, and docs/DECISIONS.md before making changes.

Implement only the requested feature within the current approved phase.

Do not implement future-phase functionality unless it is strictly necessary for the requested work.

Preserve existing local drafts, storage keys, export behavior, PWA behavior, backgrounds, typing sounds, and user preferences.

Do not refactor unrelated working code.

Do not add a backend, external API, analytics, cloud sync, authentication, or framework migration without explicit approval.

Run the relevant tests and update docs/PROJECT_STATUS.md when complete.
```

---

## 20. Definition of Done

A feature is complete only when:

- It satisfies its requirements
- It works on intended devices
- It does not regress draft safety
- It does not add unapproved scope
- It handles error states
- It has been tested
- Documentation is updated
- Architectural choices are recorded
- The user can understand how to use it

A phase is complete only when all acceptance criteria pass.

---

## 21. Initial Success Criteria

The first meaningful release succeeds when the user can:

1. Open the installed PWA on iPad.
2. See a dark, responsive command-center dashboard.
3. Write in the center editor.
4. Enter full-screen atmospheric focus mode.
5. Use background images and typing sounds.
6. Autosave locally.
7. Export clean text for Scrivener.
8. See basic project metrics.
9. Enjoy character facts and Mabel encouragement.
10. View Dreamspeak artwork.
11. Play selected Calamities/Stillfire tracks.
12. Open supporting tools from one location.
13. Use the core writing experience offline.
14. Trust that draft text is not uploaded silently.

---

## 22. Future Product Possibilities

Ideas only, not approved requirements:

- Character relationship graph
- Interactive trilogy timeline
- Song and album encyclopedia
- Motif watchlists
- Scene cards
- Continuity warnings
- Draft comparison
- Chapter import/export
- Private AI canon assistant
- Optional encrypted sync
- Native iPad wrapper
- Third Night Memory Press project dashboard

Codex must not implement these merely because they appear here.

---

## 23. Final Product Statement

Dreamspeak Command Center is a purpose-built creative environment for one author and one fictional universe.

It should make writing inviting, preserve the safety and portability of plain text, and place the world of *Dreamspeak* within easy reach without allowing tools, metrics, media, or novelty to overshadow the work itself.

When priorities conflict, use this order:

1. Draft safety
2. Writing usability
3. Privacy
4. Offline reliability
5. Accessibility
6. Performance
7. Creative atmosphere
8. Additional features
