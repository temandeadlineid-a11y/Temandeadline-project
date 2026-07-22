import type { Metadata } from "next";
import { getContent, getFaqs } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { FaqAccordion } from "@/components/public/FaqAccordion";
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
      </section>
    </>
  );
}
