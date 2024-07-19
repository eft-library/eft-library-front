import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

export const metadata = {
  title: "Terms | EFT Library",
  description: "EFT Library",
  keywords: [
    "타르코프",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃",
    "타르코프 한국어",
    "타르코프 도서관",
    "타르코프 보스",
    "타르코프 한글 지도",
    "타르코프 가이드",
    "타르코프 이벤트",
    "타르코프 커뮤니티",
    "타르코프 퀘스트 플래너",
    "escape from tarkov",
    "tarkov",
    "EFT Library",
    "TKL",
    "tarkov library",
    "escape from tarkov library",
  ],
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "EFT Library 이용 약관.",
    images: "/og.png",
    url: "https://eftlibrary.com/terms",
  },
};

export default function Terms() {
  return (
    <PageParent>
      <SubHeader title="이용약관" />
      <Box mb={10} />
      <Box p={10}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제1조 목적
            </Heading>
            <Text fontWeight={600}>
              이 약관은 “회사”가 제공하는 “서비스”의 이용조건 및 절차, 회원과
              회사의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을
              목적으로 합니다.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제2조 정의
            </Heading>
            <Text fontWeight={600}>
              이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
            </Text>
            <Text fontWeight={600} pl={5}>
              - "서비스"라 함은 구현되는 단말기와 상관없이 "회원"이 이용할 수
              있는 "회사"가 제공하는 모든 서비스를 의미합니다.
            </Text>
            <Text fontWeight={600} pl={5}>
              - "회원"이라 함은 "회사"와 이용 계약을 체결하고 "회사"가 제공하는
              "서비스"를 이용하는 고객을 말합니다.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제3조 약관의 게시와 개정
            </Heading>
            <Text fontWeight={600}>
              "회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기
              화면에 게시합니다.
            </Text>
            <Text fontWeight={600}>
              "회사"는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수
              있습니다.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제4조 회원의 의무
            </Heading>
            <Text fontWeight={600}>
              "회원"은 서비스 이용 시 다음 각 호의 행위를 하지 않아야 합니다.
            </Text>
            <Text fontWeight={600} pl={5}>
              1. 타인의 개인정보를 부정하게 사용하는 행위
            </Text>
            <Text fontWeight={600} pl={5}>
              2. 저속, 음란, 외설적, 폭력적인 내용의 정보를 게시하는 행위
            </Text>
            <Text fontWeight={600} pl={5}>
              3. 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통,
              출판하는 행위
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제5조 서비스의 중단
            </Heading>
            <Text fontWeight={600}>
              "회사"는 다음 각 호의 사유가 발생한 경우 서비스를 일시적으로
              중단할 수 있습니다.
            </Text>
            <Text fontWeight={600} pl={5}>
              1. 시스템 정기 점검 또는 설비 보수가 필요한 경우
            </Text>
            <Text fontWeight={600} pl={5}>
              2. 천재지변, 전쟁, 테러, 블랙아웃 등 불가항력적인 사유가 발생한
              경우
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제6조 책임 제한
            </Heading>
            <Text fontWeight={600}>
              "회사"는 다음 각 호의 사유로 인해 발생한 손해에 대해 책임을 지지
              않습니다.
            </Text>
            <Text fontWeight={600} pl={5}>
              1. 회원이 서비스를 부정하게 이용하여 발생한 손해
            </Text>
            <Text fontWeight={600} pl={5}>
              2. 회원이 제3자와의 거래 등을 통해 발생한 손해
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제7조 준거법 및 관할법원
            </Heading>
            <Text fontWeight={600}>
              이 약관의 해석 및 적용은 대한민국 법을 준거법으로 합니다.
            </Text>
            <Text fontWeight={600}>
              서비스 이용으로 발생한 분쟁에 대한 관할법원은 서울중앙지방법원으로
              합니다.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={3}>
              제8조 기타 사항
            </Heading>
            <Text fontWeight={600}>
              본 약관에 명시되지 않은 사항에 대해서는 관련 법령 및 회사의 정책에
              따릅니다.
            </Text>
          </Box>
        </VStack>
      </Box>
    </PageParent>
  );
}
