# Phase 6 — Canon Search Architecture Study

**Date:** 2026-07-19

**Status:** Strategy B and the read-only prototype scope approved by the user on 2026-07-19

## Decision to make

Choose how Dreamspeak Command Center should search the proprietary canon archive on iPad without accidentally publishing the manuscript.

The user approved Strategy B. This document remains the architecture record for the read-only prototype.

## Non-negotiable constraints

- Manuscript prose, private notes, motifs, and generated indexes must never enter the public repository or deployment.
- Basic search must not require AI, embeddings, an external API, or cloud sync.
- Search results must remain in manuscript order.
- Track and chapter titles must remain attached to their chunks.
- The accepted Quiet Draft draft, PWA, offline, atmosphere, gallery, and music behavior must remain unchanged.
- Any loss of existing Wiki behavior must be identified rather than silently omitted.

## Existing Wiki baseline

The current local Wiki is a Python and Streamlit application backed by SQLite FTS5. Its database is approximately 2.5 MB and contains 4,644 chunks numbered from 1 through 4,644. Each chunk stores:

- `chunk_number`
- `chapter_title`, which also carries detected track titles
- manuscript text

Search and motif results are explicitly ordered by `chunk_number`. The Wiki also provides neighboring context, private notes, motif reports, and Markdown motif-report export. These behaviors remain the comparison baseline.

No manuscript prose was needed for this study.

## Summary matrix

| Criterion | A. External Streamlit Wiki | B. Device-local browser index | C. Private authenticated backend |
|---|---|---|---|
| Privacy | Excellent only while Mac-local; otherwise corpus moves to a host | Best match: corpus remains in Files and the iPad browser | Strong access control, but corpus is stored remotely |
| Hosting | Local Mac, Streamlit Community Cloud, or self-hosted server | Public shell only; private export is never deployed | Worker/backend, database, domain, and access gate |
| Airplane Mode | No on iPad | Yes after explicit local import | No, except separately cached local data |
| Search performance | Excellent SQLite FTS5; network latency when hosted | Good for the current 4,644-chunk / 2.5 MB archive | Excellent server-side FTS5 plus network latency |
| Complexity | Low locally; medium when securely hosted | Medium | Highest |
| Ongoing cost | Mac-local is free; Community Cloud is currently free | None beyond existing hosting | Can fit current free tiers; requires monitoring and may become paid |
| Exposure risk | Medium when hosted; provider and repository permissions matter | Lowest if export files are excluded from Git and imported explicitly | Low to medium; policy, token-validation, and backend mistakes matter |
| Migration effort | Lowest | Moderate | Moderate to high |
| Existing behavior | Preserved almost unchanged | Search/context first; notes and report-writing need separate migration | Can eventually preserve most behavior |

## A. External Streamlit Wiki

### Architecture

Keep the existing Python, Streamlit, and SQLite application. Either run it on the Mac, deploy it as a private Streamlit Community Cloud application, or self-host it behind an access gate.

### Assessment

- **Privacy:** The current Mac-local version keeps everything private. A hosted version requires the manuscript database and application runtime to leave the devices. Streamlit private apps require authenticated, explicitly permitted viewers, but security remains a shared responsibility.
- **Hosting:** Community Cloud deploys from GitHub and can mark an app private. Current documentation says Community Cloud permits one private app at a time and requires repository access for private deployments.
- **Offline:** The iPad cannot use a Mac-local Streamlit app while traveling unless the Mac is reachable. Hosted Streamlit also requires a network connection.
- **Performance:** Existing SQLite FTS5 behavior and chronology can remain unchanged. Hosted use adds network and cold-start latency.
- **Complexity:** Lowest code migration. Secure hosting, repository permissions, secrets, backups, and availability add operational work.
- **Ongoing cost:** Community Cloud is currently free. A self-hosted service may incur hosting and domain costs.
- **Exposure risk:** Higher than the current local system because the corpus must be present on a third-party host or reachable server. A public/private setting or repository-permission error could expose it.
- **Migration effort:** Low; most existing Wiki code can remain.

### Conclusion

Best for quickly reaching the existing Wiki online, but it conflicts with the strongest requirements: local-only manuscript custody and Airplane Mode.

## B. Device-local browser index — recommended

### Architecture

Keep the public Command Center shell unchanged. Add a generic Mac export script that reads the existing SQLite `chunks` table and creates a private, versioned canon package. Transfer that package to the iPad through AirDrop or Files, then import it explicitly into a separate IndexedDB database. Search happens entirely in the browser.

The generated package is treated like the manuscript itself:

- excluded from Git
- never fetched by the app
- never placed in the service-worker cache
- never logged
- imported only after a file-picker action

### Assessment

