import assert from "node:assert/strict";

// Decay math verification
const DECAY_HALF_LIFE = 7;
function clarity(days) { return Math.max(0.05, Math.pow(0.5, days / DECAY_HALF_LIFE)); }
function decayState(days) {
  if (days <= 3) return "fresh";
  if (days <= 10) return "fading";
  return "decayed";
}

assert.strictEqual(clarity(0), 1);
assert.ok(clarity(7) >= 0.49 && clarity(7) <= 0.51, `7-day clarity should be ~0.5, got ${clarity(7)}`);
assert.ok(clarity(14) >= 0.24 && clarity(14) <= 0.26, `14-day clarity should be ~0.25, got ${clarity(14)}`);
assert.strictEqual(clarity(100), 0.05, "clarity floor is 0.05");

assert.strictEqual(decayState(0), "fresh");
assert.strictEqual(decayState(3), "fresh");
assert.strictEqual(decayState(5), "fading");
assert.strictEqual(decayState(10), "fading");
assert.strictEqual(decayState(11), "decayed");

console.log("decay engine checks passed");
