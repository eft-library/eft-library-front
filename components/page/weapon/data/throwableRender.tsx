"use client";

import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
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

  return (
    <div className="flex flex-col gap-4 w-full">
      <GetClientColumn columnLength={5} columnList={throwableColumn} />
      {throwableList.map((throwable) => (
        <DefineGrid
          cols="5"
          id={throwable.id}
          pageId={pageId}
          key={throwable.id}
          isDetail
          detailLink={`/item/${throwable.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={throwable.image}
              alt={throwable.name_en}
              popWidth={throwable.image_width * 128}
              popHeight={throwable.image_height * 128}
              size={(throwable.image_width * 64).toString()}
              wrapWidth={throwable.image_width * 64}
              wrapHeight={throwable.image_height * 64}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{throwable.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {detailThrowable.includes(throwable.name_kr) ? (
                <div className="flex flex-col">
                  <TextSpan>충격시 {throwable.info.min_fuse} 초</TextSpan>
                  <TextSpan size="sm">
                    (충격 신관이 발동되지 않은 경우 {throwable.info.fuse} 초)
                  </TextSpan>
                </div>
              ) : (
                <TextSpan>{throwable.info.fuse} 초</TextSpan>
              )}
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {throwable.info.min_explosion_distance} ~&nbsp;
              {throwable.info.max_explosion_distance} m
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{throwable.info.fragments} m</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
