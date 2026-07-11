import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import {
  DEFAULT_SERVICES,
  DEFAULT_PRICING,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
} from "@/lib/seed-data";

// Mengisi tabel yang masih kosong dengan data contoh,
// supaya admin tidak mulai dari nol. Tabel yang sudah berisi tidak disentuh.

export async function POST() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const seeded: string[] = [];

    if ((await prisma.service.count()) === 0) {
      await prisma.service.createMany({ data: DEFAULT_SERVICES });
      seeded.push("layanan");
    }
    if ((await prisma.pricingTier.count()) === 0) {
      await prisma.pricingTier.createMany({ data: DEFAULT_PRICING });
      seeded.push("harga");
    }
    if ((await prisma.testimonial.count()) === 0) {
      await prisma.testimonial.createMany({ data: DEFAULT_TESTIMONIALS });
      seeded.push("testimoni");
    }
    if ((await prisma.faq.count()) === 0) {
      await prisma.faq.createMany({ data: DEFAULT_FAQS });
      seeded.push("FAQ");
    }

    return NextResponse.json({ ok: true, seeded });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengisi data contoh." },
      { status: 500 }
    );
  }
}
