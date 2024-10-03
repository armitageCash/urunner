# urunner

// README.md

# Runtime Library

This library provides a reusable runtime for managing use cases and dependencies in TypeScript projects.

## Installation

```bash
npm install urunner-lib
```

## Usage

```typescript
import { createApp, UsecaseType, UseCaseResult } from "urunner-lib";

// Define your use case
const myUseCase: UsecaseType<
  Input,
  Dependencies,
  UseCaseResult<Output>
> = async (params, deps) => {
  // Your use case logic here
};

// Create an adapter
const adapter =
  (fn: UsecaseType<Input, Dependencies, UseCaseResult<Output>>) =>
  async (params: Input, dependencies: Dependencies) => {
    return await fn(params, dependencies);
  };

// Create and use the runtime
const app = createApp(adapter(myUseCase));
app.attach((deps) => {
  // Initialize your dependencies
});

// Run the use case
const result = await app.run(inputParams);
```

## API

- `createApp<P, D, R>(adapter?: (params: P, dependencies: D) => Promise<R>): Runtime<P, D, R>`
- `Runtime<P, D, R>`
  - `attach(factory: (dependencies: D) => void): this`
  - `run(params?: P): Promise<R>`
- `UsecaseType<P, D, R> = (params: P, dependencies: D) => Promise<R>`
- `UseCaseResult<T> = { data: T | null; status: 'success' | 'error'; message: string }`

For more detailed information, please refer to the source code and comments.
