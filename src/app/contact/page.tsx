import { Button } from "@/components/site/Button";
import { SimplePage } from "@/components/site/SimplePage";

export default function ContactPage() {
  return (
    <SimplePage
      title="Contact"
      lead="Tell us about your space and timeline — we’ll help you spec the right display solution."
    >
      <form className="grid gap-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Name</span>
          <input
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            name="name"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Email</span>
          <input
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            name="email"
            type="email"
            autoComplete="email"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Organization</span>
          <input
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            name="org"
            autoComplete="organization"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium">Phone</span>
          <input
            className="h-11 rounded-2xl border border-zinc-200 bg-white px-4 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            name="phone"
            autoComplete="tel"
          />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium">What are you looking to install?</span>
          <textarea
            className="min-h-28 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-zinc-400/40 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950"
            name="message"
          />
        </label>
        <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-600 dark:text-zinc-400">
            Or email{" "}
            <a
              className="underline underline-offset-4"
              href="mailto:sales@virtualtechnologies.com"
            >
              sales@virtualtechnologies.com
            </a>
          </div>
          <Button type="button">Send</Button>
        </div>
      </form>
    </SimplePage>
  );
}

