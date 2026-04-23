import { Blog } from "@/types/blog";

// Import all JSON files from the blog directory statically
// This ensures they are available at build time for react-snap
const blogModules = import.meta.glob<{ default: Blog }>("/src/blog/contents/*.json", { eager: true });

export const blogMap: Record<string, Blog> = Object.values(blogModules).reduce((acc, module) => {
  const blog = module.default;
  acc[blog.metadata.slug] = blog;
  return acc;
}, {} as Record<string, Blog>);

export const getAllBlogSlugs = () => Object.keys(blogMap);
