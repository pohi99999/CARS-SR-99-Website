import Link from "next/link";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
            CARS SR99 Kft.
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[#2B2B2B] sm:text-5xl lg:text-6xl">
            Üdvözöljük a CARS SR99 Kft. új weboldalán
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Prémium választék, biztonságos ügyintézés és modern autóvásárlási élmény egy helyen.
          </p>
          <div className="mt-10">
            <Link
              href="/kinalatunk"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-[#2B2B2B] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300"
            >
              Kínálatunk megtekintése
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
