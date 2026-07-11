import { prisma } from "@/lib/prisma";
import {
  DEFAULT_CONTENT,
  DEFAULT_SERVICES,
  DEFAULT_PRICING,
  DEFAULT_TESTIMONIALS,
  DEFAULT_FAQS,
} from "@/lib/seed-data";

// Semua helper di bawah punya fallback ke data default,
// jadi website TIDAK akan pernah blank walau database kosong / bermasalah.

export async function getContent(): Promise<Record<string, string>> {
  try {
    const rows = await prisma.siteContent.findMany();
    const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULT_CONTENT, ...fromDb };
  } catch {
    return { ...DEFAULT_CONTENT };
  }
}

export type ServiceItem = { id: string; emoji: string; title: string; description: string };

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length) return rows;
  } catch {}
  return DEFAULT_SERVICES.map((s, i) => ({ id: `d${i}`, ...s }));
}

export type PricingItem = {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string;
  popular: boolean;
};

export async function getPricing(): Promise<PricingItem[]> {
  try {
    const rows = await prisma.pricingTier.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length) return rows;
  } catch {}
  return DEFAULT_PRICING.map((p, i) => ({ id: `d${i}`, ...p }));
}

export type TestimonialItem = { id: string; name: string; role: string; content: string; rating: number };

export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length) return rows;
  } catch {}
  return DEFAULT_TESTIMONIALS.map((t, i) => ({ id: `d${i}`, ...t }));
}

export type FaqItem = { id: string; question: string; answer: string };

export async function getFaqs(): Promise<FaqItem[]> {
  try {
    const rows = await prisma.faq.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });
    if (rows.length) return rows;
  } catch {}
  return DEFAULT_FAQS.map((f, i) => ({ id: `d${i}`, ...f }));
}
