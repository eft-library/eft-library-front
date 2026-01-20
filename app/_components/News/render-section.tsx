import Link from "next/link";
import { RenderSectionTypes } from "./NewsView.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function RenderSection({
  icon,
  title,
  items,
  sectionKey,
}: RenderSectionTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="rounded-lg p-4 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-1">
        {items.map((item, index) => (
          <div
            key={`${sectionKey}-${item.en}-${index}`}
            className="text-xs cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
          >
            {item.link ? (
              <Link rel="noopener noreferrer" href={item.link}>
                - {item[localeKey]}
              </Link>
            ) : (
              `- ${item[localeKey]}`
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
