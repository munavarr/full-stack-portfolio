export type SkillType = "frontend" | "backend";

export type SkillItem = {
  name: string;
  detail: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: SkillItem[];
};

export type SkillCategory = {
  type: SkillType;
  title: string;
  heading: string;
  description: string;
  skills: SkillItem[];
  groups?: SkillGroup[];
};

const backendGroups: SkillGroup[] = [
  {
    id: "frameworks",
    title: "core",
    skills: [
      {
        name: "Node.js",
        detail:
          `I use Node.js beyond simply building HTTP APIs. I work with its event-driven runtime to design backend systems that can handle high concurrency, process data efficiently, and make effective use of asynchronous execution.

Keeping the event loop responsive

Node.js performs well when the event loop is kept free from blocking work. I design asynchronous execution carefully, avoid CPU-heavy operations inside the main event loop, and move expensive computation to appropriate background or worker processes when necessary.

I also pay attention to synchronous filesystem operations, expensive transformations and inefficient application-level loops that can silently become bottlenecks under concurrency.

Event Loop · Non-blocking I/O · Async/Await · Concurrency · CPU-bound Work

Handling large amounts of data efficiently

When data doesn't need to exist entirely in memory, I use Node.js streams to process it incrementally. This is particularly useful for large files, uploads, downloads, transformations and data pipelines.

Rather than:

Read everything → Load into memory → Process → Send

I can design:

Read → Transform → Process → Write

using backpressure-aware streams so memory usage remains controlled even as the data size increases.

Streams · Readable/Writable Streams · Transform Streams · Backpressure · Pipelines

Separating CPU-intensive work from the main runtime

Node.js is excellent for I/O-heavy workloads, but CPU-intensive operations can block the event loop. When computation becomes expensive, I use worker threads or separate processes so that heavy work doesn't degrade the responsiveness of the main application.

This allows the application to continue handling incoming requests while computational work happens independently.

Worker Threads · Child Processes · Background Processing · CPU Isolation

Scaling beyond a single Node.js process

A single Node.js process cannot fully utilize a multi-core machine for JavaScript execution. For workloads that benefit from multiple processes, I use process-based scaling and run multiple application instances behind a load balancer or process manager.

The important part is designing the application to remain stateless where possible, so requests can be handled by any instance.

Cluster / Multi-Process Scaling · Horizontal Scaling · Load Balancing · Stateless Architecture

Managing memory and runtime resources

As applications run continuously, memory behavior becomes an important part of reliability. I pay attention to object lifetimes, unnecessary memory retention, large in-memory collections and buffer usage, and use Node.js diagnostic tools when investigating memory or performance problems.

The goal is to identify whether an issue comes from the application, the event loop, I/O, memory pressure or downstream dependencies rather than treating every slowdown as an API problem.

Heap & Memory · Garbage Collection Awareness · Buffers · Profiling · Runtime Diagnostics

Designing reliable long-running services

Backend processes need to handle more than successful requests. I design Node.js services around graceful startup and shutdown, proper signal handling, connection cleanup and controlled failure behavior.

When a process receives a termination signal, it should stop accepting new work, finish or safely terminate in-flight operations, close database/message-broker connections and exit cleanly.

Graceful Shutdown · Process Signals · Health Checks · Resource Cleanup

Observing the runtime in production

When performance problems occur, I want to understand what the runtime is actually doing rather than relying on assumptions. I use structured logging, metrics, profiling and runtime diagnostics to investigate latency, event-loop delays, memory usage and resource consumption.

This makes performance optimization measurable rather than speculative.

Structured Logging · Metrics · Profiling · Event-Loop Monitoring · Observability

Technical depth

Runtime & Concurrency
Event Loop · Non-blocking I/O · Async Execution · Promises · Concurrency

Data Processing
Streams · Backpressure · Buffers · Pipelines

CPU & Parallelism
Worker Threads · Child Processes · CPU Isolation

Scaling
Multi-Process Architecture · Horizontal Scaling · Load Balancing · Stateless Services

Performance & Memory
Heap Analysis · Garbage Collection Awareness · Profiling · Event-Loop Monitoring

Production Reliability
Graceful Shutdown · Process Signals · Health Checks · Resource Management

Observability
Structured Logging · Metrics · Runtime Diagnostics · Performance Monitoring`,
      },
      {
        name: "JavaScript",
        detail:
          `Understanding how JavaScript actually executes

I understand the execution model behind JavaScript rather than treating asynchronous code as magic. I work with the call stack, execution contexts, lexical environments, closures and the event loop to reason about how code executes and where unexpected behaviour or performance problems can originate.

JavaScript Execution

The runtime model matters because the same JavaScript code can appear simple while the actual execution path is shaped by scope, task scheduling and the event loop. I reason about these mechanics deliberately when debugging issues, designing async workflows or optimizing backend behaviour.

Execution Contexts · Call Stack · Closures · Lexical Scope · Event Loop

Designing asynchronous systems correctly

Modern backend JavaScript is heavily asynchronous. I use Promises, async/await and concurrency patterns deliberately rather than simply making everything asynchronous.

I distinguish between operations that should run sequentially and operations that can safely execute concurrently, using Promise.all, Promise.allSettled and controlled concurrency when appropriate. The goal is efficient execution without introducing race conditions or unnecessary waiting.

Promises · async/await · Promise.all · Promise.allSettled · Concurrency · Race Conditions

Using closures and functions as architectural tools

Functions are one of JavaScript's strongest abstraction mechanisms. I use higher-order functions, closures and function composition to build reusable behaviour while controlling state and dependencies.

Closures are particularly useful when behaviour needs to retain private state without exposing that state directly. I also use function composition and modular patterns to keep backend logic explicit and testable.

Higher-Order Functions · Closures · Function Composition · First-Class Functions

Controlling object and data behaviour

I use JavaScript's object model deliberately when designing reusable backend abstractions. This includes prototypes, classes, inheritance where appropriate, property descriptors and modern object manipulation patterns.

I also understand the trade-offs between mutable and immutable operations and use the right approach when data is shared across different parts of an application.

Prototype Chain · Classes · Inheritance · Object Composition · Immutability

Managing memory and avoiding hidden costs

JavaScript abstracts memory management, but that doesn't mean memory behaviour can be ignored. I understand how references, closures, objects and collections affect garbage collection and can investigate situations where objects remain reachable longer than expected.

For backend workloads, I also pay attention to large objects, retained references, buffers and data structures that can cause memory pressure.

Garbage Collection · Memory Management · References · Memory Leaks · Heap Usage

Writing predictable asynchronous code

Asynchronous systems can introduce subtle bugs when multiple operations interact with shared state. I use proper sequencing, promise handling and state management to avoid unhandled rejections, race conditions and inconsistent application behaviour.

Where operations are independent, I allow concurrency; where ordering matters, I enforce it explicitly.

Error Propagation · Unhandled Rejections · Race Conditions · Async Control Flow

Working with the JavaScript module system

For larger backend applications, I use modular JavaScript architecture to keep dependencies explicit and components independently maintainable.

I understand the differences between CommonJS and ES Modules and how imports, exports, module boundaries and dependency resolution affect application structure.

ES Modules · CommonJS · Import/Export · Module Resolution · Dependency Management

Using JavaScript's advanced language capabilities

I use modern language features when they make code clearer or provide useful abstractions rather than using them simply because they exist.

This includes destructuring, iterators, generators, symbols, optional chaining, nullish coalescing, spread/rest syntax and modern collection types such as Map and Set.

Iterators · Generators · Map · Set · Symbols · Destructuring · Optional Chaining

Technical depth

Execution & Runtime
Execution Contexts · Call Stack · Scope · Closures · Event Loop · Microtasks

Asynchronous Programming
Promises · async/await · Concurrency · Promise Combinators · Error Propagation · Race Conditions

Functional JavaScript
Higher-Order Functions · Closures · Function Composition · First-Class Functions

Object Model
Prototypes · Prototype Chain · Classes · Inheritance · Composition

Memory & Performance
Garbage Collection · Heap · References · Memory Leaks · Performance Optimization

Modules
ES Modules · CommonJS · Module Resolution · Dependency Management

Advanced Language Features
Iterators · Generators · Map · Set · Symbols · Destructuring`,
      },
      {
        name: "TypeScript",
        detail:
          `I use TypeScript as an engineering tool rather than simply adding types to JavaScript. The goal is to make complex backend systems easier to reason about, safer to change, and more predictable as the codebase grows.

Making contracts explicit

In a backend system, data constantly moves between controllers, services, databases, queues and external APIs. I use interfaces, type aliases, generics and utility types to make those contracts explicit and catch mismatches before they reach runtime.

Rather than allowing every layer to interpret data differently, I establish clear types at the boundaries and carry those guarantees through the application.

Interfaces · Type Aliases · Generics · Utility Types · Type-safe Contracts

Designing types that represent real domain states

I use TypeScript's type system to model what the application can actually do—not just what an object happens to contain.

Discriminated unions, literal types, enums where appropriate and conditional types allow different states of a domain operation to be represented explicitly.

type Payment =
  | { status: 'pending'; transactionId: string }
  | { status: 'completed'; transactionId: string; completedAt: Date }
  | { status: 'failed'; transactionId: string; reason: string };

This makes invalid states harder to represent and encourages the application logic to handle each valid state deliberately.

Union Types · Discriminated Unions · Literal Types · Type Narrowing

Keeping large codebases maintainable

As a backend grows, types can either become a powerful safety net or become a source of duplication and complexity. I use reusable generic types, mapped types, utility types and modular type definitions to keep contracts consistent without unnecessarily repeating them.

I also separate domain types from infrastructure-specific types when the boundaries need to remain independent.

Generics · Mapped Types · Utility Types · Type Composition · Modular Design

Making asynchronous systems type-safe

Backend systems rarely operate synchronously from beginning to end. Database operations, HTTP calls, message brokers and background jobs all introduce asynchronous boundaries.

I use typed promises, generic response types and strongly typed event/message contracts so that asynchronous operations remain predictable across service boundaries.

type EventMap = {
  'order.created': { orderId: string; userId: string };
  'order.completed': { orderId: string };
};

function publish<K extends keyof EventMap>(
  event: K,
  payload: EventMap[K]
) {
  // ...
}

This allows the compiler to verify that the payload matches the event being published.

Async/Await · Promise Types · Generic APIs · Typed Events · Message Contracts

Typing external boundaries

TypeScript cannot automatically make external data trustworthy. Database results, HTTP responses, environment variables and message payloads can still contain unexpected runtime values.

I treat external input as an untrusted boundary and combine TypeScript's compile-time guarantees with runtime validation where necessary.

This creates a distinction between:

What the compiler knows → What the application has actually validated

Runtime Validation · API Contracts · External Data Safety · Type Guards

Designing reusable abstractions

For repeated backend patterns, I use generics and type composition to create reusable abstractions without sacrificing type information.

For example, repositories, API responses, pagination structures, service contracts and event systems can share common type definitions while remaining specific to their underlying domain.

Generic Abstractions · Type Composition · Reusable Contracts

Controlling the compiler as the codebase evolves

A strong TypeScript setup is also about configuration. I use strict compiler settings and appropriate module, target and path configuration to catch problems early and keep development and production behavior aligned.

The compiler becomes part of the development workflow rather than simply a transpilation step.

Strict Mode · tsconfig · Module Systems · Compiler Configuration · Type Checking

Technical depth

Type System
Generics · Union Types · Intersection Types · Literal Types · Type Narrowing · Type Guards

Advanced Type Modeling
Discriminated Unions · Mapped Types · Conditional Types · Template Literal Types · Utility Types

Backend Contracts
API Types · Database Types · Event Contracts · Message Types · Service Interfaces

Architecture
Type-safe Abstractions · Dependency Contracts · Domain Modeling · Reusable Generic Patterns

Runtime Safety
Runtime Validation · External Input Boundaries · Type Guards

Compiler & Tooling
Strict Type Checking · tsconfig · Module Configuration · Type-safe Build Process`,
      },
      {
        name: "NestJS",
        detail:
          `Designing around clear boundaries

As a backend grows, the biggest challenge becomes controlling dependencies between different parts of the system. I use NestJS modules to establish clear application boundaries and organize functionality around domains rather than allowing services and components to become tightly coupled.

Modules define ownership, providers encapsulate business logic, and dependency injection manages how those components interact.

Modules · Providers · Dependency Injection · Module Boundaries

Keeping the request lifecycle predictable

A production request often passes through authentication, validation, authorization, business logic and response transformation.

I use NestJS's request lifecycle deliberately, placing each responsibility at the appropriate layer rather than allowing controllers to become overloaded.

[[NEST_LIFECYCLE]]

This allows cross-cutting concerns to remain reusable while keeping business logic focused on the domain.

Middleware · Guards · Interceptors · Pipes · Exception Filters

Enforcing security at the architecture level

Authentication shouldn't be repeated manually inside every endpoint.

I use guards and custom decorators to establish reusable authorization mechanisms, allowing authentication, roles and permissions to become part of the application's architecture rather than individual controller logic.

For WebSocket and microservice environments, I apply the same principle at the appropriate transport boundary.

Guards · Custom Decorators · Authentication · Authorization · RBAC

Building reusable infrastructure

Cross-cutting functionality such as logging, request tracing, response transformation, caching and performance measurement shouldn't be duplicated throughout the application.

I use interceptors, custom providers and dependency injection to build reusable infrastructure that can be applied consistently across controllers and modules.

Interceptors · Custom Providers · Dependency Injection · Custom Decorators · Caching

Designing distributed services

NestJS becomes particularly useful when an application moves beyond a single HTTP service.

I use its microservices abstractions to separate transport concerns from business logic and work with communication patterns such as event-based messaging and request-response communication.

This allows the same application architecture to work across HTTP, message brokers and other transports without coupling business logic directly to the underlying communication mechanism.

Microservices · Transport Layers · Event-driven Communication · Message Patterns · RabbitMQ · Kafka

Handling asynchronous workflows

Not every operation belongs inside the HTTP request lifecycle.

For operations that can happen asynchronously, I separate immediate API responsibilities from background processing using queues or event-driven workflows. NestJS's modular architecture makes these consumers and producers easier to isolate and maintain.

[[NEST_ASYNC]]

Async Processing · Event-driven Architecture · Message Consumers · Background Workers

Making failures predictable

Distributed and asynchronous systems introduce failure at multiple levels.

I use exception filters, structured error handling, timeouts and appropriate retry strategies to prevent failures from becoming uncontrolled application behaviour.

The objective is to make failure explicit, isolated and observable.

Exception Filters · Error Handling · Timeouts · Retries · Failure Isolation

Keeping the application observable

A production service needs visibility into what is happening internally.

I integrate structured logging, request tracing, metrics and health checks into the application architecture so operational concerns don't have to be retrofitted later.

Logging · Health Checks · Metrics · Tracing · Observability

Technical depth

Architecture
Modules · Dependency Injection · Providers · Dynamic Modules · Custom Providers

Request Lifecycle
Middleware · Guards · Interceptors · Pipes · Exception Filters

Security
Authentication · Authorization · RBAC · Custom Decorators

Distributed Systems
Microservices · Kafka · RabbitMQ · Event-driven Architecture · Message Patterns

Asynchronous Processing
Queues · Consumers · Background Workers · Event Handling

Production
Configuration · Validation · Caching · Logging · Health Checks · Graceful Shutdown`,
      },
      {
        name: "Express.js",
        detail:
          `As traffic increased, I focused on reducing the amount of work happening inside each request rather than simply adding more servers. I introduced **caching** for frequently accessed data, **connection pooling** to efficiently reuse database connections, and **asynchronous processing** for work that didn't need to block the response. For large datasets and responses, I used **streaming** to avoid unnecessary memory usage. Once the request path was optimised, I scaled the application horizontally across multiple Node.js processes to handle higher concurrency.

For sensitive resources with different access requirements, I designed security as a **layered middleware pipeline** so that requests were validated and protected before reaching business logic. I combined **authentication, role-based authorisation, request validation, rate limiting, secure headers and controlled CORS policies**, keeping each security concern isolated and consistently enforced across the API.

As the application grew, I kept the request layer thin by separating **controllers, services and repositories**. Controllers handled HTTP concerns, services contained business rules, and repositories isolated database operations, while **reusable middleware and centralised error handling** kept cross-cutting concerns out of the core logic. This gave the API a loosely coupled structure that was easier to test, extend and scale.`
      },
      // {
      //   name: "Kafka",
      //   detail:
      //     "An event log between services that should not wait on each other. Producers publish once, and consumers read the stream at their own pace.",
      // },
      // {
      //   name: "RabbitMQ",
      //   detail:
      //     "Queues for work that has to land reliably. A job waits until a worker is ready, instead of failing the request that created it.",
      // },
    ],
  },
  {
    id: "languages",
    title: "APIs",
    skills: [
      {
        name: "REST",
        detail:
          "The runtime underneath the server work. I use it for APIs and long-running services that share a language with the interface.",
      },
      {
        name: "GraphQL",
        detail:
          "The language I write on both sides of the stack. Request handlers, scripts, and the same syntax the interface already speaks.",
      },
      {
        name: "gRPC",
        detail:
          "The runtime underneath the server work. I use it for APIs and long-running services that share a language with the interface.",
      },
      {
        name: "WebSockets",
        detail:
          "The language I write on both sides of the stack. Request handlers, scripts, and the same syntax the interface already speaks.",
      },
      {
        name: "Socket.io",
        detail:
          "The language I write on both sides of the stack. Request handlers, scripts, and the same syntax the interface already speaks.",
      },

    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      {
        name: "PostgreSQL",
        detail:
          `When PostgreSQL becomes the foundation of an application, I look beyond simply storing and retrieving data. I design the data layer around performance, consistency, concurrency and long-term scalability.

I start with the way data is accessed. I design schemas and indexes around real query patterns, use composite and partial indexes where they provide value, and use EXPLAIN ANALYZE to understand how PostgreSQL is actually executing expensive queries. I also use connection pooling to control database connections as application concurrency increases.

When multiple operations need to behave as one unit, I use transactions to maintain consistency. For concurrent workloads, I work with isolation levels, row-level locking and appropriate concurrency strategies so that simultaneous requests don't leave the database in an inconsistent state.

As the data model becomes more sophisticated, I make use of PostgreSQL's native capabilities rather than pushing everything into application code — including constraints, foreign keys, JSONB, arrays, CTEs, window functions and advanced querying where appropriate.

For large datasets, I pay attention to how data is retrieved as well. Instead of relying on inefficient offset-based approaches everywhere, I use appropriate pagination strategies, selective queries and indexing to keep response times predictable as the dataset grows.

I also treat database changes as part of the application lifecycle, using migrations to evolve schemas safely and reproducibly across environments.

The result is a PostgreSQL data layer designed not just to work, but to remain fast, consistent and predictable as the application grows.

What I can work with

Query Optimization · Indexing · EXPLAIN ANALYZE · Transactions · Concurrency & Locking · Isolation Levels · Connection Pooling · Database Design · Constraints · CTEs · Window Functions · JSONB · Arrays · Pagination · Migrations`,
      },
      {
        name: "MongoDB",
        detail:
          "Document storage for product data that changes shape as features land. Flexible records without forcing a rigid schema too early.",
      },
      {
        name: "Redis",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Sequelize",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Mongoose",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Knex",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
    ],
  },

  {
    id: "Cloud & DevOps",
    title: "Cloud & DevOps",
    skills: [
      {
        name: "AWS",
        detail:
          "Relational data when the shape is clear and the queries need to be precise. Joins, constraints, and transactions I can reason about.",
      },
      {
        name: "Docker",
        detail:
          "Document storage for product data that changes shape as features land. Flexible records without forcing a rigid schema too early.",
      },
      {
        name: "CI/CD",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Linux",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Nginx",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
    ],
  },
  {
    id: "Architecture",
    title: "Architecture",
    skills: [
      {
        name: "System Design",
        detail:
          "Relational data when the shape is clear and the queries need to be precise. Joins, constraints, and transactions I can reason about.",
      },
      {
        name: "Distributed Systems",
        detail:
          "Document storage for product data that changes shape as features land. Flexible records without forcing a rigid schema too early.",
      },
      {
        name: "Caching",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Scalability",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Performance Optimization",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
      {
        name: "Fault Tolerance",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
    ],
  },
  {
    id: "Testing & Observability",
    title: "Testing & Observability",
    skills: [
      {
        name: "Jest",
        detail:
          "Relational data when the shape is clear and the queries need to be precise. Joins, constraints, and transactions I can reason about.",
      },
      {
        name: "Integration Testing",
        detail:
          "Document storage for product data that changes shape as features land. Flexible records without forcing a rigid schema too early.",
      },
      {
        name: "Postman",
        detail:
          "In-memory data structure store for caching and real-time applications.",
      },
    ],
  },
];

export const skillCategories: Record<SkillType, SkillCategory> = {
  frontend: {
    type: "frontend",
    title: "client",
    heading: "Frontend",
    description:
      "Interfaces engineered for clarity, performance and interaction.",
    skills: [
      {
        name: "React",
        detail: "Component-driven UIs with reusable, predictable state.",
      },
      {
        name: "Next.js",
        detail: "App routing, rendering, and production-ready React apps.",
      },
      {
        name: "TypeScript",
        detail: "Typed contracts that keep interfaces and data in sync.",
      },
      {
        name: "JavaScript",
        detail: "The language behind interaction, animation, and the DOM.",
      },
      {
        name: "Redux Toolkit",
        detail: "Shared client state without sprawling prop chains.",
      },
      {
        name: "HTML",
        detail: "Accessible structure first, then visual treatment.",
      },
      {
        name: "CSS",
        detail: "Layout, motion, and systems that hold up across screens.",
      },
    ],
  },
  backend: {
    type: "backend",
    title: "server",
    heading: "Backend",
    description: "Scalable systems, APIs and distributed architectures.",
    groups: backendGroups,
    skills: [{ name: "Node.js", detail: "" }, { name: "Typescript", detail: "" },
    { name: "Kafka", detail: "" }, { name: "Redis", detail: "" },
    {name:"PostgresSQL",detail:""},{name:"Graphql",detail:""},
    ],
  },
};

export const skillTypes = Object.keys(skillCategories) as SkillType[];

export function getSkillCategory(type: string): SkillCategory | undefined {
  if (type === "frontend" || type === "backend") {
    return skillCategories[type];
  }

  return undefined;
}
