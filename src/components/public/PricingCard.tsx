import { Check } from "lucide-react";
import { cn, parseFeatures } from "@/lib/utils";
import { WhatsAppButton } from "@/components/public/WhatsAppButton";
import type { PricingItem } from "@/lib/data";

export function PricingCard({
  tier,
  whatsapp,
}: {
  tier: PricingItem;
  whatsapp: string;
}) {
  const features = parseFeatures(tier.features);

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl bg-white p-7 transition-all duration-300",
        tier.popular
          ? "border-2 border-pink-600 shadow-lift"
          : "border border-slate-200 hover:border-pink-200 hover:shadow-soft"
      )}
    >
      {tier.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-pink-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-pinkglow">
          Paling Populer
        </span>
      )}
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
        {tier.name}
      </h3>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-4xl font-semibold text-navy-800">
          {tier.price}
        </span>
        <span className="text-sm text-slate-400">{tier.unit}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">
        {tier.description}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-50">
              <Check className="h-3 w-3 text-pink-600" />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <WhatsAppButton
          whatsapp={whatsapp}
          message={`Halo TemanDeadline! Saya tertarik dengan paket ${tier.name} (${tier.price}). Boleh dibantu?`}
          label="Pilih Paket Ini"
          variant={tier.popular ? "primary" : "outline"}
          size="md"
          className="w-full"
        />
      </div>
    </div>
  );
}
