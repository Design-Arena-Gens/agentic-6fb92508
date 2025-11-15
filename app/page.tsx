"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Stats } from "@/components/Stats";
import { PreferencePanel } from "@/components/PreferencePanel";
import { JobCard } from "@/components/JobCard";
import { useJobAgent } from "@/hooks/useJobAgent";

export default function Home() {
  const { jobs, fetchJobs, loading } = useJobAgent();

  useEffect(() => {
    if (!jobs.length) {
      void fetchJobs();
    }
  }, [jobs.length, fetchJobs]);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10 md:py-16">
      <Header />
      <Stats />
      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <PreferencePanel />
        <div className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Live opportunities</h2>
              <p className="text-sm text-slate-300">
                Curated freshers-friendly roles across startups, corporates, and analytics teams.
              </p>
            </div>
          </header>
          <div className="grid gap-4">
            {loading && jobs.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
                Syncing curated matches…
              </div>
            ) : jobs.length ? (
              jobs.map((job, index) => <JobCard key={job.id} job={job} index={index} />)
            ) : (
              <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
                No matches yet. Adjust preferences or try refreshing.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
