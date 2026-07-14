"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { trackContactClick } from "@/utils/analytics";

export default function Footer() {
  return (
    <footer className="bg-[#2B2B2B] text-slate-200 border-t border-slate-800">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CARS SR99 Kft. logó"
              width={50}
              height={50}
              className="h-auto w-[40px]"
            />
            <span className="text-xl font-bold text-sky-400">CARS SR99 Kft.</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Megbízható, prémium autókereskedés modern szemlélettel és ügyfélközpontú kiszolgálással.
          </p>
          <p className="mt-4 text-xs text-slate-400">
            © 2025 CARS SR99 Kft. Minden jog fenntartva.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Gyors linkek
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="transition-colors duration-200 hover:text-sky-400">
                Főoldal
              </Link>
            </li>
            <li>
              <Link href="/kinalat" className="transition-colors duration-200 hover:text-sky-400">
                Kínálat
              </Link>
            </li>
            <li>
              <Link href="/autobeszamitas" className="transition-colors duration-200 hover:text-sky-400">
                Autóbeszámítás
              </Link>
            </li>
            <li>
              <Link href="/kapcsolat" className="transition-colors duration-200 hover:text-sky-400">
                Kapcsolat
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Elérhetőség
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-sky-400" />
              <a
                href="tel:+36709070669"
                onClick={() => trackContactClick("phone")}
                className="transition-colors hover:text-sky-400"
              >
                06-70 907-06-69
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-sky-400" />
              <a
                href="mailto:carssr99@gmail.com"
                onClick={() => trackContactClick("email")}
                className="transition-colors hover:text-sky-400"
              >
                carssr99@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
              <span>8900 Zalaegerszeg, Ságod hrsz. 807/15, Magyarország</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700 py-6 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          © 2025 CARS SR99 Kft. Minden jog fenntartva.
        </div>
      </div>
    </footer>
  );
}
