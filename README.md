# Memory Decay

An AI agent that simulates memory decay for Walrus Session 4.

Walrus stores every memory forever. This agent shows what happens when humans forget — and proves you can always restore the original from Walrus.

## Why it fits Walrus Memory

The core demo is the before/after memory moment:

- Save a memory → it's fresh and clear
- Come back days later → text fades and corrupts
- Click **Refresh** → Walrus restores the original, pixel-perfect

With `MEMWAL_PRIVATE_KEY` and `MEMWAL_ACCOUNT_ID` set, memories are written through the hosted Walrus Memory relayer on mainnet.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL, save memories, or click `Seed demo` to see memories at different decay stages.

## Enable Walrus Memory mainnet

Set these env vars in Vercel or local shell:

```bash
MEMWAL_PRIVATE_KEY=<delegate-private-key-from-memory-dashboard>
MEMWAL_ACCOUNT_ID=<memwal-account-object-id>
MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz
MEMWAL_NAMESPACE=memory-decay
```

The app falls back to local demo mode when credentials are missing so judges can still inspect the UX.

## Links

- Live: https://walrus-roast-agent.vercel.app
- Demo video: https://raw.githubusercontent.com/0xdungki/memory-decay/main/dist/demo-video.mp4
- Repo: https://github.com/0xdungki/memory-decay
