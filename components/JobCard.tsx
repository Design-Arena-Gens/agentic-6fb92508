import { motion } from "framer-motion";
import { CalendarDaysIcon, MapPinIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import type { Job } from "@/lib/jobs";

type Props = {
  job: Job;
  index: number;
};

export function JobCard({ job, index }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg"
    >
      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-brand-200">{job.company}</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">{job.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <MapPinIcon className="h-4 w-4 text-brand-200" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {job.type}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              {job.mode}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              ₹ {job.stipend}
            </span>
          </div>
        </div>
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-brand-400/60 bg-brand-400/20 px-4 py-2 text-sm font-semibold text-brand-50 transition hover:bg-brand-400/40"
        >
          Apply now
          <PaperAirplaneIcon className="h-4 w-4" />
        </a>
      </header>
      <p className="text-sm leading-relaxed text-slate-300">{job.description}</p>
      <div className="flex flex-wrap gap-2 text-xs font-medium text-brand-100">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-brand-400/40 bg-brand-400/10 px-3 py-1 uppercase tracking-wide"
          >
            {tag}
          </span>
        ))}
      </div>
      <footer className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-400">
        <CalendarDaysIcon className="h-4 w-4 text-brand-200" />
        Posted on {new Date(job.postedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
      </footer>
    </motion.article>
  );
}
