import Link from "next/link";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Logo />
            <p className="max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Interactive flat panel displays and LED solutions for K-12, higher
              education, business and government.
            </p>
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              <div>Sales: Tina at VTI</div>
              <div>
                <a className="underline underline-offset-4" href="mailto:sales@virtualtechnologies.com">
                  sales@virtualtechnologies.com
                </a>{" "}
                · <span>1-800-555-1212</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Products
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link className="hover:underline" href="/products">
                    VT13-IR Series
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/products">
                    VT Pro Series
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/products">
                    105&quot; Ultra-Wide
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/products">
                    LED Cabinet Displays
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Company
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link className="hover:underline" href="/about">
                    About VTI
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/gallery">
                    Installation Gallery
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/resellers">
                    Reseller Portal
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                Legal
              </div>
              <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link className="hover:underline" href="/privacy">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/terms">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link className="hover:underline" href="/warranty">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Virtual Technologies, Inc. All rights reserved.</div>
          <div className="text-zinc-500">Made with Next.js</div>
        </div>
      </Container>
    </footer>
  );
}

