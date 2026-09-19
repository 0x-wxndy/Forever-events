import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-40 text-center">
      <p className="font-script text-5xl text-dusty">Forever</p>
      <h1 className="mt-4 font-serif text-3xl text-ink">Page introuvable</h1>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white">
        Accueil
      </Link>
    </div>
  );
}
