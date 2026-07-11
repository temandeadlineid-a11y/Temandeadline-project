// Kartu layanan: border tipis, hover terangkat halus, hierarki jelas.

export function ServiceCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lift">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl transition-colors group-hover:bg-pink-100">
        <span aria-hidden>{emoji}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-navy-800">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </div>
  );
}
