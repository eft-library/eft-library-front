import type { KordReward } from "@/types/api/kord-breach";

export function rewardStage(reward: KordReward): string {
  if (!reward.unlock_conditions_known) return "unknown";
  if (!reward.unlock_conditions.length) return "none";
  if (reward.required_level !== null) return `level:${reward.required_level}`;
  if (reward.unlock_conditions.every((condition) => condition.condition_type === "quest_completed")) return "quests";
  return "complex";
}

