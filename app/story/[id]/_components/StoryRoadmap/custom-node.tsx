"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { Clock, Wrench, GemIcon, Award, GitBranch } from "lucide-react";
import { CustomNodeTypes } from "../story-types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function CustomNode({ data }: NodeProps<CustomNodeTypes>) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const getNodeStyles = () => {
    switch (data.nodeType) {
      case "condition":
        return {
          border:
            "border-orange-500 border-dashed shadow-[0_0_12px_rgba(249,115,22,0.4)]",
          title: "text-orange-400",
          bg: "bg-orange-950/30",
        };
      case "craft":
      case "image":
        return {
          border: "border-[#7a92fb] shadow-[0_0_12px_rgba(122,146,251,0.4)]",
          title: "text-[#7a92fb]",
          bg: "bg-[#7a92fb]/10",
        };
      case "pay":
        return {
          border: "border-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]",
          title: "text-amber-400",
          bg: "bg-amber-950/20",
        };
      case "achievements":
        return {
          border: "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]",
          title: "text-green-400",
          bg: "bg-green-950/20",
        };
      case "end":
        // 여기 적용 해야 함
        switch (data.storyId) {
          case "gold":
            return {
              border: "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.6)]",
              title: "text-yellow-400",
              bg: "bg-yellow-950/30",
            };
          case "purple":
            return {
              border:
                "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
              title: "text-purple-400",
              bg: "bg-purple-950/30",
            };
          case "green":
            return {
              border:
                "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]",
              title: "text-emerald-400",
              bg: "bg-emerald-950/30",
            };
          case "darkred":
            return {
              border: "border-red-900 shadow-[0_0_20px_rgba(127,29,29,0.8)]",
              title: "text-red-600",
              bg: "bg-red-950/50",
            };
        }
      default:
        return {
          border: "border-gray-600 shadow-[0_0_8px_rgba(75,85,99,0.3)]",
          title: "text-gray-300",
          bg: "bg-gray-900/50",
        };
    }
  };

  const getTagStyles = (style: string) => {
    switch (style) {
      case "time":
        return "bg-[#7a92fb]/20 text-[#a5b4fc] border-[#7a92fb]/60";
      case "money":
        return "bg-amber-500/20 text-amber-300 border-amber-500/50";
      case "success":
        return "bg-green-500/20 text-green-300 border-green-500/50";
      case "danger":
        return "bg-red-500/20 text-red-300 border-red-500/50";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/50";
    }
  };

  const getIcon = () => {
    switch (data.nodeType) {
      case "craft":
        return <Wrench className="w-4 h-4" />;
      case "default":
        return <Clock className="w-4 h-4" />;
      case "pay":
        return <GemIcon className="w-4 h-4" />;
      case "achievements":
        return <Award className="w-4 h-4" />;
      case "condition":
        return <GitBranch className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const styles = getNodeStyles();
  const isEnding = data.nodeType === "end";
  const isAchievement = data.nodeType === "achievements";

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-white dark:bg-gray-200 border-2 border-gray-700 dark:border-gray-500"
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
        {/* {data.tag && (
          <div className="flex justify-center mb-2">
            <div
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-semibold border backdrop-blur-sm flex items-center gap-1.5',
                getTagStyles(data.tag.style)
              )}
            >
              {getIcon()}
              <span>{data.tag.text}</span>
            </div>
          </div>
        )} */}

        {/* Image for nodes with images */}
        {data.image && (
          <div className="flex justify-center mb-3">
            <img
              src={data.image || "/placeholder.svg"}
              alt={data.title.en}
              className={cn(
                "object-contain rounded-lg",
                isEnding ? "w-40 h-40" : "w-16 h-16",
              )}
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
              "leading-relaxed text-gray-400 dark:text-gray-300 text-center",
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
        className="w-3 h-3 bg-white dark:bg-gray-200 border-2 border-gray-700 dark:border-gray-500"
      />
    </>
  );
}
