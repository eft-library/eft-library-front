import type { QuestDetailViewTypes } from "@/app/quest/[id]/_components/quest.types";
import QuestHeader from "./QuestHeader/quest-header";
import QuestObjectives from "./QuestObjectives/quest-objectives";
import QuestRewards from "./QuestRewards/quest-rewards";
import QuestItems from "./QuestItems/quest-items";
import QuestGuide from "./QuestGuide/quest-guide";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function QuestDetailView({ quest }: QuestDetailViewTypes) {
  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <QuestHeader quest={quest} />
        <QuestObjectives quest={quest} />
        <QuestRewards quest={quest} />
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
          maxWidth={1220}
        />
        <QuestItems quest={quest} />
        <QuestGuide quest={quest} />
      </div>
    </ViewWrapper>
  );
}
