This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.



When working with Prisma and you define a schema, add the connection string, and run commands like `npx prisma init`, `prisma db push`, etc., here's what happens at each step:

### **1. Define Schema in Prisma**
- **Schema Definition**: You create a `schema.prisma` file where you define the database models, their fields, types, and relationships.
- **Configuration**: The `datasource` block specifies the connection to the database using the connection string, and the `generator` block defines the settings for generating the Prisma Client.

### **2. Adding the Connection String**
- **Database Connection**: The connection string in the `datasource` block is how Prisma knows where your database is and how to connect to it (e.g., credentials, host, port, database name, etc.).

### **3. Running `npx prisma init`**
- **Initialization**: This sets up the Prisma project by creating:
  - `schema.prisma` file if it doesn’t already exist.
  - A default structure for Prisma setup in your project (e.g., `prisma/` directory).

### **4. Running `prisma db push`**
This command is used to synchronize your Prisma schema with the database without generating migration files. Here's what happens:

#### **Steps in Detail**
1. **Schema Parsing and Validation**:
   - Prisma reads the `schema.prisma` file.
   - It validates the syntax and checks for errors.

2. **Database Connection**:
   - Prisma connects to the database using the connection string in the `datasource` block.

3. **Database Schema Update**:
   - Prisma compares the `schema.prisma` file with the current state of the database.
   - If the database is empty or has mismatches, Prisma creates or updates tables, columns, relationships, and indexes to match the `schema.prisma` file.
   - Existing data is preserved unless there’s a destructive change (e.g., a column deletion).

4. **Feedback to User**:
   - Prisma logs what changes were applied to the database.
   - If everything aligns, it outputs a success message.

### **What Happens Behind the Scenes**
- **Introspection**: If you have existing tables, Prisma may introspect to ensure schema alignment.
- **No Migration Files**: Unlike `prisma migrate`, `db push` does not generate migration files but directly applies changes to the database schema.

### **Outcome**
- The database schema is now aligned with your `schema.prisma` file.
- You can now use the Prisma Client to interact with the updated database.

---

### Optional Commands Afterward
- **`npx prisma generate`**: Generates the Prisma Client based on the updated schema.
- **`npx prisma studio`**: Opens Prisma Studio, allowing you to visually interact with the data in your database. 

### Key Differences Between `prisma db push` and Migrations
- `prisma db push` directly syncs the schema with the database without creating migration files (ideal for prototyping).
- `prisma migrate` uses migration files for changes, enabling version control and rollback.

Creating a reusable Prisma Client in a `lib` folder and using a pattern like the one you've shared is a common practice in Node.js applications. Here's why:

### **1. Singleton Pattern for Prisma Client**
Prisma Client connects to the database, and every time you create a new `PrismaClient` instance, it establishes a new database connection. This can lead to:
- **Excessive Connections**: If you create multiple instances in different parts of your application (e.g., in each API handler), you may end up exhausting the database connection pool.
- **Resource Overhead**: Each instance consumes memory and resources.

By using a **singleton pattern**, you ensure that only one instance of `PrismaClient` is created and reused across your application.

---

### **2. Avoid Issues with Hot Reloading in Development**
In development, frameworks like Next.js and tools like Nodemon often "hot reload" the server when you make changes. Without the proper handling:
- **Duplicate Instances**: Each reload can create a new `PrismaClient` instance, leaving the previous ones open and causing memory leaks or connection pool exhaustion.
  
To handle this, the global variable (`global.prisma`) is used:
- In **development**, the `global` object ensures that the same Prisma Client instance persists across hot reloads.
- In **production**, where hot reload doesn't occur, a new instance is safely created.

---

### **3. Example Code Explanation**
```typescript
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
```

#### **Step-by-Step Explanation**
1. **Global Declaration**:
   ```typescript
   declare global {
       var prisma: PrismaClient | undefined;
   }
   ```
   This allows TypeScript to recognize `global.prisma` as a property on the `global` object.

2. **Create or Reuse PrismaClient**:
   ```typescript
   const prisma = global.prisma || new PrismaClient();
   ```
   - If `global.prisma` already exists (from a previous reload), it reuses that instance.
   - Otherwise, it creates a new `PrismaClient`.

