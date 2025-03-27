"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { formatImage } from "@/lib/func/formatImage";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type {
  JPGView,
  JpgItemPath,
} from "@/components/page/mapDetail/data/mapType";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { ItemSVG } from "@/components/custom/getIcon/getSVG";

export default function JpgViewDetail({ map, viewItemList }: JPGView) {
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
    <div className={"h-full w-full flex flex-col items-center justify-center"}>
      <div className="w-full h-full flex items-center justify-center">
        <TransformWrapper
          initialScale={1}
          minScale={0.8}
          // wheel={{ step: 0.1 }}
          wheel={{ disabled: true }}
          ref={transformWrapperRef}
          onZoom={handleZoom}
        >
          <TransformComponent>
            <svg
              width={1200}
              height={720}
              fill={ALL_COLOR.THREE_BACKGROUND}
              onClick={handleClick}
            >
              <image
                xlinkHref={formatImage(map.jpg_image)}
                width="100%"
                height="100%"
              />
              {map.jpg_item_path.map(
                (item, index) =>
                  viewItemList.includes(item.childValue) && (
                    <g
                      onClick={() => handleItemClick(item)}
                      key={`${item.x}-${index}`}
                      cursor={"pointer"}
                    >
                      <ItemSVG
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
                className="absolute bg-Background p-4 rounded-md shadow-lg z-50 border-white border-solid border-2"
                style={{
                  top: `${popoverItem.y + 20}px`, // 원하는 위치 조정
                  left: `${popoverItem.x + 20}px`, // 원하는 위치 조정
                }}
              >
                <div className="space-y-2">
                  <h4 className="font-bold text-center text-Beige">
                    연관 퀘스트
                  </h4>
                  <div className={"flex flex-col justify-center"}>
                    {popoverItem.quest_info &&
                    popoverItem.quest_info.length > 0 ? (
                      popoverItem.quest_info.map((quest) => (
                        <Link
                          href={`/quest/detail/${quest.url_mapping}`}
                          target="_blank"
                          key={quest.id}
                        >
                          <TextSpan isCenter={false} hoverColor="GoldenYellow">
                            {quest.name_kr}
                          </TextSpan>
                        </Link>
                      ))
                    ) : (
                      <TextSpan isCenter={false}>-</TextSpan>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
}
