import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { hasAdminSession } from './_server/auth';
import { BlogEditor } from './_components/BlogEditor';

export const metadata: Metadata = {
  title: 'Add Blog',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default async function AddBlogPage() {
  if (!(await hasAdminSession())) notFound();
  return (
    <main className="mx-auto w-full max-w-220 px-6 pt-12 pb-24">
      <h1 className="mb-2 text-[28px] font-extrabold tracking-[-0.6px] text-charcoal">
        New blog post
      </h1>
      <p className="mb-8 text-[14px] text-charcoal-lt">
        Paste a JSON document. It will be validated against the post schema before insert.
      </p>
      <BlogEditor />
    </main>
  );
}
