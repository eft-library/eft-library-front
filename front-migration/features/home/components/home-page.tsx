const structureItems = [
  "app/: route entry, layout, metadata",
  "features/: domain logic and feature-local types",
  "components/: shared UI and cross-feature composition",
  "lib/: api, config, constants, utilities",
  "types/: shared api, domain, and ui contracts",
];

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-16 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          EFT Library Front Migration
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950">
          Next.js migration workspace with a domain-first project structure.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-600">
          This scaffold keeps routes thin, moves business logic into features,
          and separates backend contracts from domain and UI types.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {structureItems.map((item) => (
          <article
            key={item}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm leading-6 text-zinc-700">{item}</p>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="text-lg font-semibold text-zinc-900">
          Type placement shortcut
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700">
          <li>Component only: declare near the component.</li>
          <li>Feature only: place in `features/&lt;domain&gt;/types.ts`.</li>
          <li>Shared backend contracts: place in `types/api/*`.</li>
          <li>Shared business entities: place in `types/domain/*`.</li>
          <li>Shared UI-ready shapes: place in `types/ui/*`.</li>
        </ul>
      </section>
    </main>
  );
}
