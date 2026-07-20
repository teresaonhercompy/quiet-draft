# Dreamspeak Command Center: iPad Setup and Local Atmosphere Guide

This guide covers installing Dreamspeak Command Center with its Quiet Draft editor on an iPad, preparing private content, background images, gallery images, and typing sounds in the Files app, importing those assets privately onto the iPad, and using the app offline.

Quiet Draft is hosted at:

<https://teresaonhercompy.github.io/quiet-draft/>

## What “local” means

Quiet Draft supports two different kinds of atmosphere assets:

| Method | Where the asset is stored | Private? | Available offline? | Best use |
| --- | --- | --- | --- | --- |
| **Import Library**, **Add Local Images**, **Add background images**, or **Add your own sounds** inside the app | In the installed web app’s private browser database on that iPad | Yes | Yes | Facts, messages, personal images, and sounds |
| Images committed to the repository’s `backgrounds` folder | On GitHub Pages with the public app | No | Yes, after the image has been loaded | Backgrounds that should appear on every device |

Custom typing sounds are intentionally supported only through the private, on-device import workflow. Quiet Draft does not upload them to GitHub.

Drafts, imported facts, gallery images, local backgrounds, local sounds, and atmosphere settings are not synchronized between devices. Keep every original file in the Files app as a backup.

## Before you begin

You will need:

- An iPad with Safari and an internet connection for the initial installation.
- The Quiet Draft address shown above.
- Any personal background images or typing sounds saved in the iPad’s **Files** app.
- A few minutes online after installation so the offline cache can finish.

For the most predictable storage behavior, install Quiet Draft first and then import your personal assets from inside the Home Screen app. Do not import the assets in a temporary or Private Browsing tab.

## 1. Prepare a local asset folder on the iPad

This step is optional, but it makes backups and future reinstallation much easier.

1. Open the **Files** app.
2. Tap **Browse** in the sidebar.
3. Under **Locations**, choose **On My iPad**.
4. Create a folder named `Quiet Draft Assets`.
5. Inside it, create four folders:
   - `Backgrounds`
   - `Gallery Images`
   - `Music`
   - `Typing Sounds`
6. Copy or move your wallpaper files into `Backgrounds`.
7. Copy or move private character and project art into `Gallery Images`.
8. Copy or move full songs and album artwork into `Music`, preferably organized into one folder per album.
9. Copy or move short keystroke files into `Typing Sounds`.
10. Keep `Dreamspeak_Phase2_Content.json` at the top level of `Quiet Draft Assets`.

Files stored under **On My iPad** stay on the device. If you prefer to keep backup copies in iCloud, create the same folder under **iCloud Drive** instead. Selecting an iCloud Drive file in Quiet Draft imports a private copy into the app, but the original remains in iCloud Drive.

