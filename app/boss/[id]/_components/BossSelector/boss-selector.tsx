"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BossSelectorTypes } from "../boss.types";
import { usePathname, useRouter } from "next/navigation";

export default function BossSelector({ bossData }: BossSelectorTypes) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBossClick = (bossUrl: string) => {
    router.push(`/boss/${bossUrl}`);
  };

  return (
    <div className="space-y-6">
      {/* Boss Selection Dropdown - Remove Card wrapper */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <span className="text-lg font-medium">보스:</span>
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedBoss}
              onChange={(e) => {
                const boss = bosses.find((b) => b.id === e.target.value);
                if (boss) {
                  setSelectedBoss(boss.id);
                  onBossSelect(boss);
                }
              }}
              className="appearance-none bg-background border-2 border-input rounded-lg px-4 py-3 pr-10 w-full sm:min-w-[200px] text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              {bosses.map((boss) => (
                <option key={boss.id} value={boss.id}>
                  {boss.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Boss Details Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 bg-muted/30">
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    사진
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    이름
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    소속
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    위치
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    스폰 확률
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    피통
                  </th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-sm sm:text-base">
                    추종자
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedBossData && (
                  <tr className="border-b hover:bg-muted/20 transition-colors">
                    <td className="p-3 sm:p-4">
                      <img
                        src={selectedBossData.image || "/placeholder.svg"}
                        alt={selectedBossData.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover"
                      />
                    </td>
                    <td className="p-3 sm:p-4 font-semibold text-sm sm:text-base">
                      {selectedBossData.name}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {selectedBossData.faction}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {selectedBossData.location}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {selectedBossData.spawnRate}
                    </td>
                    <td className="p-3 sm:p-4 font-bold text-sm sm:text-base text-primary">
                      {selectedBossData.health}
                    </td>
                    <td className="p-3 sm:p-4 text-sm sm:text-base">
                      {selectedBossData.followers}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
