import Image from "next/image";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <main>
      <section className="bg-zinc-100">
        <Container className="py-10 sm:py-16">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_460px]">
            <Reveal onMount>
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                CONTACT
              </div>
              <h1 className="mt-3 text-3xl font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl">
                Let&apos;s talk about your space.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-6 text-zinc-600 sm:text-[18px] sm:leading-7">
                Classroom, conference room, lecture hall, gallery, lobby, or
                government facility — our team will help you spec the right
                display solution for any space.
              </p>
            </Reveal>

            <Reveal
              onMount
              delay={0.1}
              className="relative mx-auto w-full max-w-[320px] sm:max-w-[460px] lg:mx-0 lg:ml-auto"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/mascot-puppies-trio.png"
                  alt="VTI mascot puppies trio"
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 80vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50">
        <Container className="py-6 sm:py-0 sm:pb-10">
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {[
              {
                k: "Email",
                v: "info@vtiusa.com",
                href: "mailto:info@vtiusa.com",
                icon: (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 6h16v12H4z" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                ),
              },
              {
                k: "Phone",
                v: "(877) 853-8478",
                href: "tel:+18778538478",
                icon: (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 5.2 2 2 0 0 1 4.1 3h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.1 10.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2.3Z" />
                  </svg>
                ),
              },
              {
                k: "Address",
                v: "111 Bluffs Ct, Ste C\nCanton, GA 30114",
                href: "https://maps.google.com/?q=111%20Bluffs%20Ct%2C%20Ste%20C%2C%20Canton%2C%20GA%2030114",
                icon: (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11Z" />
                    <path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <RevealItem key={card.k}>
                <a
                  href={card.href}
                  className="group block rounded-3xl border border-zinc-200 bg-white p-6 transition-colors hover:bg-zinc-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-2xl bg-red-500/10 p-2">
                      {card.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-zinc-950">
                        {card.k}
                      </div>
                      <div className="mt-1 whitespace-pre-line text-sm text-zinc-600 normal-case">
                        {card.v}
                      </div>
                    </div>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-10 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-10">
            <Reveal>
              <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
                REQUEST A QUOTE
              </div>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl">
                Tell us about your project.
              </h2>
              <p className="mt-3 max-w-xl text-zinc-600">
                Share a few details and the right person on our team will follow
                up — usually within one business day.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                {[
                  "Side-by-side spec packets",
                  "Local installation referrals",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}
