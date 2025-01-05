"use client";

import GetClientColumn from "../../getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

interface Weapon {
  id: string;
  category: string;
  name: string;
  short_name: string;
  image: string;
  update_time: string;
}

interface Throwable extends Weapon {
  fuse: number;
  min_explosion_distance: number;
  max_explosion_distance: number;
  fragments: number;
  min_fuse: number | null;
}

interface ThrowableRender {
  throwableList: Throwable[];
}

export default function ThrowableRender({ throwableList }: ThrowableRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, throwableList, "WEAPON");

  const throwableColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
    { name: "폭발 지연", colSpan: 1 },
    { name: "폭발 거리", colSpan: 1 },
    { name: "파편 변경", colSpan: 1 },
  ];
  const detailThrowable = ["RGN", "RGO"];

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={5} columnList={throwableColumn} />
      {throwableList.map((throwable) => (
        <div
          className={`${
            throwable.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={throwable.id}
          id={throwable.id}
        >
          <div className="flex justify-center items-center">
            <ImageView
              src={throwable.image}
              alt={throwable.name}
              popWidth={340}
              popHeight={300}
              size="240px"
              wrapWidth={240}
              wrapHeight={140}
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {throwable.short_name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            {detailThrowable.includes(throwable.short_name) ? (
              <div className="flex flex-col">
                <span className="text-center font-bold text-base">
                  충격시 {throwable.min_fuse} 초
                </span>
                <span className="text-center font-bold text-sm">
                  (충격 신관이 발동되지 않은 경우 {throwable.fuse} 초)
                </span>
              </div>
            ) : (
              <span className="text-center font-bold text-base">
                {throwable.fuse} 초
              </span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {throwable.min_explosion_distance} ~&nbsp;
              {throwable.max_explosion_distance} m
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {throwable.fragments} m
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
