import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-20 text-center">
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        optdev media
      </h1>
      <p className="mx-auto mb-10 max-w-xl text-lg text-gray-600">
        テクノロジーとビジネスの最新情報をお届けするメディアサイト
      </p>
      <Link
        href="/articles"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
      >
        記事一覧を見る
      </Link>
    </main>
  );
}
