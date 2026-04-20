import { SimplePage } from "@/components/site/SimplePage";

export default function AboutPage() {
  return (
    <SimplePage
      title="About VTI"
      lead="Engineered for daily use, backed by real human support, and stocked in the U.S. for fast fulfillment."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "Engineered for daily use",
            desc: "Hardened glass, anti-glare coating, and components rated for 50,000+ hours.",
          },
          {
            title: "Real human support",
            desc: "Talk to engineers and account leads — not chatbots or call centers.",
          },
          {
            title: "Stocked & ready to ship",
            desc: "U.S. warehouses keep top SKUs on the shelf for rapid delivery.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="text-base font-semibold">{c.title}</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </SimplePage>
  );
}

