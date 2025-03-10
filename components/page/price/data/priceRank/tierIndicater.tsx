"use client";

export default function TierIndicator() {
  return (
    <div className="flex w-full bg-black justify-center items-center p-6 gap-2">
      <div className="text-8xl font-bold text-CloudGray">S</div>
      <div className="flex flex-col items-center">
        <div className="text-2xl font-medium text-CloudGray font-bold">
          1234&nbsp;₽
        </div>
        <div className="text-xl font-medium text-CloudGray font-bold">
          456&nbsp;₽
        </div>
        <div className="text-lg text-CloudGray font-bold">슬롯당 가격</div>
      </div>
    </div>
  );
}
