"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { planner18N } from "@/lib/consts/i18nConsts";
import { PreviewSelectTypes } from "../planner.types";

export default function PreviewSelect({
  selectedItems,
  updateQuest,
  removeSelected,
  setSelectedItems,
}: PreviewSelectTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {planner18N.selectedQuestPreview[localeKey]}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {selectedItems.map((quest) => (
          <Card
            key={quest.id}
            className="relative rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <CardContent className="p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSelected(quest)}
                className="cursor-pointer absolute top-2 right-2 h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 z-10"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="pr-8">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white break-words">
                    {quest.name[localeKey]}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-xs self-start sm:self-center flex-shrink-0"
                  >
                    Lv.{quest.min_player_level}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {quest.npc_name[localeKey]}
                </p>
                {/* <p className="text-sm text-gray-700 dark:text-gray-300 break-words">
                  {quest.content[0]}...
                </p> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          onClick={() => {
            updateQuest();
            setSelectedItems([]);
          }}
          className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-xl w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          {planner18N.add[localeKey]}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSelectedItems([]);
          }}
          className="cursor-pointer border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 font-bold py-2 px-6 rounded-xl bg-transparent w-full sm:w-auto"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {planner18N.truncate[localeKey]}
        </Button>
      </div>
    </div>
  );
}
