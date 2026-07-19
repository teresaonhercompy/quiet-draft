(() => {
  "use strict";

  const STORAGE_KEY = "quiet-draft.current.v1";
  const THEME_KEY = "quiet-draft.theme.v1";
  const ATMOSPHERE_KEY = "quiet-draft.atmosphere.v1";
  const FOLDER_BACKGROUNDS_KEY = "quiet-draft.folder-backgrounds.v1";
  const SOUND_DATABASE = "quiet-draft-assets";
  const SOUND_STORE = "sounds";
  const BACKGROUND_STORE = "backgrounds";
  const CONTENT_STORE = "command-center-content";
  const GALLERY_STORE = "gallery";
  const MUSIC_TRACK_STORE = "music-tracks";
  const MUSIC_ARTWORK_STORE = "music-artwork";
  const MUSIC_STATE_KEY = "dreamspeak.music-player.v1";
  const WRITING_METRICS_KEY = "dreamspeak.writing-metrics.v1";
  const AUTOSAVE_DELAY = 650;
  const DEFAULT_ATMOSPHERE = {
    background: "none",
    editorAppearance: "dark-glass",
    editorOpacity: 58,
    soundEnabled: false,
    soundMuted: false,
    soundVolume: 35,
    soundStyle: "soft-click"
  };

  const elements = {
    title: document.querySelector("#draft-title"),
    body: document.querySelector("#draft-body"),
    newDraft: document.querySelector("#new-draft"),
    saveDraft: document.querySelector("#save-draft"),
    exportDraft: document.querySelector("#export-draft"),
    copyDraft: document.querySelector("#copy-draft"),
    atmosphereToggle: document.querySelector("#atmosphere-toggle"),
    atmospherePanel: document.querySelector("#atmosphere-panel"),
    closeAtmosphere: document.querySelector("#close-atmosphere"),
    panelBackdrop: document.querySelector("#panel-backdrop"),
    writingSpace: document.querySelector(".writing-space"),
    page: document.querySelector(".page"),
    backgroundSelect: document.querySelector("#background-select"),
    backgroundUpload: document.querySelector("#background-upload"),
    refreshBackgrounds: document.querySelector("#refresh-backgrounds"),
    removeBackground: document.querySelector("#remove-background"),
    editorStyle: document.querySelector("#editor-style"),
    editorOpacity: document.querySelector("#editor-opacity"),
    editorOpacityValue: document.querySelector("#editor-opacity-value"),
    soundEnabled: document.querySelector("#sound-enabled"),
    soundMuted: document.querySelector("#sound-muted"),
    soundVolume: document.querySelector("#sound-volume"),
    soundVolumeValue: document.querySelector("#sound-volume-value"),
    soundStyle: document.querySelector("#sound-style"),
    soundUpload: document.querySelector("#sound-upload"),
    removeSound: document.querySelector("#remove-sound"),
    themeToggle: document.querySelector("#theme-toggle"),
    themeIcon: document.querySelector(".theme-icon"),
    connectionStatus: document.querySelector("#connection-status"),
    focusToggle: document.querySelector("#focus-toggle"),
    exitFocus: document.querySelector("#exit-focus"),
    wordCount: document.querySelector("#word-count"),
    characterCount: document.querySelector("#character-count"),
    saveStatus: document.querySelector("#save-status"),
    statusDot: document.querySelector(".status-dot"),
    metricProject: document.querySelector("#metric-project"),
    metricCurrentDraft: document.querySelector("#metric-current-draft"),
    metricScene: document.querySelector("#metric-scene"),
    metricSessionWords: document.querySelector("#metric-session-words"),
    metricTodayWords: document.querySelector("#metric-today-words"),
    metricManuscriptTotal: document.querySelector("#metric-manuscript-total"),
    metricLastAutosave: document.querySelector("#metric-last-autosave"),
    metricLastExport: document.querySelector("#metric-last-export"),
    toast: document.querySelector("#toast"),
    factCategory: document.querySelector("#fact-category"),
    factSpeaker: document.querySelector("#fact-speaker"),
    factText: document.querySelector("#fact-text"),
    factNonCanon: document.querySelector("#fact-non-canon"),
    factAvatarTabi: document.querySelector("#fact-avatar-tabi"),
    factAvatarNorielle: document.querySelector("#fact-avatar-norielle"),
    nextFact: document.querySelector("#next-fact"),
    importFacts: document.querySelector("#import-facts"),
    mabelMessage: document.querySelector("#mabel-message"),
    nextMessage: document.querySelector("#next-message"),
    importMessages: document.querySelector("#import-messages"),
    contentLibraryUpload: document.querySelector("#content-library-upload"),
    galleryImage: document.querySelector("#gallery-image"),
    galleryEmpty: document.querySelector("#gallery-empty"),
    galleryTitle: document.querySelector("#gallery-title"),
    galleryCaption: document.querySelector("#gallery-caption"),
    galleryPosition: document.querySelector("#gallery-position"),
    previousImage: document.querySelector("#previous-image"),
    randomImage: document.querySelector("#random-image"),
    nextImage: document.querySelector("#next-image"),
    galleryUpload: document.querySelector("#gallery-upload"),
    musicAudio: document.querySelector("#music-audio"),
    musicAlbumSelect: document.querySelector("#music-album-select"),
    musicTrackSelect: document.querySelector("#music-track-select"),
    musicTrackTitle: document.querySelector("#music-track-title"),
    musicTrackMeta: document.querySelector("#music-track-meta"),
    musicLibraryCount: document.querySelector("#music-library-count"),
    musicArtworkImage: document.querySelector("#album-artwork-image"),
    musicArtworkPlaceholder: document.querySelector("#album-artwork-placeholder"),
    musicCurrentTime: document.querySelector("#music-current-time"),
    musicDuration: document.querySelector("#music-duration"),
    musicSeek: document.querySelector("#music-seek"),
    musicPrevious: document.querySelector("#music-previous"),
    musicPlay: document.querySelector("#music-play"),
    musicNext: document.querySelector("#music-next"),
    musicShuffle: document.querySelector("#music-shuffle"),
    musicRepeat: document.querySelector("#music-repeat"),
    musicVolume: document.querySelector("#music-volume"),
    musicVolumeValue: document.querySelector("#music-volume-value"),
    musicError: document.querySelector("#music-error"),
    musicImportArtist: document.querySelector("#music-import-artist"),
    musicImportAlbum: document.querySelector("#music-import-album"),
    musicTrackUpload: document.querySelector("#music-track-upload"),
    musicCoverUpload: document.querySelector("#music-cover-upload"),
    musicRemoveTrack: document.querySelector("#music-remove-track"),
    musicRemoveAlbum: document.querySelector("#music-remove-album")
  };

  let saveTimer;
  let toastTimer;
  let lastSavedAt = null;
  let audioContext = null;
  let soundDatabasePromise = null;
  let uploadedSounds = [];
  let uploadedBackgrounds = [];
  let folderBackgrounds = [];
  let backgroundObjectUrl = null;
  let galleryObjectUrl = null;
  let facts = [];
  let encouragement = [];
  let galleryItems = [];
  let factIndex = -1;
  let messageIndex = -1;
  let galleryIndex = -1;
  let musicTracks = [];
  let musicArtwork = [];
  let musicAlbums = [];
  let selectedMusicAlbumId = "";
  let selectedMusicTrackId = "";
  let musicObjectUrl = null;
  let musicArtworkObjectUrl = null;
  let pendingMusicPosition = 0;
  let lastMusicStateSecond = -1;
  let musicState = {
    albumId: "",
    trackId: "",
    position: 0,
    volume: 70,
    shuffle: false,
    repeat: "off"
  };
  let writingMetrics = {
    project: "Inheritance Dust",
    scene: "",
    manuscriptTotal: 0,
    todayDate: "",
    todayWords: 0,
    lastExportAt: null
  };
  let sessionWordDelta = 0;
  let observedWordCount = 0;
  const customSoundBuffers = new Map();
  let atmosphere = { ...DEFAULT_ATMOSPHERE };

  function numberInRange(value, minimum, maximum, fallback) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
  }

  function loadAtmosphere() {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(ATMOSPHERE_KEY));
      if (saved && typeof saved === "object") atmosphere = { ...DEFAULT_ATMOSPHERE, ...saved };
    } catch (error) {
      console.warn("Quiet Draft found unreadable atmosphere settings.", error);
    }

    const backgrounds = ["none", "warm-paper", "night-sky", "rainy-window", "forest-desk"];
    const editorAppearances = ["dark-glass", "light-paper"];
    const builtInSoundStyles = ["soft-click", "typewriter", "mechanical"];
    const isDynamicBackground = String(atmosphere.background).startsWith("folder:") || String(atmosphere.background).startsWith("custom-background:");
    if (!backgrounds.includes(atmosphere.background) && !isDynamicBackground) atmosphere.background = DEFAULT_ATMOSPHERE.background;
    if (!editorAppearances.includes(atmosphere.editorAppearance)) atmosphere.editorAppearance = DEFAULT_ATMOSPHERE.editorAppearance;
    if (!builtInSoundStyles.includes(atmosphere.soundStyle) && !String(atmosphere.soundStyle).startsWith("custom:")) {
      atmosphere.soundStyle = DEFAULT_ATMOSPHERE.soundStyle;
    }
    if (saved && !Object.prototype.hasOwnProperty.call(saved, "editorAppearance")) {
      atmosphere.editorAppearance = "dark-glass";
      atmosphere.editorOpacity = DEFAULT_ATMOSPHERE.editorOpacity;
    }
    atmosphere.editorOpacity = numberInRange(atmosphere.editorOpacity, 25, 90, DEFAULT_ATMOSPHERE.editorOpacity);
    atmosphere.soundVolume = numberInRange(atmosphere.soundVolume, 0, 100, DEFAULT_ATMOSPHERE.soundVolume);
    atmosphere.soundEnabled = atmosphere.soundEnabled === true;
    atmosphere.soundMuted = atmosphere.soundMuted === true;
  }

  function saveAtmosphere() {
    try {
      localStorage.setItem(ATMOSPHERE_KEY, JSON.stringify(atmosphere));
    } catch (error) {
      console.warn("Quiet Draft could not save atmosphere settings.", error);
    }
  }

  function applyAtmosphere() {
    if (backgroundObjectUrl) {
      URL.revokeObjectURL(backgroundObjectUrl);
      backgroundObjectUrl = null;
    }
    elements.writingSpace.style.removeProperty("background-image");
    elements.writingSpace.dataset.background = atmosphere.background;

    if (String(atmosphere.background).startsWith("folder:")) {
      const background = folderBackgrounds.find((item) => `folder:${item.url}` === atmosphere.background);
      if (background) {
        elements.writingSpace.dataset.background = "folder-image";
        elements.writingSpace.style.backgroundImage = `linear-gradient(rgba(10, 14, 18, 0.12), rgba(10, 14, 18, 0.28)), url("${background.url}")`;
      }
    }

    if (String(atmosphere.background).startsWith("custom-background:")) {
      const id = atmosphere.background.replace("custom-background:", "");
      const background = uploadedBackgrounds.find((item) => item.id === id);
      if (background) {
        backgroundObjectUrl = URL.createObjectURL(background.blob);
        elements.writingSpace.dataset.background = "custom-image";
        elements.writingSpace.style.backgroundImage = `linear-gradient(rgba(10, 14, 18, 0.12), rgba(10, 14, 18, 0.28)), url("${backgroundObjectUrl}")`;
      }
    }
    elements.page.dataset.editorStyle = atmosphere.editorAppearance;
    document.documentElement.style.setProperty("--editor-opacity", (atmosphere.editorOpacity / 100).toFixed(2));
    elements.backgroundSelect.value = atmosphere.background;
    elements.editorStyle.value = atmosphere.editorAppearance;
    elements.editorOpacity.value = atmosphere.editorOpacity;
    elements.editorOpacityValue.textContent = `${atmosphere.editorOpacity}%`;
    elements.soundEnabled.checked = atmosphere.soundEnabled;
    elements.soundMuted.checked = atmosphere.soundMuted;
    elements.soundVolume.value = atmosphere.soundVolume;
    elements.soundVolumeValue.textContent = `${atmosphere.soundVolume}%`;
    elements.soundStyle.value = atmosphere.soundStyle;
    elements.removeSound.disabled = !String(atmosphere.soundStyle).startsWith("custom:");
    elements.removeBackground.disabled = !String(atmosphere.background).startsWith("custom-background:");
  }

  function openSoundDatabase() {
    if (soundDatabasePromise) return soundDatabasePromise;
    soundDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(SOUND_DATABASE, 4);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(SOUND_STORE)) {
          database.createObjectStore(SOUND_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(BACKGROUND_STORE)) {
          database.createObjectStore(BACKGROUND_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(CONTENT_STORE)) {
          database.createObjectStore(CONTENT_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(GALLERY_STORE)) {
          database.createObjectStore(GALLERY_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(MUSIC_TRACK_STORE)) {
          database.createObjectStore(MUSIC_TRACK_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(MUSIC_ARTWORK_STORE)) {
          database.createObjectStore(MUSIC_ARTWORK_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return soundDatabasePromise;
  }

  async function getAllUploadedSounds() {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(SOUND_STORE, "readonly").objectStore(SOUND_STORE).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeUploadedSound(record) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(SOUND_STORE, "readwrite").objectStore(SOUND_STORE).put(record);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteUploadedSound(id) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(SOUND_STORE, "readwrite").objectStore(SOUND_STORE).delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function getAllUploadedBackgrounds() {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(BACKGROUND_STORE, "readonly").objectStore(BACKGROUND_STORE).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeUploadedBackground(record) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(BACKGROUND_STORE, "readwrite").objectStore(BACKGROUND_STORE).put(record);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteUploadedBackground(id) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(BACKGROUND_STORE, "readwrite").objectStore(BACKGROUND_STORE).delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function getStoredRecord(storeName, id) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(storeName, "readonly").objectStore(storeName).get(id);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async function getAllStoredRecords(storeName) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(storeName, "readonly").objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function storeRecord(storeName, record) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(storeName, "readwrite").objectStore(storeName).put(record);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteStoredRecord(storeName, id) {
    const database = await openSoundDatabase();
    return new Promise((resolve, reject) => {
      const request = database.transaction(storeName, "readwrite").objectStore(storeName).delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  function newSoundId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function randomIndex(length, current = -1) {
    if (length <= 1) return length ? 0 : -1;
    let next = Math.floor(Math.random() * length);
    if (next === current) next = (next + 1) % length;
    return next;
  }

  async function loadDataFile(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return [];
    }
  }

  function validFacts(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter((item) => item && typeof item.text === "string" && item.text.trim())
      .slice(0, 500)
      .map((item, index) => ({
        id: typeof item.id === "string" ? item.id : `fact-${index + 1}`,
        speaker: typeof item.speaker === "string" && item.speaker.trim() ? item.speaker.trim() : "Tabi & Norielle",
        category: typeof item.category === "string" && item.category.trim() ? item.category.trim() : "Canon",
        text: item.text.trim(),
        nonCanon: item.nonCanon === true
      }));
  }

  function validMessages(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter((item) => (typeof item === "string" && item.trim()) || (item && typeof item.text === "string" && item.text.trim()))
      .slice(0, 500)
      .map((item, index) => ({
        id: typeof item === "object" && typeof item.id === "string" ? item.id : `message-${index + 1}`,
        text: (typeof item === "string" ? item : item.text).trim()
      }));
  }

  function renderFact() {
    const fact = facts[factIndex];
    const hasFact = Boolean(fact);
    elements.factCategory.textContent = hasFact ? fact.category : "Local library";
    elements.factSpeaker.textContent = hasFact ? fact.speaker : "Private facts";
    elements.factText.textContent = hasFact ? fact.text : "Import your private character library to this device.";
    elements.factNonCanon.hidden = !hasFact || !fact.nonCanon;
    elements.factAvatarTabi.classList.toggle("active", hasFact && /tabi/i.test(fact.speaker));
    elements.factAvatarNorielle.classList.toggle("active", hasFact && /norielle/i.test(fact.speaker));
    elements.nextFact.disabled = facts.length < 2;
  }

  function showNextFact() {
    factIndex = randomIndex(facts.length, factIndex);
    renderFact();
  }

  function renderMessage() {
    const message = encouragement[messageIndex];
    elements.mabelMessage.textContent = message ? `“${message.text}”` : "“Import a private message library when you are ready.”";
    elements.nextMessage.disabled = encouragement.length < 2;
  }

  function showNextMessage() {
    messageIndex = randomIndex(encouragement.length, messageIndex);
    renderMessage();
  }

  async function loadCharacterModules() {
    const bundledFacts = validFacts(await loadDataFile("./data/facts.json"));
    const bundledMessages = validMessages(await loadDataFile("./data/encouragement.json"));
    try {
      const localFacts = await getStoredRecord(CONTENT_STORE, "facts");
      const localMessages = await getStoredRecord(CONTENT_STORE, "encouragement");
      facts = [...bundledFacts, ...validFacts(localFacts && localFacts.items)];
      encouragement = [...bundledMessages, ...validMessages(localMessages && localMessages.items)];
    } catch (error) {
      facts = bundledFacts;
      encouragement = bundledMessages;
    }
    factIndex = randomIndex(facts.length);
    messageIndex = randomIndex(encouragement.length);
    renderFact();
    renderMessage();
  }

  async function importContentLibrary(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    if (file.size > 1024 * 1024) {
      showToast("That library file is too large");
      return;
    }

    try {
      const data = JSON.parse(await file.text());
      const importedFacts = validFacts(data && data.facts);
      const importedMessages = validMessages(data && (data.encouragement || data.messages));
      if (!importedFacts.length && !importedMessages.length) throw new Error("No compatible content");
      if (importedFacts.length) await storeRecord(CONTENT_STORE, { id: "facts", items: importedFacts, updatedAt: Date.now() });
      if (importedMessages.length) await storeRecord(CONTENT_STORE, { id: "encouragement", items: importedMessages, updatedAt: Date.now() });
      await loadCharacterModules();
      showToast(`${importedFacts.length} facts and ${importedMessages.length} messages imported`);
    } catch (error) {
      showToast("That content library could not be imported");
    }
  }

  function validGalleryMetadata(items) {
    if (!Array.isArray(items)) return [];
    return items
      .filter((item) => item && typeof item.file === "string" && item.file.trim())
      .map((item, index) => ({
        id: typeof item.id === "string" ? item.id : `bundled-gallery-${index + 1}`,
        source: "bundled",
        file: item.file,
        title: typeof item.title === "string" && item.title.trim() ? item.title.trim() : backgroundLabel(item.file.split("/").pop()),
        caption: typeof item.caption === "string" ? item.caption.trim() : "",
        collection: typeof item.collection === "string" ? item.collection.trim() : ""
      }));
  }

  async function loadGallery() {
    const bundled = validGalleryMetadata(await loadDataFile("./data/gallery.json"));
    let local = [];
    try {
      local = (await getAllStoredRecords(GALLERY_STORE)).map((item) => ({ ...item, source: "local" }));
    } catch (error) {
      local = [];
    }
    galleryItems = [...bundled, ...local];
    galleryIndex = randomIndex(galleryItems.length);
    renderGallery();
  }

  function renderGallery() {
    if (galleryObjectUrl) {
      URL.revokeObjectURL(galleryObjectUrl);
      galleryObjectUrl = null;
    }

    const item = galleryItems[galleryIndex];
    const hasItem = Boolean(item);
    elements.galleryPosition.textContent = hasItem ? `${galleryIndex + 1} / ${galleryItems.length}` : "0 / 0";
    elements.galleryTitle.textContent = hasItem ? item.title : "Private gallery";
    elements.galleryCaption.textContent = hasItem
      ? item.caption || item.collection || (item.source === "local" ? "Stored only on this device." : "Included offline scene.")
      : "Add images on this device or browse the included scenes.";
    elements.previousImage.disabled = galleryItems.length < 2;
    elements.randomImage.disabled = galleryItems.length < 2;
    elements.nextImage.disabled = galleryItems.length < 2;

    if (!hasItem) {
      elements.galleryImage.hidden = true;
      elements.galleryImage.removeAttribute("src");
      elements.galleryEmpty.hidden = false;
      elements.galleryEmpty.textContent = "No image available";
      return;
    }

    const source = item.source === "local" && item.blob ? URL.createObjectURL(item.blob) : item.file;
    if (item.source === "local") galleryObjectUrl = source;
    elements.galleryEmpty.hidden = true;
    elements.galleryImage.hidden = false;
    elements.galleryImage.alt = item.title;
    elements.galleryImage.src = source;
  }

  function moveGallery(direction) {
    if (!galleryItems.length) return;
    galleryIndex = (galleryIndex + direction + galleryItems.length) % galleryItems.length;
    renderGallery();
  }

  function showRandomGalleryImage() {
    galleryIndex = randomIndex(galleryItems.length, galleryIndex);
    renderGallery();
  }

  async function uploadGalleryImages(event) {
    const files = Array.from(event.target.files || []).slice(0, 40);
    event.target.value = "";
    if (!files.length) return;
    let added = 0;

    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) continue;
      try {
        await validateImage(file);
        await storeRecord(GALLERY_STORE, {
          id: newSoundId(),
          name: file.name,
          title: backgroundLabel(file.name),
          caption: "",
          collection: "My Images",
          type: file.type,
          blob: file,
          addedAt: Date.now()
        });
        added += 1;
      } catch (error) {
        // Skip unreadable images without exposing filenames or interrupting writing.
      }
    }

    await loadGallery();
    showToast(added ? `${added} gallery image${added === 1 ? "" : "s"} added` : "No compatible images were added");
  }

  function handleGalleryImageError() {
    elements.galleryImage.hidden = true;
    elements.galleryEmpty.hidden = false;
    elements.galleryEmpty.textContent = "This image is missing or unreadable";
  }

  function loadMusicState() {
    try {
      const saved = JSON.parse(localStorage.getItem(MUSIC_STATE_KEY));
      if (saved && typeof saved === "object") musicState = { ...musicState, ...saved };
    } catch (error) {
      // Use safe defaults when older player state is unreadable.
    }
    musicState.volume = numberInRange(musicState.volume, 0, 100, 70);
    musicState.shuffle = musicState.shuffle === true;
    musicState.repeat = ["off", "all", "one"].includes(musicState.repeat) ? musicState.repeat : "off";
    musicState.albumId = typeof musicState.albumId === "string" ? musicState.albumId : "";
    musicState.trackId = typeof musicState.trackId === "string" ? musicState.trackId : "";
    musicState.position = numberInRange(musicState.position, 0, Number.MAX_SAFE_INTEGER, 0);
  }

  function saveMusicState() {
    const position = elements.musicAudio && Number.isFinite(elements.musicAudio.currentTime)
      ? elements.musicAudio.currentTime
      : musicState.position;
    musicState = {
      albumId: selectedMusicAlbumId,
      trackId: selectedMusicTrackId,
      position,
      volume: Number(elements.musicVolume.value),
      shuffle: elements.musicShuffle.getAttribute("aria-pressed") === "true",
      repeat: elements.musicRepeat.dataset.mode || "off"
    };
    try {
      localStorage.setItem(MUSIC_STATE_KEY, JSON.stringify(musicState));
    } catch (error) {
      // Playback still works when preference storage is unavailable.
    }
  }

  function musicAlbumId(artist, album) {
    return `album:${artist.trim().toLocaleLowerCase()}|${album.trim().toLocaleLowerCase()}`;
  }

  function musicTitle(filename) {
    return filename
      .replace(/\.[^.]+$/, "")
      .replace(/^\s*\d{1,3}[\s._-]+/, "")
      .replace(/[_]+/g, " ")
      .trim() || "Untitled Track";
  }

  function musicImportValue(value, fallback, maximumLength) {
    return String(value || fallback || "").trim().slice(0, maximumLength);
  }

  function formatMusicTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const whole = Math.floor(seconds);
    const hours = Math.floor(whole / 3600);
    const minutes = Math.floor((whole % 3600) / 60);
    const remaining = String(whole % 60).padStart(2, "0");
    return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${remaining}` : `${minutes}:${remaining}`;
  }

  function setMusicError(message = "") {
    elements.musicError.textContent = message;
    elements.musicError.hidden = !message;
  }

  function selectedMusicAlbum() {
    return musicAlbums.find((album) => album.id === selectedMusicAlbumId) || null;
  }

  function selectedMusicTrack() {
    return musicTracks.find((track) => track.id === selectedMusicTrackId) || null;
  }

  function syncMusicImportFields() {
    const album = selectedMusicAlbum();
    if (!album) return;
    elements.musicImportArtist.value = album.artist;
    elements.musicImportAlbum.value = album.title;
  }

  function buildMusicAlbums() {
    const grouped = new Map();
    musicTracks.forEach((track) => {
      if (!grouped.has(track.albumId)) {
        grouped.set(track.albumId, {
          id: track.albumId,
          artist: track.artist,
          title: track.album,
          tracks: []
        });
      }
      grouped.get(track.albumId).tracks.push(track);
    });
    musicAlbums = Array.from(grouped.values())
      .map((album) => ({
        ...album,
        tracks: album.tracks.sort((a, b) => {
          const aNumber = Number.isFinite(a.trackNumber) ? a.trackNumber : Number.MAX_SAFE_INTEGER;
          const bNumber = Number.isFinite(b.trackNumber) ? b.trackNumber : Number.MAX_SAFE_INTEGER;
          return aNumber - bNumber || (a.addedAt || 0) - (b.addedAt || 0) || a.title.localeCompare(b.title);
        })
      }))
      .sort((a, b) => a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title));
  }

  function renderMusicArtwork() {
    if (musicArtworkObjectUrl) {
      URL.revokeObjectURL(musicArtworkObjectUrl);
      musicArtworkObjectUrl = null;
    }
    const artwork = musicArtwork.find((item) => item.id === selectedMusicAlbumId);
    if (!artwork || !artwork.blob) {
      elements.musicArtworkImage.hidden = true;
      elements.musicArtworkImage.removeAttribute("src");
      elements.musicArtworkPlaceholder.hidden = false;
      return;
    }
    musicArtworkObjectUrl = URL.createObjectURL(artwork.blob);
    const album = selectedMusicAlbum();
    elements.musicArtworkImage.alt = album ? `${album.title} album artwork` : "Album artwork";
    elements.musicArtworkImage.src = musicArtworkObjectUrl;
    elements.musicArtworkImage.hidden = false;
    elements.musicArtworkPlaceholder.hidden = true;
  }

  function renderMusicOptions() {
    elements.musicAlbumSelect.replaceChildren();
    if (!musicAlbums.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No albums imported";
      elements.musicAlbumSelect.appendChild(option);
    } else {
      musicAlbums.forEach((album) => {
        const option = document.createElement("option");
        option.value = album.id;
        option.textContent = `${album.artist} — ${album.title}`;
        elements.musicAlbumSelect.appendChild(option);
      });
      elements.musicAlbumSelect.value = selectedMusicAlbumId;
    }

    elements.musicTrackSelect.replaceChildren();
    const album = selectedMusicAlbum();
    if (!album) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No track selected";
      elements.musicTrackSelect.appendChild(option);
    } else {
      album.tracks.forEach((track) => {
        const option = document.createElement("option");
        option.value = track.id;
        option.textContent = track.title;
        elements.musicTrackSelect.appendChild(option);
      });
      elements.musicTrackSelect.value = selectedMusicTrackId;
    }

    const hasTrack = Boolean(selectedMusicTrack());
    const trackCount = musicTracks.length;
    elements.musicLibraryCount.textContent = trackCount ? `${trackCount} track${trackCount === 1 ? "" : "s"}` : "Local";
    elements.musicPrevious.disabled = !hasTrack;
    elements.musicPlay.disabled = !hasTrack;
    elements.musicNext.disabled = !hasTrack;
    elements.musicShuffle.disabled = !hasTrack;
    elements.musicRepeat.disabled = !hasTrack;
    elements.musicSeek.disabled = !hasTrack;
    elements.musicRemoveTrack.disabled = !hasTrack;
    elements.musicRemoveAlbum.disabled = !album;
    elements.musicShuffle.setAttribute("aria-pressed", String(musicState.shuffle));
    elements.musicRepeat.dataset.mode = musicState.repeat;
    elements.musicRepeat.textContent = musicState.repeat === "one" ? "Repeat One" : musicState.repeat === "all" ? "Repeat All" : "Repeat Off";
    elements.musicRepeat.setAttribute("aria-label", elements.musicRepeat.textContent);
    elements.musicVolume.value = musicState.volume;
    elements.musicVolumeValue.textContent = `${musicState.volume}%`;
    elements.musicAudio.volume = musicState.volume / 100;
    renderMusicArtwork();
  }

  function clearLoadedMusic() {
    elements.musicAudio.pause();
    elements.musicAudio.removeAttribute("src");
    elements.musicAudio.load();
    if (musicObjectUrl) URL.revokeObjectURL(musicObjectUrl);
    musicObjectUrl = null;
    selectedMusicTrackId = "";
    elements.musicTrackTitle.textContent = "Local music library";
    elements.musicTrackMeta.textContent = "Add audio files to begin";
    elements.musicSeek.value = 0;
    elements.musicCurrentTime.textContent = "0:00";
    elements.musicDuration.textContent = "0:00";
    elements.musicPlay.textContent = "▶";
    elements.musicPlay.setAttribute("aria-label", "Play");
  }

  function loadSelectedMusicTrack({ restorePosition = false, continuePlayback = false } = {}) {
    const track = selectedMusicTrack();
    setMusicError();
    if (!track || !track.blob) {
      clearLoadedMusic();
      renderMusicOptions();
      if (track) setMusicError("This track is missing. Remove it and import the original file again.");
      return;
    }

    elements.musicAudio.pause();
    if (musicObjectUrl) URL.revokeObjectURL(musicObjectUrl);
    musicObjectUrl = URL.createObjectURL(track.blob);
    pendingMusicPosition = restorePosition && musicState.trackId === track.id ? musicState.position : 0;
    lastMusicStateSecond = -1;
    elements.musicAudio.src = musicObjectUrl;
    elements.musicAudio.load();
    elements.musicTrackTitle.textContent = track.title;
    elements.musicTrackMeta.textContent = `${track.artist} · ${track.album}`;
    elements.musicTrackSelect.value = track.id;
    elements.musicSeek.value = 0;
    elements.musicCurrentTime.textContent = "0:00";
    elements.musicDuration.textContent = "0:00";
    elements.musicPlay.textContent = "▶";
    elements.musicPlay.setAttribute("aria-label", "Play");
    saveMusicState();

    if (continuePlayback) {
      elements.musicAudio.play().catch(() => setMusicError("Playback could not start. Try a different audio format."));
    }
  }

  async function loadMusicLibrary({ preferAlbumId = "", preferTrackId = "", restorePosition = false } = {}) {
    try {
      [musicTracks, musicArtwork] = await Promise.all([
        getAllStoredRecords(MUSIC_TRACK_STORE),
        getAllStoredRecords(MUSIC_ARTWORK_STORE)
      ]);
    } catch (error) {
      musicTracks = [];
      musicArtwork = [];
      setMusicError("The local music library is unavailable in this browser.");
    }
    buildMusicAlbums();
    const requestedAlbum = preferAlbumId || musicState.albumId;
    selectedMusicAlbumId = musicAlbums.some((album) => album.id === requestedAlbum)
      ? requestedAlbum
      : (musicAlbums[0] ? musicAlbums[0].id : "");
    const album = selectedMusicAlbum();
    const requestedTrack = preferTrackId || musicState.trackId;
    selectedMusicTrackId = album && album.tracks.some((track) => track.id === requestedTrack)
      ? requestedTrack
      : (album && album.tracks[0] ? album.tracks[0].id : "");
    renderMusicOptions();
    syncMusicImportFields();
    if (selectedMusicTrackId) loadSelectedMusicTrack({ restorePosition });
    else clearLoadedMusic();
  }

  function changeMusicTrack(trackId, { continuePlayback = false } = {}) {
    const track = musicTracks.find((item) => item.id === trackId);
    if (!track) return;
    selectedMusicAlbumId = track.albumId;
    selectedMusicTrackId = track.id;
    renderMusicOptions();
    loadSelectedMusicTrack({ continuePlayback });
  }

  function moveMusicTrack(direction, { continuePlayback = !elements.musicAudio.paused } = {}) {
    const album = selectedMusicAlbum();
    if (!album || !album.tracks.length) return;
    if (direction < 0 && elements.musicAudio.currentTime > 4) {
      elements.musicAudio.currentTime = 0;
      return;
    }
    let index = album.tracks.findIndex((track) => track.id === selectedMusicTrackId);
    if (musicState.shuffle && album.tracks.length > 1) {
      index = randomIndex(album.tracks.length, index);
    } else {
      index = (index + direction + album.tracks.length) % album.tracks.length;
    }
    changeMusicTrack(album.tracks[index].id, { continuePlayback });
  }

  function toggleMusicPlayback() {
    if (!selectedMusicTrack()) return;
    setMusicError();
    if (elements.musicAudio.paused) {
      elements.musicAudio.play().catch(() => setMusicError("This track could not be played. Try MP3, M4A, or WAV."));
    } else {
      elements.musicAudio.pause();
    }
  }

  function handleMusicEnded() {
    const album = selectedMusicAlbum();
    if (!album) return;
    if (musicState.repeat === "one") {
      elements.musicAudio.currentTime = 0;
      elements.musicAudio.play().catch(() => {});
      return;
    }
    const index = album.tracks.findIndex((track) => track.id === selectedMusicTrackId);
    if (index < album.tracks.length - 1 || musicState.repeat === "all" || musicState.shuffle) {
      moveMusicTrack(1, { continuePlayback: true });
      return;
    }
    elements.musicAudio.currentTime = 0;
    saveMusicState();
  }

  function handleMusicMetadata() {
    const duration = elements.musicAudio.duration;
    elements.musicDuration.textContent = formatMusicTime(duration);
    if (pendingMusicPosition > 0 && Number.isFinite(duration)) {
      elements.musicAudio.currentTime = Math.min(pendingMusicPosition, Math.max(0, duration - 0.25));
    }
    pendingMusicPosition = 0;
  }

  function handleMusicTimeUpdate() {
    const duration = elements.musicAudio.duration;
    const current = elements.musicAudio.currentTime;
    elements.musicCurrentTime.textContent = formatMusicTime(current);
    elements.musicDuration.textContent = formatMusicTime(duration);
    elements.musicSeek.value = Number.isFinite(duration) && duration > 0 ? Math.round((current / duration) * 1000) : 0;
    const second = Math.floor(current / 5);
    if (second !== lastMusicStateSecond) {
      lastMusicStateSecond = second;
      saveMusicState();
    }
  }

  function handleMusicSeek() {
    const duration = elements.musicAudio.duration;
    if (!Number.isFinite(duration) || duration <= 0) return;
    elements.musicAudio.currentTime = (Number(elements.musicSeek.value) / 1000) * duration;
    saveMusicState();
  }

  function toggleMusicShuffle() {
    musicState.shuffle = !musicState.shuffle;
    elements.musicShuffle.setAttribute("aria-pressed", String(musicState.shuffle));
    saveMusicState();
  }

  function cycleMusicRepeat() {
    const modes = ["off", "all", "one"];
    musicState.repeat = modes[(modes.indexOf(musicState.repeat) + 1) % modes.length];
    elements.musicRepeat.dataset.mode = musicState.repeat;
    elements.musicRepeat.textContent = musicState.repeat === "one" ? "Repeat One" : musicState.repeat === "all" ? "Repeat All" : "Repeat Off";
    elements.musicRepeat.setAttribute("aria-label", elements.musicRepeat.textContent);
    saveMusicState();
  }

  async function importMusicTracks(event) {
    const files = Array.from(event.target.files || []).slice(0, 100);
    event.target.value = "";
    if (!files.length) return;
    const fallbackArtist = elements.musicImportArtist.value.trim();
    const fallbackAlbum = elements.musicImportAlbum.value.trim();
    const existingTracks = new Set(musicTracks.map((track) => `${track.albumId}|${track.name.toLocaleLowerCase()}`));
    const artworkAlbums = new Set(musicArtwork.map((item) => item.id));
    let added = 0;
    let metadataApplied = 0;
    let lastTrackId = "";
    let lastAlbumId = "";

    for (const file of files) {
      if (file.size > 512 * 1024 * 1024) continue;
      let metadata = {};
      try {
        metadata = await globalThis.QuietDraftMusicMetadata.readMp3Metadata(file);
      } catch (error) {
        // A track still imports with its filename and the fallback fields when tags are unreadable.
      }
      const artist = musicImportValue(metadata.artist, fallbackArtist, 100);
      const album = musicImportValue(metadata.album, fallbackAlbum, 120);
      if (!artist || !album) continue;
      const albumId = musicAlbumId(artist, album);
      const trackKey = `${albumId}|${file.name.toLocaleLowerCase()}`;
      if (existingTracks.has(trackKey)) continue;
      const id = newSoundId();
      try {
        await storeRecord(MUSIC_TRACK_STORE, {
          id,
          albumId,
          artist,
          album,
          title: musicImportValue(metadata.title, musicTitle(file.name), 180),
          trackNumber: Number.isFinite(metadata.trackNumber) ? metadata.trackNumber : null,
          name: file.name,
          type: file.type,
          size: file.size,
          blob: file,
          addedAt: Date.now() + added
        });
        existingTracks.add(trackKey);
        if (metadata.artwork && metadata.artwork.size <= 15 * 1024 * 1024 && !artworkAlbums.has(albumId)) {
          try {
            await storeRecord(MUSIC_ARTWORK_STORE, {
              id: albumId,
              artist,
              album,
              name: `${album}-embedded-artwork`,
              type: metadata.artwork.type,
              blob: metadata.artwork,
              source: "embedded",
              addedAt: Date.now()
            });
            artworkAlbums.add(albumId);
          } catch (error) {
            // The track remains usable when embedded artwork cannot fit in local storage.
          }
        }
        if (metadata.title || metadata.artist || metadata.album || Number.isFinite(metadata.trackNumber)) metadataApplied += 1;
        lastTrackId = id;
        lastAlbumId = albumId;
        added += 1;
      } catch (error) {
        setMusicError("Local storage filled before every track could be added. Keep the originals in Files.");
        break;
      }
    }

    await loadMusicLibrary({ preferAlbumId: lastAlbumId, preferTrackId: lastTrackId });
    const metadataNote = metadataApplied ? " · MP3 details applied" : "";
    showToast(added ? `${added} track${added === 1 ? "" : "s"} added locally${metadataNote}` : "No new compatible tracks were added");
  }

  function pauseMusicForBackground() {
    if (!elements.musicAudio.paused) elements.musicAudio.pause();
    saveMusicState();
  }

  async function importMusicArtwork(event) {
    const file = event.target.files && event.target.files[0];
    event.target.value = "";
    if (!file) return;
    const artist = elements.musicImportArtist.value.trim();
    const album = elements.musicImportAlbum.value.trim();
    if (!artist || !album) {
      showToast("Enter an artist and album before adding artwork");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast("Album artwork must be smaller than 15 MB");
      return;
    }
    try {
      await validateImage(file);
      const albumId = musicAlbumId(artist, album);
      await storeRecord(MUSIC_ARTWORK_STORE, { id: albumId, artist, album, name: file.name, type: file.type, blob: file, addedAt: Date.now() });
      await loadMusicLibrary({ preferAlbumId: albumId, preferTrackId: selectedMusicTrackId });
      showToast("Album artwork added locally");
    } catch (error) {
      showToast("That album artwork could not be added");
    }
  }

  async function removeSelectedMusicTrack() {
    const track = selectedMusicTrack();
    if (!track || !window.confirm(`Remove ${track.title} from this device?`)) return;
    const wasPlaying = !elements.musicAudio.paused;
    elements.musicAudio.pause();
    await deleteStoredRecord(MUSIC_TRACK_STORE, track.id);
    await loadMusicLibrary({ preferAlbumId: track.albumId });
    if (wasPlaying) setMusicError("Playback stopped because the current track was removed.");
    showToast("Track removed from this device");
  }

  async function removeSelectedMusicAlbum() {
    const album = selectedMusicAlbum();
    if (!album || !window.confirm(`Remove ${album.title} and all of its tracks from this device?`)) return;
    elements.musicAudio.pause();
    for (const track of album.tracks) await deleteStoredRecord(MUSIC_TRACK_STORE, track.id);
    await deleteStoredRecord(MUSIC_ARTWORK_STORE, album.id);
    await loadMusicLibrary();
    showToast("Album removed from this device");
  }

  async function refreshSoundOptions() {
    try {
      uploadedSounds = await getAllUploadedSounds();
      uploadedSounds.sort((a, b) => a.name.localeCompare(b.name));
      const oldGroup = elements.soundStyle.querySelector("#uploaded-sound-options");
      if (oldGroup) oldGroup.remove();

      if (uploadedSounds.length) {
        const group = document.createElement("optgroup");
        group.id = "uploaded-sound-options";
        group.label = "My Sounds";
        uploadedSounds.forEach((sound) => {
          const option = document.createElement("option");
          option.value = `custom:${sound.id}`;
          option.textContent = sound.name;
          group.appendChild(option);
        });
        elements.soundStyle.appendChild(group);
      }

      const customId = String(atmosphere.soundStyle).replace("custom:", "");
      if (String(atmosphere.soundStyle).startsWith("custom:") && !uploadedSounds.some((sound) => sound.id === customId)) {
        atmosphere.soundStyle = DEFAULT_ATMOSPHERE.soundStyle;
        saveAtmosphere();
      }
      applyAtmosphere();
    } catch (error) {
      console.warn("Quiet Draft could not load custom sounds.", error);
    }
  }

  function backgroundLabel(filename) {
    return decodeURIComponent(filename)
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function renderBackgroundOptions() {
    elements.backgroundSelect.querySelectorAll(".dynamic-backgrounds").forEach((group) => group.remove());

    if (folderBackgrounds.length) {
      const group = document.createElement("optgroup");
      group.className = "dynamic-backgrounds";
      group.label = "Backgrounds Folder";
      folderBackgrounds.forEach((background) => {
        const option = document.createElement("option");
        option.value = `folder:${background.url}`;
        option.textContent = background.name;
        group.appendChild(option);
      });
      elements.backgroundSelect.appendChild(group);
    }

    if (uploadedBackgrounds.length) {
      const group = document.createElement("optgroup");
      group.className = "dynamic-backgrounds";
      group.label = "My Backgrounds";
      uploadedBackgrounds.forEach((background) => {
        const option = document.createElement("option");
        option.value = `custom-background:${background.id}`;
        option.textContent = background.name;
        group.appendChild(option);
      });
      elements.backgroundSelect.appendChild(group);
    }

    elements.backgroundSelect.value = atmosphere.background;
  }

  function loadCachedFolderBackgrounds() {
    try {
      const cached = JSON.parse(localStorage.getItem(FOLDER_BACKGROUNDS_KEY));
      if (Array.isArray(cached)) folderBackgrounds = cached;
    } catch (error) {
      console.warn("Quiet Draft found an unreadable background folder list.", error);
    }
  }

  async function discoverFolderBackgrounds({ announce = false } = {}) {
    try {
      const found = [];
      const seen = new Set();
      const manifestResponse = await fetch("./backgrounds/backgrounds.json", { cache: "no-store" });

      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();
        if (Array.isArray(manifest)) {
          manifest.forEach((entry) => {
            const filename = typeof entry === "string" ? entry : entry && entry.file;
            if (!filename || !/\.(avif|gif|jpe?g|png|webp)$/i.test(filename)) return;
            const url = new URL(filename, manifestResponse.url).href;
            if (seen.has(url)) return;
            seen.add(url);
            found.push({ url, name: typeof entry === "object" && entry.name ? entry.name : backgroundLabel(filename.split("/").pop()) });
          });
        }
      }

      if (!found.length) {
        const response = await fetch("./backgrounds/", { cache: "no-store" });
        if (!response.ok) throw new Error(`Background folder returned ${response.status}`);
        const html = await response.text();
        const documentFragment = new DOMParser().parseFromString(html, "text/html");

        documentFragment.querySelectorAll("a[href]").forEach((anchor) => {
          const href = anchor.getAttribute("href");
          if (!href || !/\.(avif|gif|jpe?g|png|webp)$/i.test(href)) return;
          const url = new URL(href, response.url).href;
          if (seen.has(url)) return;
          seen.add(url);
          const filename = new URL(url).pathname.split("/").pop();
          found.push({ url, name: backgroundLabel(filename) });
        });
      }

      if (found.length) {
        folderBackgrounds = found.sort((a, b) => a.name.localeCompare(b.name));
        localStorage.setItem(FOLDER_BACKGROUNDS_KEY, JSON.stringify(folderBackgrounds));
      }
      renderBackgroundOptions();
      applyAtmosphere();
      if (announce) showToast(found.length ? `${found.length} folder background${found.length === 1 ? "" : "s"} found` : "No folder images were discoverable");
      return found.length > 0;
    } catch (error) {
      renderBackgroundOptions();
      applyAtmosphere();
      if (announce) showToast("This host does not expose the backgrounds folder; use Add background images");
      return false;
    }
  }

  async function initializeBackgroundOptions() {
    loadCachedFolderBackgrounds();
    renderBackgroundOptions();
    applyAtmosphere();
    try {
      uploadedBackgrounds = await getAllUploadedBackgrounds();
      uploadedBackgrounds.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.warn("Quiet Draft could not load uploaded backgrounds.", error);
    }
    await discoverFolderBackgrounds();

    const folderExists = folderBackgrounds.some((item) => `folder:${item.url}` === atmosphere.background);
    const uploadedId = String(atmosphere.background).replace("custom-background:", "");
    const uploadExists = uploadedBackgrounds.some((item) => item.id === uploadedId);
    if ((String(atmosphere.background).startsWith("folder:") && !folderExists) ||
        (String(atmosphere.background).startsWith("custom-background:") && !uploadExists)) {
      atmosphere.background = DEFAULT_ATMOSPHERE.background;
      saveAtmosphere();
    }
    renderBackgroundOptions();
    applyAtmosphere();
  }

  function validateImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Unreadable image"));
      };
      image.src = url;
    });
  }

  async function uploadBackgroundImages(event) {
    const files = Array.from(event.target.files || []).slice(0, 20);
    if (!files.length) return;
    let added = 0;
    let lastId = null;

    for (const file of files) {
      if (file.size > 15 * 1024 * 1024) continue;
      try {
        await validateImage(file);
        const id = newSoundId();
        await storeUploadedBackground({ id, name: file.name, type: file.type, blob: file, addedAt: Date.now() });
        lastId = id;
        added += 1;
      } catch (error) {
        console.warn(`Quiet Draft could not add ${file.name} as a background.`, error);
      }
    }

    elements.backgroundUpload.value = "";
    uploadedBackgrounds = await getAllUploadedBackgrounds();
    uploadedBackgrounds.sort((a, b) => a.name.localeCompare(b.name));
    if (lastId) atmosphere.background = `custom-background:${lastId}`;
    renderBackgroundOptions();
    applyAtmosphere();
    saveAtmosphere();
    showToast(added ? `${added} background image${added === 1 ? "" : "s"} added` : "No compatible images were added");
  }

  async function removeSelectedBackground() {
    if (!String(atmosphere.background).startsWith("custom-background:")) return;
    const id = atmosphere.background.replace("custom-background:", "");
    const selected = uploadedBackgrounds.find((background) => background.id === id);
    if (!window.confirm(`Remove ${selected ? selected.name : "this background"} from Quiet Draft?`)) return;
    await deleteUploadedBackground(id);
    uploadedBackgrounds = uploadedBackgrounds.filter((background) => background.id !== id);
    atmosphere.background = DEFAULT_ATMOSPHERE.background;
    renderBackgroundOptions();
    applyAtmosphere();
    saveAtmosphere();
    showToast("Background removed");
  }

  function setAtmospherePanel(open) {
    document.body.classList.toggle("settings-open", open);
    elements.atmosphereToggle.setAttribute("aria-expanded", String(open));
    elements.atmospherePanel.setAttribute("aria-hidden", String(!open));
    if (open) elements.closeAtmosphere.focus();
    else elements.atmosphereToggle.focus();
  }

  function getAudioContext() {
    if (audioContext) return audioContext;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
    return audioContext;
  }

  async function customSoundBuffer(id) {
    if (customSoundBuffers.has(id)) return customSoundBuffers.get(id);
    const sound = uploadedSounds.find((item) => item.id === id);
    if (!sound) return null;
    const context = getAudioContext();
    if (!context) return null;
    const buffer = await context.decodeAudioData(await sound.blob.arrayBuffer());
    customSoundBuffers.set(id, buffer);
    return buffer;
  }

  async function uploadSounds(event) {
    const files = Array.from(event.target.files || []).slice(0, 20);
    if (!files.length) return;
    const context = getAudioContext();
    if (!context) {
      showToast("Custom audio is not supported in this browser");
      return;
    }

    let added = 0;
    let lastId = null;
    for (const file of files) {
      if (file.size > 8 * 1024 * 1024) continue;
      try {
        const buffer = await context.decodeAudioData(await file.arrayBuffer());
        const id = newSoundId();
        await storeUploadedSound({ id, name: file.name, type: file.type, blob: file, addedAt: Date.now() });
        customSoundBuffers.set(id, buffer);
        lastId = id;
        added += 1;
      } catch (error) {
        console.warn(`Quiet Draft could not decode ${file.name}.`, error);
      }
    }

    elements.soundUpload.value = "";
    await refreshSoundOptions();
    if (lastId) {
      atmosphere.soundStyle = `custom:${lastId}`;
      applyAtmosphere();
      saveAtmosphere();
    }
    showToast(added ? `${added} custom sound${added === 1 ? "" : "s"} added` : "No compatible audio files were added");
  }

  async function removeSelectedSound() {
    if (!String(atmosphere.soundStyle).startsWith("custom:")) return;
    const selected = uploadedSounds.find((sound) => `custom:${sound.id}` === atmosphere.soundStyle);
    if (!window.confirm(`Remove ${selected ? selected.name : "this custom sound"} from Quiet Draft?`)) return;
    const id = atmosphere.soundStyle.replace("custom:", "");
    try {
      await deleteUploadedSound(id);
      customSoundBuffers.delete(id);
      atmosphere.soundStyle = DEFAULT_ATMOSPHERE.soundStyle;
      saveAtmosphere();
      await refreshSoundOptions();
      showToast("Custom sound removed");
    } catch (error) {
      console.warn("Quiet Draft could not remove the custom sound.", error);
      showToast("The custom sound could not be removed");
    }
  }

  async function playKeySound(kind) {
    if (!atmosphere.soundEnabled || atmosphere.soundMuted || atmosphere.soundVolume === 0) return;

    const context = getAudioContext();
    if (!context) return;
    if (context.state === "suspended") context.resume();

    if (String(atmosphere.soundStyle).startsWith("custom:")) {
      try {
        const buffer = await customSoundBuffer(atmosphere.soundStyle.replace("custom:", ""));
        if (!buffer) return;
        const source = context.createBufferSource();
        const gain = context.createGain();
        source.buffer = buffer;
        source.playbackRate.value = kind === "space" ? 0.88 : kind === "enter" ? 0.72 : 1;
        gain.gain.value = atmosphere.soundVolume / 100;
        source.connect(gain);
        gain.connect(context.destination);
        source.start();
      } catch (error) {
        console.warn("Quiet Draft could not play the selected custom sound.", error);
      }
      return;
    }

    const profiles = {
      "soft-click": { wave: "sine", frequency: 520, duration: 0.028, level: 0.10 },
      typewriter: { wave: "square", frequency: 185, duration: 0.038, level: 0.055 },
      mechanical: { wave: "triangle", frequency: 310, duration: 0.032, level: 0.085 }
    };
    const profile = profiles[atmosphere.soundStyle];
    const variation = kind === "space" ? 0.72 : kind === "enter" ? 0.48 : 1;
    const duration = kind === "enter" ? profile.duration * 1.55 : profile.duration;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = profile.wave;
    oscillator.frequency.setValueAtTime(profile.frequency * variation, now);
    if (kind === "enter") oscillator.frequency.exponentialRampToValueAtTime(profile.frequency * 0.34, now + duration);
    gain.gain.setValueAtTime(profile.level * (atmosphere.soundVolume / 100), now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  function handleTypingSound(event) {
    const isEditor = event.target === elements.title || event.target === elements.body;
    if (!isEditor || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "Enter") playKeySound("enter");
    else if (event.key === " ") playKeySound("space");
    else if (event.key.length === 1) playKeySound("key");
  }

  function countWords(text) {
    const trimmed = text.trim();
    return trimmed ? trimmed.split(/\s+/u).length : 0;
  }

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function loadWritingMetrics() {
    try {
      const saved = JSON.parse(localStorage.getItem(WRITING_METRICS_KEY));
      if (saved && typeof saved === "object") writingMetrics = { ...writingMetrics, ...saved };
    } catch (error) {
      console.warn("Quiet Draft found unreadable writing metrics.", error);
    }
    writingMetrics.project = typeof writingMetrics.project === "string" ? writingMetrics.project.slice(0, 100) : "Inheritance Dust";
    writingMetrics.scene = typeof writingMetrics.scene === "string" ? writingMetrics.scene.slice(0, 120) : "";
    writingMetrics.manuscriptTotal = Math.round(numberInRange(writingMetrics.manuscriptTotal, 0, 9999999, 0));
    writingMetrics.todayWords = Math.trunc(numberInRange(writingMetrics.todayWords, -9999999, 9999999, 0));
    writingMetrics.todayDate = typeof writingMetrics.todayDate === "string" ? writingMetrics.todayDate : "";
    writingMetrics.lastExportAt = typeof writingMetrics.lastExportAt === "string" ? writingMetrics.lastExportAt : null;
    if (writingMetrics.todayDate !== localDateKey()) {
      writingMetrics.todayDate = localDateKey();
      writingMetrics.todayWords = 0;
    }
    saveWritingMetrics();
  }

  function saveWritingMetrics() {
    try {
      localStorage.setItem(WRITING_METRICS_KEY, JSON.stringify(writingMetrics));
    } catch (error) {
      console.warn("Quiet Draft could not save writing metrics.", error);
    }
  }

  function ensureMetricsDate() {
    const today = localDateKey();
    if (writingMetrics.todayDate === today) return;
    writingMetrics.todayDate = today;
    writingMetrics.todayWords = 0;
    saveWritingMetrics();
  }

  function formatWordDelta(value) {
    const words = Math.trunc(Number(value) || 0);
    if (words > 0) return `+${words.toLocaleString()}`;
    if (words < 0) return `−${Math.abs(words).toLocaleString()}`;
    return "0";
  }

  function formatMetricTimestamp(value) {
    const date = value instanceof Date ? value : new Date(value || "");
    if (Number.isNaN(date.getTime())) return "Not yet";
    const time = formatSaveTime(date);
    if (localDateKey(date) === localDateKey()) return `Today ${time}`;
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(date);
  }

  function renderWritingMetrics() {
    ensureMetricsDate();
    elements.metricProject.value = writingMetrics.project;
    elements.metricCurrentDraft.textContent = elements.title.value.trim() || "Untitled Draft";
    elements.metricScene.value = writingMetrics.scene;
    elements.metricSessionWords.textContent = formatWordDelta(sessionWordDelta);
    elements.metricTodayWords.textContent = formatWordDelta(writingMetrics.todayWords);
    elements.metricManuscriptTotal.value = String(writingMetrics.manuscriptTotal);
    elements.metricLastAutosave.textContent = formatMetricTimestamp(lastSavedAt);
    elements.metricLastExport.textContent = formatMetricTimestamp(writingMetrics.lastExportAt);
  }

  function initializeWritingMetrics() {
    sessionWordDelta = 0;
    observedWordCount = countWords(elements.body.value);
    renderWritingMetrics();
  }

  function recordWritingDelta() {
    ensureMetricsDate();
    const nextCount = countWords(elements.body.value);
    const delta = nextCount - observedWordCount;
    observedWordCount = nextCount;
    if (!delta) return;
    sessionWordDelta += delta;
    writingMetrics.todayWords += delta;
    saveWritingMetrics();
    renderWritingMetrics();
  }

  function updateCounts() {
    const text = elements.body.value;
    elements.wordCount.textContent = countWords(text).toLocaleString();
    elements.characterCount.textContent = text.length.toLocaleString();
  }

  function resizeEditor() {
    elements.body.style.height = "auto";
    elements.body.style.height = `${Math.max(elements.body.scrollHeight, 440)}px`;
  }

  function setSaveStatus(message, pending = false) {
    elements.saveStatus.textContent = message;
    elements.statusDot.classList.toggle("pending", pending);
  }

  function formatSaveTime(date) {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit"
    }).format(date);
  }

  function saveDraft({ announce = false } = {}) {
    window.clearTimeout(saveTimer);

    const draft = {
      title: elements.title.value,
      body: elements.body.value,
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      lastSavedAt = new Date(draft.updatedAt);
      setSaveStatus(`Saved locally at ${formatSaveTime(lastSavedAt)}`);
      renderWritingMetrics();
      if (announce) showToast("Draft saved on this device");
    } catch (error) {
      setSaveStatus("Could not save locally", true);
      if (announce) showToast("Local save was unavailable");
      console.error("Quiet Draft could not save the draft.", error);
    }
  }

  function scheduleSave() {
    window.clearTimeout(saveTimer);
    setSaveStatus("Saving…", true);
    saveTimer = window.setTimeout(() => saveDraft(), AUTOSAVE_DELAY);
  }

  function loadDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || typeof saved !== "object") return;

      elements.title.value = typeof saved.title === "string" ? saved.title : "Untitled Draft";
      elements.body.value = typeof saved.body === "string" ? saved.body : "";
      lastSavedAt = saved.updatedAt ? new Date(saved.updatedAt) : null;

      if (lastSavedAt && !Number.isNaN(lastSavedAt.getTime())) {
        setSaveStatus(`Saved locally at ${formatSaveTime(lastSavedAt)}`);
      }
    } catch (error) {
      console.warn("Quiet Draft found unreadable local draft data.", error);
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    toastTimer = window.setTimeout(() => elements.toast.classList.remove("visible"), 2200);
  }

  function newDraft() {
    const hasContent = elements.body.value.trim() || elements.title.value.trim() !== "Untitled Draft";
    if (hasContent && !window.confirm("Start a new draft? This will replace your current locally saved draft. Export anything you want to keep first.")) {
      return;
    }

    elements.title.value = "Untitled Draft";
    elements.body.value = "";
    observedWordCount = 0;
    updateCounts();
    renderWritingMetrics();
    resizeEditor();
    saveDraft();
    elements.title.focus();
    elements.title.select();
    showToast("New draft ready");
  }

  function filenameDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function safeFilename(title) {
    const cleaned = title
      .trim()
      .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "")
      .replace(/\s+/g, " ")
      .replace(/[. ]+$/g, "")
      .slice(0, 80);
    return cleaned || "Untitled Draft";
  }

  function exportDraft() {
    saveDraft();
    const title = elements.title.value.trim();
    const documentText = title
      ? `${title}\n\n${elements.body.value}`
      : elements.body.value;
    const blob = new Blob([documentText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeFilename(title)} - ${filenameDate()}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    writingMetrics.lastExportAt = new Date().toISOString();
    saveWritingMetrics();
    renderWritingMetrics();
    showToast("Text file exported");
  }

  async function copyAll() {
    const title = elements.title.value.trim();
    const text = title ? `${title}\n\n${elements.body.value}` : elements.body.value;

    try {
      await navigator.clipboard.writeText(text);
      showToast("Draft copied to clipboard");
    } catch (error) {
      const helper = document.createElement("textarea");
      helper.value = text;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      showToast(copied ? "Draft copied to clipboard" : "Select the text and copy manually");
    }
  }

  function preferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    elements.themeIcon.textContent = theme === "dark" ? "☀" : "☾";
    elements.themeToggle.setAttribute("aria-label", `Use ${theme === "dark" ? "light" : "dark"} mode`);
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.disabled = true;
    });
    let themeMeta = document.querySelector('meta[name="theme-color"][data-active]');
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.name = "theme-color";
      themeMeta.dataset.active = "true";
      document.head.appendChild(themeMeta);
    }
    themeMeta.content = theme === "dark" ? "#0d0b12" : "#dcd7df";
  }

  function updateConnectionStatus() {
    if (!elements.connectionStatus) return;
    const offline = navigator.onLine === false;
    elements.connectionStatus.classList.toggle("offline", offline);
    const label = elements.connectionStatus.querySelector(".connection-label");
    if (label) label.textContent = offline ? "Offline ready" : "Local first";
  }

  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    showToast(`${next === "dark" ? "Dark" : "Light"} mode`);
  }

  function setFocusMode(enabled) {
    document.body.classList.toggle("focus-mode", enabled);
    elements.focusToggle.setAttribute("aria-label", enabled ? "Exit focus mode" : "Enter focus mode");
    if (enabled) elements.body.focus();
  }

  function handleKeyboard(event) {
    const modifier = event.metaKey || event.ctrlKey;

    if (modifier && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveDraft({ announce: true });
    }

    if (modifier && event.shiftKey && event.key.toLowerCase() === "f") {
      event.preventDefault();
      setFocusMode(!document.body.classList.contains("focus-mode"));
    }

    if (event.key === "Escape" && document.body.classList.contains("focus-mode")) {
      setFocusMode(false);
    }

    if (event.key === "Escape" && document.body.classList.contains("settings-open")) {
      setAtmospherePanel(false);
    }
  }

  function handleEditorInput() {
    recordWritingDelta();
    updateCounts();
    resizeEditor();
    scheduleSave();
  }

  elements.title.addEventListener("input", () => {
    renderWritingMetrics();
    scheduleSave();
  });
  elements.body.addEventListener("input", handleEditorInput);
  elements.metricProject.addEventListener("input", () => {
    writingMetrics.project = elements.metricProject.value.slice(0, 100);
    saveWritingMetrics();
  });
  elements.metricScene.addEventListener("input", () => {
    writingMetrics.scene = elements.metricScene.value.slice(0, 120);
    saveWritingMetrics();
  });
  elements.metricManuscriptTotal.addEventListener("input", () => {
    writingMetrics.manuscriptTotal = Math.round(numberInRange(elements.metricManuscriptTotal.value, 0, 9999999, 0));
    saveWritingMetrics();
  });
  elements.newDraft.addEventListener("click", newDraft);
  elements.saveDraft.addEventListener("click", () => saveDraft({ announce: true }));
  elements.exportDraft.addEventListener("click", exportDraft);
  elements.copyDraft.addEventListener("click", copyAll);
  elements.atmosphereToggle.addEventListener("click", () => setAtmospherePanel(true));
  elements.closeAtmosphere.addEventListener("click", () => setAtmospherePanel(false));
  elements.panelBackdrop.addEventListener("click", () => setAtmospherePanel(false));
  elements.backgroundSelect.addEventListener("change", () => {
    atmosphere.background = elements.backgroundSelect.value;
    applyAtmosphere();
    saveAtmosphere();
  });
  elements.backgroundUpload.addEventListener("change", uploadBackgroundImages);
  elements.refreshBackgrounds.addEventListener("click", () => discoverFolderBackgrounds({ announce: true }));
  elements.removeBackground.addEventListener("click", removeSelectedBackground);
  elements.editorStyle.addEventListener("change", () => {
    atmosphere.editorAppearance = elements.editorStyle.value;
    applyAtmosphere();
    saveAtmosphere();
  });
  elements.editorOpacity.addEventListener("input", () => {
    atmosphere.editorOpacity = Number(elements.editorOpacity.value);
    applyAtmosphere();
    saveAtmosphere();
  });
  elements.soundEnabled.addEventListener("change", () => {
    atmosphere.soundEnabled = elements.soundEnabled.checked;
    if (atmosphere.soundEnabled) {
      const context = getAudioContext();
      if (context && context.state === "suspended") context.resume();
    }
    saveAtmosphere();
  });
  elements.soundMuted.addEventListener("change", () => {
    atmosphere.soundMuted = elements.soundMuted.checked;
    saveAtmosphere();
  });
  elements.soundVolume.addEventListener("input", () => {
    atmosphere.soundVolume = Number(elements.soundVolume.value);
    elements.soundVolumeValue.textContent = `${atmosphere.soundVolume}%`;
    saveAtmosphere();
  });
  elements.soundStyle.addEventListener("change", () => {
    atmosphere.soundStyle = elements.soundStyle.value;
    elements.removeSound.disabled = !String(atmosphere.soundStyle).startsWith("custom:");
    if (String(atmosphere.soundStyle).startsWith("custom:")) {
      customSoundBuffer(atmosphere.soundStyle.replace("custom:", "")).catch(() => {});
    }
    saveAtmosphere();
  });
  elements.soundUpload.addEventListener("change", uploadSounds);
  elements.removeSound.addEventListener("click", removeSelectedSound);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.focusToggle.addEventListener("click", () => setFocusMode(true));
  elements.exitFocus.addEventListener("click", () => setFocusMode(false));
  elements.nextFact.addEventListener("click", showNextFact);
  elements.importFacts.addEventListener("click", () => elements.contentLibraryUpload.click());
  elements.nextMessage.addEventListener("click", showNextMessage);
  elements.importMessages.addEventListener("click", () => elements.contentLibraryUpload.click());
  elements.contentLibraryUpload.addEventListener("change", importContentLibrary);
  elements.previousImage.addEventListener("click", () => moveGallery(-1));
  elements.randomImage.addEventListener("click", showRandomGalleryImage);
  elements.nextImage.addEventListener("click", () => moveGallery(1));
  elements.galleryUpload.addEventListener("change", uploadGalleryImages);
  elements.galleryImage.addEventListener("error", handleGalleryImageError);
  elements.musicAlbumSelect.addEventListener("change", () => {
    selectedMusicAlbumId = elements.musicAlbumSelect.value;
    const album = selectedMusicAlbum();
    selectedMusicTrackId = album && album.tracks[0] ? album.tracks[0].id : "";
    renderMusicOptions();
    syncMusicImportFields();
    loadSelectedMusicTrack();
  });
  elements.musicTrackSelect.addEventListener("change", () => changeMusicTrack(elements.musicTrackSelect.value));
  elements.musicPrevious.addEventListener("click", () => moveMusicTrack(-1));
  elements.musicPlay.addEventListener("click", toggleMusicPlayback);
  elements.musicNext.addEventListener("click", () => moveMusicTrack(1));
  elements.musicShuffle.addEventListener("click", toggleMusicShuffle);
  elements.musicRepeat.addEventListener("click", cycleMusicRepeat);
  elements.musicSeek.addEventListener("input", handleMusicSeek);
  elements.musicVolume.addEventListener("input", () => {
    musicState.volume = Number(elements.musicVolume.value);
    elements.musicAudio.volume = musicState.volume / 100;
    elements.musicVolumeValue.textContent = `${musicState.volume}%`;
    saveMusicState();
  });
  elements.musicTrackUpload.addEventListener("change", importMusicTracks);
  elements.musicCoverUpload.addEventListener("change", importMusicArtwork);
  elements.musicRemoveTrack.addEventListener("click", removeSelectedMusicTrack);
  elements.musicRemoveAlbum.addEventListener("click", removeSelectedMusicAlbum);
  elements.musicAudio.addEventListener("loadedmetadata", handleMusicMetadata);
  elements.musicAudio.addEventListener("timeupdate", handleMusicTimeUpdate);
  elements.musicAudio.addEventListener("ended", handleMusicEnded);
  elements.musicAudio.addEventListener("play", () => {
    elements.musicPlay.textContent = "❚❚";
    elements.musicPlay.setAttribute("aria-label", "Pause");
  });
  elements.musicAudio.addEventListener("pause", () => {
    elements.musicPlay.textContent = "▶";
    elements.musicPlay.setAttribute("aria-label", "Play");
    saveMusicState();
  });
  elements.musicAudio.addEventListener("error", () => setMusicError("This track is missing or uses an unsupported audio format."));
  document.addEventListener("keydown", handleTypingSound);
  document.addEventListener("keydown", handleKeyboard);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      pauseMusicForBackground();
      saveDraft();
    } else {
      renderWritingMetrics();
    }
  });
  window.addEventListener("pagehide", () => {
    pauseMusicForBackground();
    saveDraft();
  });
  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);

  loadAtmosphere();
  loadMusicState();
  loadWritingMetrics();
  applyTheme(preferredTheme());
  updateConnectionStatus();
  applyAtmosphere();
  initializeBackgroundOptions();
  refreshSoundOptions();
  loadCharacterModules();
  loadGallery();
  loadMusicLibrary({ restorePosition: true });
  loadDraft();
  initializeWritingMetrics();
  updateCounts();
  resizeEditor();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js?v=20260719-7")
        .then((registration) => registration.update())
        .catch((error) => {
          if (!navigator.serviceWorker.controller) {
            console.warn("Quiet Draft could not enable offline mode.", error);
          }
        });
    });
  }
})();
