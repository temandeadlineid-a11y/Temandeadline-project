import { cn } from "@/lib/utils";

// Heading section yang konsisten: eyebrow pink + judul Playfair + deskripsi.

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-pink-600">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy-800 md:text-4xl">
        {title}{" "}
        {accent && <em className="italic text-pink-600">{accent}</em>}
      </h2>
      {description && (
        <p className="mt-4 leading-relaxed text-slate-500">{description}</p>
      )}
    </div>
  );
}
