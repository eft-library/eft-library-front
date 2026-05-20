export interface QuestCompletionNode {
  id: string;
  task_requirements: string[];
  task_next: string[];
}

export function createQuestCompletionMap<TQuest extends QuestCompletionNode>(
  quests: TQuest[],
) {
  return new Map(quests.map((quest) => [quest.id, quest]));
}

export function toggleQuestCompletion<TQuest extends QuestCompletionNode>({
  checked,
  completed,
  questById,
  questId,
}: {
  checked: boolean;
  completed: string[];
  questById: Map<string, TQuest>;
  questId: string;
}) {
  const nextSet = new Set(completed);
  const visited = new Set<string>();

  const apply = (targetId: string, isChecked: boolean) => {
    const visitKey = `${targetId}:${isChecked ? "checked" : "unchecked"}`;

    if (visited.has(visitKey)) {
      return;
    }

    visited.add(visitKey);

    if (isChecked) {
      nextSet.add(targetId);
      questById.get(targetId)?.task_requirements.forEach((id) => apply(id, true));
      return;
    }

    nextSet.delete(targetId);
    questById.get(targetId)?.task_next.forEach((id) => apply(id, false));
  };

  apply(questId, checked);

  return [...nextSet];
}
