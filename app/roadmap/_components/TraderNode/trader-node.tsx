/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Handle, Position } from "@xyflow/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAppStore } from "@/store/provider";
import { useTheme } from "next-themes";
import { node_color } from "@/lib/func/jsxfunction";

export default function TraderNode(props: any) {
  const { theme } = useTheme();
  const { setNpcId } = useAppStore((state) => state);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const moveQuest = (value: string) => {
    setNpcId(value);
    window.open("/quest", "_blank");
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl",
        "min-w-50 sm:min-w-55 min-h-55 sm:min-h-60",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-2xl",
        "cursor-pointer",
      )}
      onClick={() => moveQuest(props.data.id)}
    >
      {/* 외부 그라데이션 테두리 */}
      <div
        className={cn(
          "relative w-full h-full rounded-2xl p-1",
          "bg-linear-to-br",
          node_color(props.data.id, theme),
          "shadow-lg hover:shadow-xl transition-shadow duration-300",
        )}
      >
        {/* 메인 컨테이너 */}
        <div
          className={cn(
            "relative w-full h-full rounded-xl",
            "bg-white dark:bg-gray-900",
            "border-2 transition-colors duration-200",
            "overflow-hidden",
          )}
        >
          {/* 이미지 컨테이너 */}
          <div className="flex items-center justify-center pt-8 pb-4 px-4">
            <div className="relative">
              <div
                className={cn(
                  "relative rounded-full overflow-hidden",
                  "ring-4 ring-white dark:ring-gray-800",
                  "shadow-lg group-hover:shadow-xl transition-shadow duration-300",
                )}
              >
                <Image
                  src={props.data.image || "/placeholder.svg"}
                  width={128}
                  height={128}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  alt={props.data.name[localeKey] || "NPC"}
                />
              </div>
            </div>
          </div>

          {/* NPC 이름 */}
          <div className="px-4 pb-4">
            <div className="text-center">
              <h3
                className={cn(
                  "font-bold text-base sm:text-lg leading-tight",
                  "text-gray-800 dark:text-gray-100",
                  "group-hover:text-blue-600 dark:group-hover:text-blue-400",
                  "transition-colors duration-200",
                  "truncate",
                )}
                title={props.data.name[localeKey]}
              >
                {props.data.name[localeKey]}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Handles */}
      {["top", "bottom"].includes(props.sourcePosition || "") ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
