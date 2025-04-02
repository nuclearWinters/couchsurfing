# Libraries

**React Query:** This tool enables us to cache server responses and supports cache sharing between server and client components.

**StylexJS:** This atomic CSS framework allows us to generate a small CSS file that grows gradually in size as we reuse CSS properties.

# Patterns

**React Server Components:** Next.js supports React Server Components (RSCs), which leverage server resources to enhance UX metrics like FCP and LCP. Essentially, we can begin requesting server data concurrently with other resources, such as JavaScript. This enables the render-as-you-fetch pattern, allowing us to render components first while data is being fetched, rather than waiting for JavaScript to load.

# Data Structures

**Directed Graphs:** Since we're working with social media, we're essentially dealing with graphs, which can be simplified by abstracting them into hash maps.

# Challenges/Improvements

1. I'm unsure if my directed graph implementation is good enough. I'm still researching the topic.

2. I need to implement a connection to fetch additional feed posts. This will involve using cursors in the post list to retrieve the next set of posts without duplicating any. The connection should also indicate whether there are more posts available. We can begin fetching the next batch of posts when the user scrolls near the end of the current list.

3. The feed can grow too much in size if we keep adding JS code to handle different types of posts. A posible solution would to lazy load the required JS code depending on the posts information.

4. Social media platforms are highly sensitive to UX. We can leverage React features like Suspense to minimize Cumulative Layout Shift, and utilize its concurrency capabilities to make the application more seamless and enjoyable for users.

5. I'm not sure if we want to rely solely on RSCs. While they can enhance UX metrics, they also come with increased costs due to the use of server resources.

[More info about the render-as-you-fetch-pattern](https://www.youtube.com/watch?v=Tl0S7QkxFE4) | [More info about Atomic CSS](https://www.youtube.com/watch?v=9JZHodNR184) | [Detailed implementations for handling social media at scale](https://www.youtube.com/watch?v=KT3XKDBZW7M)

## Usage

```
npm install
npm dev
```

http://localhost:3000
