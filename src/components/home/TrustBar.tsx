import { Gift, Award, Crown } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function TrustBar() {
  const t = await getTranslations("trust");

  const items = [
    { icon: Gift, title: t("personalized"), text: t("personalizedText") },
    { icon: Award, title: t("vendors"), text: t("vendorsText") },
    { icon: Crown, title: t("moments"), text: t("momentsText") },
  ];

  return (
    <div className="absolute inset-x-0 bottom-8 px-4 md:bottom-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-rose/20 rounded-[2rem] bg-white/85 px-4 py-4 shadow-soft backdrop-blur-md sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 px-4 py-3 sm:justify-center"
          >
            <item.icon className="h-8 w-8 text-champagne" strokeWidth={1.25} />
            <div>
              <p className="text-sm font-medium text-ink">{item.title}</p>
              <p className="text-xs text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
