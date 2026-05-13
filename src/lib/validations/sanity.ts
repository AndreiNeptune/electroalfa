import { z } from 'zod';

// Reusable Image Schema
export const SanityImageSchema = z.object({
  url: z.string().url().nullable().optional(),
  alt: z.string().optional().nullable(),
}).nullable().optional();

// Reusable File Asset Schema
export const SanityFileSchema = z.object({
  url: z.string().url().nullable().optional(),
  originalFilename: z.string().nullable().optional(),
  size: z.number().nullable().optional(), // bytes
  mimeType: z.string().optional().nullable(),
}).nullable().optional();

// Locale String Schema
export const LocaleStringSchema = z.object({
  ro: z.string().optional(),
  en: z.string().optional(),
  de: z.string().optional(),
  fr: z.string().optional(),
  it: z.string().optional(),
}).nullable().optional();

// Specification Schema
export const ProductSpecificationSchema = z.object({
  _key: z.string(),
  label: LocaleStringSchema,
  value: LocaleStringSchema,
});

// Category Reference Schema
export const CategoryReferenceSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string(),
});

// Full Product Schema
export const ProductSchema = z.object({
  _id: z.string(),
  title: LocaleStringSchema,
  slug: z.string().optional().nullable(),
  description: LocaleStringSchema,
  category: CategoryReferenceSchema.nullable().optional(),
  image: SanityImageSchema,
  specifications: z.array(ProductSpecificationSchema).nullable().optional(),
  datasheet: SanityFileSchema,
});

export type Product = z.infer<typeof ProductSchema>;
export type ProductSpecification = z.infer<typeof ProductSpecificationSchema>;
export type SanityFile = z.infer<typeof SanityFileSchema>;
export type CategoryReference = z.infer<typeof CategoryReferenceSchema>;

// News Article Schema (for flattened data from queries)
export const NewsArticleSchema = z.object({
  _id: z.string(),
  title: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  publishDate: z.string().nullable().optional(),
  coverImage: z.object({
    url: z.string().url().nullable().optional(),
    alt: z.string().optional().nullable(),
  }).nullable().optional(),
  content: z.any().optional(),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;

// Array of Products
export const ProductsListSchema = z.array(ProductSchema);
export const NewsArticlesListSchema = z.array(NewsArticleSchema);
