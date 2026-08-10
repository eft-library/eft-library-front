import { getUserLocale } from "@/i18n/locale";
import { getRoadmap } from "@/features/roadmap-new/api";
import { RoadmapNewPage } from "@/features/roadmap-new/components/roadmap-new-page";

export async function RoadmapNewRoute() {
  const [locale, roadmap] = await Promise.all([getUserLocale(), getRoadmap()]);

  return <RoadmapNewPage roadmap={roadmap} locale={locale} />;
}
