---
name: self-improvement-loop
description: Global Hermes-style self-improvement loop — a SessionEnd hook that forks a cheap Claude to auto-update memory/skills after every session
metadata:
  node_type: memory
  type: project
  originSessionId: 247b1b40-280e-45f0-8514-9c9d3c6ff24d
---

A global self-improvement loop modeled on Hermes Agent's `background_review.py`
runs across ALL of Marvin's projects (set up 2026-05-28).

**Why:** Marvin normally uses Hermes (Nous Research, installed at
`%LOCALAPPDATA%\hermes\hermes-agent`) because it auto-learns — after each session
a forked aux agent reviews the conversation and writes memory/skills. We rebuilt
that single capability natively in Claude Code.

**How it works:**

- `~/.claude/settings.json` registers a `SessionEnd` hook (fires once per session).
- `~/.claude/hooks/self-improve.ps1` reads the hook payload (`transcript_path`,
  `cwd`, `session_id`), skips trivial sessions (<6 transcript lines), then launches
  a DETACHED, fire-and-forget `claude --print` review fork on **Sonnet 4.6**
  (judgment-heavy task off the critical path → quality > Haiku's speed; one call
  per session so cost is cents/day).
- The fork uses `--strict-mcp-config` (zero MCP servers, lean) — NOT `--bare`
  (`--bare` also strips credential loading → "Not logged in"). `--add-dir` grants
  write access to the project memory dir + `~/.claude/skills`.
- Recursion guard: env var `CLAUDE_SELFIMPROVE_CHILD=1` (child inherits it; the
  guard at the top of the script bails before re-entering).
- The review instruction lives in `~/.claude/hooks/self-improve-prompt.md`
  (memory format + skill signals + "[SILENT] if nothing worth saving").
- Logs: `~/.claude/hooks/logs/review-<sessionId>.log`, auto-pruned after 7 days.

**Review checkpoint — due ~2026-06-04 (one week after setup):** Marvin wants to
evaluate the loop on real data before extending it. When this comes up, run the
review locally: read `~/.claude/hooks/logs/review-*.log` and the auto-written
memory across his projects, then judge two axes — (1) QUALITY: is the Sonnet fork
saving useful facts or noise? how often `[SILENT]` vs an actual write? (2) COST
per session. Decision: keep Sonnet 4.6 or downgrade to Haiku, and whether the
<6-line trigger threshold is calibrated. If the loop is performing well, propose
building the CURATOR next (memory/skill hygiene — archive stale, consolidate
dupes) BEFORE recurring-task recognition, since auto-write without auto-prune is
how these systems rot. (Chose ad-hoc reminder over a remote routine because the
logs/memory are local and a cloud routine can't read them.)

**How to apply:** It runs automatically — no action needed. Project-dir encoding
used to locate the memory dir is `cwd -replace '[^A-Za-z0-9]','-'` (verified
against `~/.claude/projects`). NOT yet built (Marvin deferred): recurring-task
recognition and the periodic skill-curator — both candidates for a `/schedule`
routine later. Source of inspiration: [[obsidian-vault]] is unrelated; the Hermes
install is the reference.
