"use client";

import { useState } from "react";

type PdfBrochureButtonProps = {
  carName: string;
  price: string;
  year: number;
  mileage: string;
  fuel: string;
  imageUrl: string;
};

export default function PdfBrochureButton({
  carName,
  price,
  year,
  mileage,
  fuel,
  imageUrl,
}: PdfBrochureButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleDownloadPdf() {
    setIsGenerating(true);

    const brochureContent = document.createElement("section");
    brochureContent.style.padding = "32px";
    brochureContent.style.fontFamily = "Inter, Arial, sans-serif";
    brochureContent.style.color = "#1f2937";
    brochureContent.style.background = "#ffffff";
    brochureContent.style.width = "760px";
    brochureContent.innerHTML = `
      <div style="border-bottom:2px solid #22d3ee; padding-bottom:12px; margin-bottom:18px;">
        <h1 style="margin:0; font-size:26px; color:#111827;">CARS SR99 Kft. - Jármű brossúra</h1>
        <p style="margin:8px 0 0; font-size:14px; color:#475569;">Prémium használt autó kínálat • Zalaegerszeg, Ságod</p>
      </div>
      <img src="${imageUrl}" alt="${carName}" style="width:100%; height:360px; object-fit:cover; border-radius:12px;" />
      <h2 style="margin:20px 0 8px; font-size:24px; color:#111827;">${carName}</h2>
      <p style="margin:0; font-size:28px; font-weight:700; color:#0f172a;">${price}</p>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:18px;">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
          <p style="margin:0; font-size:12px; color:#64748b; text-transform:uppercase;">Évjárat</p>
          <p style="margin:6px 0 0; font-size:16px; font-weight:600;">${year}</p>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
          <p style="margin:0; font-size:12px; color:#64748b; text-transform:uppercase;">Futásteljesítmény</p>
          <p style="margin:6px 0 0; font-size:16px; font-weight:600;">${mileage}</p>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px;">
          <p style="margin:0; font-size:12px; color:#64748b; text-transform:uppercase;">Üzemanyag</p>
          <p style="margin:6px 0 0; font-size:16px; font-weight:600;">${fuel}</p>
        </div>
        <div style="background:#ecfeff; border:1px solid #67e8f9; border-radius:10px; padding:12px;">
          <p style="margin:0; font-size:12px; color:#0e7490; text-transform:uppercase;">JSZP</p>
          <p style="margin:6px 0 0; font-size:16px; font-weight:600; color:#155e75;">Ellenőrzött előélet</p>
        </div>
      </div>
    `;

    document.body.appendChild(brochureContent);

    try {
      const html2pdfModule = await import("html2pdf.js");
      const html2pdf = "default" in html2pdfModule ? html2pdfModule.default : html2pdfModule;

      if (typeof html2pdf !== "function") {
        throw new Error("html2pdf inicializálása sikertelen.");
      }

      await html2pdf()
        .set({
          margin: 10,
          filename: `${carName.replace(/\s+/g, "-").toLowerCase()}-adatlap.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(brochureContent)
        .save();
    } catch (error) {
      console.error("[SR99 PdfBrochureButton] PDF generálási hiba:", error);
    } finally {
      document.body.removeChild(brochureContent);
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      aria-label="Jármű adatlap letöltése PDF formátumban"
      onClick={handleDownloadPdf}
      disabled={isGenerating}
      className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
    >
      {isGenerating ? "PDF generálása..." : "📥 Adatlap Letöltése (PDF)"}
    </button>
  );
}
