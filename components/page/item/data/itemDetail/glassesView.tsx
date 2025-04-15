import { floatToPercent } from "@/lib/func/jsxfunction";
import type { ItemView } from "../itemType";

export default function GlassesView({ item }: ItemView) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">정보</h3>
      </div>
      {item.info.class_value ? (
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
              보호 등급
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.class_value}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              재료
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.material.name}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              내구성
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.durability}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              실명 보호
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {floatToPercent(item.info.blindness_protection)} %
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
      ) : (
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
              재료
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {item.info.material.name}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-NeutralGray">
            <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
              실명 보호
            </div>
            <div className="py-2 px-2  text-center font-bold ">
              {floatToPercent(item.info.blindness_protection)} %
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
      )}
    </div>
  );
}
