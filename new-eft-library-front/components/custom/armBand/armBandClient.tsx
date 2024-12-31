"use client";

interface ArmBand {
  id: string;
  name: string;
  short_name: string;
  weight: string;
  image: string;
}

interface ArmBandList {
  armBandList: ArmBand[];
}

export default function ArmBandClient({ armBandList }: ArmBandList) {
  return (
    <div>
      <div></div>
    </div>
  );
}
