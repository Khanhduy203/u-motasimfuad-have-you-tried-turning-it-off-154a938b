import * as fs from "node:fs";
import * as path from "node:path";

// One funny line a hopeless tech support agent says to a desperate customer.
// The twist: the "escalation" to the senior team is just the same agent in a
// different headset — cheerful uselessness, then the classic reboot anyway.
const ENTRY =
  "I've escalated your case to our senior team — that's me in a different headset, so let's turn it off and on again.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });

const entry = ENTRY.trim();
if (entry.length < 1 || entry.length > 199) {
  throw new Error(`entry must be 1-199 characters, got ${entry.length}`);
}
if (!/\S/.test(entry)) {
  throw new Error("entry must not be only whitespace");
}

if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(entry)) {
  throw new Error("entry must not contain control characters");
}

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, entry, "utf8");
if (fs.readFileSync(outPath, "utf8") !== entry) {
  throw new Error("entry.txt read-back mismatch");
}
