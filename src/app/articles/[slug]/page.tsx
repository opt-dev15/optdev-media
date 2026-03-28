import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticleBySlug } from "@/lib/microcms";

type Props = {
  params: Promise<{ slug: string }>;
};

// ---------- SSG ----------

export async function generateStaticParams() {
  const { contents } = await getArticles({ fields: ["slug"], limit: 100 });
  return contents.map((article) => ({ slug: article.slug }));
}

// ---------- Metadata ----------

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.metaTitle || article.title} | optdev media`,
    description: article.description,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.description,
      images: article.ogimage
        ? [{ url: article.ogimage.url }]
        : article.thumbnail
          ? [{ url: article.thumbnail.url }]
          : [],
    },
  };
}

// ---------- Page ----------

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* Category & Tags */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {article.category && (
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            {article.category.name}
          </span>
        )}
        {article.tags?.map((tag) => (
          <span
            key={tag.id}
            className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      <h1 className="mb-4 text-3xl font-bold leading-tight">{article.title}</h1>

      <time
        dateTime={article.publishedAt}
        className="mb-8 block text-sm text-gray-400"
      >
        {new Date(article.publishedAt!).toLocaleDateString("ja-JP")}
      </time>

      {article.thumbnail && (
        <div className="relative mb-10 aspect-video overflow-hidden rounded-lg">
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      {/* Article Body */}
      <article
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="mt-16 border-t pt-10">
          <h2 className="mb-6 text-xl font-bold">関連記事</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {article.relatedArticles.map((related) => (
              <li key={related.id}>
                <Link
                  href={`/articles/${related.slug}`}
                  className="block rounded-lg border p-4 transition hover:bg-gray-50"
                >
                  <span className="font-medium hover:text-blue-600">
                    {related.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12">
        <Link href="/articles" className="text-blue-600 hover:underline">
          &larr; 記事一覧に戻る
        </Link>
      </div>
    </main>
  );
}
