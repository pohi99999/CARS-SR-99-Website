import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-slate-200">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/logo.png"
            alt="CARS SR99 Kft. logó"
            width={140}
            height={45}
            className="h-auto w-[120px] sm:w-[140px]"
          />
          <h2 className="mt-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">
            CARS SR99 Kft.
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Megbízható, prémium autókereskedés modern szemlélettel és ügyfélközpontú kiszolgálással.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Elérhetőségek</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            8900 Zalaegerszeg, Ságod hrsz. 807/15
            <br />
            Tel: 06-70 907-06-69
            <br />
            Adószám: 33067656-2-20
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Nyitvatartás</h3>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Hétfő-Péntek: 09:00-17:00
            <br />
            Szombat: Előre egyeztetett időpontban
            <br />
            Vasárnap: Zárva
          </p>
        </div>
      </div>
    </footer>
  );
}
