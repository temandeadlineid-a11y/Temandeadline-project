import { Star } from "lucide-react";

// Testimoni terasa nyata: nama + peran + rating, dengan inisial sebagai avatar.

export function TestimonialCard({
  name,
  role,
  content,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-pink-200 hover:shadow-soft">
      <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < rating
                ? "h-4 w-4 fill-pink-500 text-pink-500"
                : "h-4 w-4 text-slate-200"
            }
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
        &ldquo;{content}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
          {initials}
        </div>
        <div>
          <div className="text-sm font-bold text-navy-800">{name}</div>
          <div className="text-xs text-slate-400">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
