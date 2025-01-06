"use client";

import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { detailThrowable, throwableColumn } from "@/lib/consts/gridContsts";

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

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={5} columnList={throwableColumn} />
      {throwableList.map((throwable) => (
        <DefineGrid
          cols="5"
          id={throwable.id}
          pageId={pageId}
          key={throwable.id}
        >
          <CenterContents>
            <ImageView
              src={throwable.image}
              alt={throwable.name}
              popWidth={340}
              popHeight={300}
              size="240px"
              wrapWidth={240}
              wrapHeight={140}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{throwable.short_name}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {detailThrowable.includes(throwable.short_name) ? (
                <div className="flex flex-col">
                  <TextSpan>충격시 {throwable.min_fuse} 초</TextSpan>
                  <TextSpan size="sm">
                    (충격 신관이 발동되지 않은 경우 {throwable.fuse} 초)
                  </TextSpan>
                </div>
              ) : (
                <TextSpan>{throwable.fuse} 초</TextSpan>
              )}
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {throwable.min_explosion_distance} ~&nbsp;
              {throwable.max_explosion_distance} m
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{throwable.fragments} m</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
