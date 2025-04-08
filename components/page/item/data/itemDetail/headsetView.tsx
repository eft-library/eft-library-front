import type { ItemView } from "../itemType";

export default function HeadsetView({ item }: ItemView) {
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
            거리
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {item.info.distance_modifier}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2 bg-black text-GoldenYellow font-bold flex justify-center items-center">
            무게
          </div>
          <div className="py-2 px-2 bg-black text-center font-bold ">
            {item.info.weight} kg
          </div>
        </div>
      </div>
    </div>
  );
}
