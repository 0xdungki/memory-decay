# Walrus Session 4 Submission Draft

Project name: Memory Decay
Team Leader Name: dungki
Discord handle: pungki
X account: @dungki
Referral: @vikajoestar
DeepSurge project Link: https://www.deepsurge.xyz/projects/ddc722f9-6245-4a1e-8329-610aa3a47d67
Project Link: https://walrus-roast-agent.vercel.app
Deployed agent: https://walrus-roast-agent.vercel.app
GitHub: https://github.com/0xdungki/memory-decay
Tweet: https://x.com/dungki/status/2069819258952110212
SUI address: 0x7f69fa926eaca3d5330adf0472f4c80f797f378262a5c7069af573650e97e955
MEMWAL_AGENT_ID: f3ffa5288f2b9b8e66fed7200992022df1a405f749d1b2dbe9cae46a84aae498
MemWalAccount explorer: https://memory.walrus.xyz/dashboard/accounts/0x7f69fa926eaca3d5330adf0472f4c80f797f378262a5c7069af573650e97e955

## What it does

Memory Decay is an AI agent that simulates forgetting. Walrus stores every memory forever — this agent bridges the gap: save a memory, watch it fade over time (7-day half-life), and restore the original from Walrus with one click.

## What sets it apart

Most memory apps show static data. This one makes memory itself the UX: text visibly corrupts, clarity meters decay, and refreshing proves Walrus kept the original pixel-perfect. The before/after moment is visible in seconds — no explanation needed.

## Walrus Memory usage

Wired for MemWal via `@mysten-incubation/memwal` SDK. When credentials are configured, predictions persist through the hosted Walrus Memory relayer on mainnet under the `memory-decay` namespace. Falls back to local demo mode so the UX remains inspectable without credentials.

## Feedback on Walrus Memory

The SDK path is straightforward, but the dashboard-to-submission flow could be clearer. The hackathon asks for MEMWAL_AGENT_ID, MemWalAccount explorer link, and deployed mainnet proof; the dashboard should expose a one-click "copy submission fields" panel.

Potential GitHub ticket: Add a dashboard submission helper that exports MEMWAL_AGENT_ID, MemWalAccount explorer URL, and sample env vars for hackathon projects.

## X tweet draft

See TWEET.txt
