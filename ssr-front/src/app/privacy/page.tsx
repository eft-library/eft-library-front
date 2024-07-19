import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Heading, Text, Highlight } from "@chakra-ui/react";

export const metadata = {
  title: "개인정보처리방침 | EFT Library",
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
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy",
  },
};

export default function Privacy() {
  return (
    <PageParent>
      <SubHeader title="개인정보처리방침" />
      <Box mb={10} />
      <Box p={5} w={"100%"}>
        <Text mb={3} fontWeight={600}>
          ‘TKL’은 고객의 개인정보를 매우 중요시하며, 고객의 개인정보를 보호하여
          개인정보 유출로 인한 피해가 발생하지 않도록 하겠다는 의지에서
          <Highlight
            query="정보통신망 이용촉진 및 정보보호 등에 관한 법률"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            정보통신망 이용촉진 및 정보보호 등에 관한 법률
          </Highlight>
          및
          <Highlight
            query="개인정보 보호법"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            개인정보 보호법
          </Highlight>
          등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 규정을 준수하며,
          이를 바탕으로 다음과 같은 개인정보처리방침을 작성하여 고객님들의
          개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해
          어떠한 조치가 이루어지고 있는지 알려드립니다.
        </Text>

        <Text mb={3} fontWeight={600}>
          당사의 개인정보처리방침은 개인정보보호와 관련한 법률 또는 지침의 변경,
          당사 정책의 변화에 따라 변경될 수 있으므로, 회원께서는 당사 사이트
          방문 시 수시로 확인하여 주시기 바랍니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          총칙
        </Heading>
        <Text mb={3} fontWeight={600}>
          'TKL’(이하 “회사”라 합니다) 이용자들의 개인정보보호를 매우 중요시하며,
          이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 제공한
          개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다. 이에 회사는
          <Highlight
            query="정보통신망 이용촉진 및 정보보호 등에 관한 법률"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            정보통신망 이용촉진 및 정보보호 등에 관한 법률
          </Highlight>
          등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호
          규정 및 지침을 준수하고 있습니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          1. 개인정보 수집에 대한 동의
        </Heading>
        <Text mb={3} fontWeight={600}>
          회사는 이용자들이 회사의 개인정보 처리방침 또는 이용약관의 내용에
          대하여 「동의」버튼 또는「취소」버튼을 클릭할 수 있는 절차를 마련하여,
          「동의」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          2. 수집하는 개인정보 항목 및 수집∙이용목적
        </Heading>
        <Text mb={3} fontWeight={600}>
          ① "개인정보"라 함은 생존하는 개인에 관한 정보로서 당해 정보에 포함되어
          있는 성명, 생년월일 등의 사항에 의하여 당해 개인을 식별할 수 있는
          정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와
          용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ② 개인회원에 대하여 수집하는 개인정보 항목과 수집 및 이용목적은 다음과
          같습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          [필수 수집항목]
          <br />
          <Highlight
            query="아이디(이메일 계정), 인증값 : 불량회원 부정 이용 방지와 비인가 사용방지, 개인정보 자동수집 장치를 통한 쿠키정보, 회원번호 : 서비스 제공"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            아이디(이메일 계정), 인증값 : 불량회원 부정 이용 방지와 비인가
            사용방지, 개인정보 자동수집 장치를 통한 쿠키정보, 회원번호 : 서비스
            제공
          </Highlight>
        </Text>
        <Text mb={3} fontWeight={600}>
          [선택 수집항목]
          <br />
          <Highlight
            query="주소 및 회원제 서비스 이용에 따른 본인 확인절차, IP Address"
            styles={{ color: ALL_COLOR.RED, fontWeight: "bold" }}
          >
            주소 및 회원제 서비스 이용에 따른 본인 확인절차, IP Address
          </Highlight>
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          3. 수집하는 개인정보의 수집방법
        </Heading>
        <Text mb={3} fontWeight={600}>
          ① 회사는 이용자들이 회원서비스를 이용하기 위해 회원으로 가입하실 때
          서비스 제공을 위한 필수적인 정보들을 온라인상에서 입력 받고 있습니다.
          회원 가입 시에 받는 필수적인 정보는 비밀번호, 이메일 주소 등입니다.
          또한 양질의 서비스 제공을 위하여 이용자들이 선택적으로 입력할 수 있는
          사항으로서 전화번호 등을 입력 받고 있습니다. 또한 쇼핑몰 내에서의
          설문조사나 이벤트 행사 시 통계분석이나 경품제공 등을 위해 선별적으로
          개인정보 입력을 요청할 수 있습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ② 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및
          민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록,
          건강상태 및 성생활 등)는 수집하지 않으며 부득이하게 수집해야 할 경우
          이용자들의 사전동의를 반드시 구할 것입니다. 그리고, 어떤 경우에라도
          입력하신 정보를 이용자들에게 사전에 밝힌 목적 이외에 다른 목적으로는
          사용하지 않으며 외부로 유출하지 않습니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          4. 개인정보의 보유 및 이용기간
        </Heading>
        <Text mb={3} fontWeight={600}>
          이용자가 회사의 회원으로서 회사에 제공하는 서비스를 이용하는 동안
          회사는 이용자들의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해
          이용합니다. 다만, 이용자가 탈퇴를 요청하거나 본인이 삭제를 요청한
          경우, 수집목적 또는 제공받은 목적이 달성된 경우에 회사는 이용자의
          개인정보를 지체 없이 파기합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          또한, 관계 법령의 규정에 따라 보유하여야 하는 경우에는 아래와 같은
          관련 법령에서 정한 일정한 기간 동안 회원 정보를 보유합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 상법 등 법령에 따라 보존할 필요성이 있는 경우
          <br />
          ▶ 소송이나 분쟁 등에 대비하여 보유할 필요성이 있는 경우
          <br />▶ 거래 상대방에게 별도의 동의를 받은 경우
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          5. 개인정보의 파기절차 및 방법
        </Heading>
        <Text mb={3} fontWeight={600}>
          회사는 원칙적으로 이용자의 개인정보를 수집 및 이용 목적이 달성되면
          지체 없이 파기합니다. 파기 절차 및 방법은 다음과 같습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 파기절차
          <br />
          이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로
          옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 따라
          일정 기간 저장된 후 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에
          의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 파기방법
          <br />
          전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여
          삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여
          파기합니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          6. 이용자 및 법정대리인의 권리와 그 행사방법
        </Heading>
        <Text mb={3} fontWeight={600}>
          이용자 및 법정대리인은 언제든지 등록되어 있는 자신의 개인정보를
          조회하거나 수정할 수 있으며 가입 해지를 요청할 수도 있습니다.
          이용자들의 개인정보 조회, 수정 또는 가입 해지를 위해서는 본인 확인
          절차를 거친 후 가능하며, 개인정보보호책임자에게 서면, 전화 또는
          이메일로 연락하시면 지체 없이 조치하겠습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          만 14세 미만 아동의 경우 법정대리인이 아동의 개인정보를 조회하거나
          수정할 권리, 수집 및 이용 동의를 철회할 권리를 가집니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          이용자 또는 법정대리인의 요청에 의해 해지 또는 삭제된 개인정보는
          "회사"가 수집하는 개인정보의 보유 및 이용기간"에 명시된 바에 따라
          처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          7. 개인정보 자동수집 장치의 설치, 운영 및 그 거부에 관한 사항
        </Heading>
        <Text mb={3} fontWeight={600}>
          회사는 이용자들의 정보를 수시로 저장하고 찾아내는 "쿠키(cookie)" 등을
          운용합니다. 쿠키란 웹사이트를 운영하는데 이용되는 서버가 이용자의
          브라우저에 보내는 아주 작은 텍스트 파일로서 이용자의 컴퓨터
          하드디스크에 저장됩니다. 회사는 다음과 같은 목적을 위해 쿠키를
          사용합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 쿠키 등 사용 목적
          <br />
          이용자들이 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태,
          이용자 규모 등을 파악하여 이용자에게 더 유용하고 맞춤형 서비스를
          제공하기 위해 사용합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는
          웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가
          저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도
          있습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 쿠키 설정 거부 방법
          <br />
          예: 쿠키 설정을 거부하는 방법으로는 사용자가 사용하는 웹 브라우저의
          옵션을 선택함으로써 모든 쿠키를 허용하거나 쿠키를 저장할 때마다 확인을
          거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 설정방법 예(인터넷
          익스플로러의 경우): 웹 브라우저 상단의 도구 &gt; 인터넷 옵션 &gt;
          개인정보
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          8. 개인정보의 기술적/관리적 보호 대책
        </Heading>
        <Text mb={3} fontWeight={600}>
          회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난,
          유출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
          기술적/관리적 대책을 강구하고 있습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 비밀번호 암호화
          <br />
          이용자의 비밀번호는 암호화되어 저장 및 관리되고 있으며, 개인정보의
          확인 및 변경은 비밀번호를 알고 있는 본인에 의해서만 가능합니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 해킹 등에 대비한 대책
          <br />
          회사는 해킹이나 컴퓨터 바이러스 등에 의해 이용자의 개인정보가
          유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 개인정보 취급 직원의 최소화 및 교육
          <br />
          개인정보를 취급하는 직원을 최소화하고 있으며, 개인정보 보호를 위해
          이용자들의 개인정보 취급자에 대한 교육을 시행하고 있습니다.
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          9. 개인정보보호책임자 및 담당자의 연락처
        </Heading>
        <Text mb={3} fontWeight={600}>
          회사는 이용자들의 개인정보를 보호하고 개인정보와 관련한 불만을
          처리하기 위하여 아래와 같이 관련 부서 및 개인정보 보호책임자를
          지정하고 있습니다.
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 개인정보보호책임자
          <br />
          - 성명 : 문희재
          <br />- 이메일 : tarkovlibrary@gmail.com
        </Text>

        <Heading as="h2" size="lg" mt={10} mb={3}>
          10. 기타
        </Heading>
        <Text mb={3} fontWeight={600}>
          본 개인정보처리방침은 2024년 7월 14일부터 적용됩니다.
        </Text>

        <Text mb={3} fontWeight={600}>
          ▶ 개인정보침해신고센터 : 118 (http://privacy.kisa.or.kr)
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 대검찰청 사이버범죄수사단 : 02-3480-3573 (www.spo.go.kr)
        </Text>
        <Text mb={3} fontWeight={600}>
          ▶ 경찰청 사이버안전국 : 182 (http://cyberbureau.police.go.kr)
        </Text>
      </Box>
    </PageParent>
  );
}
