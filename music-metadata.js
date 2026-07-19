(() => {
  "use strict";

  const MAX_TAG_BYTES = 24 * 1024 * 1024;
  const TEXT_FRAMES = {
    TIT2: "title",
    TT2: "title",
    TPE1: "artist",
    TP1: "artist",
    TALB: "album",
    TAL: "album",
    TRCK: "track",
    TRK: "track"
  };

  function synchsafeInteger(bytes, offset) {
    return ((bytes[offset] & 0x7f) << 21)
      | ((bytes[offset + 1] & 0x7f) << 14)
      | ((bytes[offset + 2] & 0x7f) << 7)
      | (bytes[offset + 3] & 0x7f);
  }

  function unsignedInteger(bytes, offset, length) {
    let value = 0;
    for (let index = 0; index < length; index += 1) value = (value * 256) + bytes[offset + index];
    return value;
  }

  function ascii(bytes, start, length) {
    return String.fromCharCode(...bytes.subarray(start, start + length));
  }

  function decodeText(bytes) {
    if (!bytes.length) return "";
    const encoding = bytes[0];
    const content = bytes.subarray(1);
    let label = "windows-1252";
    if (encoding === 1) label = "utf-16";
    if (encoding === 2) label = "utf-16be";
    if (encoding === 3) label = "utf-8";
    try {
      return new TextDecoder(label).decode(content).replace(/\0/g, "").trim();
    } catch (error) {
      return String.fromCharCode(...content).replace(/\0/g, "").trim();
    }
  }

  function terminatedFieldEnd(bytes, start, encoding) {
    if (encoding === 1 || encoding === 2) {
      for (let index = start; index + 1 < bytes.length; index += 2) {
        if (bytes[index] === 0 && bytes[index + 1] === 0) return index;
      }
      return bytes.length;
    }
    const index = bytes.indexOf(0, start);
    return index === -1 ? bytes.length : index;
  }

  function pictureFromFrame(frameId, bytes) {
    if (bytes.length < 6) return null;
    const encoding = bytes[0];
    let mime = "";
    let descriptionStart = 0;

    if (frameId === "PIC") {
      const format = ascii(bytes, 1, 3).toUpperCase();
      mime = format === "PNG" ? "image/png" : "image/jpeg";
      descriptionStart = 5;
    } else {
      const mimeEnd = bytes.indexOf(0, 1);
      if (mimeEnd === -1 || mimeEnd + 1 >= bytes.length) return null;
      mime = ascii(bytes, 1, mimeEnd - 1).toLowerCase();
      descriptionStart = mimeEnd + 2;
    }

    if (!mime.startsWith("image/")) return null;
    const descriptionEnd = terminatedFieldEnd(bytes, descriptionStart, encoding);
    const imageStart = Math.min(bytes.length, descriptionEnd + ((encoding === 1 || encoding === 2) ? 2 : 1));
    if (imageStart >= bytes.length) return null;
    return new Blob([bytes.slice(imageStart)], { type: mime });
  }

  function parseTag(bytes) {
    if (bytes.length < 10 || ascii(bytes, 0, 3) !== "ID3") return {};
    const version = bytes[3];
    if (![2, 3, 4].includes(version)) return {};
    const tagEnd = Math.min(bytes.length, 10 + synchsafeInteger(bytes, 6));
    let offset = 10;

    if ((bytes[5] & 0x40) && version === 3 && offset + 4 <= tagEnd) {
      offset += 4 + unsignedInteger(bytes, offset, 4);
    } else if ((bytes[5] & 0x40) && version === 4 && offset + 4 <= tagEnd) {
      offset += synchsafeInteger(bytes, offset);
    }

    const metadata = {};
    const headerLength = version === 2 ? 6 : 10;
    while (offset + headerLength <= tagEnd) {
      const idLength = version === 2 ? 3 : 4;
      const frameId = ascii(bytes, offset, idLength);
      if (!/^[A-Z0-9]{3,4}$/.test(frameId)) break;
      const size = version === 2
        ? unsignedInteger(bytes, offset + 3, 3)
        : (version === 4 ? synchsafeInteger(bytes, offset + 4) : unsignedInteger(bytes, offset + 4, 4));
      const dataStart = offset + headerLength;
      const dataEnd = dataStart + size;
      if (!size || dataEnd > tagEnd) break;
      const frame = bytes.subarray(dataStart, dataEnd);

      if (TEXT_FRAMES[frameId] && !metadata[TEXT_FRAMES[frameId]]) {
        metadata[TEXT_FRAMES[frameId]] = decodeText(frame);
      } else if ((frameId === "APIC" || frameId === "PIC") && !metadata.artwork) {
        metadata.artwork = pictureFromFrame(frameId, frame);
      }
      offset = dataEnd;
    }

    const trackMatch = String(metadata.track || "").match(/\d+/);
    metadata.trackNumber = trackMatch ? Number(trackMatch[0]) : null;
    delete metadata.track;
    return metadata;
  }

  async function readMp3Metadata(file) {
    if (!file || (!/\.mp3$/i.test(file.name || "") && file.type !== "audio/mpeg")) return {};
    const header = new Uint8Array(await file.slice(0, 10).arrayBuffer());
    if (header.length < 10 || ascii(header, 0, 3) !== "ID3") return {};
    const tagLength = 10 + synchsafeInteger(header, 6);
    if (tagLength > MAX_TAG_BYTES || tagLength > file.size) return {};
    return parseTag(new Uint8Array(await file.slice(0, tagLength).arrayBuffer()));
  }

  globalThis.QuietDraftMusicMetadata = { readMp3Metadata };
})();
