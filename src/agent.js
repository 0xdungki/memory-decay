export function analyzeBias(memories) {
  const text = memories.map(memory => `${memory.pick} ${memory.reason}`).join(" ").toLowerCase();
  const vibes = (text.match(/win|menang|trust|yakin|momentum|underdog|comeback|vibes/g) || []).length;
  const data = (text.match(/injury|odds|xg|data|draw|risk|defense|stat/g) || []).length;
  const label = vibes > data ? "vibes merchant" : data > vibes ? "data goblin" : memories.length ? "balanced chaos" : "unknown";
  return { vibes, data, label, tilt: memories.length ? Math.max(8, Math.min(92, 50 + (vibes - data) * 9)) : 50 };
}

export function buildRoast(memories) {
  if (!memories.length) return "No memories yet. Save a few predictions and this agent stops being polite.";

  const { vibes: optimism, data: caution, label } = analyzeBias(memories);
  const latest = memories[0];
  const oldest = memories[memories.length - 1];
  const bias = label;

  return [
    `Pattern detected: ${bias}.`,
    `Latest take: “${latest.pick}” for ${latest.match}.`,
    memories.length >= 4
      ? `After ${memories.length} memories, you keep carrying the same bias from “${oldest.pick}” into new matches.`
      : `Need ${4 - memories.length} more memories for the full Day 4 roast moment.`,
    optimism > caution
      ? "Roast: you rate vibes like they are expected goals. Cute, dangerous, very World Cup."
      : "Roast: you ask for data, then still pick with your chest. At least the receipts are stored now."
  ].join(" ");
}

export function makeMemory({ match, pick, reason }) {
  return {
    id: crypto.randomUUID(),
    match: match.trim(),
    pick: pick.trim(),
    reason: reason.trim(),
    createdAt: new Date().toISOString(),
  };
}
