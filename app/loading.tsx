export default function Loading() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#2B2B2B] px-6">
      <div className="w-full max-w-md">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.6)]" />
        </div>
        <p className="mt-5 text-center text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Járművek szinkronizálása...
        </p>
      </div>
    </section>
  );
}
