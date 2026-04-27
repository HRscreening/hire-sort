'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { createBlogAction, type CreateBlogResult } from '../_server/createBlog';

const PLACEHOLDER = `{
  "slug": "my-post-slug",
  "title": "...",
  "subtitle": "...",
  "description": "...",
  "keywords": ["..."],
  "author": { "name": "HireSort Team", "role": "Product" },
  "publishedAt": "2026-04-27",
  "readingTime": "6 min read",
  "coverAlt": "Description of the cover image for accessibility",
  "category": "Hiring workflows",
  "tags": ["..."],
  "body": [
    { "type": "heading", "level": 2, "text": "..." },
    { "type": "paragraph", "text": "..." }
  ]
}`;

export function BlogEditor() {
  const [json, setJson] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [result, setResult] = useState<CreateBlogResult | null>(null);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const onSubmit = (formData: FormData) => {
    startTransition(async () => {
      const r = await createBlogAction(formData);
      setResult(r);
      if (r.ok) {
        setJson('');
        setCoverFile(null);
        setCoverPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return null;
        });
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    });
  };

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCoverFile(file);
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
    if (result) setResult(null);
  };

  const onJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJson(e.target.value);
    if (result) setResult(null);
  };

  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      <textarea
        name="json"
        value={json}
        onChange={onJsonChange}
        placeholder={PLACEHOLDER}
        spellCheck={false}
        className="min-h-120 w-full resize-y rounded-xl border border-line-soft bg-white px-4 py-3 font-mono text-[13px] leading-[1.55] text-charcoal shadow-card outline-none transition-colors focus:border-accent"
      />

      <div className="flex flex-col gap-2">
        <label className="text-[12.5px] font-semibold uppercase tracking-[0.6px] text-charcoal-xlt">
          Cover image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          name="cover"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={onPickFile}
          required
          className="block w-full cursor-pointer rounded-lg border border-line-soft bg-white text-[13px] text-charcoal-md file:mr-3 file:cursor-pointer file:rounded-l-lg file:border-0 file:bg-ivory-medium file:px-4 file:py-2.5 file:text-[13px] file:font-semibold file:text-charcoal hover:file:bg-ivory-dark"
        />
        {coverPreview && (
          <div className="relative mt-2 aspect-16/10 w-full max-w-md overflow-hidden rounded-lg border border-line-soft bg-ivory-medium">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverPreview} alt="Cover preview" className="h-full w-full object-cover" />
          </div>
        )}
        <p className="text-[12px] text-charcoal-xlt">
          Stored as <code className="font-mono">&lt;slug&gt;.&lt;ext&gt;</code> in the blog cover bucket. Don&apos;t set <code className="font-mono">coverImage</code> in the JSON — it&apos;s set automatically.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending || json.trim() === '' || !coverFile}
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending && <Loader2 size={14} className="animate-spin" />}
          {pending ? 'Uploading & inserting…' : 'Validate & insert'}
        </button>
        {result?.ok && (
          <span className="text-[13px] text-charcoal-lt">
            Inserted <code className="font-mono">{result.slug}</code>.
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {result && !result.ok && <ErrorBlock key={JSON.stringify(result)} result={result} />}
        {result && result.ok && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-[13.5px] text-green-800"
          >
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            <span>
              Post <strong>{result.slug}</strong> inserted. Blog and sitemap revalidated.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function ErrorBlock({ result }: { result: Extract<CreateBlogResult, { ok: false }> }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] text-red-800"
    >
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <AlertTriangle size={16} />
        {headline(result)}
      </div>
      <Body result={result} />
    </motion.div>
  );
}

function headline(r: Extract<CreateBlogResult, { ok: false }>) {
  switch (r.reason) {
    case 'unauthorized':
      return 'Session expired — re-enter via the key URL.';
    case 'invalid_json':
      return 'Invalid JSON';
    case 'missing_image':
      return 'Cover image is required';
    case 'upload_failed':
      return 'Image upload failed';
    case 'validation':
      return 'Schema validation failed';
    case 'duplicate':
      return `Slug "${r.slug}" already exists`;
    case 'server_error':
      return 'Server error';
  }
}

function Body({ result }: { result: Extract<CreateBlogResult, { ok: false }> }) {
  if (
    result.reason === 'invalid_json' ||
    result.reason === 'server_error' ||
    result.reason === 'upload_failed'
  ) {
    return <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12.5px]">{result.message}</pre>;
  }
  if (result.reason === 'missing_image') {
    return <p>Pick an image file before submitting.</p>;
  }
  if (result.reason === 'validation') {
    const fieldEntries = Object.entries(result.fieldErrors).filter(([, v]) => v && v.length);
    return (
      <div className="flex flex-col gap-1">
        {result.formErrors.length > 0 && (
          <ul className="list-disc pl-5">
            {result.formErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        )}
        {fieldEntries.length > 0 && (
          <ul className="list-disc pl-5">
            {fieldEntries.map(([field, errs]) => (
              <li key={field}>
                <code className="font-mono">{field}</code>: {errs.join('; ')}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return null;
}
