---
name: apple-notes
<<<<<<< HEAD
description: "Using Apple Notes effectively: folders, tags, pinned notes, rich text, and handwriting."
category: productivity
---

# Apple Notes Productivity

Using Apple Notes effectively: folders, tags, pinned notes, rich text, and handwriting.

## When to Use
Use this skill when working on tasks related to apple notes productivity.

## Key Capabilities
- Expert guidance on apple notes productivity workflows and best practices
- Step-by-step assistance for common apple notes productivity tasks

## Limitations
- Use this skill only when the task clearly matches the scope described above.
=======
description: Manage Apple Notes via the `memo` CLI on macOS (create, view, edit, delete, search, move, and export notes). Use when a user asks Espada to add a note, list notes, search notes, or manage note folders.
homepage: https://github.com/antoniorodr/memo
metadata: {"espada":{"emoji":"📝","os":["darwin"],"requires":{"bins":["memo"]},"install":[{"id":"brew","kind":"brew","formula":"antoniorodr/memo/memo","bins":["memo"],"label":"Install memo via Homebrew"}]}}
---

# Apple Notes CLI

Use `memo notes` to manage Apple Notes directly from the terminal. Create, view, edit, delete, search, move notes between folders, and export to HTML/Markdown.

Setup
- Install (Homebrew): `brew tap antoniorodr/memo && brew install antoniorodr/memo/memo`
- Manual (pip): `pip install .` (after cloning the repo)
- macOS-only; if prompted, grant Automation access to Notes.app.

View Notes
- List all notes: `memo notes`
- Filter by folder: `memo notes -f "Folder Name"`
- Search notes (fuzzy): `memo notes -s "query"`

Create Notes
- Add a new note: `memo notes -a`
  - Opens an interactive editor to compose the note.
- Quick add with title: `memo notes -a "Note Title"`

Edit Notes
- Edit existing note: `memo notes -e`
  - Interactive selection of note to edit.

Delete Notes
- Delete a note: `memo notes -d`
  - Interactive selection of note to delete.

Move Notes
- Move note to folder: `memo notes -m`
  - Interactive selection of note and destination folder.

Export Notes
- Export to HTML/Markdown: `memo notes -ex`
  - Exports selected note; uses Mistune for markdown processing.

Limitations
- Cannot edit notes containing images or attachments.
- Interactive prompts may require terminal access.

Notes
- macOS-only.
- Requires Apple Notes.app to be accessible.
- For automation, grant permissions in System Settings > Privacy & Security > Automation.
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
