"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/kinalat", label: "Kínálatunk" },
  { href: "/autobeszamitas", label: "Autóbeszámítás" },
  { href: "/garancia", label: "SR99 Garancia" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full text-white transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[#0f172a]/90 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="CARS SR99 Kft. főoldal">
          <Image
            src="/logo.png"
            alt="CARS SR99 Kft. logó"
            width={60}
            height={20}
            className="h-auto w-[52px] sm:w-[60px]"
            priority
          />
          <span className="text-sm font-semibold tracking-wider text-white">CARS SR99 Kft.</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-3 text-white hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 md:hidden"
          aria-label="Navigáció megnyitása"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${
                  isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>

      {isOpen && (
        <nav className="border-t border-white/10 px-6 pb-4 md:hidden sm:px-6 bg-[#0f172a]/95 backdrop-blur-md">
          <div className="flex flex-col gap-3 pt-4 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-white hover:text-cyan-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
