import type { Metadata } from "next";
import { getContent, getFaqs } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { Reveal } from "@/components/public/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang layanan TemanDeadline: waktu pengerjaan, cara order, pembayaran, revisi, kerahasiaan, dan garansi.",
};

export default async function FaqPage() {
  const [content, faqs] = await Promise.all([getContent(), getFaqs()]);

  return (
    <>
      <PageHero
        eyebrow={content.faqHeroEyebrow}
        title={content.faqHeroTitle}
        accent={content.faqHeroAccent}
        description={content.faqHeroDesc}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <Reveal>
          <FaqAccordion items={faqs} />
        </Reveal>

        <Reveal>
          <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50/70 px-6 py-10 text-center">
            <h2 className="font-display text-2xl font-semibold text-navy-800">
              {content.faqCtaTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              {content.faqCtaDesc}
            </p>
            <div className="mt-6">
              <WhatsAppButton
                message="Halo TemanDeadline! Saya punya pertanyaan yang belum ada di FAQ."
                label={content.faqCtaButtonLabel}
                size="md"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
