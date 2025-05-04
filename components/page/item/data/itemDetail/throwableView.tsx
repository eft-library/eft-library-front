import TextSpan from "@/components/custom/gridContents/textSpan";
import type { ItemView } from "../itemType";
import { detailThrowable } from "@/lib/consts/columnConsts";

export default function ThrowableView({ item }: ItemView) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">정보</h3>
      </div>

      <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            카테고리
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.category}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            폭발 지연
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            <TextSpan>
              {detailThrowable.includes(item.name.kr) ? (
                <div className="flex flex-col">
                  <TextSpan>충격시 {item.info.min_fuse} 초</TextSpan>
                  <TextSpan size="sm">
                    (충격 신관이 발동되지 않은 경우 {item.info.fuse} 초)
                  </TextSpan>
                </div>
              ) : (
                <TextSpan>{item.info.fuse} 초</TextSpan>
              )}
            </TextSpan>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            폭발 거리
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.min_explosion_distance} ~&nbsp;
            {item.info.max_explosion_distance} m
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            파편 반경
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.fragments}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            무게
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.weight} kg
          </div>
        </div>
      </div>
    </div>
  );
}
