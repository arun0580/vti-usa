import Image from "next/image";
import { ButtonLink } from "@/components/site/Button";
import { Container } from "@/components/site/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="py-7">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_560px]">
          <div className="space-y-4">
            <div className="text-[12px] font-semibold tracking-[0.22em] text-red-600">
              DISPLAY TECHNOLOGY
            </div>

            <h1 className="text-[44px] font-extrabold leading-[0.92] tracking-tight text-zinc-950 sm:text-[72px]">
              <span className="block">INFORM.</span>
              <span className="block text-red-600">ENGAGE.</span>
              <span className="block">ELEVATE.</span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-zinc-600 sm:text-[18px]">
              Interactive panels, LED posters, and digital signage solutions for
              education, business, government, and public spaces — delivered
              through a nationwide partner network.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/products"
                className="!bg-red-600 hover:!bg-red-700 dark:!bg-red-600 dark:hover:!bg-red-700"
              >
                Explore Products
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Request a Quote
              </ButtonLink>
            </div>

            <div className="grid max-w-xl grid-cols-3 gap-6 pt-3">
              {[
                { k: "50+", v: "STATES SERVED" },
                { k: "10K+", v: "DISPLAYS INSTALLED" },
                { k: "5-Yr", v: "WARRANTY STANDARD" },
              ].map((stat) => (
                <div key={stat.v} className="space-y-1">
                  <div className="text-3xl font-extrabold tracking-tight text-zinc-950">
                    {stat.k}
                  </div>
                  <div className="text-[12px] font-semibold tracking-[0.18em] text-zinc-500">
                    {stat.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
            <div className="pointer-events-none absolute -right-3 top-8 hidden h-20 w-20 rounded-full bg-zinc-950/5 blur-xl lg:block" />

            <div className="relative ml-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-full border-0 ">
              <Image
                src="/vt-panel-hero-BbQvghRM.png"
                alt="VTI interactive display lineup"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 520px, 92vw"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
