"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { CustomNodeTypes } from "../story-types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { getNodeStyles, getTagStyles, getIcon } from "@/lib/func/jsxfunction";
import Image from "next/image";

export default function CustomNode({ data }: NodeProps<CustomNodeTypes>) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const styles = getNodeStyles(data.nodeType, data.id);
  const isEnding = data.nodeType === "ending";
  const isAchievement = data.nodeType === "achievement";

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-slate-100 dark:bg-gray-200 border-2 border-slate-600 dark:border-gray-500"
      />
      <div
        className={cn(
          "relative px-6 py-5 rounded-xl border-2 backdrop-blur-sm transition-all hover:scale-105",
          styles.border,
          styles.bg,
          isEnding
            ? "min-w-87.5 max-w-112.5"
            : isAchievement
              ? "min-w-60 max-w-75"
              : "min-w-70 max-w-95",
        )}
      >
        {/* Tag inside the node, above title */}
        {data.nodeMeta && data.nodeMeta.desc && (
          <div className="flex justify-center mb-2">
            <div
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-semibold border backdrop-blur-sm flex items-center gap-1.5",
                getTagStyles(data.nodeType),
              )}
            >
              {getIcon(data.nodeType)}
              <span>
                {data.nodeMeta.desc[localeKey]}
                {data.nodeMeta.value && `: ${data.nodeMeta.value}`}
              </span>
            </div>
          </div>
        )}

        {/* Image for nodes with images */}
        {data.image && (
          <div className="flex justify-center mb-3">
            <Image
              src={data.image || "/placeholder.svg"}
              alt={data.title.en}
              width={isEnding ? 160 : 64}
              height={isEnding ? 160 : 64}
              className="object-contain rounded-lg"
            />
          </div>
        )}

        {/* Title - center aligned */}
        <h3
          className={cn(
            "font-bold mb-1.5 leading-tight text-center",
            styles.title,
            isEnding ? "text-xl" : "text-base",
          )}
        >
          {data.title[localeKey]}
        </h3>

        {/* Description - center aligned */}
        {data.contents && data.contents[localeKey] && (
          <p
            className={cn(
              "leading-relaxed text-slate-600 dark:text-gray-400 text-center",
              isEnding ? "text-sm" : "text-xs",
            )}
          >
            {data.contents[localeKey]}
          </p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-slate-100 dark:bg-gray-200 border-2 border-slate-600 dark:border-gray-500"
      />
    </>
  );
}