3. **Assign to Global in Development**:
   ```typescript
   if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
   ```
   - In development, the new instance is assigned to `global.prisma` to ensure persistence during hot reloads.
   - In production, this step is skipped to avoid unintended global side effects.

4. **Export for Reuse**:
   ```typescript
   export default prisma;
   ```
   - The Prisma Client instance is exported so it can be used anywhere in the application.

---

### **4. Benefits of This Approach**
- **Consistency**: Ensures a single Prisma Client instance is used throughout the app.
- **Performance**: Prevents multiple database connections and reduces connection pool exhaustion.
- **Compatibility**: Handles hot reload issues in development environments gracefully.
- **Scalability**: In production, it adheres to best practices by not polluting the `global` object.

---

### **When to Use This Pattern**
This pattern is especially useful in:
- **Serverless Environments**: Avoids issues with multiple function executions creating multiple `PrismaClient` instances.
- **Next.js Applications**: Prevents hot reload issues during development.
- **Scalable Projects**: Ensures efficient resource utilization and easier debugging. 


Let’s dive deeper into the **benefits of using slugs** in a web application like one built with Next.js. I'll break it down with more **real-world examples** and use cases:

---

### **1. SEO Benefits (Search Engine Optimization)**

**Why it's beneficial**: 
- URLs with meaningful words (slugs) are ranked higher by search engines because they indicate the content of the page.
- Example: 
  - URL with slug: `example.com/blog/nextjs-slug-usage`
  - URL with ID: `example.com/blog/12345`

Search engines like Google prioritize descriptive URLs because they help users understand the content before even clicking the link.

**User perspective**: Imagine searching "Next.js slug usage" on Google. A URL like `example.com/blog/nextjs-slug-usage` makes it clear what the page is about, increasing the likelihood that you'll click on it.

---

### **2. User-Friendly URLs**

**Why it's beneficial**:
- Slugs make URLs **easier to read, share, and remember**.
- Example:
  - Without slug: `example.com/product/45678`
  - With slug: `example.com/product/iphone-15-pro`

**Use case**:
- If you're sharing the product link over chat or in a presentation, a descriptive slug looks professional and gives immediate context.

---

### **3. Unique Identification Without Exposing Internal Details**

**Why it's beneficial**:
- Using slugs hides sensitive implementation details, such as database IDs, from the public.
- Example:
  - Without slug: `example.com/user/12345`
  - With slug: `example.com/user/john-doe`

**Use case**:
- Exposing database IDs might make your application vulnerable to enumeration attacks, where someone tries sequential IDs (`/user/12346`, `/user/12347`) to access unauthorized data.

---

### **4. Consistency Across Systems**

**Why it's beneficial**:
- Slugs provide a consistent identifier for content that can be used across the database, URLs, and frontend.
- Example: A blog post with the slug `nextjs-slug-usage` can:
  - Be used as the unique key in your database.
  - Generate the URL for the blog.
  - Be referenced in API responses.

**Use case**:
- If you rename or restructure content, the slug remains the same, ensuring consistent links.

---

### **5. Improved Analytics and Tracking**

**Why it's beneficial**:
- Tracking user activity is easier and more meaningful when URLs contain slugs.
- Example:
  - Instead of seeing `example.com/blog/12345` in your analytics, you see `example.com/blog/nextjs-slug-usage`.

**Use case**:
- Marketers and product managers can quickly identify which pages are performing well.

---

### **6. Localization and Multilingual URLs**

**Why it's beneficial**:
- Slugs can be translated for different languages to improve accessibility and SEO in global markets.
- Example:
  - English: `example.com/blog/nextjs-slug-usage`
  - French: `example.com/blog/utilisation-des-slugs-nextjs`

**Use case**:
- If you're building a multilingual website, slugs help users in different regions understand the content.

---

### **7. Dynamic Content Rendering**

**Why it's beneficial**:
- Slugs enable the same dynamic route to render different pages based on the slug.
- Example:
  - URL: `example.com/blog/nextjs-slug-usage` → Displays content for "Next.js Slug Usage."
  - URL: `example.com/blog/react-dynamic-routing` → Displays content for "React Dynamic Routing."

**Use case**:
- In e-commerce, dynamic slugs for products or categories make your application more modular and scalable.

---

### **8. Better Backward Compatibility**
If you update a blog title or product name, the slug can remain the same, ensuring old URLs still work.

