import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

// One Line, One Laugh — a single self-contained joke, 1..140 chars.
// The line: a password manager forgetting the one thing it exists to remember.
const ENTRY =
  "My password manager forgot my password, so now we're both locked out of my life.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: the entry must exist, be non-blank, and fit the 140-char gate.
const written = readFileSync(entryPath, "utf8");
if (!existsSync(entryPath) || written.trim().length === 0) {
  console.error("GATE FAIL: entry.txt missing or empty");
  process.exit(1);
}
if (written.length > 140) {
  console.error(`GATE FAIL: entry is ${written.length} chars, over the 140-char limit`);
  process.exit(1);
}
if (written.includes("\n")) {
  console.error("GATE FAIL: entry must be a single line");
  process.exit(1);
}
console.log(`OK: entry.txt written (${written.length} chars)`);
