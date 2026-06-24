import { MemWal } from "@mysten-incubation/memwal";

function hasMemWalEnv() {
  return Boolean(process.env.MEMWAL_PRIVATE_KEY && process.env.MEMWAL_ACCOUNT_ID);
}

function client() {
  return MemWal.create({
    key: process.env.MEMWAL_PRIVATE_KEY,
    accountId: process.env.MEMWAL_ACCOUNT_ID,
    serverUrl: process.env.MEMWAL_SERVER_URL || "https://relayer.memory.walrus.xyz",
  });
}

let cached = null;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (!hasMemWalEnv()) return res.json({ mode: "local", memories: [] });

  try {
    if (!cached) cached = client();

    if (req.method === "GET") {
      const result = await cached.recall("recent memories");
      const memories = (result.results || []).map(r => r.text ? { title: "", content: r.text } : (r.data || r)).filter(Boolean);
      return res.json({ mode: "memwal", memories });
    }

    if (req.method === "POST") {
      const { memory } = req.body;
      const text = `${memory.title}: ${memory.content}`;
      const job = await cached.remember(text);
      // Return immediately; job completes async
      return res.json({ mode: "memwal", stored: true, job_id: job.job_id });
    }
  } catch (error) {
    return res.json({ mode: "local", memories: [], error: error.message });
  }
}
