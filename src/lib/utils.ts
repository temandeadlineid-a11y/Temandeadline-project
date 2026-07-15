import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function parseFeatures(json: string): string[] {
  try {
    const arr = JSON.parse(json);
    return Array.isArray(arr) ? arr.map(String) : [];
  } catch {
    return [];
  }
}

export function buildWaLink(number: string, message: string) {
  let clean = number.replace(/[^0-9]/g, "");
  // Nomor lokal Indonesia (mis. 0895...) perlu diubah ke format
  // internasional (628xx...) supaya wa.me/api.whatsapp.com bisa membuka
  // chat-nya. Tanpa ini, angka 0 di depan dibaca sebagai bagian nomor.
  if (clean.startsWith("0")) {
    clean = "62" + clean.slice(1);
  }
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function formatDateID(date: Date | string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
