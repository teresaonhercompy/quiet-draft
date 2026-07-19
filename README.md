# Dreamspeak Command Center — Quiet Draft

Dreamspeak Command Center is a dark, local-first creative shell built around Quiet Draft, its distraction-free scene editor for iPad. Phase 4 adds quiet writing metrics and persistent project context while keeping every writing and supporting-module behavior intact. It runs entirely in the browser, saves the current draft on the device, and works offline after its first successful load.

There is no login, cloud sync, AI, analytics, or external service. Draft text is stored only in the browser's local storage. Export or copy the text when you are ready to move it into Scrivener.

## Features

- Dark, responsive Command Center shell with a three-column iPad-landscape layout
- Editor-first portrait layout with supporting modules stacked afterward
- Random Tabi/Norielle facts from a private, device-local JSON library
- Random authored Mabel messages with a manual **Next Message** control
- Offline image preview with previous, random, and next controls
- Private gallery-image imports stored only on the current device
- Private local discography with albums, tracks, artwork, seek, volume, shuffle, and repeat
- Remembered music selection and playback position without autoplay
- Current project, draft, and scene/chapter highlights
- Session words, today’s net words, last autosave, last export, and manual manuscript total
- Quiet placeholders for future tools and the separate local Wiki
- Full-screen, responsive writing space
- Automatic local saving while you type
- Manual **Save Locally** button and `Command-S` shortcut
- Live word and character counts
- Plain-text export with the title and current date in the filename
- Copy the title and draft to the clipboard
- Focus mode with `Command-Shift-F`; press `Escape` to leave it
- Light and dark themes
- Optional local atmosphere backgrounds with readable editor opacity
- Opt-in Web Audio typing sounds with three styles, volume, and mute controls
- Local custom sound uploads stored in the browser with IndexedDB
- Dark Glass editor appearance for white text over a visible background scene
- Offline PWA app shell
- iPad safe-area support and keyboard-friendly controls

Quiet Draft Version 1 keeps one current draft. Starting a new draft replaces that current local draft, so export anything you want to archive permanently.

## Run locally on a Mac

Opening `index.html` directly is not enough to test offline mode. Serve the folder from a local web server instead.

1. Open Terminal.
2. Change into the Quiet Draft folder:

   ```bash
   cd "/path/to/quiet-draft"
   ```

3. Start the server included with macOS Python:

   ```bash
   python3 -m http.server 8080
   ```

