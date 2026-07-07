import { AboutPageContent } from "./AboutPageContent";
import { fetchAboutPageContent } from "@/lib/about-page/server";

export default async function AboutPage() {
  const content = await fetchAboutPageContent();
  return <AboutPageContent content={content} />;
}
