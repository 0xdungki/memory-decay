# Memory Decay

An AI agent that simulates memory decay for Walrus Session 4.

Walrus stores every memory forever. This agent shows what happens when humans forget — and proves you can always restore the original from Walrus.

## Why it fits Walrus Memory

The core demo is the before/after memory moment:

- Day 1: a prediction is just a single take.
- Day 4+: the agent recalls repeated behavior and changes its feedback.
- With `MEMWAL_PRIVATE_KEY` and `MEMWAL_ACCOUNT_ID` set, memories are written through the hosted Walrus Memory relayer on mainnet.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL, add predictions, or click `Seed 4-day demo`.

## Enable Walrus Memory mainnet

Set these env vars in Vercel or local shell:

```bash
MEMWAL_PRIVATE_KEY=<delegate-private-key-from-memory-dashboard>
MEMWAL_ACCOUNT_ID=<memwal-account-object-id>
MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz
MEMWAL_NAMESPACE=world-cup-roast-agent
```

The app falls back to local demo mode when credentials are missing so judges can still inspect the UX.

## Submission identity

- Project name: Fan Memory War Room
- Team leader name: dungki @vikajoestar
- X account: dungki
- Discord: pungki
- Referral: @vikajoestar
