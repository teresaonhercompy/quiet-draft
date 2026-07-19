# Quiet Draft

Quiet Draft is a small, distraction-free writing app for drafting novel scenes on an iPad. It runs entirely in the browser, saves the current draft on the device, and works offline after its first successful load.

There is no login, cloud sync, AI, analytics, or external service. Draft text is stored only in the browser's local storage. Export or copy the text when you are ready to move it into Scrivener.

## Features

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
4. Confirm the name **Quiet Draft**, then tap **Add**.
5. Launch Quiet Draft once from the new Home Screen icon while online so the offline files can finish caching.
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

No build step or package installation is required.
