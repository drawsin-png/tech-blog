"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, PenTool, TerminalSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto max-w-5xl px-6 py-20 flex flex-col items-center justify-center min-h-[85vh]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-96 absolute top-0 left-0 -z-10 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next.js 15 블로그 오픈
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-zinc-900 dark:text-white leading-[1.1]">
          꾸준함이 만드는 <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-500 dark:from-blue-400 dark:via-teal-300 dark:to-emerald-400">
            특별한 변화
          </span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed">
          배움을 기록하고 성장을 공유하는 기술 블로그입니다. <br />
          매일의 작은 깨달음이 모여 더 나은 코드를 만듭니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/posts" className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all active:scale-95 shadow-xl shadow-zinc-900/20 dark:shadow-white/10 flex items-center justify-center gap-2 group">
            최신 글 읽기
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/retrospectives" className="w-full sm:w-auto px-8 py-4 rounded-full ring-1 ring-zinc-300 dark:ring-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-2">
            오늘의 회고
            <PenTool size={18} />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-teal-500/10 to-emerald-500/10 blur-3xl -z-10 rounded-[100px]" />

        {[
          { title: "최신 기술 동향", desc: "프론트엔드 생태계의 새로운 기술과 트렌드를 분석하고 적용기를 공유합니다.", icon: <Code2 className="w-8 h-8 text-blue-500" /> },
          { title: "트러블슈팅", desc: "실무와 개인 프로젝트에서 마주친 복잡한 문제들과 해결 과정을 남깁니다.", icon: <TerminalSquare className="w-8 h-8 text-teal-500" /> },
          { title: "일일 회고", desc: "하루 동안 배운 점, 아쉬웠던 점을 파악하고 내일의 목표를 세웁니다.", icon: <PenTool className="w-8 h-8 text-emerald-500" /> },
        ].map((item, i) => (
          <div key={i} className="group p-8 rounded-3xl bg-white dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer">
            <div className="mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 inline-block group-hover:scale-110 transition-transform origin-center">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{item.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
