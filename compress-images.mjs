/**
 * compress-images.mjs
 * Converts all JPG/JPEG/PNG images in public/images to WebP
 * and places them alongside originals. Skips already-converted files.
 * Run with: node compress-images.mjs
 */
import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join, extname, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = join(__dirname, "public/images");
const WEBP_QUALITY = 82; // Good quality/size trade-off for photography

let converted = 0;
let skipped = 0;
let totalSavedBytes = 0;

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function compress() {
  console.log("🔍 Scanning images in", INPUT_DIR, "\n");

  for await (const filePath of walk(INPUT_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    // Skip if webp already exists and is newer than source
    try {
      const srcStat = await stat(filePath);
      const dstStat = await stat(webpPath);
      if (dstStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    } catch {
      // webp doesn't exist yet — proceed
    }

    try {
      const srcStat = await stat(filePath);
      await sharp(filePath)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);

      const dstStat = await stat(webpPath);
      const saved = srcStat.size - dstStat.size;
      totalSavedBytes += saved;
      converted++;

      const srcMB = (srcStat.size / 1024 / 1024).toFixed(1);
      const dstMB = (dstStat.size / 1024 / 1024).toFixed(1);
      const pct = Math.round((saved / srcStat.size) * 100);
      console.log(
        `✅ ${basename(filePath).padEnd(40)} ${srcMB}MB → ${dstMB}MB  (-${pct}%)`
      );
    } catch (err) {
      console.error(`❌ Error converting ${filePath}:`, err.message);
    }
  }

  const savedMB = (totalSavedBytes / 1024 / 1024).toFixed(1);
  console.log(`\n🎉 Done! Converted ${converted} images, skipped ${skipped}.`);
  console.log(`💾 Total space saved: ~${savedMB} MB`);
}

compress();
