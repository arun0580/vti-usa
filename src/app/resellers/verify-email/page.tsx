import { Container } from "@/components/site/Container";
import { VerifyEmailClient } from "./VerifyEmailClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your VTI reseller portal email address.",
};

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token?.trim() ?? "";

  return (
    <div className="min-h-[60vh] bg-white">
      <Container className="py-12 sm:py-16">
        <VerifyEmailClient token={token} />
      </Container>
    </div>
  );
}
