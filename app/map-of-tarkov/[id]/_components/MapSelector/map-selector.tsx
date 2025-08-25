"use client";
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
import type { MapOfTarkovSelectorTypes } from "../map-of-tarkov.types";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";

export default function MapSelector({
  setImageSelect,
  imageSelect,
  mapData,
}: MapOfTarkovSelectorTypes) {
  const param = useParams<{ id: string }>();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const selectedMap = mapData.map_selector.find((map) => map.id === param.id);

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 lg:items-center">
        {/* Main Map Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm font-semibold whitespace-nowrap text-muted-foreground">
            {interactiveMapI18N.map[localeKey]}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-auto min-w-[140px] justify-between bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                {selectedMap?.name[localeKey] || ""}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full min-w-[200px] bg-popover border border-border text-popover-foreground">
              {mapData.map_selector.map((map) => (
                <Link
                  href={`/map-of-tarkov/${map.id}`}
                  key={map.id}
                  scroll={false}
                >
                  <DropdownMenuItem
                    className={`
                      ${
                        param.id === map.id
                          ? "text-primary bg-primary/10 cursor-pointer"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
            <ChevronRight className="h-4 w-4 text-muted-foreground hidden lg:block" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-semibold whitespace-nowrap text-muted-foreground">
                {interactiveMapI18N.subMap[localeKey]}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto min-w-[160px] justify-between bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {mapData.map_info.children.find(
                      (sub) => sub.id === imageSelect
                    )?.name[localeKey] || "Sub"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[220px] bg-popover border border-border text-popover-foreground">
                  {mapData.map_info.children.map((subMap) => (
                    <DropdownMenuItem
                      key={`sub-map-${subMap.id}`}
                      onClick={() => setImageSelect(subMap.id)}
                      className={`
                        ${
                          imageSelect === subMap.id
                            ? "text-primary bg-primary/10 cursor-pointer"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
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
