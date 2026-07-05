import { TriangleAlert, X } from "lucide-react";

import type { LiveMapCopy } from "./live-map-copy";

export function LiveMapLocationGuide({
  copy,
  isOpen,
  onClose,
}: {
  copy: LiveMapCopy;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl dark:bg-[#252830]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <h3 className="text-xl font-black text-gray-950 dark:text-white">
            {copy.guideModalTitle}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
          <div className="flex items-center gap-2 font-black">
            <TriangleAlert className="h-4 w-4 shrink-0 text-amber-500" />
            {copy.guideScreenshotTitle}
          </div>
          <div className="mt-2 space-y-1.5 text-sm leading-relaxed">
            <p>{copy.guideScreenshotNotice}</p>
            <p>{copy.guideSteamNotice}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <GuideCard title={copy.guideAutoTitle} steps={copy.guideAutoSteps} />
          <GuideCard
            title={copy.guideManualTitle}
            steps={copy.guideManualSteps}
          />
        </div>
        <a
          href="https://github.com/eft-library/eft-library-where-am-i/releases/tag/live-map-v2"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600 dark:text-[#1e2124]"
        >
          {copy.guideDownload}
        </a>
      </div>
    </div>
  );
}

function GuideCard({
  title,
  steps,
}: {
  title: string;
  steps: readonly string[];
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1e2124]">
      <h4 className="font-black text-gray-950 dark:text-white">{title}</h4>
      <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-2">
            <span className="font-bold text-orange-500">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
