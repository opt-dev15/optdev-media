import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "optdev media",
    template: "%s | optdev media",
  },
  description: "optdev media - テクノロジーとビジネスの最新情報をお届けするメディアサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <a href="/" className="text-xl font-bold">
              optdev media
            </a>
            <ul className="flex gap-6 text-sm">
              <li>
                <a href="/" className="hover:text-blue-600">
                  ホーム
                </a>
              </li>
              <li>
                <a href="/articles" className="hover:text-blue-600">
                  記事一覧
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t py-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} optdev media. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
