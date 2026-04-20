import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";
import { Hero } from "@/components/site/Hero";

export default function Home() {
  return (
    <div className="bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <Hero />

      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/30">
        <Container className="py-14">
          <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Trusted across education, enterprise, and government
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            {[
              "K-12 Districts",
              "State Universities",
              "Fortune 500",
              "Federal Agencies",
              "Community Colleges",
              "Municipal Govt",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950"
              >
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="max-w-2xl">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Solutions
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              One product family. Every kind of room.
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300">
              Whether you&apos;re outfitting a kindergarten classroom, a federal
              conference room, or a stadium-sized LED wall, VTI displays scale
              to meet the demand — without compromise.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "K-12 Classroom",
                desc: "Durable touch panels designed for classrooms — from kindergarten to senior year.",
              },
              {
                title: "Higher Ed Lecture Hall",
                desc: "Ultra-wide displays and LED walls for lecture halls, labs, and student commons.",
              },
              {
                title: "Corporate Boardroom",
                desc: "Boardroom-grade displays for hybrid meetings, presentations, and collaboration.",
              },
              {
                title: "Government Facility",
                desc: "Secure, reliable display systems for federal, state, and municipal facilities.",
              },
              {
                title: "Galleries & Conference Centers",
                desc: "Seamless LED video walls that turn lobbies, galleries, and event spaces into showpieces.",
              },
              {
                title: "Digital Signage",
                desc: "High-bright displays and scoreboards for gyms, atriums, and high-traffic public spaces.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="text-base font-semibold">{card.title}</div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 dark:bg-zinc-950/30">
        <Container className="py-16 sm:py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                The 5S Promise
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Five reasons resellers and buyers choose VTI.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-300">
                From flagship interactive panels to mobile carts, podiums,
                conferencing cameras, and accessories — VTI delivers a complete
                Services & Stands ecosystem for every room.
              </p>
              <div className="flex gap-3">
                <ButtonLink href="/resellers" variant="secondary">
                  Why resellers pick VTI
                </ButtonLink>
                <ButtonLink href="/contact" variant="ghost">
                  Talk to sales →
                </ButtonLink>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  k: "Selection",
                  v: "A full lineup tailored to every room and budget.",
                },
                { k: "Specification", v: "Honest, detailed specs — no fluff." },
                {
                  k: "Support",
                  v: "Direct access to engineers and account leads.",
                },
                {
                  k: "Service",
                  v: "5-year standard warranty and rapid replacement.",
                },
                {
                  k: "Satisfaction",
                  v: "Backed by educators and resellers nationwide.",
                },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-50 dark:text-zinc-950">
                      S
                    </div>
                    <div className="text-base font-semibold">{item.k}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {item.v}
                  </p>
                </div>
              ))}
              <div className="sm:col-span-2 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-100 p-6 dark:border-zinc-800 dark:from-zinc-950 dark:to-zinc-900">
                <div className="text-base font-semibold">
                  Big-brand specs. Boutique service.
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                  Resellers and buyers choose VTI because you get direct access
                  to the people who built the product — no call centers, no
                  runaround.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <div className="flex items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                Real Voices
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Spec sheets tell. Installations sell.
              </h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                Hear from IT directors, AV specialists, and reseller partners
                who put VTI displays into rooms across the country.
              </p>
            </div>
            <ButtonLink
              href="/gallery"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              View full gallery
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              {
                quote:
                  "We rolled VTI panels into 42 classrooms over the summer. Zero RMAs, zero help-desk tickets from teachers. That's never happened before.",
                name: "Marcus Reed",
                role: "Director of IT · Westbrook Unified School District",
              },
              {
                quote:
                  "The 21:9 collaboration display transformed how our faculty run hybrid lectures. Students in the back row finally feel like they're in the room.",
                name: "Dr. Priya Sundaram",
                role: "AV Systems Specialist · State University Learning Commons",
              },
              {
                quote:
                  "VTI is the only manufacturer where I can text the engineer who designed the panel. My margins stay healthy and my clients stay happy.",
                name: "Tony Alvarez",
                role: "Principal & Founder · Northstar AV Integrators",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <blockquote className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-10 flex sm:hidden">
            <ButtonLink href="/gallery" variant="secondary">
              View full gallery
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/30">
        <Container className="py-16">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  Ready to spec your space?
                </div>
                <p className="text-zinc-600 dark:text-zinc-300">
                  Whether you&apos;re a reseller pitching a district or a buyer
                  outfitting a single room — the VTI team is ready to help.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <ButtonLink href="/contact">Request a Quote</ButtonLink>
                <ButtonLink href="/resellers" variant="secondary">
                  Become a Reseller
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
