import { HomeClient } from "./HomeClient";
import { fetchHomePageContent } from "@/lib/home-page/server";

export default async function Home() {
  const content = await fetchHomePageContent();
  return <HomeClient content={content} />;
}
