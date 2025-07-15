/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Handle, Position } from "@xyflow/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { cn } from "@/lib/utils";

export default function TraderNode(props: any) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl",
        "min-w-[200px] sm:min-w-[220px] min-h-[220px] sm:min-h-[240px]",
        "transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-2xl",
        "cursor-pointer"
      )}
    >
      {/* 외부 그라데이션 테두리 */}
      <div
        className={cn(
          "relative w-full h-full rounded-2xl p-1",
          "bg-gradient-to-br",
          //   getGradientClass(),
          "shadow-lg hover:shadow-xl transition-shadow duration-300"
        )}
      >
        {/* 메인 컨테이너 */}
        <div
          className={cn(
            "relative w-full h-full rounded-xl",
            "bg-white dark:bg-gray-900",
            "border-2 transition-colors duration-200",
            "overflow-hidden"
          )}
        >
          {/* 희귀도 표시 배경 효과 */}
          {props.data.rarity === "legendary" && (
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 animate-pulse" />
          )}
          {props.data.rarity === "epic" && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10" />
          )}

          {/* NPC 타입 및 상태 표시 */}
          {/* <div className="absolute top-2 left-2 z-10 flex gap-1">
            <div
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full",
                "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm",
                "border border-gray-200 dark:border-gray-600",
                "text-gray-700 dark:text-gray-300"
              )}
            >
              {getTypeIcon()}
            </div>
            {props.data.has_quest && (
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full",
                  "bg-blue-500 text-white",
                  "animate-bounce"
                )}
              >
                <MessageCircle className="w-4 h-4" />
              </div>
            )}
          </div> */}

          {/* 희귀도 표시 */}
          {/* {props.data.rarity && props.data.rarity !== "common" && (
            <div className="absolute top-2 right-2 z-10">
              <div
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                  "backdrop-blur-sm border",
                  props.data.rarity === "legendary" &&
                    "bg-yellow-500/90 text-white border-yellow-400",
                  props.data.rarity === "epic" &&
                    "bg-purple-500/90 text-white border-purple-400",
                  props.data.rarity === "rare" &&
                    "bg-blue-500/90 text-white border-blue-400"
                )}
              >
                {props.data.rarity}
              </div>
            </div>
          )} */}

          {/* 이미지 컨테이너 */}
          <div className="flex items-center justify-center pt-8 pb-4 px-4">
            <div className="relative">
              {/* 이미지 로딩 플레이스홀더 */}
              {/* {!imageLoaded && !imageError && (
                <div
                  className={cn(
                    "w-24 h-24 sm:w-32 sm:h-32 rounded-full",
                    "bg-gray-200 dark:bg-gray-700 animate-pulse",
                    "flex items-center justify-center"
                  )}
                >
                  <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                </div>
              )} */}

              {/* 실제 이미지 */}
              {/* {!imageError && (
                <div
                  className={cn(
                    "relative rounded-full overflow-hidden",
                    "ring-4 ring-white dark:ring-gray-800",
                    "shadow-lg group-hover:shadow-xl transition-shadow duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
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
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                  />
                </div>
              )} */}

              {/* 이미지 에러 시 폴백 */}
              {/* {imageError && (
                <div
                  className={cn(
                    "w-24 h-24 sm:w-32 sm:h-32 rounded-full",
                    "bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700",
                    "flex items-center justify-center",
                    "ring-4 ring-white dark:ring-gray-800 shadow-lg"
                  )}
                >
                  <User className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 dark:text-gray-400" />
                </div>
              )} */}

              {/* 상호작용 가능 표시 */}
              {/* {props.data.is_interactive && (
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
                </div>
              )} */}
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
                  "truncate"
                )}
                title={props.data.name[localeKey]}
              >
                {props.data.name[localeKey]}
              </h3>

              {/* NPC 타입 텍스트 */}
              {props.data.npc_type && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
                  {props.data.npc_type.replace("_", " ")}
                </p>
              )}
            </div>
          </div>

          {/* 호버 시 상호작용 힌트 */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-2",
              "bg-gradient-to-t from-black/50 to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "text-white text-xs text-center"
            )}
          >
            {props.data.has_quest ? "Has Quest Available" : "Click to Interact"}
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
              "bg-gradient-to-br from-blue-400 to-purple-500",
              "hover:scale-125 transition-transform duration-200"
            )}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={props.isConnectable}
            className={cn(
              "w-3 h-3 border-2 border-white dark:border-gray-800",
              "bg-gradient-to-br from-blue-400 to-purple-500",
              "hover:scale-125 transition-transform duration-200"
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
              "bg-gradient-to-br from-blue-400 to-purple-500",
              "hover:scale-125 transition-transform duration-200"
            )}
          />
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={props.isConnectable}
            className={cn(
              "w-3 h-3 border-2 border-white dark:border-gray-800",
              "bg-gradient-to-br from-blue-400 to-purple-500",
              "hover:scale-125 transition-transform duration-200"
            )}
          />
        </>
      )}
    </div>
  );
}
