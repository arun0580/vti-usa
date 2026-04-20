import { Container } from "@/components/site/Container";

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
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">{lead}</p>
        ) : null}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </Container>
  );
}

