export function Header() {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-brand-500/20 via-brand-400/10 to-slate-900 p-8 shadow-lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-400/10 px-3 py-1 text-xs uppercase tracking-wide text-brand-200">
            Data Analyst Fresher Focus
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Your AI scout for early-career data analyst roles
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
            Configure your job agent once and receive curated alerts across domains, locations, and
            salary bands tailored for fresh graduates entering the data analytics landscape.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-lg">
          <p className="text-xs uppercase tracking-wide text-slate-400">Fresh openings tracked</p>
          <div className="mt-2 text-4xl font-semibold text-white md:text-5xl">120+</div>
          <p className="mt-2 text-sm text-slate-300">
            Updated hourly from campus drives, job boards, and startup communities.
          </p>
        </div>
      </div>
    </header>
  );
}
