import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">Kapcsolat</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#2B2B2B] sm:text-4xl">
            Vegye fel velünk a kapcsolatot
          </h1>

          <div className="mt-8 space-y-6 text-sm text-slate-700">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Elérhetőség</h2>
              <p className="mt-2 leading-6">
                CARS SR99 Kft.
                <br />
                8900 Zalaegerszeg, Ságod hrsz. 807/15
                <br />
                Tel: 06-70 907-06-69
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Nyitvatartás</h2>
              <p className="mt-2 leading-6">
                Hétfő-Péntek: 09:00-17:00
                <br />
                Szombat: Előre egyeztetett időpontban
                <br />
                Vasárnap: Zárva
              </p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">Biztonságos megtekintés</h2>
              <p className="mt-2 leading-6">
                A hatalmas Ságodi Iparterület kiváló lehetőséget biztosít a járművek kényelmes,
                biztonságos megtekintésére és a nyugodt tesztvezetésre.
              </p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