- **Privacy:** Best alignment with the approved architecture. Only generic code is public; prose stays on the Mac, in Files, and in device-local browser storage.
- **Hosting:** No new private host or authentication system is required. GitHub Pages continues serving code only.
- **Offline:** Full search can work in Airplane Mode after import.
- **Performance:** The current archive is small enough for an in-memory browser search after loading records from IndexedDB. Results can always be sorted numerically by `chunk_number`, independent of match scoring.
- **Complexity:** Requires an exporter, schema validation, IndexedDB import/removal, search UI, snippets, and context display. It avoids backend and identity operations.
- **Ongoing cost:** No additional service cost.
- **Exposure risk:** Lowest remote-exposure risk. Remaining risks are device loss, accidentally committing an export, browser-data deletion, and Safari storage eviction.
- **Migration effort:** Moderate. The existing ingest process and chunk schema can be reused; the Streamlit presentation and SQLite query layer must be reimplemented for the prototype.

### Recommended prototype boundary

The first prototype should include:

1. A generic Mac exporter that emits a versioned private canon package from `chunks`.
2. An explicit **Import Canon Archive** action inside the Wiki tool.
3. A separate `dreamspeak-canon` IndexedDB database so no accepted storage schema is touched.
4. Local word and quoted-phrase search without AI.
5. Chronological results using numeric `chunk_number`.
6. Track/chapter title, safe text snippet, and previous/current/next context.
7. Archive metadata, replacement, and local removal controls.
8. Offline relaunch and search.
9. Synthetic test fixtures only in the repository and automated tests.

The first prototype should **not** include editable private notes or motif-report generation. Those remain fully available in the Mac Streamlit Wiki and will be documented as deferred behavior. This avoids creating two divergent writable note databases before a synchronization policy exists. The existing Phase 5 Wiki and Motifs launchers remain available.

### Storage limitation

IndexedDB is designed for significant structured browser data, but browser storage is best-effort by default. Safari may evict data under storage pressure or after prolonged non-use, and users can delete it manually. The original manuscript and generated canon package therefore remain the backup and source of truth.

### Conclusion

This is the best Phase 6 choice because it satisfies the user's explicit local-assets model, works offline on iPad, costs nothing extra, and fits the current archive size.

## C. Private authenticated backend

### Architecture

Move the searchable archive to a private service such as Cloudflare Workers plus D1, protect every route with Cloudflare Access, and query it from an authenticated Wiki application. D1 currently supports SQLite FTS5, so the existing search model has a credible migration path.

### Assessment

- **Privacy:** Strong access controls, but the manuscript is still copied to Cloudflare infrastructure. Cloudflare Access applications are deny-by-default when correctly configured.
- **Hosting:** Requires an active Cloudflare domain, Worker or Pages Functions, D1, Access application, identity policy, data-import procedure, and backups.
- **Offline:** Search requires connectivity. Adding a full local cache would recreate much of Strategy B and increase complexity.
- **Performance:** Server-side FTS5 should be fast for this archive; each search incurs network latency.
- **Complexity:** Highest. Authentication is not enough by itself: the origin must validate Access tokens, queries must be parameterized, policies must be tested, and deployment/backup procedures must be maintained.
- **Ongoing cost:** Current Cloudflare Access, Workers, and D1 free tiers are likely sufficient for a single-user prototype. Free-tier limits and pricing can change; Workers Paid currently starts at a monthly subscription if needed.
- **Exposure risk:** Lower than public static deployment, but not zero. Cloudflare warns that broad Allow/Bypass policies can expose applications; origin token validation is required.
- **Migration effort:** Moderate to high. D1 supports FTS5 and SQLite semantics, but the Streamlit UI, notes, report export, access flow, and deployment pipeline must be redesigned.

### Conclusion

Best future option if automatic Mac/iPad synchronization and centrally updated canon become more important than offline use and local-only custody. It is unnecessary operational risk for the present single-user, travel-first requirement.

## Recommendation

Approve **Strategy B: device-local browser index**, specifically the explicit-import variant described above.

This recommendation does not publish or host the canon package. Cloudflare Access remains a viable later migration path, not a Phase 6 dependency. The Mac Streamlit Wiki remains the authoritative writable archive during the prototype.

## Required approval

Prototype work may begin only after the user explicitly approves one of:

- **B — Device-local browser index (recommended)**
- **A — External Streamlit Wiki**
- **C — Private authenticated backend**

Approval of B also confirms that Phase 6 prototype notes and motif-report editing may remain in the Mac Wiki while iPad canon search is read-only.

## Current official references

- [Streamlit private-app sharing](https://docs.streamlit.io/deploy/streamlit-community-cloud/share-your-app)
- [Streamlit Community Cloud trust and security](https://docs.streamlit.io/deploy/streamlit-community-cloud/get-started/trust-and-security)
- [Streamlit authentication with OIDC](https://docs.streamlit.io/develop/concepts/connections/authentication)
- [MDN IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [MDN browser storage quotas and eviction](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)
- [Cloudflare Access application types](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/choose-application-type/)
- [Cloudflare Access policies and common misconfigurations](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/)
- [Cloudflare self-hosted application setup](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/)
- [Cloudflare D1 supported SQL and FTS5](https://developers.cloudflare.com/d1/sql-api/sql-statements/)
- [Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [Cloudflare Zero Trust pricing](https://www.cloudflare.com/plans/zero-trust-services/)