4. Open [http://localhost:8080](http://localhost:8080) in Safari or Chrome.

5. Type a little, wait for the “Saved locally” message, then refresh to confirm the draft returns. To test offline behavior, load the page once, use the browser's developer tools to switch the network offline, and refresh.

Stop the server by returning to Terminal and pressing `Control-C`.

## Add to the iPad Home Screen

For a complete walkthrough—including private on-device background images, custom typing sounds, offline testing, backups, and troubleshooting—see [IPAD_SETUP.md](IPAD_SETUP.md).

For reliable offline installation, the app must be opened from a secure `https://` address. Upload the contents of this folder unchanged to any static HTTPS web host you control. The host only serves the app files; draft text stays in Safari on the iPad and is never uploaded by Quiet Draft.

Then on the iPad:

1. Open the HTTPS address in Safari while online.
2. Tap the **Share** button.
3. Choose **Add to Home Screen**. If it is not visible, choose **Edit Actions** and add it.
4. Confirm the name **Dreamspeak**, then tap **Add**.
5. Launch Dreamspeak once from the new Home Screen icon while online so the offline files can finish caching.
6. Test by turning on Airplane Mode and reopening the app.

Safari controls each site's local storage. Clearing Safari website data or removing its stored data can erase the current draft, so use **Export .txt** regularly for anything important.

## Deploy with GitHub Pages

This repository includes `.github/workflows/pages.yml`. Every push to `main` regenerates `backgrounds/backgrounds.json` from every supported image in the folder and deploys the static app to GitHub Pages.

For a new repository:

1. Push the contents of this folder to the repository's `main` branch.
2. Open **Settings → Pages** in GitHub.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and confirm that **Deploy Quiet Draft to GitHub Pages** completes.
5. Open the URL shown by the deployment, launch it once online, and then add it to the iPad Home Screen.

The published app and any background images committed to the repository are public. Drafts, locally added backgrounds, and locally uploaded sounds remain in the browser and are never committed or uploaded by Quiet Draft.

## Private Phase 2 content

The public repository intentionally contains no manuscript-derived facts or private character art. Select **Import Library** in either character card to choose a JSON library from Files. The imported facts and messages are stored in the app's local IndexedDB database on that device and remain available offline.

Use **Add Local Images** in Image Preview to add private artwork. Those images are copied into the same device-local database and are not uploaded. The four previously approved public background scenes are the included offline gallery.

The import file format is:

```json
{
  "facts": [
    {
      "id": "unique-fact-id",
      "speaker": "Tabi",
      "category": "Canon",
      "text": "The approved fact text.",
      "nonCanon": false
    }
  ],
  "encouragement": [
    {
      "id": "unique-message-id",
      "text": "The authored message."
    }
  ]
}
```

## Private local discography

Open **Manage Local Library**, choose **Add Tracks**, and select audio files from Files. Tagged MP3 files automatically supply their title, artist, album, track number, and embedded cover art. The artist/album fields and **Add Album Art** remain available as fallbacks for untagged files and formats whose tags are not read.

Audio, tags, and artwork are read locally and copied into IndexedDB only after an explicit import. They are not committed, uploaded, streamed, or placed in the service-worker cache. The player never starts automatically and pauses when the app leaves the foreground. It remembers the selected track, approximate position, volume, shuffle, and repeat preferences for the next launch.

MP3, M4A, and WAV are the safest iPad formats. Embedded metadata is currently read from ID3-tagged MP3 files; other formats use the fallback fields and filename-derived title. Retain every original in Files, and remember that Safari may remove local website data when storage is cleared or under device pressure.

## Writing metrics and highlights

Edit **Current project**, **Scene / chapter**, and **Manuscript total** directly in the Highlights panel. Those values, today’s net word change, and the last export time use the local-only `dreamspeak.writing-metrics.v1` record. The current draft comes from the existing title field, and the last autosave comes from the existing draft record.

**Session words** begin at zero whenever the app launches or reloads. **Today’s words** records net words added or removed through editor input on the current device and resets when the app observes a new local calendar date. Starting a new draft does not count clearing the previous draft as negative writing. These are drafting aids rather than a manuscript audit; they do not scan Scrivener, imported manuscripts, or writing performed on another device.

## Optional local background images

Quiet Draft includes CSS fallback art, so no image files are required. It now discovers any `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, or `.avif` file inside the `backgrounds` folder when the web host exposes a directory listing. Discovered files appear under **Backgrounds Folder** in the Scene menu. Use **Refresh folder** after adding files.

Some static HTTPS hosts intentionally hide directory listings, and browser security does not otherwise allow a web app to enumerate a server folder. On those hosts and on iPad, use **Add background images** in Atmosphere. Selected images appear under **My Backgrounds** and are stored privately in the browser's IndexedDB. This route works with arbitrary filenames and does not upload the images anywhere.

Include the `backgrounds` folder when copying or hosting the app. Folder images that have been loaded online are cached for offline use.

## Receiving app updates

Quiet Draft uses an online-first service worker for app files and a cache fallback when offline. When replacing an older installation, launch the app once while online, wait a few seconds, close it completely, and relaunch it. That lets the new service worker take control. Future updates should then appear on the first online relaunch.

## Custom typing sounds

Open **Atmosphere**, enable typing sounds, and choose **Add your own sounds**. You can select several short audio files at once. Compatible files are added under **My Sounds** in the Sound style menu, where each file can be selected or removed.

Custom audio is stored in the browser's IndexedDB on that device. It is not added to the app folder, uploaded, or synced elsewhere. WAV, MP3, and M4A are the safest formats across current browsers; support for CAF, AIFF, AAC, and OGG depends on the browser. Each file is limited to 8 MB.

## Dark Glass editor

The **Dark Glass** editor appearance uses white text on a translucent charcoal panel, allowing substantially more of the selected background to remain visible. Use **Panel strength** to adjust the balance. **Light Paper** remains available for the original appearance.

## Files

- `index.html` — app structure and iPad/PWA metadata
- `styles.css` — responsive light, dark, and focus-mode design
- `app.js` — writing, local saving, counts, copy, and export behavior
- `manifest.webmanifest` — install settings
- `service-worker.js` — offline app cache
- `icon.svg` — local app icon
- `data/` — public, non-proprietary module metadata and authored messages

No build step or package installation is required.

## Dreamspeak Command Center project documents

Future phased work is governed by the [product requirements](docs/PRD.md), [current project status](docs/PROJECT_STATUS.md), [decision log](docs/DECISIONS.md), and [Phase 0 safeguard audit](docs/PHASE_0_AUDIT.md). Read all four before changing application behavior or browser storage.
