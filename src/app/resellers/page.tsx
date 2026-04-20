import { ButtonLink } from "@/components/site/Button";
import { SimplePage } from "@/components/site/SimplePage";

export default function ResellersPage() {
  return (
    <SimplePage
      title="Resellers"
      lead="Partner with VTI to deliver interactive displays and LED solutions nationwide."
    >
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-base font-semibold">Why partners choose VTI</div>
        <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Direct access to engineers and account leads</li>
          <li>5-year standard warranty and rapid replacement</li>
          <li>Stocked inventory for fast fulfillment</li>
          <li>Honest specifications and room-ready bundles</li>
        </ul>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact">Become a Reseller</ButtonLink>
          <ButtonLink href="/products" variant="secondary">
            Explore Products
          </ButtonLink>
        </div>
      </div>
    </SimplePage>
  );
}

