import { getPostBySlug, getAllPosts } from "@/lib/api";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts(["slug"], "retrospectives");
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function RetrospectivePage({ params }: Params) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ["title", "date", "content", "tags"], "retrospectives");

    if (!post) {
        return notFound();
    }

    return (
        <article className="container mx-auto max-w-3xl px-6 py-20 pb-32">
            <Link href="/retrospectives" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-emerald-500 mb-8 transition-colors group">
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 목록으로 돌아가기
            </Link>

            <header className="mb-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
                    {post.title}
                </h1>
                <div className="flex items-center gap-6 text-zinc-500 dark:text-zinc-400 text-sm">
                    <time className="flex items-center gap-2">
                        <Calendar size={16} /> {post.date}
                    </time>
                    <div className="flex gap-2">
                        {(post.tags as unknown as string[] || []).map((tag: string, i: number) => (
                            <span key={i} className="text-emerald-500 font-medium">#{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-4">
                    <a
                        href={`https://github.com/drawsin/tech-blog/edit/master/src/content/retrospectives/${post.slug}.md`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    >
                        GitHub에서 이 회고록 수정하기
                    </a>
                </div>
            </header>

            <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-h2:text-emerald-600 dark:prose-h2:text-emerald-400 prose-a:text-emerald-500 hover:prose-a:text-emerald-600 dark:hover:prose-a:text-emerald-400 prose-img:rounded-2xl">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </article>
    );
}
