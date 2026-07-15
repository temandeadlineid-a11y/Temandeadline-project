import type { Metadata } from "next";
import { getContent, getServices } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { LayananSection } from "@/components/public/LayananSection";

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
        <LayananSection services={services} />
      </section>
    </>
  );
}
