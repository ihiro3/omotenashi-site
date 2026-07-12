import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const metadataDefinition = z.object({
  title: z.string().optional(),
  ignoreTitleTemplate: z.boolean().optional(),
  canonical: z.url().optional(),
  robots: z
    .object({
      index: z.boolean().optional(),
      follow: z.boolean().optional(),
    })
    .optional(),
  description: z.string().optional(),
  openGraph: z.any().optional(),
  twitter: z.any().optional(),
});

const post = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    title: z.string(),
    excerpt: z.string().optional(),
    image: z.any().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    draft: z.boolean().optional(),
    metadata: metadataDefinition.optional(),
  }),
});

export const collections = {
  post,
};
