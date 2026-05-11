import { Container } from "@/components/site/Container";
import { Reveal } from "@/components/motion";

export function SimplePage({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <Container className="py-14 sm:py-16">
      <Reveal onMount className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {lead ? <p className="mt-3 text-zinc-600">{lead}</p> : null}
      </Reveal>
      {children ? (
        <Reveal onMount delay={0.1} className="mt-10">
          {children}
        </Reveal>
      ) : null}
    </Container>
  );
}
