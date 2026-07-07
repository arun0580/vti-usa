import { ContactClient } from "./ContactClient";
import { fetchContactPageContent } from "@/lib/contact-page/server";

export default async function ContactPage() {
  const content = await fetchContactPageContent();
  return <ContactClient content={content} />;
}
