import { create } from "zustand";
import type { AgentPreferences } from "@/lib/filterJobs";
import type { Job } from "@/lib/jobs";

type State = {
  preferences: AgentPreferences;
  jobs: Job[];
  loading: boolean;
  lastUpdated?: string;
  setPreferences: (prefs: Partial<AgentPreferences>) => void;
  fetchJobs: () => Promise<void>;
};

const defaultState: AgentPreferences = {
  locations: ["Bengaluru"],
  modes: ["Hybrid", "Remote"],
  types: ["Full-Time", "Internship"],
  skills: ["SQL", "Excel"],
  salaryMin: 400000
};

export const useJobAgent = create<State>((set, get) => ({
  preferences: defaultState,
  jobs: [],
  loading: false,
  async fetchJobs() {
    const { preferences } = get();
    set({ loading: true });

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(preferences)
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }

      const data = (await response.json()) as { matches: Job[] };
      set({
        jobs: data.matches,
        lastUpdated: new Date().toISOString(),
        loading: false
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
  setPreferences(update) {
    set((state) => ({
      preferences: {
        ...state.preferences,
        ...update
      }
    }));
  }
}));
