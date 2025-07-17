"use client";

import { useTheme } from "next-themes";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapOfTarkovSelectorTypes } from "../map-of-tarkov.types";

export default function MapSelector({
  setImageSelect,
  imageSelect,
  mapData,
}: MapOfTarkovSelectorTypes) {
  const param = useParams<{ id: string }>();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();
  const selectedMap = mapData.map_selector.find((map) => map.id === param.id);
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
        {/* Main Map Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span
            className={`text-sm font-medium whitespace-nowrap ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            지도:
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${
                  theme === "dark"
                    ? "bg-[#0f1115] border-gray-600 text-white hover:bg-gray-800"
                    : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                } w-full sm:w-auto min-w-[140px] justify-between`}
              >
                {selectedMap?.name[localeKey] || ""}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`${
                theme === "dark"
                  ? "bg-[#0f1115] border-gray-600"
                  : "bg-white border-gray-200"
              } w-full min-w-[200px]`}
            >
              {mapData.map_selector.map((map) => (
                <Link href={`/map-of-tarkov/${map.id}`} key={map.id}>
                  <DropdownMenuItem
                    className={`
                    ${
                      param.id === map.id
                        ? theme === "dark"
                          ? "text-orange-400 bg-orange-400/10"
                          : "text-orange-600 bg-orange-50"
                        : theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }
                  `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{map.name[localeKey]}</span>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {mapData.map_info.children && mapData.map_info.children.length > 0 && (
          <>
            <ChevronRight
              className={`h-4 w-4 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              } hidden lg:block`}
            />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                세부:
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className={`${
                      theme === "dark"
                        ? "bg-[#0f1115] border-gray-600 text-white hover:bg-gray-800"
                        : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
                    } w-full sm:w-auto min-w-[160px] justify-between`}
                  >
                    {mapData.map_info.children.find(
                      (sub) => sub.id === imageSelect
                    )?.name[localeKey] || "Sub"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className={`${
                    theme === "dark"
                      ? "bg-[#0f1115] border-gray-600"
                      : "bg-white border-gray-200"
                  } w-full min-w-[220px]`}
                >
                  {mapData.map_info.children.map((subMap) => (
                    <DropdownMenuItem
                      key={`sub-map-${subMap.id}`}
                      onClick={() => setImageSelect(subMap.id)}
                      className={`
                        ${
                          imageSelect === subMap.id
                            ? theme === "dark"
                              ? "text-orange-400 bg-orange-400/10"
                              : "text-orange-600 bg-orange-50"
                            : theme === "dark"
                            ? "text-gray-300 hover:text-white hover:bg-gray-800"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{subMap.name[localeKey]}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
