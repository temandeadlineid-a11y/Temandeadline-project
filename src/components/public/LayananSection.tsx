"use client";

import { useRef, useState } from "react";
import { ServiceCard } from "@/components/public/ServiceCard";
import { ServiceInquiryForm } from "@/components/public/ServiceInquiryForm";
import { Reveal } from "@/components/public/Reveal";
import type { ServiceItem } from "@/lib/data";

// Menghubungkan kartu layanan dengan form konsultasi di bawahnya:
// klik "Tanya via WhatsApp" di kartu manapun akan scroll otomatis ke
// form dan pra-isi layanannya, tanpa perlu pengunjung cari sendiri.

export function LayananSection({ services }: { services: ServiceItem[] }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  function handleAsk(title: string) {
    setSelectedService(title);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 60}>
            <ServiceCard
              emoji={s.emoji}
              title={s.title}
              description={s.description}
              onAsk={handleAsk}
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div ref={formRef} className="mt-16 scroll-mt-24">
          <ServiceInquiryForm
            serviceOptions={services.map((s) => s.title)}
            selectedService={selectedService}
          />
        </div>
      </Reveal>
    </>
  );
}
