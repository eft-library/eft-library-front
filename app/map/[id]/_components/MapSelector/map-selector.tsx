"use client";

import Loading from "@/components/custom/Loading/loading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { ChevronDown, Map, MapPin } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { MapData, MapSelectorTypes } from "../map.types";
import Link from "next/link";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";

export default function MapSelector({
  onClickMapAction,
  mapData,
  mapSelector,
}: MapSelectorTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useParams<{ id: string }>();
  const [subMap, setSubMap] = useState<MapData[]>();

  useEffect(() => {
    const getSubMapById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_SUB_MAP}/${param.id}`
      );
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch sub map data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setSubMap(data.data);
    };
    getSubMapById();
  }, [param.id]);

  if (!subMap || !mapSelector) return <Loading />;

  const currentMainMap = subMap.find((map) => map.id === param.id);
  const currentSubMap = subMap.find((sub) => sub.id === mapData.id);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 p-6 dark:bg-gray-800/30 dark:border-gray-700/50 bg-white border-gray-200 rounded-xl shadow-sm">
      {/* Main Map Selector */}
      <div className="flex flex-col space-y-2 w-full lg:w-auto min-w-[200px]">
        <div className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground">
          <Map className="h-4 w-4" />
          <span>{interactiveMapI18N.map[localeKey]}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full lg:w-[220px] justify-between h-11 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center">
                <Map className="mr-2 h-4 w-4 opacity-60" />
                <span className="truncate font-semibold">
                  {currentMainMap?.name[localeKey] || "Main"}
                </span>
              </div>

              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[220px] p-1"
            align="start"
            sideOffset={4}
          >
            {mapSelector.map((map) => (
              <DropdownMenuItem key={map.id} className="p-0">
                <Link
                  href={map.link}
                  className="w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors flex items-center"
                >
                  <Map className="mr-2 h-4 w-4 opacity-60" />
                  <span className="truncate">{map.name[localeKey]}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Separator */}
      <div className="hidden lg:flex items-center justify-center mt-6">
        <ChevronDown className="h-4 w-4 text-muted-foreground rotate-[-90deg]" />
      </div>
      {/* Sub Map Selector */}
      <div className="flex flex-col space-y-2 w-full lg:w-auto min-w-[200px]">
        <div className="flex items-center space-x-2 text-sm font-semibold text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{interactiveMapI18N.subMap[localeKey]}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full lg:w-[220px] justify-between h-11 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 opacity-60" />
                <span className="truncate font-semibold">
                  {currentSubMap?.name[localeKey] || "Sub"}
                </span>
              </div>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[220px] p-1"
            align="start"
            sideOffset={4}
          >
            {subMap.map((sub) => (
              <DropdownMenuItem
                key={sub.id}
                onSelect={() => onClickMapAction(sub)}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors flex items-center"
              >
                <MapPin className="mr-2 h-4 w-4 opacity-60" />
                <span className="truncate">{sub.name[localeKey]}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
