---
<<<<<<< HEAD
name: swift-concurrency
description: "Best practices and patterns for concurrency in Swift development."
category: programming-swift
=======
name: Swift Concurrency
description: Standards for async/await, Actors, Task Groups, and MainActor
metadata:
  labels: [swift, concurrency, async, await, actor]
  triggers:
    files: ['**/*.swift']
    keywords: ['async', 'await', 'actor', 'Task', 'MainActor']
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
---

# Swift Concurrency

<<<<<<< HEAD
Best practices and patterns for concurrency in Swift development.
=======
## **Priority: P0**

## Implementation Guidelines

### async/await

- **Async Functions**: Mark with `async`, call with `await`.
- **Error Handling**: Combine with `throws` for async throwing functions.
- **No Completion Handlers**: Prefer `async` over callback-based APIs.

### Actors

- **Data Isolation**: Use `actor` for mutable state accessed from multiple tasks.
- **MainActor**: Annotate UI code with `@MainActor` for main thread execution.
- **Actor Isolation**: All actor properties/methods are isolated automatically.

### Task Management

- **Structured Concurrency**: Use `Task {}`, `async let`, `TaskGroup`.
- **Cancellation**: Check `Task.isCancelled`, propagate cancellation.
- **Detached Tasks**: Avoid `Task.detached` unless necessary.

## Anti-Patterns

- **Blocking Main Thread**: `**No synchronous work in @MainActor**: Use Task.`
- **Missing MainActor**: `**UI updates must be @MainActor**: Compiler error.`
- **Ignoring Cancellation**: `**Check Task.isCancelled**: Respect cancellation.`

## References

- [async/await & Actors](references/implementation.md)
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
