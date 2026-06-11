# The teaching method

This is the pedagogy every generated page follows. It exists because the reader is a specific person: they **built** the app (with an AI writing most of the code), they **use** the app, and they understand almost none of what's in the files. They are not a student taking a course. They are an owner who wants to finally understand their own property.

That changes everything about how you write:

1. **Hook addressed to the reader.** Open with *their* situation, not the topic. "You built a todo app and it somehow remembers your todos after you close the terminal. This page explains the file that does the remembering." Never "In this section we will discuss persistence."

2. **Define the primitive at zero knowledge.** Assume nothing. Not "what is Express middleware" — further back: what is a programming language, what is a server, what is a file on disk. The canonical register: *"X is a Y. You do Z with it."* Flat declarative sentences, no jargon inside the definition of other jargon.

3. **State the catch.** Every primitive exists because something was a problem. Name the problem — it's the tension that makes the definition stick. "The catch: JavaScript can't run on its own. It needs a runtime." Without the catch, a definition is a flashcard; with it, it's a story.

4. **Show THEIR code within ~10 lines.** This is the load-bearing rule. The moment the primitive is defined and the catch is stated, jump into this repo: exact `path:line`, a real snippet, then a one-sentence plain-language translation of what the snippet says. The reader's payoff is recognition — "*that's* what that file is doing."

5. **Wikilink to depth.** Every page links onward with `[[wikilinks]]` to pages that go deeper, so the doc-set reads like a small wiki, not a sequence of chapters. The hub links down; depth pages link sideways and down; nothing is a dead end.

Plus, once per doc-set: **one end-to-end walkthrough page** that traces a single real user action through every layer with a `path:line` at each hop, calling out each boundary crossing (process, network, disk) explicitly.

The examples below show the voice. They describe a generic Express + SQLite todo app — when you write real pages, every path, snippet, and design fact comes from the actual repo in front of you.

---

## Example 1 — a foundations passage (primitive → catch → their code)

> ### What is Express?
>
> You built a web app, which means somewhere a program is sitting on your machine waiting for the browser to ask it for things. That program is a **server** — it starts, opens a door (a "port"), and waits forever.
>
> Node.js can open that door by itself, but what comes through it is raw: just text of the request, every time, for every URL. You'd have to write the same parsing and routing plumbing in every app.
>
> **Express is a library that handles the plumbing.** You tell it "when the browser asks for THIS url, run THIS function," and it does all the matching and parsing for you.
>
> The catch: Express does nothing until you register those URL-to-function pairs. Your app registers them in one place — `src/app.js:14`:
>
> ```js
> app.get('/todos', listTodos);
> app.post('/todos', addTodo);
> app.delete('/todos/:id', removeTodo);
> ```
>
> Translated: "when the browser GETs `/todos`, run `listTodos`. When it POSTs a new todo, run `addTodo`." Those three lines ARE your app's public surface — everything else in the repo exists to serve them. The functions themselves live in [[routes-and-handlers]].

Notice the order: reader's situation → server defined from zero → the catch → their three real lines → translation → onward link. Six sentences of concept, then code. Never more.

## Example 2 — a depth-page passage (their design choice, honestly explained)

> ### Why your todos survive a restart
>
> Variables die with the program. When you stop the server, everything held in memory is gone — so your todos must live somewhere that survives: a file on disk.
>
> You could write them to a plain text file, but then every search, update, and delete means re-reading and re-writing the whole file yourself, and one crash mid-write corrupts everything. **SQLite is a database that lives in a single file and solves exactly that.** No server to install, no setup — your entire database is the one file `data/todos.db`, and you could back it up by copying it.
>
> The catch: code can't talk to a `.db` file directly — it goes through a driver. Yours is set up in `src/db.js:3`:
>
> ```js
> const db = new Database('data/todos.db');
> db.exec('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT, done INTEGER)');
> ```
>
> Translated: "open (or create) the database file, and make sure a `todos` table exists in it." That `CREATE TABLE IF NOT EXISTS` is why the app works on a fresh clone with no setup step — the first run creates its own storage. What a "table" actually is, and what those three columns mean, is in [[the-database]].

## Example 3 — a walkthrough excerpt (one real action, every hop, path:line)

> You type "buy milk" and click **Add**. Here's the whole journey:
>
> ```
> [YOU CLICK ADD]
>    │  public/index.html:42 — the button's onclick calls addTodo()
>    ▼
> fetch('/todos', { method: 'POST', body: ... })   public/app.js:17
>    │  the browser packages your text as an HTTP request
>    ▼
> [CROSSES THE NETWORK — leaves the browser, enters your server]
>    │
>    ▼
> Express matches POST /todos → addTodo()           src/app.js:15
>    ▼
> addTodo() validates the text, then writes it      src/routes/todos.js:21
>    ▼
> db.prepare('INSERT INTO todos ...').run(text)     src/db.js:19
>    │
>    ▼
> [CROSSES TO DISK — the row is now in data/todos.db, restart-proof]
>    │  the new row's id travels back up the same chain
>    ▼
> the browser appends the todo to the list           public/app.js:24
>
> [YOU SEE "buy milk" APPEAR]
> ```
>
> Seven hops, but only three kinds of thing happen: a function call, a network request, a disk write. Every feature in this app is some arrangement of those three.

---

## The register, distilled

- Second person, present tense, about their app: "you built", "your server", "when you click".
- Primitives defined in the flattest possible English: "X is a Y. You do Z with it."
- "The catch:" as a literal recurring phrase — it's the pivot from definition to motivation.
- Snippets are verbatim from the repo, cited `path:line`, immediately translated into one plain sentence ("Translated: …").
- Honest about gaps and oddities: if there's no retry logic, say "known gap"; if a file has a weird name for historical reasons, say so. The reader will be asked about this code someday — give them the honest answer they can repeat.
- No filler transitions, no "as we can see", no exclamation marks doing the work that clarity should.
