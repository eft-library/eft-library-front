import type { GridItemTypes } from "./grid-item.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function GridItem({ main_info }: GridItemTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {main_info.map((item) => (
        <Link
          key={`main-info-${item.value}`}
          href={item.link}
          className="flex flex-col"
        >
          <div
            className={`
              group rounded-lg p-3 border transition-all duration-200 cursor-pointer hover:scale-105
              bg-white border-gray-200 hover:border-orange-500/50 hover:bg-gray-50 shadow-sm hover:shadow-md
              dark:bg-gray-800/30 dark:border-gray-700/50 dark:hover:border-orange-400/50 dark:hover:bg-gray-700/30
            `}
          >
            <div
              className={`
                aspect-square rounded-md mb-3 overflow-hidden relative
                bg-gray-100 dark:bg-gray-700/50
              `}
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name.en}
                fill
                placeholder="blur"
                blurDataURL={
                  "data:image/jpeg;base64," +
                  "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                }
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <h3
              className={`
                text-sm font-semibold text-center transition-colors
                text-gray-700 group-hover:text-orange-500
                dark:text-gray-200 dark:group-hover:text-orange-400
              `}
            >
              {item.name[localeKey]}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
