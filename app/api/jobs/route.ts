import { NextResponse } from "next/server";
import { jobs } from "@/lib/jobs";
import { filterJobs } from "@/lib/filterJobs";

const VALID_MODES = new Set(["Onsite", "Hybrid", "Remote"]);
const VALID_TYPES = new Set(["Full-Time", "Internship", "Contract"]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const locations = Array.isArray(body.locations) ? body.locations.slice(0, 6) : [];
  const modes = Array.isArray(body.modes)
    ? body.modes.filter((mode: unknown) => typeof mode === "string" && VALID_MODES.has(mode))
    : [];
  const types = Array.isArray(body.types)
    ? body.types.filter((type: unknown) => typeof type === "string" && VALID_TYPES.has(type))
    : [];
  const skills = Array.isArray(body.skills)
    ? body.skills.filter((skill: unknown) => typeof skill === "string").slice(0, 8)
    : [];
  const salaryMin =
    typeof body.salaryMin === "number" && Number.isFinite(body.salaryMin) ? body.salaryMin : undefined;

  const matches = filterJobs(jobs, {
    locations,
    modes,
    types,
    skills,
    salaryMin
  });

  return NextResponse.json({
    matches
  });
}
