import { LegalPage } from "@/features/legal/components/legal-page";

export default function Page() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="이용약관"
      description="이 페이지도 API 연동 없이 하드코딩 문안으로 교체될 예정이라, 현재는 섹션별 컨테이너와 스타일만 먼저 구성했습니다."
      sections={[
        {
          title: "서비스 이용",
          body: [
            "회원은 사이트 정책과 관련 법령을 준수해야 하며, 운영을 방해하는 행위를 해서는 안 됩니다.",
          ],
        },
        {
          title: "콘텐츠와 책임",
          body: [
            "커뮤니티 및 사용자 생성 콘텐츠에 대한 최종 운영 문안은 추후 확정되며, 지금은 레이아웃 틀만 제공합니다.",
          ],
        },
        {
          title: "계정과 제재",
          body: [
            "운영 정책 위반 시 제한 조치가 이루어질 수 있으며, 세부 기준은 별도 문안으로 대체될 예정입니다.",
          ],
        },
      ]}
    />
  );
}
