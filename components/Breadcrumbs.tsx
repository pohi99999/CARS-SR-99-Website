import Link from "next/link";
import { siteUrl } from "@/utils/site";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // Az utolsó morzsa (az aktuális oldal) szándékosan `item` nélkül marad,
      // ahogy a schema.org előírja. Korábban a href nélküli elemekre a puszta
      // siteUrl került, vagyis minden adatlap morzsamenüje a főoldalt jelölte
      // meg önmagaként – ez ellentmondásos jelzés volt a Google felé.
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.name}-${index}`} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="transition hover:text-sky-500">
                    {item.name}
                  </Link>
                ) : (
                  <span className={isLast ? "font-medium text-slate-700" : ""}>{item.name}</span>
                )}
                {!isLast ? <span aria-hidden="true">›</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
