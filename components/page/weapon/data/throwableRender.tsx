"use client";

import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { throwableColumn } from "@/lib/consts/gridContsts";
import { detailThrowable } from "@/lib/consts/columnConsts";
import type { ThrowableRender } from "./weaponTypes";

export default function ThrowableRender({ throwableList }: ThrowableRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, throwableList, "WEAPON");

  return (
    <div className="flex flex-col gap-4 w-full">
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
              popWidth={throwable.width * 128}
              popHeight={throwable.height * 128}
              size={(throwable.width * 64).toString()}
              wrapWidth={throwable.width * 64}
              wrapHeight={throwable.height * 64}
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
