import type { BossData } from "./boss.types";
import BossView from "./boss-view";
import { notFound } from "next/navigation";
import { fetchBossData } from "../_lib/fetch-boss-data";

export default async function BossData({ id }: { id: string }) {
  try {
    const data = await fetchBossData(id);

    if (!data) {
      notFound();
    }

    return <BossView bossData={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
