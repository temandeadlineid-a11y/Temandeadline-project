import type { Metadata } from "next";
import { getContent, getServices } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { ServiceCard } from "@/components/public/ServiceCard";
import { ServiceInquiryForm } from "@/components/public/ServiceInquiryForm";
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
                whatsapp={content.whatsapp}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16">
            <ServiceInquiryForm serviceOptions={services.map((s) => s.title)} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
