import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Blog | 기술 블로그",
  description: "개발 지식과 회고를 기록하는 공간입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased min-h-screen flex flex-col transition-colors duration-300`}>
        <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50">
          <div className="container mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400 dark:from-blue-400 dark:to-teal-300">
              TechBlog (Update v1.1)
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <Link href="/" className="hover:text-blue-500 transition-colors">홈</Link>
              <Link href="/posts" className="hover:text-blue-500 transition-colors">포스트</Link>
              <Link href="/retrospectives" className="hover:text-blue-500 transition-colors">회고록</Link>
              <Link href="/gallery" className="hover:text-blue-500 transition-colors">결과물</Link>
            </nav>
            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="mailto:drawsin@naver.com" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </header>
        <main className="flex-grow flex flex-col pt-16">
          {children}
        </main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 mt-20">
          <div className="container mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Tech Blog. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
