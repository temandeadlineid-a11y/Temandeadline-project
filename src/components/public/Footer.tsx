import Link from "next/link";
import { Instagram, Mail, Clock, MessageCircle } from "lucide-react";

export function Footer({ content }: { content: Record<string, string> }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white">
              Teman<span className="text-pink-400">Deadline</span>
              <span className="text-pink-400">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              Partner terpercaya untuk tugas, desain, dan dokumen pentingmu.
              Tepat waktu, hasil rapi, kerahasiaan terjaga.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: "/", label: "Beranda" },
                { href: "/layanan", label: "Layanan" },
                { href: "/testimoni", label: "Testimoni" },
                { href: "/faq", label: "FAQ" },
                { href: "/kontak", label: "Kontak" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-pink-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan populer */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Layanan Populer
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>Makalah &amp; Esai</li>
              <li>PPT &amp; Presentasi</li>
              <li>Desain Grafis</li>
              <li>CV &amp; Portofolio</li>
              <li>Proofread &amp; Parafrase</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Hubungi Kami
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-pink-400" />
                <span>+{content.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-pink-400" />
                <span>{content.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="h-4 w-4 text-pink-400" />
                <span>@{content.instagram}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-pink-400" />
                <span>{content.jamOperasional}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-navy-700 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            &copy; {year} TemanDeadline.id — Tepat Waktu, Hasil Terpercaya.
          </p>
          <p>
            Website by{" "}
            <a
              href="https://pagiversestudio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-400 transition-colors hover:text-pink-400"
            >
              Pagiverse Studio
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
