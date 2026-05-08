import { LegalPage } from "@/features/legal/components/legal-page";
import { getUserLocale } from "@/i18n/locale";
import type { Locale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "개인정보처리방침",
  description: "EFT Library 개인정보처리방침입니다.",
  path: "/privacy-policy",
});

type PrivacyPolicyContent = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: Array<{ title: string; body: string[] }>;
};

const privacyPolicyContent: Record<Locale, PrivacyPolicyContent> = {
  ko: {
    eyebrow: "Privacy Policy",
    title: "개인정보 처리방침",
    description:
      "EFT Library는 고객의 개인정보를 중요하게 여기며 관련 법령을 준수합니다. 아래 문안은 운영 개인정보 처리방침 응답을 기준으로 하드코딩했습니다.",
    updatedAt: "최종 업데이트: 2025-05-05 12:19:12 KST",
    sections: [
      {
        title: "총칙",
        body: [
          "EFT Library는 고객의 개인정보를 매우 중요시하며, 개인정보 유출로 인한 피해가 발생하지 않도록 정보통신망 이용촉진 및 정보보호 등에 관한 법률 및 개인정보 보호법 등 정보통신서비스제공자가 준수하여야 할 관련 법령상의 규정을 준수합니다.",
          "이를 바탕으로 고객님의 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보 보호를 위해 어떠한 조치가 이루어지고 있는지 알려드립니다.",
          "본 개인정보처리방침은 법률 또는 지침의 변경, 당사 정책의 변화에 따라 변경될 수 있으며, 회원께서는 당사 사이트 방문 시 수시로 확인하여 주시기 바랍니다.",
        ],
      },
      {
        title: "1. 앱의 기능 설명",
        body: [
          "EFT Library는 Escape from Tarkov(타르코프) 게임의 공략 정보를 제공하는 사이트로, 사용자는 다양한 공략 가이드, 무기 및 장비 정보, 커뮤니티 포럼을 통해 게임을 보다 효율적으로 즐길 수 있습니다.",
          "사이트에서 수집하는 개인정보는 이러한 서비스를 제공하고 사용자 경험을 향상시키기 위한 목적으로만 사용됩니다.",
        ],
      },
      {
        title: "2. 소유한 검증된 도메인에서 호스팅",
        body: [
          "EFT Library의 홈페이지는 eftlibrary.com이라는 회사 소유의 검증된 도메인에 호스팅되어 있으며, 제3자 플랫폼에서 호스팅되지 않습니다.",
          "이를 통해 사용자는 신뢰할 수 있는 환경에서 서비스를 이용할 수 있습니다.",
        ],
      },
      {
        title: "3. 개인정보 처리방침 링크 일치",
        body: [
          "사용자가 개인정보 제공 동의 화면에서 접근한 개인정보 처리방침 링크는 본 페이지의 링크와 동일하며, 사용자는 언제든지 정확한 개인정보 처리방침을 확인할 수 있습니다.",
        ],
      },
      {
        title: "4. 로그인 없이 접근 가능",
        body: [
          "이 개인정보처리방침은 EFT Library의 모든 사용자에게 로그인 없이도 접근 가능하도록 공개되어 있습니다.",
          "사용자는 언제든지 이 페이지를 통해 개인정보 처리방침을 확인할 수 있습니다.",
        ],
      },
      {
        title: "5. 개인정보 수집에 대한 동의",
        body: [
          '회사는 이용자들이 회사의 개인정보처리방침 또는 이용약관의 내용에 대하여 "동의" 버튼 또는 "취소" 버튼을 클릭할 수 있는 절차를 마련합니다.',
          '"동의" 버튼을 클릭하면 개인정보 수집에 동의한 것으로 봅니다.',
        ],
      },
      {
        title: "6. 수집하는 개인정보 항목 및 수집·이용목적",
        body: [
          '"개인정보"라 함은 생존하는 개인에 관한 정보로서 해당 정보에 포함되어 있는 성명, 생년월일 등의 사항에 의해 특정 개인을 식별할 수 있는 정보를 의미합니다.',
          "개인회원에 대해 수집하는 개인정보 항목과 수집 및 이용 목적은 다음과 같습니다.",
          "필수 수집 항목: 아이디(이메일 계정), 인증 값, 쿠키 정보, 회원 번호 등 서비스 제공에 필요한 정보. 이는 불량 회원의 부정 이용 방지와 비인가 사용 방지를 위해 사용됩니다.",
          "선택 수집 항목: 주소, 회원제 서비스 이용에 따른 본인 확인 절차, IP Address.",
        ],
      },
      {
        title: "7. 수집하는 개인정보의 수집 방법",
        body: [
          "회사는 이용자가 회원 서비스 이용을 위해 가입할 때 필수적인 정보를 온라인 상에서 입력받고 있으며, 필요에 따라 선택적으로 입력할 수 있는 정보도 요청할 수 있습니다.",
          "쇼핑몰 내 설문 조사나 이벤트 시 통계 분석 및 경품 제공 등을 위해 개인정보 입력을 추가로 요청할 수 있습니다.",
        ],
      },
      {
        title: "8. 개인정보의 보유 및 이용기간",
        body: [
          "이용자가 회사의 회원으로서 서비스를 이용하는 동안 회사는 이용자의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다.",
          "다만, 이용자가 탈퇴를 요청하거나 수집 목적이 달성된 경우, 회사는 해당 개인정보를 지체 없이 파기합니다.",
          "법령에 따라 일정 기간 보유가 필요한 경우, 회사는 관련 법령에서 정한 기간 동안 회원 정보를 보유합니다.",
          "- 상법 등 법령에 따라 보존할 필요성이 있는 경우",
          "- 소송이나 분쟁 등에 대비하여 보유할 필요성이 있는 경우",
          "- 거래 상대방에게 별도의 동의를 받은 경우",
        ],
      },
      {
        title: "9. 개인정보의 파기 절차 및 방법",
        body: [
          "회사는 이용자의 개인정보를 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.",
          "파기 절차: 이용자가 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 일정 기간 저장된 후 파기됩니다.",
          "파기 방법: 전자적 파일은 복구 불가능한 기술적 방법으로 삭제되며, 종이에 출력된 개인정보는 분쇄하거나 소각합니다.",
        ],
      },
      {
        title: "10. 이용자 및 법정 대리인의 권리와 행사 방법",
        body: [
          "이용자 및 법정 대리인은 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 가입 해지를 요청할 수 있습니다.",
          "본인 확인 후, 서면, 전화, 이메일로 요청하면 지체 없이 처리됩니다.",
          "만 14세 미만 아동의 경우, 법정 대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용 동의 철회 권리를 가집니다.",
        ],
      },
      {
        title: "11. 개인정보 자동 수집 장치의 설치, 운영 및 거부",
        body: [
          "회사는 쿠키(cookie)를 사용하여 이용자의 정보를 수시로 저장하고 찾아냅니다.",
          "쿠키 사용 목적은 방문한 서비스 및 웹 사이트 이용 형태 파악 등을 통해 맞춤형 서비스를 제공하는 것입니다.",
          "이용자는 쿠키 설치에 대한 선택권을 가지며, 웹 브라우저 설정을 통해 쿠키를 허용하거나 거부할 수 있습니다.",
        ],
      },
      {
        title: "12. 개인정보의 기술적·관리적 보호 대책",
        body: [
          "회사는 이용자의 개인정보 보호를 위해 다음과 같은 기술적·관리적 대책을 시행하고 있습니다.",
          "비밀번호 암호화: 비밀번호는 암호화되어 저장 및 관리됩니다.",
          "해킹 대비 대책: 해킹 및 바이러스에 대비한 보안 시스템을 운영합니다.",
          "개인정보 취급 직원의 최소화 및 교육: 개인정보 취급 직원에 대한 교육을 시행하고 있습니다.",
        ],
      },
      {
        title: "13. 개인정보 보호책임자 및 담당자의 연락처",
        body: [
          "회사는 개인정보 보호를 위해 관련 부서 및 책임자를 지정하고 있으며, 문의 사항이나 불만 처리를 위해 아래와 같이 연락처를 제공합니다.",
          "개인정보 보호책임자: 문희재",
          "이메일: tarkovlibrary@gmail.com",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Privacy Policy",
    title: "Privacy Policy",
    description:
      "EFT Library values the protection of customer personal information and complies with relevant privacy laws and regulations. This page is hardcoded from the production privacy policy response.",
    updatedAt: "Last updated: 2025-05-05 12:19:12 KST",
    sections: [
      {
        title: "General Provisions",
        body: [
          "EFT Library places great importance on the protection of customer personal information and complies with relevant laws and regulations that information and communications service providers must follow.",
          "This policy explains how personal information is used and what measures are taken to protect it.",
          "This privacy policy may change according to changes in laws, guidelines, or company policy. Members are encouraged to check the site regularly for updates.",
        ],
      },
      {
        title: "1. Description of App Functions",
        body: [
          "EFT Library provides guide information for Escape from Tarkov. Users can enjoy the game more effectively through guides, weapon and equipment information, and community forums.",
          "Personal information collected on the site is used only to provide these services and improve the user experience.",
        ],
      },
      {
        title: "2. Hosting on a Verified Domain",
        body: [
          "The EFT Library website is hosted on eftlibrary.com, a verified domain owned by the company, and is not hosted on a third-party platform.",
          "This allows users to use the service in a trustworthy environment.",
        ],
      },
      {
        title: "3. Consistent Privacy Policy Link",
        body: [
          "The privacy policy link accessed from the personal information provision consent screen is consistent with the link on this page.",
        ],
      },
      {
        title: "4. Accessible Without Login",
        body: [
          "This privacy policy is publicly accessible to all users of EFT Library without requiring login.",
        ],
      },
      {
        title: "5. Consent to Collection of Personal Information",
        body: [
          'The company provides a procedure where users can click "Agree" or "Cancel" for the privacy policy or terms of use.',
          'If the "Agree" button is clicked, the user is considered to have agreed to the collection of personal information.',
        ],
      },
      {
        title: "6. Items Collected and Purpose of Use",
        body: [
          "Personal information refers to information about a living individual that can identify a specific individual.",
          "Required items: ID (email account), authentication value, cookie information, member number, and other information necessary to provide the service and prevent unauthorized use.",
          "Optional items: address, verification procedures for membership services, and IP address.",
        ],
      },
      {
        title: "7. Methods of Collecting Personal Information",
        body: [
          "The company collects essential information online when users sign up for membership services and may request optional additional information when necessary.",
          "Additional personal information may be requested for statistical analysis or prize delivery during surveys or events.",
        ],
      },
      {
        title: "8. Retention and Use Period",
        body: [
          "The company retains and uses users' personal information while they are members in order to provide services.",
          "If a user requests withdrawal or the purpose of collection is achieved, the company promptly destroys the personal information.",
          "- When retention is required under the Commercial Act or other laws",
          "- When retention is necessary in preparation for litigation or disputes",
          "- When separate consent has been obtained from the transaction counterpart",
        ],
      },
      {
        title: "9. Destruction Procedure and Method",
        body: [
          "The company promptly destroys personal information after the purpose of collection and use is achieved.",
          "Destruction procedure: information entered by users is transferred to a separate database after the purpose is achieved and destroyed after being stored for a certain period.",
          "Destruction method: electronic files are deleted using a technical method that makes recovery impossible, and paper documents are shredded or incinerated.",
        ],
      },
      {
        title: "10. User and Legal Representative Rights",
        body: [
          "Users and legal representatives may view or modify their personal information at any time and request account cancellation.",
          "Requests are processed promptly after identity verification via written request, phone, or email.",
          "For children under 14, legal representatives have the right to view, modify, or withdraw consent regarding the child's personal information.",
        ],
      },
      {
        title: "11. Cookies and Automatic Collection Devices",
        body: [
          "The company uses cookies to store and retrieve user information.",
          "Cookies are used to provide customized services by identifying usage patterns of visited services and websites.",
          "Users may allow or reject cookie installation through browser settings.",
        ],
      },
      {
        title: "12. Technical and Managerial Measures",
        body: [
          "The company implements technical and managerial measures to protect users' personal information.",
          "Password encryption: passwords are encrypted and stored.",
          "Measures against hacking: security systems are used to prevent hacking and viruses.",
          "Minimization and education of handlers: employees handling personal information are trained.",
        ],
      },
      {
        title: "13. Contact Information",
        body: [
          "The company has designated responsible persons and departments for personal information protection.",
          "Personal Information Protection Officer: Huijae Mun",
          "Email: tarkovlibrary@gmail.com",
        ],
      },
    ],
  },
  ja: {
    eyebrow: "Privacy Policy",
    title: "プライバシーポリシー",
    description:
      "EFT Libraryはお客様の個人情報保護を重要視し、関連法令を遵守します。このページは本番のプライバシーポリシー応答を基にハードコーディングしています。",
    updatedAt: "最終更新: 2025-05-05 12:19:12 KST",
    sections: [
      {
        title: "1. 総則",
        body: [
          "EFT Libraryはユーザーの個人情報保護を重要視しており、サービス利用時に提供される個人情報が安全に保護されるよう最善を尽くしています。",
          "本プライバシーポリシーは、法令やガイドラインの変更、または当社の方針変更により随時変更されることがあります。",
        ],
      },
      {
        title: "2. アプリの機能の説明",
        body: [
          "EFT LibraryはEscape from Tarkovのガイド情報を提供するサイトです。",
          "ユーザーは各種ガイド、武器・装備の情報、コミュニティフォーラムを通じてゲームをより効果的に楽しむことができます。",
        ],
      },
      {
        title: "3. 認証されたドメインでのホスティング",
        body: [
          "EFT Libraryのウェブサイトは、当社が所有する認証されたドメイン eftlibrary.com 上でホスティングされています。",
          "サードパーティプラットフォームではホスティングされていません。",
        ],
      },
      {
        title: "4. ログインなしでアクセス可能",
        body: [
          "本プライバシーポリシーは、EFT Libraryのすべてのユーザーがログインなしで自由に閲覧できるよう公開されています。",
        ],
      },
      {
        title: "5. 個人情報収集への同意",
        body: [
          "当社は、プライバシーポリシーや利用規約に「同意」または「キャンセル」ボタンを通じてユーザーが意思表示できる手続きを提供しています。",
          "「同意」ボタンをクリックすることで、個人情報の収集に同意したものとみなします。",
        ],
      },
      {
        title: "6. 収集する個人情報の項目および利用目的",
        body: [
          "個人情報とは、生存する個人に関する情報であって、特定の個人を識別できる情報を指します。",
          "必須項目: ID（メールアカウント）、認証値、クッキー情報、会員番号など。",
          "任意項目: 住所、認証手続き、IPアドレスなど。",
        ],
      },
      {
        title: "7. 個人情報の収集方法",
        body: [
          "当社は、会員登録時にオンラインで必要情報を収集し、必要に応じて電話番号などの追加情報を任意で入力できるようにしています。",
          "アンケートやイベントの際には、統計分析や景品発送のために追加情報を収集することがあります。",
        ],
      },
      {
        title: "8. 個人情報の保有および利用期間",
        body: [
          "当社は、会員としての資格がある間は、サービス提供のために個人情報を継続的に保有・利用します。",
          "退会を希望された場合や収集目的が達成された場合は、速やかに個人情報を破棄します。",
          "- 商法などの法令に基づき保管が必要な場合",
          "- 訴訟や紛争に備えて保管が必要な場合",
          "- 取引相手から別途同意を得た場合",
        ],
      },
      {
        title: "9. 個人情報の破棄手続きおよび方法",
        body: [
          "当社は、収集・利用目的が達成された後、速やかに個人情報を破棄します。",
          "破棄手続き: ユーザーが入力した情報は、目的達成後に別のDBへ移動され、一定期間保存された後に破棄されます。",
          "破棄方法: 電子ファイルは復元不可能な方法で削除し、紙に印刷された情報は裁断または焼却します。",
        ],
      },
      {
        title: "10. ユーザーおよび法定代理人の権利",
        body: [
          "ユーザーおよび法定代理人は、いつでも自身の個人情報を閲覧・修正したり、会員脱退を要請することができます。",
          "14歳未満の子どもの場合、法定代理人が個人情報の閲覧、修正、同意撤回の権利を有します。",
        ],
      },
      {
        title: "11. 自動収集装置の設置・運営および拒否",
        body: [
          "当社は、クッキーを利用してユーザー情報を保存・呼び出しています。",
          "ユーザーはWebブラウザの設定を通じてクッキーの保存を許可または拒否することができます。",
        ],
      },
      {
        title: "12. 個人情報保護のための対策",
        body: [
          "当社は、ユーザーの個人情報を保護するために技術的および管理的対策を実施しています。",
          "パスワードの暗号化、ハッキング対策、個人情報担当者の最小化および教育を行っています。",
        ],
      },
      {
        title: "13. 個人情報保護責任者および担当者の連絡先",
        body: [
          "当社は個人情報保護に関する責任者および担当部署を指定しています。",
          "個人情報保護責任者: Huijae Mun（フイジェ・ムン）",
          "メール: tarkovlibrary@gmail.com",
        ],
      },
    ],
  },
};

export default async function Page() {
  const locale = await getUserLocale();
  const content = privacyPolicyContent[locale];

  return <LegalPage {...content} />;
}
