"use client";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ItemJPG } from "@/components/custom/getIcon/getJPG";
import { formatImage } from "@/lib/func/formatImage";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type {
  JPGView,
  JpgItemPath,
} from "@/components/custom/mapDetail/data/mapType";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function JpgViewDetail({ map, viewItemList }: JPGView) {
  const size = useWindowSize();
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

  if (!size.width || !size.height) return null;

  return (
    <div className={"h-full w-full flex flex-col items-center justify-center"}>
      <div className="w-full h-full flex items-center justify-center">
        <TransformWrapper
          initialScale={1}
          initialPositionX={-320}
          initialPositionY={0}
          minScale={0.8}
          // wheel={{ step: 0.1 }}
          wheel={{ disabled: true }}
          ref={transformWrapperRef}
          onZoom={handleZoom}
        >
          <TransformComponent>
            <svg
              width={size.width}
              height={size.height / 1.3}
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
                      <ItemJPG
                        svgValue={item.childValue}
                        x={item.x}
                        y={item.y}
                        scale={1 / scale}
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
                          <span className={"hover:text-GoldenYellow font-bold"}>
                            {quest.name_kr}
                          </span>
                        </Link>
                      ))
                    ) : (
                      <span className={"font-bold text-white text-base"}>
                        -
                      </span>
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