**Example**:
- A blog titled "Using Slugs in Next.js" with slug `nextjs-slug-usage` is published.
- Later, you change the title to "Mastering Slugs in Next.js," but the URL remains `example.com/blog/nextjs-slug-usage`.

This ensures:
1. Users with old links don’t encounter broken pages.
2. SEO rankings are preserved.

---

### **When Slugs Aren't Used**
Without slugs, URLs can look like random, meaningless strings or IDs (`example.com/post/12345`). While functional, they:
- Aren't descriptive.
- Offer no SEO value.
- Make tracking and sharing difficult.

---

**In summary**, slugs aren't just about dynamic routing. They are a cornerstone of user-friendly, scalable, and SEO-optimized web applications.

React Query is a powerful library for managing server state in React applications. It simplifies the process of fetching, caching, synchronizing, and updating server-side data, enabling developers to focus on building features instead of handling boilerplate code for API requests.

---

### **Core Features**

1. **Data Fetching and Caching**:
   - React Query fetches data from an API and automatically caches it. Cached data is reused for subsequent queries, improving performance.
   
2. **Automatic Refetching**:
   - Data is kept fresh by automatically refetching stale data or when network status changes.

3. **Query Invalidation**:
   - Invalidate queries to refetch and update data when something changes (e.g., after a mutation).

4. **Optimistic Updates**:
   - Update the UI before the server confirms a change for a smoother user experience.

5. **Background Refetching**:
   - Refetch data in the background to keep the app updated without interrupting the user experience.

6. **DevTools**:
   - Provides a dedicated DevTools extension for debugging queries and mutations.

---

### **When to Use React Query**

- When your application fetches data from a server.
- For caching server responses to improve performance.
- When you need fine-grained control over data synchronization and invalidation.

---

### **Installation**

```bash
npm install @tanstack/react-query
```

Or with Yarn:

```bash
yarn add @tanstack/react-query
```

---

### **Getting Started Example**

#### **Setting Up a Query Client**

First, wrap your application with the `QueryClientProvider` to provide the query client to your React components:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
}
```

---

#### **Basic Data Fetching**

```tsx
import { useQuery } from '@tanstack/react-query';

function MyComponent() {
  const { data, isLoading, error } = useQuery(['todos'], fetchTodos);

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    return response.json();
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

---

### **Mutations**

Mutations are used for creating, updating, or deleting data.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation(newTodo => fetch('/api/todos', {
    method: 'POST',
    body: JSON.stringify(newTodo),
  }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']); // Refetch the todos query
    },
  });

  const handleAdd = () => {
    mutation.mutate({ title: 'New Todo' });
  };

  return <button onClick={handleAdd}>Add Todo</button>;
}
```

---

### **Key Benefits**

1. **Improved Performance**:
   - Cached responses reduce unnecessary API calls.

2. **Simpler State Management**:
   - Eliminates the need for manual state management for server data.

3. **Error Handling**:
   - Built-in error handling and retry mechanisms for failed requests.

4. **Reactivity**:
   - Updates UI automatically when data changes or becomes stale.

5. **Offline Support**:
   - Automatically retries requests when the network is restored.

---

### **Advanced Features**

1. **Pagination and Infinite Queries**:
   - Manage paginated or infinite scroll data with `useInfiniteQuery`.

2. **Prefetching**:
   - Prefetch data to ensure it's available before rendering a component.

3. **Hydration**:
   - Server-side rendering (SSR) support with `react-query`.

---

### **DevTools**

Install React Query DevTools for debugging:

```bash
npm install @tanstack/react-query-devtools
```

Add it to your app:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <MyComponent />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

### **Why Use React Query?**

1. **Avoid Boilerplate**: Simplifies fetching and managing data without Redux or custom state logic.
2. **Built-in Caching**: Handles caching out of the box.
3. **Automatic Freshness**: Keeps data fresh with minimal configuration.
4. **Error Management**: Centralized and streamlined error handling.
5. **Great Community**: Supported by an active community and constantly updated.

React Query is an excellent tool for modern React applications where data fetching is a significant concern!

The React Query `QueryClient` is the core mechanism for managing server-side state. Under the hood, it acts as a centralized controller that coordinates data fetching, caching, invalidation, and synchronization. Here's a detailed breakdown of how it works:

---

### **Core Components of QueryClient**

1. **Query Cache**:
   - The `QueryCache` stores all queries and their associated data, metadata, and state.
   - Queries are uniquely identified by a **query key**, ensuring consistency across fetches.

2. **Mutation Cache**:
   - Similar to the query cache but specifically handles mutations.
   - Tracks mutation states, manages retries, and applies optimistic updates.

3. **Observers**:
   - Observers are created for each component that subscribes to a query or mutation.
   - They ensure that each component receives updates when the query state changes (e.g., loading, error, or success).

4. **Event System**:
   - QueryClient uses an event-driven architecture.
   - Events such as "query added," "query updated," or "mutation completed" are dispatched to handle state transitions.

5. **Schedulers**:
   - React Query includes schedulers for background refetching, retries, and garbage collection.
   - Ensures smooth operations without blocking the main thread.

---

### **Key Processes**

#### 1. **Query Execution**
   - When you call `useQuery`, the following happens:
     - A unique `queryKey` is used to check the `QueryCache`.
     - If data is already cached and fresh, it's returned immediately.
     - If the data is stale or not found, a fetch request is initiated.
     - Once the data is fetched, the `QueryCache` updates its state, and subscribed components are re-rendered.

#### 2. **Caching**
   - Queries are cached with metadata like timestamps, stale status, and associated observers.
   - Cached data is used for subsequent queries, reducing network requests.

#### 3. **Invalidation**
   - When a mutation updates the data, related queries are invalidated.
   - Invalidated queries trigger refetching to keep the cache synchronized with the server.

#### 4. **Staleness and Garbage Collection**
   - Queries have a "stale time" after which they are considered outdated.
   - Unused queries are eventually removed from memory based on a configurable garbage collection policy (`cacheTime`).

#### 5. **Retries and Error Handling**
   - QueryClient retries failed requests based on a retry policy (e.g., exponential backoff).
   - It provides hooks for custom error handling (`onError`).

---

### **Under-the-Hood Workflow**

#### Example with `useQuery`:

```tsx
import { useQuery } from '@tanstack/react-query';

