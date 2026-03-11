import { getAllPosts } from "@/lib/api";
import HomeClient from "./HomeClient";

export default function Home() {
  // 1. 서버 컴포넌트에서 데이터(최신 포스트 3개)를 로드합니다.
  const allPosts = getAllPosts(["title", "date", "description", "slug", "tags"], "posts");
  const latestPosts = allPosts.slice(0, 3) as any[];

  // 2. 준비된 데이터를 클라이언트 컴포넌트로 주입합니다.
  return <HomeClient latestPosts={latestPosts} />;
}
