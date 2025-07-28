import { Badge } from "@/components/ui/badge";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { roadmapI18N } from "@/lib/consts/i18nConsts";
import type { StatsPanelTypes } from "../roadmap.types";

export default function StatsPanel({
  getAllCount,
  getAllKappaCount,
  getKappaCompleteCount,
  onlyKappa,
  getCompleteCount,
}: StatsPanelTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-xl w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <h3 className="font-bold text-base text-foreground">
          {roadmapI18N.status[localeKey]}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* 전체 퀘스트 */}
        <div className="group hover:bg-accent/50 rounded-lg p-3 transition-all duration-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">
                {roadmapI18N.allQuest[localeKey]}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 font-semibold"
            >
              {getAllCount}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-blue-500 h-1.5 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        {/* 카파 퀘스트 */}
        <div className="group hover:bg-accent/50 rounded-lg p-3 transition-all duration-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">
                {roadmapI18N.kappaQuest[localeKey]}
              </span>
            </div>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 font-semibold"
            >
              {getAllKappaCount}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${(getAllKappaCount / getAllCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 카파 완료 */}
        <div className="group hover:bg-accent/50 rounded-lg p-3 transition-all duration-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-foreground">
                {roadmapI18N.kappaSuccessQuest[localeKey]}
              </span>
            </div>
            <Badge
              variant="outline"
              className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400 font-semibold"
            >
              {getKappaCompleteCount}
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width:
                  getKappaCompleteCount > 0
                    ? `${(getKappaCompleteCount / getAllKappaCount) * 100}%`
                    : "0%",
              }}
            ></div>
          </div>
        </div>

        {/* 완료 퀘스트 */}
        {!onlyKappa && (
          <div className="group hover:bg-accent/50 rounded-lg p-3 transition-all duration-200">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-foreground">
                  {roadmapI18N.allSuccessQuest[localeKey]}
                </span>
              </div>
              <Badge
                variant="outline"
                className="border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-400 font-semibold"
              >
                {getCompleteCount}
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
                style={{
                  width: `${(getCompleteCount / getAllCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 전체 진행률 */}
      {onlyKappa ? (
        <div className="mt-5 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground">
              {roadmapI18N.overallProgress[localeKey]}
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round((getKappaCompleteCount / getAllKappaCount) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-700 shadow-sm"
              style={{
                width: `${(getKappaCompleteCount / getAllKappaCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mt-5 pt-4 border-t border-border/50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-foreground">
              {roadmapI18N.overallProgress[localeKey]}
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round((getCompleteCount / getAllCount) * 100)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-700 shadow-sm"
              style={{
                width: `${(getCompleteCount / getAllCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
