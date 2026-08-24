import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "react-server-components",
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components in 2024",
    excerpt:
      "A practical guide to React Server Components, when to use them, and common pitfalls to avoid in production applications.",
    content: `
React Server Components (RSC) represent a fundamental shift in how we think about React applications. After working with them extensively in production, here's what I've learned.

## What Are Server Components?

Server Components render on the server and send HTML to the client. They can't use hooks or browser APIs, but they can directly access databases, file systems, and other server resources.

## When to Use Server Components

1. **Data fetching** - Fetch data closer to its source
2. **Large dependencies** - Keep heavy libraries off the client bundle
3. **Static content** - Pages that don't need interactivity

## Common Pitfalls

### Mixing Client and Server Incorrectly

The most common mistake is trying to use hooks in Server Components or forgetting to add 'use client' when you need interactivity.

### Over-fetching in Server Components

Just because you can fetch data doesn't mean you should fetch everything. Be intentional about what data each component needs.

## Conclusion

Server Components are powerful when used correctly. Start with Server Components by default, and only add 'use client' when you need interactivity.
    `.trim(),
    category: "frontend",
    tags: ["React", "Next.js", "Server Components", "Performance"],
    publishedAt: "2024-03-15",
    readingTime: 5,
    featured: true,
  },
  {
    id: "typescript-patterns",
    slug: "advanced-typescript-patterns-react",
    title: "Advanced TypeScript Patterns for React",
    excerpt:
      "Level up your TypeScript skills with patterns for discriminated unions, generic components, and type-safe APIs.",
    content: `
TypeScript and React are a powerful combination. Here are patterns I use daily to write safer, more maintainable code.

## Discriminated Unions for State

Instead of nullable properties, use discriminated unions:

\`\`\`typescript
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
\`\`\`

## Generic Components

Create flexible, reusable components:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return items.map(item => (
    <div key={keyExtractor(item)}>{renderItem(item)}</div>
  ));
}
\`\`\`

## Type-Safe Event Handlers

Leverage TypeScript's inference:

\`\`\`typescript
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value);
};
\`\`\`

These patterns have saved me countless hours of debugging and made refactoring much safer.
    `.trim(),
    category: "frontend",
    tags: ["TypeScript", "React", "Patterns", "Best Practices"],
    publishedAt: "2024-02-20",
    readingTime: 7,
    featured: true,
  },
  {
    id: "web-vitals-optimization",
    slug: "optimizing-core-web-vitals",
    title: "A Practical Guide to Core Web Vitals Optimization",
    excerpt:
      "Step-by-step strategies for improving LCP, CLS, and INP that I've used to achieve 90+ Lighthouse scores.",
    content: `
Core Web Vitals directly impact user experience and SEO. Here's my playbook for optimization.

## Largest Contentful Paint (LCP)

Target: < 2.5 seconds

### Quick Wins

1. Preload critical images
2. Use responsive images with srcset
3. Implement font-display: swap
4. Minimize render-blocking resources

### Advanced Techniques

- Server-side rendering for above-the-fold content
- Edge caching with CDN
- Image optimization with modern formats (WebP, AVIF)

## Cumulative Layout Shift (CLS)

Target: < 0.1

### Prevention Strategies

1. Always set dimensions on images and videos
2. Reserve space for dynamic content
3. Avoid inserting content above existing content
4. Use transform animations instead of layout-affecting properties

## Interaction to Next Paint (INP)

Target: < 200ms

### Optimization Techniques

1. Break up long tasks
2. Use requestIdleCallback for non-critical work
3. Implement proper loading states
4. Debounce rapid user inputs

Measure, optimize, measure again. Tools like Lighthouse and Web Vitals extension are your friends.
    `.trim(),
    category: "performance",
    tags: ["Performance", "Web Vitals", "SEO", "Optimization"],
    publishedAt: "2024-01-10",
    readingTime: 6,
    featured: false,
  },
  {
    id: "micro-frontends",
    slug: "micro-frontends-practical-guide",
    title: "Micro-Frontends: A Practical Implementation Guide",
    excerpt:
      "Lessons learned from implementing micro-frontends at scale, including when to use them and when to avoid them.",
    content: `
Micro-frontends can solve real problems, but they also introduce complexity. Here's when and how to use them effectively.

## When Micro-Frontends Make Sense

1. **Multiple teams** need to deploy independently
2. **Legacy modernization** - incrementally replace old code
3. **Different tech stacks** must coexist
4. **Scale** - the monolith has become unmanageable

## When to Avoid Them

- Small teams (< 3 frontend developers)
- Simple applications
- When you don't have the DevOps maturity
- When performance is critical and you can't afford the overhead

## Implementation Approaches

### Module Federation (Webpack 5)

Best for React-to-React sharing. Enables runtime loading of shared dependencies.

### Web Components

Technology-agnostic encapsulation. Good for mixing frameworks.

### iframe Composition

Maximum isolation. Simple but limited interaction.

## Key Challenges

1. **Shared state** - Use events or a lightweight state bus
2. **Routing** - Coordinate between shells
3. **Styling** - CSS isolation is crucial
4. **Testing** - Integration tests become more complex

Start simple. You can always add more micro-frontends later.
    `.trim(),
    category: "architecture",
    tags: ["Architecture", "Micro-Frontends", "Scaling", "Enterprise"],
    publishedAt: "2023-11-05",
    readingTime: 8,
    featured: false,
  },
];

export const featuredBlogPosts = blogPosts.filter((post) => post.featured);
