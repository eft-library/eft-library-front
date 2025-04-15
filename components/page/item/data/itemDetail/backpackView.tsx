import { floatToPercent } from "@/lib/func/jsxfunction";
import type { ItemView } from "../itemType";

export default function BackpackView({ item }: ItemView) {
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
            슬롯
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.capacity}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            그리드
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.grids[0].width} X {item.info.grids[0].height}
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

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            인체공학 페널티
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.ergo_penalty}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            이동속도 페널티
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {floatToPercent(item.info.speed_penalty)} %
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            회전속도 페널티
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {floatToPercent(item.info.turn_penalty)} %
          </div>
        </div>
      </div>
    </div>
  );
}