Apple’s Files guide explains where downloaded files appear: [Find downloaded files on iPad](https://support.apple.com/en-gb/guide/ipad/ipad8cef35dc/ipados).

### Recommended background formats

- JPG or WebP for photographs and artwork.
- PNG for images that need transparency.
- GIF and AVIF are accepted when the iPad can decode them.
- A landscape or near-square image generally crops well in both iPad orientations.
- A long edge of roughly 2,000–3,000 pixels is usually enough for an iPad screen.
- Keep each image below **15 MB**.
- Quiet Draft accepts up to **20 images in one import**.

Very large images consume more local storage and may take longer to appear. A high-quality JPG is usually the simplest choice.

### Recommended sound formats

- WAV, MP3, and M4A are the safest choices on iPad.
- CAF, AIFF, AAC, and OGG may work when Safari supports the file’s codec.
- Use a short, clean sound—usually under 0.25 seconds—for comfortable repeated typing.
- Trim silence from the beginning of the file so the response feels immediate.
- Keep each sound below **8 MB**.
- Quiet Draft accepts up to **20 sounds in one import**.

Each imported sound becomes a separate selectable style. Quiet Draft slightly lowers the playback pitch for Space and Enter, so a single short key sound can cover all three key types.

## 2. Install Dreamspeak Command Center on the Home Screen

1. Open **Safari** on the iPad.
2. Visit <https://teresaonhercompy.github.io/quiet-draft/>.
3. Wait until the editor and the **Atmosphere** button are visible.
4. Tap Safari’s **Share** button.
5. Tap **More** if necessary, then choose **Add to Home Screen**.
6. Turn on **Open as Web App** when that option is shown.
7. Leave the name as **Dreamspeak** and tap **Add**.
8. Return to the Home Screen and open Dreamspeak from its new icon.
9. Keep the iPad online for about 10 seconds during this first launch.

Apple’s current instructions use **Share → More → Add to Home Screen**, followed by **Open as Web App**: [Turn a website into an app in Safari on iPad](https://support.apple.com/en-ph/guide/ipad/ipad8f1f7a29/ipados/26).

If **Add to Home Screen** is missing, confirm that you opened the site in Safari rather than inside another app’s embedded browser. Scroll through the Share actions or use **More**.

## 3. Confirm local draft saving

Before importing atmosphere assets, verify that the app’s local storage is working:

1. Enter a temporary title such as `Storage Test`.
2. Type one sentence in the editor.
3. Wait for **Saved locally** at the bottom of the screen.
4. Close Quiet Draft from the app switcher.
5. Reopen it from the Home Screen.
6. Confirm that the title and sentence return.
7. Tap **New Draft** if you no longer need the test text.

Quiet Draft Version 1 stores one current draft. Use **Export .txt** regularly for writing you cannot afford to lose.

## 4. Import the private character library

1. Copy `Dreamspeak_Phase2_Content.json` from the Mac's `Dreamspeak_Codex/private-import` folder into the iPad Files app.
2. Open Dreamspeak from the Home Screen.
3. Find either the **Tabi & Norielle** card or the **Mabel** card beneath the editor in portrait orientation.
4. Tap **Import Library**.
5. Choose `Dreamspeak_Phase2_Content.json` from Files.
6. Wait for the confirmation showing the number of imported facts and messages.
7. Test **Next Fact** and **Next Message**.

The manuscript-derived library is never part of GitHub Pages. The selected JSON is read directly from Files and stored only in the installed app's browser database. Keep the JSON file as a backup.

## 5. Import private gallery images

1. Open the **Image Preview** card.
2. Tap **Add Local Images**.
3. Choose one or more files from `Quiet Draft Assets → Gallery Images`.
4. Wait for the import confirmation.
5. Use the previous, random, and next controls to browse the gallery.

Local gallery images stay on the current device. The filename becomes the initial title; captions are optional and the app works without them.

## 6. Import private background images

Import personal backgrounds from inside the installed Home Screen app so they are associated with that installation.

1. Open Quiet Draft from the Home Screen.
2. Tap **Atmosphere**.
3. Under **Background**, tap **Add background images**.
4. In the file picker, open:
   - **On My iPad → Quiet Draft Assets → Backgrounds**, or
   - your chosen iCloud Drive folder.
5. Select one or several images, then confirm the selection.
6. Wait for the confirmation message that the images were added.
7. Open the **Scene** menu.
8. Choose an image under **My Backgrounds**.

The selected files are copied into Quiet Draft’s private IndexedDB storage. They are not uploaded to GitHub or another server. The originals in Files remain untouched.

### Make the image more visible

1. In **Atmosphere**, set **Editor appearance** to **Dark Glass**.
2. Lower **Panel strength** to reveal more of the background.
3. Raise the strength if the white text needs more contrast.
4. Use focus mode after closing Atmosphere for the most immersive view.

### Remove a local background

1. Open **Atmosphere**.
2. Select the image under **My Backgrounds**.
3. Tap **Remove selected**.
4. Confirm the removal.

This removes only Quiet Draft’s imported copy. It does not delete the original from the Files app.

## 7. Import private typing sounds

Typing sounds remain off until you explicitly enable them.

1. Open Quiet Draft from the Home Screen.
2. Tap **Atmosphere**.
3. Under **Typing sounds**, tap **Add your own sounds**.
4. In the file picker, open:
   - **On My iPad → Quiet Draft Assets → Typing Sounds**, or
   - your chosen iCloud Drive folder.
5. Select one or several short audio files and confirm.
6. Wait for the confirmation message that the custom sounds were added.
7. Open the **Sound style** menu.
8. Choose a file under **My Sounds**.
9. Turn on **Enable typing sounds**.
10. Make sure **Mute** is off.
11. Start with the volume around 20–35%, then adjust it while typing.

The final file in a multi-file import becomes the initially selected sound, but every successfully imported file remains available under **My Sounds**.

### If a sound does not import

- Confirm that it is under 8 MB.
- Try converting it to WAV, MP3, or M4A.
- Trim the file to a short key strike.
- Confirm that the iPad can play the original file in Files.
- Import the file again from inside the installed Quiet Draft app.

### Remove a local sound

1. Open **Atmosphere**.
2. Select the file under **My Sounds**.
3. Tap **Remove selected** beneath the sound controls.
4. Confirm the removal.

The built-in **Soft Click**, **Typewriter**, and **Mechanical** styles are generated by the app and cannot be removed.

## 8. Import the private discography

Tagged MP3 files can be selected across albums because Quiet Draft reads their embedded details locally. For untagged files, import one album at a time and use the fallback fields.

1. Open the **Discography** card and expand **Manage Local Library**.
2. If the files are untagged—or are not MP3s—enter the fallback artist exactly as you want it displayed.
3. Enter the fallback album title exactly as you want it displayed.
4. Tap **Add Tracks**.
5. In Files, open `Quiet Draft Assets → Music` and select that album's audio files.
6. Wait for the confirmation showing how many tracks were added.
7. Tagged MP3 cover art appears automatically. If none appears, keep the same artist and album values, tap **Add Album Art**, and select one image.
8. Repeat these steps for each album.

For ID3-tagged MP3s, the player reads the embedded title, artist, album, track number, and cover art without uploading anything. Track numbers determine album order. Untagged files and other formats use the fallback fields; their titles come from filenames with a simple leading number such as `01 -` removed. MP3, M4A, and WAV are recommended; other accepted extensions work only when Safari supports their codec.

Test play/pause, previous/next, seek, volume, shuffle, and all three repeat states. Playback begins only after tapping Play and pauses when Quiet Draft leaves the foreground. The selected track and approximate position return after reopening, but playback remains paused.

To remove music, select the album and track, expand **Manage Local Library**, and use **Remove Track** or **Remove Album**. This removes only the browser's imported copy.

## 9. Use writing metrics and highlights

The Highlights strip contains editable **Current project**, **Scene / chapter**, and **Manuscript total** fields. Tap a value to change it. The current draft name follows the Quiet Draft title automatically.

- **Session words** starts at zero each time the app launches or reloads and shows the net words added or removed during that session.
- **Today’s words** persists across reloads and resets on the next local calendar date observed by the app.
- **Last autosave** updates after a successful local save.
- **Last export** updates after **Export .txt** is used.
- **Manuscript total** is manual; enter the latest total from Scrivener when useful.

Metrics stay only on this device. They do not scan Scrivener, synchronize between Mac and iPad, include changes made outside Quiet Draft, or serve as a permanent writing ledger. Export remains the safety copy for important prose.

## 10. Import and search the private canon archive

The manuscript archive is never hosted with the app. Create and transfer it privately:

1. On the Mac, open Terminal and change into the Quiet Draft project folder.
2. Run the exporter with the actual database and private destination paths:

   ```bash
   python3 tools/export_canon_archive.py \
     --database "/path/to/dreamspeak.sqlite" \
     --output "/path/to/Dreamspeak.dreamspeak-canon.json"
   ```

3. AirDrop the resulting `.dreamspeak-canon.json` file to the iPad, or place it in a Files location you control.
4. Open Dreamspeak and tap **Wiki**.
5. Tap **Import Canon Archive**, choose the file, and wait for its title and passage count to appear.
6. Search for ordinary words or put a phrase in straight quotation marks, such as `"exact phrase"`.
7. Results remain in manuscript order. Open **Previous · current · next context** beneath a result to read its neighbors.

The imported copy stays in a separate private browser database on this iPad and remains available offline. **Replace Canon Archive** installs a newer package atomically. **Remove Local Archive** erases only the imported browser copy, not the file in Files or the source database on the Mac.

Keep the source database and exported package as backups. Safari storage is not a permanent archive and may be removed if website data is cleared or the device is under storage pressure. Never commit the generated package to GitHub; the repository ignores the expected private filename pattern.

Notes and motif-report editing remain in the authoritative Mac Wiki. Expand **Open the authoritative Mac Wiki** in the Wiki workspace if you want to preserve its reachable address on this device.

## 11. Configure and use the rest of the Tool Center

**Write** is the default each time Dreamspeak opens. Tap **Images** or **Music** to move to the corresponding local module. Switching tools saves the current draft first.

The **Motifs**, **Timeline**, and **Notebook** tabs are safe launchers:

1. Tap the tool.
2. Paste its complete `https://` or `http://` address into **Web address**.
3. Confirm the badge changes from **Local setup** to **Ready**.
4. Tap the Open button to launch it separately.

For **Notebook**, edit the prepared question and tap **Copy Question** before opening the notebook. The app copies only that question; it never copies or sends the draft automatically.

Addresses and the prepared question stay in Safari storage on this iPad. They do not sync to the Mac. NotebookLM is opened as a normal external webpage; Dreamspeak does not sign in, embed it, scrape it, or automate it.

## 12. Test offline use

1. While still online, launch Quiet Draft from the Home Screen.
2. Select every repository-hosted background you expect to use offline at least once. This lets the service worker cache the image.
3. Close and reopen the app once.
4. Turn on **Airplane Mode**.
5. Launch Quiet Draft from the Home Screen.
6. Confirm that:
   - The editor opens.
   - Your current draft appears.
   - **Next Fact** and **Next Message** work after importing the private library.
   - Included and locally imported gallery images appear.
   - Imported albums and artwork appear.
   - Music starts only after tapping Play.
   - Previous/next, seek, volume, shuffle, and repeat work.
   - A private background can be selected.
   - A private typing sound plays.
   - The Wiki search returns the same local results without a connection.
7. Turn Airplane Mode off after the test.

Locally imported backgrounds and sounds are already on the iPad and do not need a network connection. Repository-hosted backgrounds should be selected once online before relying on them during travel.

## 13. Add a public background to every installation

Use this method only for images you are comfortable making public. Any image committed to the public GitHub repository can be viewed or downloaded by other people.

From an iPad or Mac browser:

1. Open the repository: <https://github.com/teresaonhercompy/quiet-draft>.
2. Open the `backgrounds` folder.
3. Choose **Add file → Upload files**.
4. Select one or more JPG, JPEG, PNG, WebP, GIF, or AVIF images.
5. Enter a short commit message such as `Add travel backgrounds`.
6. Commit the files to `main`.
7. Open the repository’s **Actions** tab.
8. Wait for **Deploy Quiet Draft to GitHub Pages** to complete successfully.
9. Launch Quiet Draft while online.
10. Open **Atmosphere** and tap **Refresh folder** if the new image is not yet listed.
11. If an older app version remains visible, close the Home Screen app completely and relaunch it online.

The deployment automatically rebuilds `backgrounds/backgrounds.json`, so image filenames do not need to be hard-coded. GitHub documents the browser upload process here: [Uploading a project to GitHub](https://docs.github.com/en/get-started/start-your-journey/uploading-a-project-to-github).

Do not commit personal typing sounds to this repository. The project’s `.gitignore` intentionally excludes common audio formats, and Quiet Draft’s private sound importer is the supported Version 1 workflow.

## 14. Backups, updates, and data safety

### Back up writing

- Use **Export .txt** at the end of each writing session or travel day.
- Save exports under **On My iPad**, iCloud Drive, or another location you control.
- Use **Copy All** when moving a scene into Scrivener.
- Confirm that the exported file opens before deleting or replacing an important draft.

### Back up atmosphere assets

- Keep the original image and audio files in `Quiet Draft Assets` in Files.
- Quiet Draft does not currently export its private IndexedDB asset library.
- If the app is reinstalled or Safari website data is cleared, import the originals again.

### Back up music

- Keep every original song and cover image in Files or on the Mac.
- The app does not currently export its IndexedDB music library.
- Importing music is an offline convenience copy, not a permanent backup.

### Receive an app update

1. Connect the iPad to the internet.
2. Open Quiet Draft from the Home Screen.
3. Leave it open for several seconds.
4. Close it completely from the app switcher.
5. Reopen it.

Quiet Draft checks the network first and falls back to its offline cache. A newly deployed version normally takes control after an online launch and relaunch.

### Actions that can erase local data

Local drafts and imported atmosphere assets may be lost if you:

- Clear Safari history and website data for the Quiet Draft site.
- Remove the site’s stored website data in Settings.
- Delete and reinstall the web app.
- Use storage-cleaning tools that remove Safari or web-app data.
- Reset or erase the iPad without a usable device backup.

Treat the browser copy as a convenient working copy, not the only permanent archive.

## Troubleshooting

### The Home Screen app opens an old version

Open it online, wait several seconds, close it from the app switcher, and reopen it. Avoid clearing website data unless your current draft and atmosphere assets are safely backed up.

### A background appears in Files but not in Quiet Draft

The Files folder is only the source library. Use **Atmosphere → Add background images** to import it. Files are not automatically scanned for privacy reasons.

### A repository background is missing

Tap **Refresh folder** while online. If it is still missing, confirm that the Pages deployment succeeded and that the file uses a supported image extension.

### The background is too faint

Choose **Dark Glass** and lower **Panel strength**. Increase the strength again if the editor text becomes difficult to read.

### Typing sounds are silent

- Turn on **Enable typing sounds**.
- Turn off **Mute**.
- Raise both Quiet Draft’s volume slider and the iPad’s system volume.
- Check whether sound is being routed to Bluetooth headphones or a speaker.
- Tap once inside the editor before testing; browsers require a user action before starting audio.
- Try a built-in style. If built-in audio works, convert the custom file to WAV, MP3, or M4A and import it again.

### Local assets disappeared

Reimport them from the backup folder in Files. Check whether Safari website data was cleared, the Home Screen app was reinstalled, or the app was opened under a different web address.

## Travel checklist

Before leaving reliable internet access:

- [ ] Launch Quiet Draft from the Home Screen while online.
- [ ] Confirm the latest version appears.
- [ ] Open the current draft and wait for **Saved locally**.
- [ ] Export an up-to-date `.txt` backup.
- [ ] Select each repository-hosted background once.
- [ ] Test the chosen private background and typing sound.
- [ ] Complete an Airplane Mode test.
- [ ] Keep the original atmosphere assets in the Files app.
