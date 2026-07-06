"use client";

import { ResultPanel } from "@/components/ResultPanel";
import { Search } from "lucide-react";
import { useState } from "react";

type AnalyzeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; result: Parameters<typeof ResultPanel>[0]["result"] };

export function AnalyzeForm() {
  const [username, setUsername] = useState("");
  const [state, setState] = useState<AnalyzeState>({ status: "idle" });

  async function analyze() {
    const normalized = username.trim();

    if (!normalized) {
      setState({ status: "error", message: "Enter a GitHub username." });
      return;
    }

    setState({ status: "loading" });

    try {
      const response = await fetch(`/api/analyze/${encodeURIComponent(normalized)}`);
      const payload = (await response.json()) as
        | { ok: true; data: Parameters<typeof ResultPanel>[0]["result"] }
        | { ok: false; error: { message: string } };

      if (!payload.ok) {
        setState({ status: "error", message: payload.error.message });
        return;
      }

      setState({ status: "success", result: payload.data });
    } catch {
      setState({ status: "error", message: "Analysis failed." });
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-[var(--panel-border)] bg-[var(--panel)] p-6">
        <p className="max-w-2xl text-lg text-[var(--foreground)]">
          Analyze public GitHub activity into behavior signals, Genome scores,
          and a shareable Developer DNA type.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="min-h-11 flex-1 rounded-md border border-[var(--panel-border)] bg-[#0d1117] px-3 text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
            placeholder="GitHub username"
            aria-label="GitHub username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                void analyze();
              }
            }}
          />
          <button
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-5 font-medium text-[#061018] disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
            disabled={state.status === "loading"}
            onClick={() => void analyze()}
          >
            <Search aria-hidden="true" className="size-4" />
            {state.status === "loading" ? "Analyzing" : "Analyze"}
          </button>
        </div>
      </div>

      {state.status === "error" ? (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          {state.message}
        </div>
      ) : null}

      {state.status === "success" ? (
        <ResultPanel result={state.result} />
      ) : null}
    </div>
  );
}

