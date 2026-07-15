import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Sparkles, Wallet } from "lucide-react";
import {
  getContent,
  getServices,
  getTestimonials,
} from "@/lib/data";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import { ServiceCard } from "@/components/public/ServiceCard";
import { TestimonialCard } from "@/components/public/TestimonialCard";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Reveal } from "@/components/public/Reveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, services, testimonials] = await Promise.all([
    getContent(),
    getServices(),
    getTestimonials(),
  ]);

  const stats = [
    { value: content.statProjects, label: "Proyek Selesai" },
    { value: content.statSatisfaction, label: "Klien Puas" },
    { value: content.statRating, label: "Rating Klien" },
    { value: content.statResponse, label: "Respon Chat" },
  ];

  const values = [
    { icon: Clock, title: content.whyUs1Title, desc: content.whyUs1Desc },
    { icon: Sparkles, title: content.whyUs2Title, desc: content.whyUs2Desc },
    { icon: Wallet, title: content.whyUs3Title, desc: content.whyUs3Desc },
    { icon: ShieldCheck, title: content.whyUs4Title, desc: content.whyUs4Desc },
  ];

  const steps = [
    { no: "01", title: content.how1Title, desc: content.how1Desc },
    { no: "02", title: content.how2Title, desc: content.how2Desc },
    { no: "03", title: content.how3Title, desc: content.how3Desc },
    { no: "04", title: content.how4Title, desc: content.how4Desc },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Dekorasi lembut di belakang */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-pink-100/70 blur-3xl" />
          <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-navy-100/60 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-sm font-medium text-pink-700">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-600" />
              {content.heroBadge}
            </span>

            <h1 className="mt-7 font-display text-4xl font-semibold leading-tight tracking-tight text-navy-800 md:text-6xl">
              {content.heroTitle}{" "}
              <em className="italic text-pink-600">{content.heroAccent}</em>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              {content.heroSubtitle}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton
                whatsapp={content.whatsapp}
                message={content.waMessage}
                className="w-full sm:w-auto"
              />
              <Link
                href="/layanan"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-navy-800 transition-all duration-200 hover:border-pink-300 hover:bg-pink-50 sm:w-auto"
              >
                Lihat Layanan <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-400">
              Respon &lt; 1 jam &bull; Revisi gratis &bull; 100% rahasia
              terjaga
            </p>
          </div>
        </div>

        {/* Strip statistik */}
        <div className="border-y border-pink-100 bg-pink-50/60">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-semibold text-navy-800 md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LAYANAN (preview) ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.layananSectionEyebrow}
            title={content.layananSectionTitle}
            accent={content.layananSectionAccent}
            description={content.layananSectionDesc}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <ServiceCard
                emoji={s.emoji}
                title={s.title}
                description={s.description}
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 font-semibold text-pink-600 transition-colors hover:text-pink-700"
          >
            Lihat semua layanan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= KENAPA KAMI ================= */}
      <section className="bg-navy-900 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-400">
                {content.whyUsEyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {content.whyUsTitle}{" "}
                <em className="italic text-pink-400">{content.whyUsAccent}</em>
              </h2>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-2xl border border-navy-700 bg-navy-800/60 p-6 transition-colors duration-300 hover:border-pink-500/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600/15">
                    <v.icon className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="mt-4 font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CARA KERJA ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={content.howEyebrow}
            title={content.howTitle}
            accent={content.howAccent}
            description={content.howDesc}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.no} delay={i * 70}>
              <div className="relative h-full rounded-2xl border border-slate-200 bg-white p-6">
                <span className="font-display text-4xl font-semibold text-pink-100">
                  {s.no}
                </span>
                <h3 className="mt-3 font-bold text-navy-800">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONI (preview) ================= */}
      <section className="bg-slate-50/70 py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow={content.testimoniSectionEyebrow}
              title={content.testimoniSectionTitle}
              accent={content.testimoniSectionAccent}
              description={content.testimoniSectionDesc}
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 70}>
                <TestimonialCard
                  name={t.name}
                  role={t.role}
                  content={t.content}
                  rating={t.rating}
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/testimoni"
              className="inline-flex items-center gap-2 font-semibold text-pink-600 transition-colors hover:text-pink-700"
            >
              Baca testimoni lainnya <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA PENUTUP ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-24 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-16 text-center md:px-12 md:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-pink-600/10 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {content.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-300">
                {content.ctaSubtitle}
              </p>
              <div className="mt-8">
                <WhatsAppButton
                  whatsapp={content.whatsapp}
                  message={content.waMessage}
                  label="Mulai Konsultasi Gratis"
                />
              </div>
              <p className="mt-5 text-sm text-slate-400">
                Gratis, tanpa komitmen apa pun.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
