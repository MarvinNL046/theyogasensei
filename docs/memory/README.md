# Memory mirror (read-only snapshot)

This folder is a **git-committed snapshot** of Claude Code's auto-memory for this
project. It exists so the accumulated project knowledge travels with the repo
(e.g. to another machine) instead of living only in the local profile.

- **Live source (not in git):**
  `~/.claude/projects/C--Users-M-Smi-claudeProjecten-theyogasensei/memory/`
- `MEMORY.md` is the index; each other `.md` is one memory entry.

## Important

This is a **copy**. Claude still reads/writes the live source under `~/.claude`,
not these files. So:

- On a **new machine**, to make Claude actually use this knowledge, copy these
  files back into the live path above (same project path → same memory-dir name).
- This snapshot can **drift** from the live source as memory updates. Re-run the
  mirror to refresh (a one-liner copy from the live path into this folder), then
  commit.

Last mirrored: 2026-06-01.
