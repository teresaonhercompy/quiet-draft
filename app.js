(() => {
  "use strict";

  const STORAGE_KEY = "quiet-draft.current.v1";
  const THEME_KEY = "quiet-draft.theme.v1";
  const ATMOSPHERE_KEY = "quiet-draft.atmosphere.v1";
  const FOLDER_BACKGROUNDS_KEY = "quiet-draft.folder-backgrounds.v1";
  const SOUND_DATABASE = "quiet-draft-assets";
  const SOUND_STORE = "sounds";
  const BACKGROUND_STORE = "backgrounds";
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
    toast: document.querySelector("#toast")
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
      const request = indexedDB.open(SOUND_DATABASE, 2);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(SOUND_STORE)) {
          database.createObjectStore(SOUND_STORE, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(BACKGROUND_STORE)) {
          database.createObjectStore(BACKGROUND_STORE, { keyPath: "id" });
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

  function newSoundId() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
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
    updateCounts();
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
    updateCounts();
    resizeEditor();
    scheduleSave();
  }

  elements.title.addEventListener("input", scheduleSave);
  elements.body.addEventListener("input", handleEditorInput);
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
  document.addEventListener("keydown", handleTypingSound);
  document.addEventListener("keydown", handleKeyboard);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveDraft();
  });
  window.addEventListener("pagehide", () => saveDraft());
  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);

  loadAtmosphere();
  applyTheme(preferredTheme());
  updateConnectionStatus();
  applyAtmosphere();
  initializeBackgroundOptions();
  refreshSoundOptions();
  loadDraft();
  updateCounts();
  resizeEditor();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js?v=20260719-1")
        .then((registration) => registration.update())
        .catch((error) => {
          if (!navigator.serviceWorker.controller) {
            console.warn("Quiet Draft could not enable offline mode.", error);
          }
        });
    });
  }
})();
