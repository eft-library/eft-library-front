import { LegalPage } from "@/features/legal/components/legal-page";

export default function Page() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="개인정보 처리방침"
      description="이 페이지는 추후 하드코딩 문안으로 교체될 예정이라, 현재는 섹션 구조와 읽기 레이아웃만 먼저 잡아둔 상태입니다."
      sections={[
        {
          title: "수집 항목",
          body: [
            "로그인 및 커뮤니티 기능에 필요한 최소한의 사용자 식별 정보가 수집될 수 있습니다.",
            "실제 공개 문안은 운영 기준에 맞춰 이후 별도 정리 예정입니다.",
          ],
        },
        {
          title: "이용 목적",
          body: [
            "회원 식별, 서비스 운영, 부정 이용 방지, 알림 제공 등 기본적인 목적을 위한 틀만 먼저 배치했습니다.",
          ],
        },
        {
          title: "보관 및 삭제",
          body: [
            "최종 정책 문안이 확정되기 전까지는 상세 기간 대신 구조만 유지합니다.",
          ],
        },
      ]}
    />
  );
}
