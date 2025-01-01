import GetArmBand from "@/components/custom/armBand/data/getArmBand";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import {COLUMN_KEY} from "@/lib/consts/columnConsts";

export default function ArmBand() {
    return (
        <ContentsWrapper>
            <GetColumn columnDesign={2} columnKey={COLUMN_KEY.arm_band}/>
            <GetArmBand />
        </ContentsWrapper>
    )
}