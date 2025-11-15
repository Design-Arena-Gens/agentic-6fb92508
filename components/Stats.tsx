const insights = [
  {
    title: "Top Tech Hubs",
    value: "Bengaluru • Hyderabad • Pune"
  },
  {
    title: "In-demand skills",
    value: "SQL · Excel · Power BI · Python"
  },
  {
    title: "Avg fresher CTC",
    value: "₹5.8 LPA"
  }
];

export function Stats() {
  return (
    <section className="grid gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg md:grid-cols-3">
      {insights.map((item) => (
        <div
          key={item.title}
          className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 transition hover:border-brand-400/50"
        >
          <p className="text-xs uppercase tracking-wide text-slate-400">{item.title}</p>
          <p className="mt-2 text-lg font-semibold text-white md:text-xl">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
