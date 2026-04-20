import { ButtonLink } from "@/components/site/Button";
import { SimplePage } from "@/components/site/SimplePage";

const products = [
  {
    name: "VT13-IR Series",
    desc: "Interactive flat panel displays built for daily classroom and meeting use.",
  },
  {
    name: "VT Pro Series",
    desc: "Premium collaboration displays with pro-grade performance and support.",
  },
  {
    name: '105" Ultra-Wide',
    desc: "Ultra-wide format for hybrid learning, training, and high-impact collaboration.",
  },
  {
    name: "LED Cabinet Displays",
    desc: "Modular LED walls for lobbies, events, and large-format installations.",
  },
];

export default function ProductsPage() {
  return (
    <SimplePage
      title="Products"
      lead="Explore interactive flat panels, ultra-wide collaboration displays, and LED solutions."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <div
            key={p.name}
            className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="text-base font-semibold">{p.name}</div>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {p.desc}
            </p>
            <div className="mt-4">
              <ButtonLink href="/contact" variant="secondary" size="sm">
                Request a Quote
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </SimplePage>
  );
}

