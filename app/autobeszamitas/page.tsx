import TradeInForm from "@/components/TradeInForm";

export default function TradeInPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">
            Autóbeszámítás
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#2B2B2B] sm:text-4xl">
            Kényelmes, gyors és korrekt értékbecslés
          </h1>
          <p className="mt-4 leading-7 text-slate-600">
            A CARS SR99 Kft.-nél egyszerűen beszámíttathatja jelenlegi autóját új járműve
            vásárlásába. Előzetes adatai alapján gyors visszajelzést adunk, majd személyes
            állapotfelméréssel pontos ajánlatot készítünk.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="font-semibold text-slate-900">Miért érdemes nálunk beszámíttatni?</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Gyors folyamat és transzparens értékbecslés.</li>
                <li>Egyszerű ügyintézés, egy helyen minden lépés.</li>
                <li>Prémium ügyfélélmény a teljes vásárlási folyamat során.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="font-semibold text-slate-900">Ságodi telephelyi állapotfelmérés</h2>
              <p className="mt-2 leading-6">
                A végső állapotfelmérés a ságodi telephelyen történik, ahol biztonságos, rendezett
                környezetben végezzük el a részletes vizsgálatot.
              </p>
            </div>
          </div>
        </div>

        <TradeInForm />
      </div>
    </section>
  );
}
