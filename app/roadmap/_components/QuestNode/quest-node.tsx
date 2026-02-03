/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { useLocale } from "next-intl";
import { Check, ExternalLink, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { node_color } from "@/lib/func/jsxfunction";
import { useTheme } from "next-themes";

export default function QuestNode(props: any) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const onClickTitle = useCallback((urlMapping: string) => {
    window.open(`/quest/detail/${urlMapping}`, "_blank");
  }, []);

  const shouldRenderHandle = !(
    props.data.view_only_kappa && !props.data.kappa_required
  );

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl min-w-60 min-h-35",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-2xl",
      )}
      style={{
        opacity:
          props.data.view_only_kappa && !props.data.kappa_required ? 0 : 1,
        pointerEvents:
          props.data.view_only_kappa && !props.data.kappa_required
            ? "none"
            : "auto",
      }}
    >
      {/* Main card with gradient background */}
      <div
        className={cn(
          "relative w-full h-full rounded-xl p-1",
          "bg-linear-to-br",
          node_color(props.data.npc_id, theme),
          "shadow-lg hover:shadow-xl transition-shadow duration-300",
        )}
      >
        {/* Inner content container */}
        <div
          className={cn(
            "relative w-full h-full rounded-lg min-h-33",
            "bg-white dark:bg-gray-900",
            "border-2 transition-colors duration-200",
            props.data.isCheck
              ? "border-emerald-400 dark:border-emerald-500"
              : "border-gray-200 dark:border-gray-700",
          )}
        >
          {/* Checkbox section */}
          <div className="absolute top-3 right-3 z-10">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                onChange={(e) =>
                  props.data.onChange(props.data, e.target.checked)
                }
                checked={props.data.isCheck}
                id={`quest-${props.data.url_mapping}`}
              />
              <label
                htmlFor={`quest-${props.data.url_mapping}`}
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded-md cursor-pointer",
                  "border-2 transition-all duration-200",
                  "hover:scale-110 active:scale-95",
                  props.data.isCheck
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-emerald-400",
                )}
              >
                {props.data.isCheck && <Check className="w-4 h-4" />}
              </label>
            </div>
          </div>

          {/* Main content */}
          <div className="flex items-center justify-center h-full w-full p-4 pt-12 pb-8">
            <div className="text-center space-y-2">
              <h3
                className={cn(
                  "font-bold text-lg leading-tight cursor-pointer",
                  "text-gray-800 dark:text-gray-100",
                  "hover:text-blue-600 dark:hover:text-blue-400",
                  "transition-colors duration-200",
                  "group-hover:scale-105 transition-transform duration-200",
                )}
                onClick={() => onClickTitle(props.data.url_mapping)}
              >
                {props.data.name[localeKey]}
              </h3>

              {/* External link indicator */}
              <div className="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Kappa indicator */}
          {props.data.kappa_required && (
            <div className="absolute bottom-3 right-3">
              <div
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full",
                  "bg-linear-to-r from-yellow-400 to-orange-500",
                  "text-white font-bold text-sm",
                  "shadow-md",
                )}
              >
                <Zap className="w-3 h-3" />
                <span>Kappa</span>
              </div>
            </div>
          )}

          {/* Completion indicator overlay */}
          {props.data.isCheck && (
            <div className="absolute inset-0 rounded-lg bg-emerald-500/10 dark:bg-emerald-400/10 pointer-events-none" />
          )}
        </div>
      </div>

      {/* Handles */}
      {["top", "bottom"].includes(props.sourcePosition || "") ? (
        <>
          {shouldRenderHandle && (
            <Handle
              type="target"
              position={Position.Top}
              isConnectable={props.isConnectable}
              className={cn(
                "w-3 h-3 border-2 border-white dark:border-gray-800",
                "bg-linear-to-br from-blue-400 to-purple-500",
                "hover:scale-125 transition-transform duration-200",
              )}
            />
          )}
          {shouldRenderHandle && (
            <Handle
              type="source"
              position={Position.Bottom}
              id="b"
              isConnectable={props.isConnectable}
              className={cn(
                "w-3 h-3 border-2 border-white dark:border-gray-800",
                "bg-linear-to-br from-blue-400 to-purple-500",
                "hover:scale-125 transition-transform duration-200",
              )}
            />
          )}
        </>
      ) : (
        <>
          {shouldRenderHandle && (
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={props.isConnectable}
              className={cn(
                "w-3 h-3 border-2 border-white dark:border-gray-800",
                "bg-linear-to-br from-blue-400 to-purple-500",
                "hover:scale-125 transition-transform duration-200",
              )}
            />
          )}
          {shouldRenderHandle && (
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={props.isConnectable}
              className={cn(
                "w-3 h-3 border-2 border-white dark:border-gray-800",
                "bg-linear-to-br from-blue-400 to-purple-500",
                "hover:scale-125 transition-transform duration-200",
              )}
            />
          )}
        </>
      )}
    </div>
  );
}
