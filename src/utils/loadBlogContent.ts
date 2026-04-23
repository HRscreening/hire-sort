import { Blog } from "@/types/blog";

export async function loadBlogContent(blogId: string): Promise<Blog> {
  const res = await fetch(`/blog/contents/${blogId}.json`);

  if (!res.ok) {
    throw new Error(`Failed to load blog: ${blogId}`);
  }

  const data: Blog = await res.json();
  return data;
}

export async function getAllBlogs(): Promise<Array<{ id: string; title: string; slug: string; metaDescription: string }>> {
  // Since we are in a static environment, we can't easily list files in 'public' at runtime via fetch.
  // For now, we'll hardcode the known blogs or expect a manifest file.
  // Let's assume a manifest file exists or we create one.
  return [
    {
      id: "blog1",
      title: "How High-Performing Teams Read Resumes Faster and Better",
      slug: "how-high-performing-teams-read-resumes-faster-and-better",
      metaDescription: "Learn how high-performing hiring teams screen resumes faster without sacrificing accuracy."
    }
  ];
}