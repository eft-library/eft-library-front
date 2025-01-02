import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";

export default function Medical() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">의료품</h1>
        <GetMedical medicalType="Medikit" />
      </div>
    </ContentsWrapper>
  );
}
