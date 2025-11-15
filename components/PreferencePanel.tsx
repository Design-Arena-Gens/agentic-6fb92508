 "use client";

import { useEffect, useMemo, useState } from "react";
import { useJobAgent } from "@/hooks/useJobAgent";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

const availableLocations = [
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Mumbai",
  "Delhi NCR",
  "Chennai",
  "Remote"
];

const availableSkills = ["SQL", "Excel", "Power BI", "Python", "Tableau", "Pandas", "Looker Studio"];

const availableModes = ["Onsite", "Hybrid", "Remote"] as const;
const availableTypes = ["Full-Time", "Internship", "Contract"] as const;

export function PreferencePanel() {
  const { preferences, setPreferences, fetchJobs, loading, lastUpdated } = useJobAgent();
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      void fetchJobs();
    }, 60000);
    return () => clearInterval(id);
  }, [autoRefresh, fetchJobs]);

  const formattedUpdatedAt = useMemo(() => {
    if (!lastUpdated) return "Awaiting sync";
    const date = new Date(lastUpdated);
    return `${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }, [lastUpdated]);

  return (
    <aside className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg">
      <div>
        <h2 className="text-xl font-semibold text-white">Agent preferences</h2>
        <p className="mt-1 text-sm text-slate-300">
          Tune focus areas and we&apos;ll surface relevant fresher roles in your feed.
        </p>
      </div>

      <section className="space-y-4">
        <label className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-slate-400">Preferred locations</span>
          <div className="flex flex-wrap gap-2">
            {availableLocations.map((location) => {
              const selected = preferences.locations.includes(location);
              return (
                <button
                  key={location}
                  type="button"
                  onClick={() => {
                    setPreferences({
                      locations: selected
                        ? preferences.locations.filter((loc) => loc !== location)
                        : [...preferences.locations, location]
                    });
                  }}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    selected
                      ? "border-brand-400 bg-brand-400/30 text-brand-50"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white"
                  )}
                >
                  {location}
                </button>
              );
            })}
          </div>
        </label>

        <label className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-slate-400">Skills to highlight</span>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((skill) => {
              const selected = preferences.skills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    setPreferences({
                      skills: selected
                        ? preferences.skills.filter((item) => item !== skill)
                        : [...preferences.skills, skill]
                    });
                  }}
                  className={clsx(
                    "rounded-full border px-4 py-2 text-sm transition",
                    selected
                      ? "border-brand-400 bg-brand-400/30 text-brand-50"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white"
                  )}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-xs uppercase tracking-wide text-slate-400">Mode</span>
            {availableModes.map((mode) => {
              const selected = preferences.modes.includes(mode);
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => {
                    setPreferences({
                      modes: selected
                        ? preferences.modes.filter((item) => item !== mode)
                        : [...preferences.modes, mode]
                    });
                  }}
                  className={clsx(
                    "w-full rounded-full border px-3 py-2 text-sm transition",
                    selected
                      ? "border-brand-400 bg-brand-400/30 text-brand-50"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white"
                  )}
                >
                  {mode}
                </button>
              );
            })}
          </label>

          <label className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
            <span className="text-xs uppercase tracking-wide text-slate-400">Opportunity type</span>
            {availableTypes.map((type) => {
              const selected = preferences.types.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setPreferences({
                      types: selected
                        ? preferences.types.filter((item) => item !== type)
                        : [...preferences.types, type]
                    });
                  }}
                  className={clsx(
                    "w-full rounded-full border px-3 py-2 text-sm transition",
                    selected
                      ? "border-brand-400 bg-brand-400/30 text-brand-50"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-brand-400/40 hover:text-white"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </label>
        </div>

        <label className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Minimum desired annual salary (₹)
          </span>
          <input
            type="number"
            min={0}
            step={50000}
            value={preferences.salaryMin ?? 0}
            onChange={(event) => {
              setPreferences({
                salaryMin: Number(event.target.value) || 0
              });
            }}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
          />
        </label>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Auto-refresh</p>
            <p className="text-sm text-slate-300">Pull latest matches every 60 seconds</p>
          </div>
          <Switch
            checked={autoRefresh}
            onChange={setAutoRefresh}
            className={clsx(
              "relative inline-flex h-6 w-11 items-center rounded-full transition",
              autoRefresh ? "bg-brand-400/80" : "bg-slate-700"
            )}
          >
            <span
              className={clsx(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                autoRefresh ? "translate-x-6" : "translate-x-1"
              )}
            />
          </Switch>
        </header>
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Last sync: <span className="text-brand-200">{formattedUpdatedAt}</span>
        </p>
        <button
          type="button"
          onClick={() => fetchJobs()}
          className={clsx(
            "inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
            loading
              ? "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400"
              : "border border-brand-400/70 bg-brand-400/30 text-brand-50 hover:bg-brand-400/50"
          )}
          disabled={loading}
        >
          {loading ? "Syncing…" : "Refresh matches"}
        </button>
      </section>
    </aside>
  );
}
