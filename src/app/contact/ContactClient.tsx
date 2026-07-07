"use client";

import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Container } from "@/components/site/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { EditableText, EditableTextarea } from "@/lib/products-page/EditableField";
import { EditableImage } from "@/lib/products-page/EditableImage";
import { uploadContactFile } from "@/lib/contact-page/uploadApi";
import type { ContactPageContent } from "@/lib/contact-page/types";
import { ContactForm } from "./ContactForm";

function ContactCardIcon({ kind }: { kind: ContactPageContent["contactCards"][0]["kind"] }) {
  if (kind === "email") {
    return (
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
    );
  }
  if (kind === "phone") {
    return (
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
    );
  }
  return (
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
  );
}

export function ContactClient({
  content,
  editable = false,
  onContentChange,
}: {
  content: ContactPageContent;
  editable?: boolean;
  onContentChange?: Dispatch<SetStateAction<ContactPageContent>>;
}) {
  const { hero, contactCards, quote } = content;

  function patchString(
    updater: (draft: ContactPageContent, value: string) => ContactPageContent,
  ): ((value: string) => void) | undefined {
    if (!editable || !onContentChange) return undefined;
    return (value: string) => onContentChange((prev) => updater(prev, value));
  }

  return (
    <main>
      <section className="bg-zinc-100">
        <Container className="py-10 sm:py-16">
          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_460px]">
            <Reveal onMount>
              <EditableText
                as="div"
                className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                value={hero.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  hero: { ...d.hero, kicker },
                }))}
              />
              <EditableText
                as="h1"
                className="mt-3 text-3xl font-extrabold leading-[0.95] tracking-tight text-zinc-950 sm:text-6xl"
                value={hero.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  hero: { ...d.hero, title },
                }))}
              />
              <EditableTextarea
                className="mt-4 max-w-2xl text-base leading-6 text-zinc-600 sm:text-[18px] sm:leading-7"
                value={hero.description}
                onChange={patchString((d, description) => ({
                  ...d,
                  hero: { ...d.hero, description },
                }))}
              />
            </Reveal>

            <Reveal
              onMount
              delay={0.1}
              className="relative mx-auto w-full max-w-[320px] sm:max-w-[460px] lg:mx-0 lg:ml-auto"
            >
              <div className="relative aspect-square w-full">
                {editable && onContentChange ? (
                  <EditableImage
                    src={hero.imageSrc}
                    alt={hero.imageAlt}
                    fill
                    priority
                    className="relative h-full w-full"
                    imageClassName="object-contain"
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 80vw"
                    uploadFile={uploadContactFile}
                    onChange={(imageSrc) =>
                      onContentChange((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, imageSrc },
                      }))
                    }
                  />
                ) : (
                  <Image
                    src={hero.imageSrc}
                    alt={hero.imageAlt}
                    fill
                    priority
                    className="object-contain"
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 60vw, 80vw"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-zinc-50 pt-10 sm:pt-16">
        <Container className="py-6 sm:py-0 sm:pb-10">
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {contactCards.map((card, index) => (
              <RevealItem key={card.id} className="h-full">
                <a
                  href={card.href}
                  className="group flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition-colors hover:bg-zinc-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-2xl bg-red-500/10 p-2">
                      <ContactCardIcon kind={card.kind} />
                    </div>
                    <div className="min-w-0">
                      {editable && onContentChange ? (
                        <EditableText
                          as="div"
                          className="text-sm font-semibold text-zinc-950"
                          value={card.label}
                          onChange={(label) =>
                            onContentChange((prev) => {
                              const contactCards = [...prev.contactCards];
                              contactCards[index] = {
                                ...contactCards[index],
                                label,
                              };
                              return { ...prev, contactCards };
                            })
                          }
                        />
                      ) : (
                        <div className="text-sm font-semibold text-zinc-950">{card.label}</div>
                      )}
                      {editable && onContentChange ? (
                        <EditableTextarea
                          className="mt-1 whitespace-pre-line text-sm text-zinc-600 normal-case"
                          value={card.value}
                          onChange={(value) =>
                            onContentChange((prev) => {
                              const contactCards = [...prev.contactCards];
                              contactCards[index] = {
                                ...contactCards[index],
                                value,
                              };
                              return { ...prev, contactCards };
                            })
                          }
                        />
                      ) : (
                        <div className="mt-1 whitespace-pre-line text-sm text-zinc-600 normal-case">
                          {card.value}
                        </div>
                      )}
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
              <EditableText
                as="div"
                className="text-[12px] font-semibold tracking-[0.22em] text-red-600"
                value={quote.kicker}
                onChange={patchString((d, kicker) => ({
                  ...d,
                  quote: { ...d.quote, kicker },
                }))}
              />
              <EditableText
                as="h2"
                className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-4xl"
                value={quote.title}
                onChange={patchString((d, title) => ({
                  ...d,
                  quote: { ...d.quote, title },
                }))}
              />
              <EditableTextarea
                className="mt-3 max-w-xl text-zinc-600"
                value={quote.description}
                onChange={patchString((d, description) => ({
                  ...d,
                  quote: { ...d.quote, description },
                }))}
              />

              <ul className="mt-6 space-y-3 text-sm text-zinc-700">
                {quote.bullets.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-600" />
                    <EditableText
                      as="span"
                      value={item}
                      onChange={
                        editable && onContentChange
                          ? (value) =>
                              onContentChange((prev) => {
                                const bullets = [...prev.quote.bullets];
                                bullets[index] = value;
                                return {
                                  ...prev,
                                  quote: { ...prev.quote, bullets },
                                };
                              })
                          : undefined
                      }
                    />
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
