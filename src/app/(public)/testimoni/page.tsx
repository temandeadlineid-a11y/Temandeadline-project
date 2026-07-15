import type { Metadata } from "next";
import { getContent, getTestimonials } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { TestimonialCard } from "@/components/public/TestimonialCard";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { Reveal } from "@/components/public/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimoni",
  description:
    "Cerita nyata dari 500+ klien TemanDeadline — mahasiswa, karyawan, content creator, hingga pemilik usaha yang tugasnya selesai tepat waktu.",
};

export default async function TestimoniPage() {
  const [content, testimonials] = await Promise.all([
    getContent(),
    getTestimonials(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={content.testimoniHeroEyebrow}
        title={content.testimoniHeroTitle}
        accent={content.testimoniHeroAccent}
        description={content.testimoniHeroDesc}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 60}>
              <TestimonialCard
                name={t.name}
                role={t.role}
                content={t.content}
                rating={t.rating}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-slate-500">
              {content.testimoniCtaText}
            </p>
            <div className="mt-5">
              <WhatsAppButton
                message={content.waMessage}
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
