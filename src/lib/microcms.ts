import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSImage,
  MicroCMSListContent,
  MicroCMSListResponse,
  MicroCMSQueries,
} from "microcms-js-sdk";

// ---------- Types ----------

export type Category = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type Tag = {
  name: string;
  slug: string;
} & MicroCMSListContent;

export type Article = {
  title: string;
  slug: string;
  description: string;
  ogimage?: MicroCMSImage;
  body: string;
  category?: Category;
  tags?: Tag[];
  thumbnail?: MicroCMSImage;
  metaTitle?: string;
  relatedArticles?: Article[];
} & MicroCMSListContent;

// ---------- Client ----------

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ---------- Articles ----------

export async function getArticles(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Article>> {
  return client.getList<Article>({ endpoint: "articles", queries });
}

export async function getArticleBySlug(
  slug: string,
  queries?: MicroCMSQueries
): Promise<Article | null> {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: { ...queries, filters: `slug[equals]${slug}` },
  });
  return data.contents[0] ?? null;
}

// ---------- Categories ----------

export async function getCategories(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Category>> {
  return client.getList<Category>({ endpoint: "categories", queries });
}

// ---------- Tags ----------

export async function getTags(
  queries?: MicroCMSQueries
): Promise<MicroCMSListResponse<Tag>> {
  return client.getList<Tag>({ endpoint: "tags", queries });
}
