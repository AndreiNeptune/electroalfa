import { createClient } from 'next-sanity';
import { ProductSchema, ProductsListSchema, Product, NewsArticle, NewsArticlesListSchema, NewsArticleSchema } from '../validations/sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6sxnslmm';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_API_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // use false for ISR/SSG
  token,
});

// Helper to format byte sizes
export function formatBytes(bytes: number | null | undefined, decimals = 2) {
  if (!bytes || isNaN(Number(bytes))) return '0 Bytes';
  const byteValue = Number(bytes);
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(byteValue) / Math.log(k));
  return `${parseFloat((byteValue / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const query = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      description,
      "slug": slug.current,
      category->{
        _id,
        "slug": slug.current,
        title
      },
      "image": {
        "url": image.asset->url,
        "alt": title.en
      },
      specifications,
      "datasheet": {
        "url": datasheet.asset->url,
        "originalFilename": datasheet.asset->originalFilename,
        "size": datasheet.asset->size,
        "mimeType": datasheet.asset->mimeType
      }
    }
  `;

  try {
    const data = await client.fetch(query, { slug }, { next: { revalidate: 60 } });
    if (!data) return null;
    
    // Pro Move: Strict runtime parsing
    return ProductSchema.parse(data);
  } catch (error) {
    console.error("Failed to parse product data from Sanity:", error);
    return null;
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const query = `
    *[_type == "product" && category->slug.current == $categorySlug] {
      _id,
      title,
      "slug": slug.current,
      category->{
        _id,
        "slug": slug.current,
        title
      },
      "image": {
        "url": image.asset->url,
        "alt": title.en
      },
      specifications,
      "datasheet": {
        "url": datasheet.asset->url,
        "originalFilename": datasheet.asset->originalFilename,
        "size": datasheet.asset->size,
        "mimeType": datasheet.asset->mimeType
      }
    }
  `;

  try {
    const data = await client.fetch(query, { categorySlug }, { next: { revalidate: 60 } });
    return ProductsListSchema.parse(data);
  } catch (error) {
    console.error("Failed to parse products list from Sanity:", error);
    return [];
  }
}

export async function searchAll(query: string, lang: string) {
  const searchQuery = `
    {
      "products": *[_type == "product" && !(_id in path('drafts.**')) && (title.ro match $search || title.en match $search)] | order(_createdAt desc)[0...5] {
        _id,
        "title": title[$lang],
        "slug": slug.current,
        "category": {
          "title": category->title,
          "slug": category->slug.current
        }
      },
      "investors": *[_type == "investorDocument" && !(_id in path('drafts.**')) && (title.ro match $search || title.en match $search)] | order(date desc)[0...5] {
        _id,
        "title": title[$lang],
        "category": category,
        "date": date
      },
      "news": *[_type == "newsArticle" && !(_id in path('drafts.**')) && (title.ro match $search || title.en match $search)] | order(publishDate desc)[0...5] {
        _id,
        "title": title[$lang],
        "slug": slug.current,
        "date": publishDate
      }
    }
  `;

  try {
    const data = await client.fetch(searchQuery, { search: `*${query}*`, lang });
    return data;
  } catch (error) {
    console.error("Global search failed:", error);
    return { products: [], investors: [], news: [] };
  }
}

export async function getInvestorDocumentsByCategory(category: string, lang: string) {
  const query = `
    *[_type == "investorDocument" && category == $category] | order(date desc) {
      _id,
      "title": title[$lang],
      date,
      legalRequirement,
      "fileUrl": file.asset->url,
      "fileSize": file.asset->size
    }
  `;

  try {
    const data = await client.fetch(query, { category, lang });
    return data;
  } catch (error) {
    console.error("Failed to fetch investor documents:", error);
    return [];
  }
}

export async function getNewsArticles(lang: string): Promise<NewsArticle[]> {
  const query = `
    *[_type == "newsArticle"] | order(publishDate desc) {
      _id,
      "title": title[$lang],
      "slug": slug.current,
      publishDate,
      "coverImage": {
        "url": coverImage.asset->url,
        "alt": title[$lang]
      }
    }
  `;
  try {
    const data = await client.fetch(query, { lang });
    return NewsArticlesListSchema.parse(data);
  } catch (error) {
    console.error("Failed to fetch news articles:", error);
    return [];
  }
}

export async function getNewsArticleBySlug(slug: string, lang: string): Promise<NewsArticle | null> {
  const query = `
    *[_type == "newsArticle" && slug.current == $slug][0] {
      _id,
      "title": title[$lang],
      "slug": slug.current,
      publishDate,
      "content": content[$lang],
      "coverImage": {
        "url": coverImage.asset->url,
        "alt": title[$lang]
      }
    }
  `;
  try {
    const data = await client.fetch(query, { slug, lang });
    if (!data) return null;
    return NewsArticleSchema.parse(data);
  } catch (error) {
    console.error("Failed to fetch news article by slug:", error);
    return null;
  }
}

