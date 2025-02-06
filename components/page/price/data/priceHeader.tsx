import CenterContents from "@/components/custom/gridContents/centerContents";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function PriceHeader() {
  return (
    <div className="grid grid-cols-5 border-b border-white p-2">
      <CenterContents>
        <TextSpan>사진</TextSpan>
      </CenterContents>
      <CenterContents colSpan="2">
        <TextSpan>이름</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>상인에게 판매</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>플리마켓</TextSpan>
      </CenterContents>
    </div>
  );
}
