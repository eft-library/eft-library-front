import { getUserLocale } from "@/i18n/locale";
import { getRoadmap } from "@/features/roadmap/api";
import { RoadmapPage } from "@/features/roadmap/components/roadmap-page";

export async function RoadmapRoute() {
  const [locale, roadmap] = await Promise.all([getUserLocale(), getRoadmap()]);

  return <RoadmapPage roadmap={roadmap} locale={locale} />;
}
