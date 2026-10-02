import Image from "next/image";

export function FloralScreen({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f4]/55 via-[#fff7f4]/70 to-ivory/90" />
      <div className="relative mx-auto w-full max-w-6xl px-4">{children}</div>
    </section>
  );
}
