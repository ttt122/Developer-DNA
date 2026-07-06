import { Dna } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-md border border-[var(--panel-border)] bg-[var(--panel)]">
            <Dna aria-hidden="true" className="size-5 text-[var(--accent)]" />
          </div>
          <div>
            <p className="text-sm text-[var(--muted)]">Developer DNA</p>
            <h1 className="text-3xl font-semibold tracking-normal">DevDNA</h1>
          </div>
        </header>

        <div className="rounded-lg border border-[var(--panel-border)] bg-[var(--panel)] p-6">
          <p className="max-w-2xl text-lg text-[var(--foreground)]">
            Analyze public GitHub activity into behavior signals, Genome
            scores, and a shareable Developer DNA type.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-h-11 flex-1 rounded-md border border-[var(--panel-border)] bg-[#0d1117] px-3 text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              placeholder="GitHub username"
              aria-label="GitHub username"
            />
            <button className="min-h-11 rounded-md bg-[var(--accent)] px-5 font-medium text-[#061018]">
              Analyze
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

