import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export const metadata = {
  title: "개인정보처리방침 | EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 개인정보처리방침",
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-kr",
  },
};

export default function PrivacyPolicy() {
  return (
    <PageParent>
      <SubHeader title="개인정보처리방침" />
      <Box padding="4">
        <Text>
          <strong>‘EFT Library’</strong>는 고객의 개인정보를 매우 중요시하며,
          개인정보 유출로 인한 피해가 발생하지 않도록 정보통신망 이용촉진 및
          정보보호 등에 관한 법률 및 개인정보 보호법 등 정보통신서비스제공자가
          준수하여야 할 관련 법령상의 규정을 준수합니다. 이를 바탕으로 다음과
          같은 개인정보처리방침을 작성하여 고객님의 개인정보가 어떠한 용도와
          방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가
          이루어지고 있는지 알려드립니다.
        </Text>
        <Text mt={4}>
          본 개인정보처리방침은 법률 또는 지침의 변경, 당사 정책의 변화에 따라
          변경될 수 있으며, 회원께서는 당사 사이트 방문 시 수시로 확인하여
          주시기 바랍니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          총칙
        </Heading>
        <Text mt={2}>
          <strong>‘EFT Library’</strong>(이하 “회사”라 합니다) 이용자들의
          개인정보 보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과
          동시에 온라인상에서 회사에 제공한 개인정보가 보호받을 수 있도록 최선을
          다하고 있습니다. 이에 회사는 정보통신망 이용촉진 및 정보보호 등에 관한
          법률 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보
          보호 규정 및 지침을 준수하고 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          1. 앱의 기능 설명
        </Heading>
        <Text mt={2}>
          <strong>EFT Library</strong>는 Escape from Tarkov(타르코프) 게임의
          공략 정보를 제공하는 사이트로, 사용자는 다양한 공략 가이드, 무기 및
          장비 정보, 커뮤니티 포럼을 통해 게임을 보다 효율적으로 즐길 수
          있습니다. 사이트에서 수집하는 개인정보는 이러한 서비스를 제공하고
          사용자 경험을 향상시키기 위한 목적으로만 사용됩니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          2. 소유한 검증된 도메인에서 호스팅
        </Heading>
        <Text mt={2}>
          <strong>EFT Library</strong>의 홈페이지는{" "}
          <Link href="https://eftlibrary.com">
            <strong>eftlibrary.com</strong>
          </Link>{" "}
          이라는 회사 소유의 검증된 도메인에 호스팅되어 있으며, 제3자 플랫폼에서
          호스팅되지 않습니다. 이를 통해 사용자는 신뢰할 수 있는 환경에서
          서비스를 이용할 수 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          3. 개인정보 처리방침 링크 일치
        </Heading>
        <Text mt={2}>
          사용자가 개인정보 제공 동의 화면에서 접근한 개인정보 처리방침 링크는
          본 페이지의 링크와 동일하며, 사용자는 언제든지 정확한 개인정보
          처리방침을 확인할 수 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          4. 로그인 없이 접근 가능
        </Heading>
        <Text mt={2}>
          이 개인정보처리방침은 <strong>EFT Library</strong>의 모든 사용자에게
          로그인 없이도 접근 가능하도록 공개되어 있습니다. 사용자는 언제든지 이
          페이지를 통해 개인정보 처리방침을 확인할 수 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          5. 개인정보 수집에 대한 동의
        </Heading>
        <Text mt={2}>
          회사는 이용자들이 회사의 개인정보처리방침 또는 이용약관의 내용에
          대하여 "동의" 버튼 또는 "취소" 버튼을 클릭할 수 있는 절차를 마련하여,
          "동의" 버튼을 클릭하면 개인정보 수집에 동의한 것으로 봅니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          6. 수집하는 개인정보 항목 및 수집∙이용목적
        </Heading>
        <Text mt={2}>
          ① "개인정보"라 함은 생존하는 개인에 관한 정보로서 해당 정보에 포함되어
          있는 성명, 생년월일 등의 사항에 의해 특정 개인을 식별할 수 있는 정보를
          의미합니다.
        </Text>
        <Text mt={2}>
          ② 개인회원에 대해 수집하는 개인정보 항목과 수집 및 이용 목적은 다음과
          같습니다:
        </Text>
        <Text mt={2} pl={4}>
          <strong>필수 수집 항목:</strong> 아이디(이메일 계정), 인증 값 - 불량
          회원의 부정 이용 방지와 비인가 사용 방지, 쿠키 정보, 회원 번호 등
          서비스 제공에 필요한 정보.
        </Text>
        <Text mt={2} pl={4}>
          <strong>선택 수집 항목:</strong> 주소, 회원제 서비스 이용에 따른 본인
          확인 절차, IP Address.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          7. 수집하는 개인정보의 수집 방법
        </Heading>
        <Text mt={2}>
          회사는 이용자가 회원 서비스 이용을 위해 가입할 때 필수적인 정보를
          온라인 상에서 입력받고 있으며, 필요에 따라 선택적으로 입력할 수 있는
          정보(전화번호 등)도 요청할 수 있습니다. 쇼핑몰 내 설문 조사나 이벤트
          시 통계 분석 및 경품 제공 등을 위해 개인정보 입력을 추가로 요청할 수
          있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          8. 개인정보의 보유 및 이용기간
        </Heading>
        <Text mt={2}>
          이용자가 회사의 회원으로서 서비스를 이용하는 동안 회사는 이용자의
          개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다. 다만,
          이용자가 탈퇴를 요청하거나 수집 목적이 달성된 경우, 회사는 해당
          개인정보를 지체 없이 파기합니다.
        </Text>
        <Text mt={2}>
          법령에 따라 일정 기간 보유가 필요한 경우, 회사는 아래와 같이 관련
          법령에서 정한 기간 동안 회원 정보를 보유합니다:
        </Text>
        <Text mt={2} pl={4}>
          - 상법 등 법령에 따라 보존할 필요성이 있는 경우
          <br />
          - 소송이나 분쟁 등에 대비하여 보유할 필요성이 있는 경우
          <br />- 거래 상대방에게 별도의 동의를 받은 경우
        </Text>

        <Heading as="h2" size="md" mt={6}>
          9. 개인정보의 파기 절차 및 방법
        </Heading>
        <Text mt={2}>
          회사는 이용자의 개인정보를 수집 및 이용 목적이 달성되면 지체 없이
          파기합니다. 파기 절차 및 방법은 다음과 같습니다:
        </Text>
        <Text mt={2} pl={4}>
          <strong>파기 절차:</strong> 이용자가 입력한 정보는 목적이 달성된 후
          별도의 DB로 옮겨져 일정 기간 저장된 후 파기됩니다.
          <br />
          <strong>파기 방법:</strong> 전자적 파일은 복구 불가능한 기술적
          방법으로 삭제되며, 종이에 출력된 개인정보는 분쇄하거나 소각합니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          10. 이용자 및 법정 대리인의 권리와 행사 방법
        </Heading>
        <Text mt={2}>
          이용자 및 법정 대리인은 언제든지 자신의 개인정보를 조회하거나 수정할
          수 있으며, 가입 해지를 요청할 수 있습니다. 본인 확인 후, 서면, 전화,
          이메일로 요청하면 지체 없이 처리됩니다.
        </Text>
        <Text mt={2}>
          만 14세 미만 아동의 경우, 법정 대리인이 아동의 개인정보를 조회하거나
          수정할 권리, 수집 및 이용 동의 철회 권리를 가집니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          11. 개인정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항
        </Heading>
        <Text mt={2}>
          회사는 쿠키(cookie)를 사용하여 이용자의 정보를 수시로 저장하고
          찾아냅니다. 쿠키 사용 목적은 방문한 서비스 및 웹 사이트 이용 형태 파악
          등을 통해 맞춤형 서비스를 제공하는 것입니다.
        </Text>
        <Text mt={2}>
          이용자는 쿠키 설치에 대한 선택권을 가지며, 웹 브라우저 설정을 통해
          쿠키를 허용하거나 거부할 수 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          12. 개인정보의 기술적/관리적 보호 대책
        </Heading>
        <Text mt={2}>
          회사는 이용자의 개인정보 보호를 위해 다음과 같은 기술적/관리적 대책을
          시행하고 있습니다:
        </Text>
        <Text mt={2} pl={4}>
          <strong>비밀번호 암호화:</strong> 비밀번호는 암호화되어 저장 및
          관리됩니다.
          <br />
          <strong>해킹 대비 대책:</strong> 해킹 및 바이러스에 대비한 보안
          시스템을 운영합니다.
          <br />
          <strong>개인정보 취급 직원의 최소화 및 교육:</strong> 개인정보 취급
          직원에 대한 교육을 시행하고 있습니다.
        </Text>

        <Heading as="h2" size="md" mt={6}>
          13. 개인정보 보호책임자 및 담당자의 연락처
        </Heading>
        <Text mt={2}>
          회사는 개인정보 보호를 위해 관련 부서 및 책임자를 지정하고 있으며,
          문의 사항이나 불만 처리를 위해 아래와 같이 연락처를 제공합니다:
        </Text>
        <Text mt={2} pl={4}>
          <strong>개인정보 보호책임자</strong>:<br />
          성명: 문희재
          <br />
          이메일: tarkovlibrary@gmail.com
        </Text>
      </Box>
    </PageParent>
  );
}
