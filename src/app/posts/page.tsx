import { Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";

export default function PostsPage() {
    const posts = getAllPosts(["title", "date", "description", "slug", "tags"], "posts");

    return (
        <div className="container mx-auto max-w-5xl px-6 py-20 pb-32">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
                    <Code2 className="text-blue-500 w-8 h-8" />
                    최신 포스트
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    새롭게 배운 기술, 트러블슈팅, 유용한 팁들을 정리합니다.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
                    <p className="text-zinc-500 dark:text-zinc-400">아직 작성된 포스트가 없습니다.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <Link href={`/posts/${post.slug}`} key={post.slug} className="group block p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-4 text-sm">
                                <time className="text-zinc-500 dark:text-zinc-400 font-medium">{post.date}</time>
                                <div className="flex gap-2">
                                    {(post.tags as unknown as string[] || []).slice(0, 3).map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                {post.title}
                            </h2>
                            {post.description && (
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                                    {post.description}
                                </p>
                            )}
                            <div className="flex items-center text-blue-500 font-medium text-sm group-hover:gap-2 transition-all">
                                계속 읽기 <ArrowRight size={16} className="ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
