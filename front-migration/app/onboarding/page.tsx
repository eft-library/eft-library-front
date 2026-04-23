import { getUserLocale } from "@/i18n/locale";
import { OnboardingPage } from "@/features/onboarding/components/onboarding-page";

export default async function Page() {
  const locale = await getUserLocale();

  return <OnboardingPage locale={locale} />;
}
