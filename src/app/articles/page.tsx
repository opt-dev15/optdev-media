import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getArticles } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "記事一覧 | optdev media",
  description: "optdev mediaの記事一覧ページです。",
};

export default async function ArticlesPage() {
  const { contents: articles } = await getArticles({
    fields: [
      "title",
      "slug",
      "description",
      "thumbnail",
      "category",
      "publishedAt",
    ],
    limit: 20,
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-10 text-3xl font-bold">記事一覧</h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">記事がまだありません。</p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articles/${article.slug}`}
                className="group block overflow-hidden rounded-lg border border-gray-200 transition hover:shadow-lg"
              >
                {article.thumbnail ? (
                  <div className="relative aspect-video">
                    <Image
                      src={article.thumbnail.url}
                      alt={article.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gray-100 text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-4">
                  {article.category && (
                    <span className="mb-2 inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                      {article.category.name}
                    </span>
                  )}
                  <h2 className="text-lg font-semibold leading-snug group-hover:text-blue-600">
                    {article.title}
                  </h2>
                  {article.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {article.description}
                    </p>
                  )}
                  <time
                    dateTime={article.publishedAt}
                    className="mt-3 block text-xs text-gray-400"
                  >
                    {new Date(article.publishedAt!).toLocaleDateString("ja-JP")}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
