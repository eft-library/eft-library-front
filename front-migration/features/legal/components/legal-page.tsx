import { HorizontalAdBanner } from "@/components/shared/ad-banner";

export function LegalPage({
  eyebrow,
  title,
  description,
  updatedAt,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt?: string;
  sections: Array<{ title: string; body: string[] }>;
}) {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-bold">{title}</h1>
          <HorizontalAdBanner />
          {updatedAt ? (
            <p className="mt-4 text-xs font-medium text-gray-500 dark:text-gray-400">
              {updatedAt}
            </p>
          ) : null}
        </section>

        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]"
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className={paragraph.startsWith("- ") ? "pl-4" : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
