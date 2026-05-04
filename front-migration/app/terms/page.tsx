import { LegalPage } from "@/features/legal/components/legal-page";
import { getUserLocale } from "@/i18n/locale";
import type { Locale } from "@/i18n/config";

type TermsContent = {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  sections: Array<{ title: string; body: string[] }>;
};

const termsContent: Record<Locale, TermsContent> = {
  ko: {
    eyebrow: "Terms",
    title: "이용약관",
    description:
      "EFT Library 서비스 이용조건, 절차, 회원과 회사의 권리와 의무를 안내합니다. 아래 문안은 운영 이용약관 응답을 기준으로 하드코딩했습니다.",
    updatedAt: "최종 업데이트: 2025-05-05 12:02:52 KST",
    sections: [
      {
        title: "제1조 목적",
        body: [
          "이 약관은 “회사”가 제공하는 “서비스”의 이용조건 및 절차, 회원과 회사의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.",
        ],
      },
      {
        title: "제2조 정의",
        body: [
          "이 약관에서 사용하는 용어의 정의는 다음과 같습니다.",
          '- "서비스"라 함은 구현되는 단말기와 상관없이 "회원"이 이용할 수 있는 "회사"가 제공하는 모든 서비스를 의미합니다.',
          '- "회원"이라 함은 "회사"와 이용 계약을 체결하고 "회사"가 제공하는 "서비스"를 이용하는 고객을 말합니다.',
        ],
      },
      {
        title: "제3조 약관의 게시와 개정",
        body: [
          '"회사"는 이 약관의 내용을 "회원"이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.',
          '"회사"는 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.',
        ],
      },
      {
        title: "제4조 회원의 의무",
        body: [
          '"회원"은 서비스 이용 시 다음 각 호의 행위를 하지 않아야 합니다.',
          "1. 타인의 개인정보를 부정하게 사용하는 행위",
          "2. 저속, 음란, 외설적, 폭력적인 내용의 정보를 게시하는 행위",
          "3. 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통, 출판하는 행위",
        ],
      },
      {
        title: "제5조 서비스의 중단",
        body: [
          '"회사"는 다음 각 호의 사유가 발생한 경우 서비스를 일시적으로 중단할 수 있습니다.',
          "1. 시스템 정기 점검 또는 설비 보수가 필요한 경우",
          "2. 천재지변, 전쟁, 테러, 블랙아웃 등 불가항력적인 사유가 발생한 경우",
        ],
      },
      {
        title: "제6조 책임 제한",
        body: [
          '"회사"는 다음 각 호의 사유로 인해 발생한 손해에 대해 책임을 지지 않습니다.',
          "1. 회원이 서비스를 부정하게 이용하여 발생한 손해",
          "2. 회원이 제3자와의 거래 등을 통해 발생한 손해",
        ],
      },
      {
        title: "제7조 준거법 및 관할법원",
        body: [
          "이 약관의 해석 및 적용은 대한민국 법을 준거법으로 합니다.",
          "서비스 이용으로 발생한 분쟁에 대한 관할법원은 서울중앙지방법원으로 합니다.",
        ],
      },
      {
        title: "제8조 기타 사항",
        body: [
          "본 약관에 명시되지 않은 사항에 대해서는 관련 법령 및 회사의 정책에 따릅니다.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Terms",
    title: "Terms of Use",
    description:
      "These terms describe the conditions, procedures, rights, and obligations for using EFT Library. This page is hardcoded from the production terms response.",
    updatedAt: "Last updated: 2025-05-05 12:02:52 KST",
    sections: [
      {
        title: "Article 1. Purpose",
        body: [
          'These terms and conditions set forth the terms of use, procedures, rights, obligations, and responsibilities of both the "Company" and the "Members," as well as other necessary matters regarding the use of the "Service" provided by the Company.',
        ],
      },
      {
        title: "Article 2. Definitions",
        body: [
          "The definitions of terms used in these Terms and Conditions are as follows.",
          '- "Service" refers to all services provided by the "Company" that the "Member" can use regardless of the device used.',
          '- "Member" refers to a customer who has entered into a service agreement with the "Company" and uses the services provided by the "Company."',
        ],
      },
      {
        title: "Article 3. Posting and Amendment of Terms",
        body: [
          'The "Company" shall post these Terms in a manner easily accessible to "Members" on the initial screen of the Service.',
          'The "Company" may amend these Terms to the extent that it does not violate relevant laws.',
        ],
      },
      {
        title: "Article 4. Obligations of Members",
        body: [
          '"Members" shall not engage in any of the following acts while using the Service.',
          "1. Illegally using another person's personal information",
          "2. Posting vulgar, obscene, or violent content",
          "3. Reproducing, distributing, or publishing information obtained through the Service without the prior consent of the Company",
        ],
      },
      {
        title: "Article 5. Suspension of Service",
        body: [
          'The "Company" may temporarily suspend the Service in the following cases.',
          "1. When regular system maintenance or equipment repairs are required",
          "2. In cases of force majeure such as natural disasters, war, terrorism, or blackouts",
        ],
      },
      {
        title: "Article 6. Limitation of Liability",
        body: [
          'The "Company" shall not be liable for damages caused by the following.',
          "1. Damages caused by a Member's improper use of the Service",
          "2. Damages arising from transactions between a Member and a third party",
        ],
      },
      {
        title: "Article 7. Governing Law and Jurisdiction",
        body: [
          "These Terms shall be governed by the laws of the Republic of Korea.",
          "Any disputes arising out of the use of the Service shall be subject to the exclusive jurisdiction of the Seoul Central District Court.",
        ],
      },
      {
        title: "Article 8. Miscellaneous",
        body: [
          "Any matters not specified in these Terms shall be governed by relevant laws and the Company's policies.",
        ],
      },
    ],
  },
  ja: {
    eyebrow: "Terms",
    title: "利用規約",
    description:
      "EFT Libraryサービスの利用条件、手続き、会員と会社の権利および義務を案内します。このページは本番の利用規約応答を基にハードコーディングしています。",
    updatedAt: "最終更新: 2025-05-05 12:02:52 KST",
    sections: [
      {
        title: "第1条 目的",
        body: [
          "本規約は、「会社」が提供する「サービス」の利用条件および手続き、「会員」と「会社」の権利、義務および責任事項、その他必要な事項を定めることを目的とします。",
        ],
      },
      {
        title: "第2条 定義",
        body: [
          "本規約で使用する用語の定義は、次のとおりです。",
          "- 「サービス」とは、利用する端末に関係なく、「会員」が利用できる「会社」が提供するすべてのサービスを指します。",
          "- 「会員」とは、「会社」と利用契約を締結し、「会社」が提供する「サービス」を利用する顧客を指します。",
        ],
      },
      {
        title: "第3条 規約の掲示および改定",
        body: [
          "「会社」は、本規約の内容を「会員」が容易に確認できるよう、サービスの初期画面に掲示します。",
          "「会社」は、関連法令に違反しない範囲で本規約を改定することができます。",
        ],
      },
      {
        title: "第4条 会員の義務",
        body: [
          "「会員」は、サービス利用時に以下の行為を行ってはなりません。",
          "1. 他人の個人情報を不正に使用する行為",
          "2. 下品、わいせつ、暴力的な内容を投稿する行為",
          "3. サービスを通じて得た情報を会社の事前承諾なしに複製、配布、出版する行為",
        ],
      },
      {
        title: "第5条 サービスの中断",
        body: [
          "「会社」は、以下の理由によりサービスを一時的に中断することがあります。",
          "1. システムの定期点検や設備の保守が必要な場合",
          "2. 天災、戦争、テロ、停電など不可抗力的な理由が発生した場合",
        ],
      },
      {
        title: "第6条 免責事項",
        body: [
          "「会社」は、以下の理由により発生した損害について責任を負いません。",
          "1. 会員がサービスを不正に利用して発生した損害",
          "2. 会員が第三者との取引により発生した損害",
        ],
      },
      {
        title: "第7条 準拠法および管轄裁判所",
        body: [
          "本規約の解釈および適用には大韓民国の法律を準拠法とします。",
          "サービス利用により発生した紛争については、ソウル中央地方法院を専属的合意管轄裁判所とします。",
        ],
      },
      {
        title: "第8条 その他",
        body: [
          "本規約に明示されていない事項については、関連法令および会社のポリシーに従います。",
        ],
      },
    ],
  },
};

export default async function Page() {
  const locale = await getUserLocale();
  const content = termsContent[locale];

  return <LegalPage {...content} />;
}
