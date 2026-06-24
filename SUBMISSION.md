# Walrus Session 4 Submission Draft

Project name: Fan Memory War Room
Team Leader Name: dungki @vikajoestar
Discord handle: pungki
X account: dungki
Referral: @vikajoestar
DeepSurge project Link: TBD after DeepSurge project creation
Project Link: https://walrus-roast-agent.vercel.app
Deployed agent: https://walrus-roast-agent.vercel.app
GitHub: TBD after repo push
SUI address: TBD
MEMWAL_AGENT_ID: TBD from https://memory.walrus.xyz/dashboard delegate keys
MemWalAccount explorer: TBD after mainnet account creation

## Workflow and functionality

Fan Memory War Room is a World Cup prediction agent that stores a user's match predictions, reasoning, and changing opinions across sessions. On day one it can only comment on the current prediction; after multiple entries it recalls the user's prior takes, identifies recurring bias, and produces a memory-based roast and prediction profile. The demo includes a 4-day seeded arc to make the before/after memory moment obvious, plus live inputs for new predictions.

## What sets it apart

Most prediction bots reset every chat. This one treats the tournament as an evolving memory graph: each prediction becomes a receipt, each receipt affects future feedback, and the UI exposes the agent's bias model through interactive day nodes, a vibes-vs-data meter, and remembered context cards. It is intentionally small and judge-friendly: the core Walrus Memory value is visible in seconds.

## Walrus Memory usage

The app is wired for MemWal via `@mysten-incubation/memwal`. When `MEMWAL_PRIVATE_KEY` and `MEMWAL_ACCOUNT_ID` are configured, predictions are stored through the hosted Walrus Memory relayer on mainnet under the `world-cup-roast-agent` namespace and recalled for the current user's prediction profile. Without credentials, it falls back to local demo mode so the UX remains inspectable.

## Feedback on Walrus Memory

The SDK path is straightforward, but the dashboard-to-submission flow could be clearer. The hackathon asks for MEMWAL_AGENT_ID, MemWalAccount explorer link, and deployed mainnet proof; the dashboard should expose a one-click “copy submission fields” panel containing account ID, public delegate key / agent ID, explorer URL, and relayer endpoint.

Potential GitHub ticket: Add a dashboard submission helper that exports MEMWAL_AGENT_ID, MemWalAccount explorer URL, and sample env vars for hackathon projects.

## X tweet draft

built a tiny World Cup memory agent for #Walrus

it remembers your match predictions across sessions, detects if you are a vibes merchant or data goblin, then roasts the pattern back at you

live demo: https://walrus-roast-agent.vercel.app
