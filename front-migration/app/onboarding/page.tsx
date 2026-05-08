import { getUserLocale } from "@/i18n/locale";
import { OnboardingPage } from "@/features/onboarding/components/onboarding-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "닉네임 설정",
  description: "EFT Library 커뮤니티와 마이페이지에서 사용할 닉네임을 설정합니다.",
  path: "/onboarding",
  noIndex: true,
});

export default async function Page() {
  const locale = await getUserLocale();

  return <OnboardingPage locale={locale} />;
}