function Todos() {
  const { data, isLoading } = useQuery(['todos'], fetchTodos);

  async function fetchTodos() {
    const response = await fetch('/api/todos');
    return response.json();
  }

  if (isLoading) return 'Loading...';
  return <div>{data}</div>;
}
```

**How It Works**:
1. **Initialization**:
   - A `QueryObserver` is created for the query with the key `['todos']`.
   - It checks the `QueryCache` for existing data.
   
2. **Cache Check**:
   - If the data exists and is fresh, the cached value is returned immediately.
   - If the data is stale or missing, it triggers a fetch.

3. **Fetching**:
   - The `fetchTodos` function runs, fetching data from the server.
   - React Query tracks the query's lifecycle (e.g., loading, success, or error).

4. **Updating the Cache**:
   - Once the fetch is successful, the `QueryCache` is updated with the new data and metadata.

5. **Component Re-render**:
   - React Query notifies the `QueryObserver` about the updated state.
   - The component re-renders with the new data.

---

### **QueryClient API**

You can interact with the `QueryClient` programmatically to perform advanced operations:

#### Example: Manual Cache Invalidation
```tsx
import { useQueryClient } from '@tanstack/react-query';

function InvalidateButton() {
  const queryClient = useQueryClient();

  const handleClick = () => {
    queryClient.invalidateQueries(['todos']); // Invalidate the cache for 'todos'
  };

  return <button onClick={handleClick}>Refresh Todos</button>;
}
```

#### Example: Prefetching Data
```tsx
queryClient.prefetchQuery(['todos'], fetchTodos);
```
- Prefetches data so it’s available in the cache before a component renders.

#### Example: Direct Cache Manipulation
```tsx
queryClient.setQueryData(['todos'], [{ id: 1, title: 'New Todo' }]);
```
- Updates the cache directly without making a fetch request.

---

### **Advantages of QueryClient**

1. **Centralized Control**:
   - All queries and mutations are managed in one place.
2. **Efficiency**:
   - Minimizes network requests through caching and deduplication.
3. **Reactivity**:
   - Automatically updates components when server-side data changes.
4. **Extensibility**:
   - Customizable fetch policies, retry strategies, and stale data handling.

React Query's QueryClient is a well-engineered state management system for server data that abstracts away most of the complexities while giving you full control when needed.
