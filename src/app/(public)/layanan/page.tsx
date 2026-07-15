import type { Metadata } from "next";
import { getContent, getServices } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { ServiceCard } from "@/components/public/ServiceCard";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { Reveal } from "@/components/public/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan lengkap TemanDeadline: makalah, esai, PPT, desain grafis, editing video, CV, olah data, proofread, website, dan terjemahan.",
};

export default async function LayananPage() {
  const [content, services] = await Promise.all([getContent(), getServices()]);

  return (
    <>
      <PageHero
        eyebrow={content.layananHeroEyebrow}
        title={content.layananHeroTitle}
        accent={content.layananHeroAccent}
        description={content.layananHeroDesc}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 60}>
              <ServiceCard
                emoji={s.emoji}
                title={s.title}
                description={s.description}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 rounded-3xl border border-pink-100 bg-pink-50/60 px-6 py-12 text-center md:px-12">
            <h2 className="font-display text-2xl font-semibold text-navy-800 md:text-3xl">
              {content.layananCtaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              {content.layananCtaDesc}
            </p>
            <div className="mt-7">
              <WhatsAppButton
                message={content.layananCtaWaMessage}
                label={content.layananCtaButtonLabel}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
