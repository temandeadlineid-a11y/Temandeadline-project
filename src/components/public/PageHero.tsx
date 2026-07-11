// Hero kecil yang konsisten untuk semua sub-halaman.

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-8%] h-72 w-72 rounded-full bg-pink-100/60 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
          {eyebrow}
        </span>
        <h1 className="mx-auto mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight text-navy-800 md:text-5xl">
          {title}{" "}
          {accent && <em className="italic text-pink-600">{accent}</em>}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-500">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
