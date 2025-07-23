"use client";

import Loading from "@/components/custom/Loading/loading";
import { Button } from "@/components/ui/button";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { getLocaleKey } from "@/lib/func/localeFunction";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MapData, MapSelectorTypes } from "../map.types";
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

  return (
    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <span className="text-muted-foreground whitespace-nowrap">
          {interactiveMapI18N.map[localeKey]}:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[150px] justify-between bg-transparent"
            >
              {mapData.name[localeKey]}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full md:w-[150px]">
            {mapSelector.map((map) => (
              <DropdownMenuItem key={map.id}>
                <Link href={map.link}>{map.name[localeKey]}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <span className="text-muted-foreground text-xl font-light hidden md:block">
        {">"}
      </span>
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <span className="text-muted-foreground whitespace-nowrap">
          {interactiveMapI18N.subMap[localeKey]}:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[150px] justify-between bg-transparent"
            >
              {subMap.find((sub) => sub.id === mapData.id)?.name[localeKey] ||
                "Sub"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full md:w-[150px]">
            {subMap.map((sub) => (
              <DropdownMenuItem
                key={sub.id}
                onSelect={() => onClickMapAction(sub)}
              >
                {sub.name[localeKey]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
