import ArmBand from "@/components/custom/armBand/armBand";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function ArmBandPage() {
  return (
    <>
      <GetColumn columnDesign={2} columnKey={COLUMN_KEY.arm_band} />
      <ArmBand />
    </>
  );
}
