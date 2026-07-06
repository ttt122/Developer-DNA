import { AnalyzeForm } from "@/components/AnalyzeForm";
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

        <AnalyzeForm />
      </section>
    </main>
  );
}
