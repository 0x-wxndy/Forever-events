import { CalendarHeart, Search, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeHow() {
  const t = await getTranslations("homeHow");

  const steps = [
    { n: "01", icon: Search, title: t("step1"), text: t("step1Text") },
    { n: "02", icon: CalendarHeart, title: t("step2"), text: t("step2Text") },
    { n: "03", icon: Sparkles, title: t("step3"), text: t("step3Text") },
  ];

  return (
    <section className="border-t border-rose/10 bg-white/60 px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:items-center">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-muted">
            {t("eyebrow")}
          </p>
          <div className="mt-2 h-px w-16 bg-rose/70" />
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            {t("title")}
            <span className="mt-2 block font-script text-4xl text-dusty md:text-5xl">
              {t("titleScript")}
            </span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.n} className="text-center sm:text-left">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="font-serif text-2xl text-rose-deep">{step.n}</span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-dusty">
                  <step.icon className="h-5 w-5" />
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
