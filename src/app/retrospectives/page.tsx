import { PenTool, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/api";

export default function RetrospectivesPage() {
    const retrospectives = getAllPosts(["title", "date", "slug", "tags"], "retrospectives");

    return (
        <div className="container mx-auto max-w-5xl px-6 py-20 pb-32">
            <div className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
                    <PenTool className="text-emerald-500 w-8 h-8" />
                    일일 기술회고록
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    매일매일 성장하는 과정을 솔직하게 기록합니다.
                </p>
            </div>

            {retrospectives.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50">
                    <p className="text-zinc-500 dark:text-zinc-400">아직 작성된 회고록이 없습니다.</p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-2">스크립트를 통해 오늘의 회고록을 첫 번째로 작성해보세요!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {retrospectives.map((post) => (
                        <Link href={`/retrospectives/${post.slug}`} key={post.slug} className="group block p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-md">
                            <div className="flex items-center justify-between mb-4 text-sm">
                                <time className="text-zinc-500 dark:text-zinc-400 font-medium">{post.date}</time>
                                <div className="flex gap-2">
                                    {(post.tags as unknown as string[] || []).slice(0, 2).map((tag, i) => (
                                        <span key={i} className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors mb-6">
                                {post.title}
                            </h2>
                            <div className="flex items-center text-emerald-500 font-medium text-sm group-hover:gap-2 transition-all mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                회고록 보기 <ArrowRight size={16} className="ml-1" />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
