import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/site/Container";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={180}
                height={60}
                className="rounded-md object-contain"
                priority
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-zinc-400">
              Interactive flat panel displays and LED solutions for K-12, higher
              education, business and government.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-8">
            <div className="space-y-3 lg:col-span-3">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-200">
                PRODUCTS
              </div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <Link className="hover:text-zinc-200" href="/products">
                    VT13-IR Series
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/products">
                    VT Pro Series
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/products">
                    105&quot; Ultra-Wide
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/products">
                    LED Cabinet Displays
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 lg:col-span-3">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-200">
                COMPANY
              </div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <Link className="hover:text-zinc-200" href="/about">
                    About VTI
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/gallery">
                    Installation Gallery
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/resellers">
                    Reseller Portal
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-zinc-200" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 lg:col-span-2">
              <div className="text-[11px] font-semibold tracking-[0.18em] text-zinc-200">
                GET IN TOUCH
              </div>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li>
                  <a
                    className="hover:text-zinc-200"
                    href="mailto:info@vtiusa.com"
                  >
                    info@vtiusa.com
                  </a>
                </li>
                <li>(877) 853-8478</li>
                <li className="leading-6">
                  111 Buffs St, Ste C
                  <br />
                  Canton, GA 30114
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} Virtual Technologies, Inc. All rights
            reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link className="hover:text-zinc-300" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-zinc-300" href="/terms">
              Terms
            </Link>
            <Link className="hover:text-zinc-300" href="/warranty">
              Warranty
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
