import type { ItemView } from "../itemType";
import { floatToPercent, getPlusMinus } from "@/lib/func/jsxfunction";

export default function AmmoView({ item }: ItemView) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">정보</h3>
      </div>

      <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            카테고리
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold">
            {item.category}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            데미지
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {item.info.damage}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            관통력
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {item.info.penetration_power}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            방어구 피해량
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {item.info.accuracy_modifier} %
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            정확성
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {getPlusMinus(floatToPercent(item.info.accuracy_modifier))} %
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            반동
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {getPlusMinus(floatToPercent(item.info.recoil_modifier))}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            가벼운 출혈
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {getPlusMinus(floatToPercent(item.info.heavy_bleed_modifier))}%
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            깊은 출혈
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {getPlusMinus(floatToPercent(item.info.heavy_bleed_modifier))}%
          </div>
        </div>
      </div>
    </div>
  );
}
