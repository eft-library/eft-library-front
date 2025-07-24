"use client";

import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { JpgItemPath, Map2DTypes } from "../map.types";
import { GetIcon } from "@/components/custom/GetIcon/get-icon";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Map2D({ mapData, viewItemList }: Map2DTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const transformWrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const popoverRef = useRef<HTMLDivElement | null>(null); // 팝오버 참조
  const [popoverItem, setPopoverItem] = useState<JpgItemPath>(); // 팝오버에 표시될 아이템 정보 상태
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: JpgItemPath) => {
    setPopoverItem(item); // 아이템 클릭 시 팝오버 아이템 설정
    setIsOpen(true);
  };

  const handleZoom = (e: any) => {
    setScale(e.state.scale);
  };

  const handleClick = (e: any) => {
    const svg = e.currentTarget;
    const svgRect = svg.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    console.log(`SVG 기준의 클릭한 위치의 x 좌표: ${svgX}, y 좌표: ${svgY}`);
  };

  // 외부 클릭 시 팝오버 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex-1 min-h-[500px] rounded-lg overflow-hidden shadow-lg bg-card">
      <div className="flex items-center justify-center w-full h-full text-muted-foreground text-2xl">
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          wheel={{ step: 0.4 }}
          ref={transformWrapperRef}
          onZoom={handleZoom}
        >
          <TransformComponent>
            <svg width={1100} height={720} fill="#1e1e24" onClick={handleClick}>
              <image xlinkHref={mapData.jpg_image} width="100%" height="100%" />
              {mapData.jpg_item_path.map(
                (item, index) =>
                  viewItemList.includes(item.childValue) && (
                    <g
                      onClick={() => handleItemClick(item)}
                      key={`${item.x}-${index}`}
                      cursor={"pointer"}
                    >
                      <GetIcon
                        svgValue={item.childValue}
                        x={item.x}
                        y={item.y}
                        scale={1 / scale}
                        isEnable={true}
                      />
                    </g>
                  )
              )}
            </svg>
            {isOpen && popoverItem && (
              <div
                ref={popoverRef}
                className="absolute z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                style={{
                  top: `${popoverItem.y + 20}px`,
                  left: `${popoverItem.x + 20}px`,
                }}
              >
                <Card className="w-80 max-w-sm shadow-xl border-2 bg-background/95 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      Quest Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {popoverItem.quest_info &&
                    popoverItem.quest_info.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Available Quests
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {popoverItem.quest_info.length}
                          </Badge>
                        </div>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {popoverItem.quest_info.map((quest) => (
                            <Link
                              href={`/quest/detail/${quest.url_mapping}`}
                              target="_blank"
                              key={quest.id}
                              className="group block"
                            >
                              <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/50 hover:bg-accent/50 hover:border-accent-foreground/20 transition-all duration-200 hover:shadow-md">
                                <span className="font-medium text-sm text-card-foreground group-hover:text-accent-foreground truncate pr-2">
                                  {quest.name[localeKey]}
                                </span>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                          <MapPin className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          No quests available
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Check back later for new adventures
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Arrow pointing to the target */}
                <div className="absolute -top-2 left-6 w-4 h-4 bg-background border-l-2 border-t-2 border-border rotate-45 shadow-sm"></div>
              </div>
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}
