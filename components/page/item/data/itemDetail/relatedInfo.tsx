import type { RelatedInfo } from "../itemType";
import Image from "next/image";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function RelatedInfo({ item }: RelatedInfo) {
  console.log(item.rewarded_by_quests);
  const getMaxSuffix = (id: number) => {
    if (id === 1) return ALL_COLOR.SandyOchre;
    if (id === 2) return ALL_COLOR.BurningOrange;
    if (id === 3) return ALL_COLOR.OliveTeal;
    if (id === 4) return ALL_COLOR.CobaltBlue;
    if (id === 5) return ALL_COLOR.IndigoViolet;
    if (id === 6) return ALL_COLOR.RoyalPurple;
    return ALL_COLOR.SoftAlloy; // maxDepth === -1일 경우 기본값
  };
  return (
    <div className="min-h-screen p-6">
      {item.rewarded_by_npcs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">상인 교환</h2>
          <div className="border-2 border-white rounded-lg">
            <div className="grid grid-cols-3 border-2 border-white py-1 px-2">
              <div className="text-center font-bold">상인</div>
              <div className="text-center font-bold">재료</div>
              <div className="text-center font-bold">보상</div>
            </div>
            {item.rewarded_by_npcs.map((trader) => (
              <div
                className="grid grid-cols-3 p-4 gap-2"
                key={`trader-${trader.barter_info.level}`}
              >
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={trader.npc_image}
                    alt={trader.npc_name_en}
                    sizes={"80"}
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64," +
                      "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    }
                  />
                  <div className="text-center font-bold">
                    {trader.npc_name_kr}
                    <br />
                    LV {trader.barter_info.level}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {trader.barter_info.requiredItems.map((reqItem) => (
                    <div
                      className="flex flex-col items-center justify-center"
                      key={`trader-req-${reqItem.item.id}`}
                    >
                      <Image
                        src={reqItem.item.gridImageLink}
                        alt={reqItem.item.name}
                        sizes={"80"}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        placeholder="blur"
                        blurDataURL={
                          "data:image/jpeg;base64," +
                          "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        }
                      />
                      <div className="font-bold">x {reqItem.quantity}</div>
                      <div className="font-bold">{reqItem.item.name}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div
                    className="flex flex-col items-center justify-center"
                    key={`trader-req-${trader.barter_info.rewardItems.item.id}`}
                  >
                    <Image
                      src={trader.barter_info.rewardItems.item.gridImageLink}
                      alt={trader.barter_info.rewardItems.item.name}
                      sizes={"80"}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                    <div className="font-bold">
                      x {trader.barter_info.rewardItems.quantity}
                    </div>
                    <div className="font-bold">
                      {trader.barter_info.rewardItems.item.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.hideout_items.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">은신처 건설</h2>
          <div className="border-2 border-white rounded-lg">
            <div className="grid grid-cols-2 border-2 border-white py-1 px-2">
              <div className="text-center font-bold">은신처</div>
              <div className="text-center font-bold">재료</div>
            </div>
            {item.hideout_items.map((hideout) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`hideout-${hideout.level_id}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded flex items-center justify-center mb-1">
                    {getStationSVG(
                      hideout.master_id,
                      80,
                      80,
                      getMaxSuffix(parseInt(hideout.level_id.split("-")[1], 10))
                    )}
                  </div>
                  <div className="text-center font-bold">
                    {hideout.master_name_kr}
                    <br />
                    LV {parseInt(hideout.level_id.split("-")[1], 10)}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded flex items-center justify-center mb-1">
                    <Image
                      src={hideout.image}
                      alt={hideout.name_en}
                      sizes={"80"}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                  </div>
                  <div className="font-bold">x {hideout.quantity}</div>
                  <div className="font-bold">{hideout.name_kr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">은신처 제작</h2>
        <div className="border-2 border-white rounded">
          <div className="grid grid-cols-4 border-2 border-white py-1 px-2">
            <div className="text-center">요건</div>
            <div className="text-center">재료</div>
            <div className="text-center">시간</div>
            <div className="text-center">보상</div>
          </div>
          <div className="grid grid-cols-4 p-4 gap-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded flex items-center justify-center mb-1">
                <div className="w-12 h-12 rounded"></div>
              </div>
              <div className="text-xs text-center">
                공기 정화 시설
                <br />
                Level 1
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded flex items-center justify-center mb-1">
                <div className="w-10 h-10 rounded-full"></div>
              </div>
              <div className="text-xs">x 1</div>
              <div className="text-xs">Filter 필터링 장비통</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-2">30분</div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-12 bg-gray-800 rounded flex items-center justify-center mb-1">
                <div className="w-14 h-10 bg-gray-700 rounded"></div>
              </div>
              <div className="text-xs">x 1</div>
              <div className="text-xs">60HS 총알</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">퀘스트 필요</h2>
        <div className="border border-gray-700 rounded">
          <div className="grid grid-cols-2 border-b border-gray-700 py-1 px-2">
            <div className="text-center">퀘스트</div>
            <div className="text-center">재료</div>
          </div>
          <div className="grid grid-cols-2 p-4 gap-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center mb-1">
                <div className="w-12 h-12 bg-gray-700 rounded"></div>
              </div>
              <div className="text-xs text-center">
                건스미스 - 파트 1<br />
                Gunsmith - Part 1
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mb-1">
                  <div className="w-10 h-10 bg-green-900 rounded-full"></div>
                </div>
                <div className="ml-2 text-xs">+ 추 수집</div>
              </div>
              <div className="text-xs">x 1</div>
              <div className="text-xs">Filter 필터링 장비통</div>
            </div>
          </div>
        </div>
      </div> */}

      {item.rewarded_by_quests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">퀘스트 보상</h2>
          <div className="border-2 border-white rounded">
            <div className="grid grid-cols-2 border-2 border-white py-1 px-2">
              <div className="text-center font-bold">퀘스트</div>
              <div className="text-center font-bold">보상</div>
            </div>
            {item.rewarded_by_quests.map((reward) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`reward-${reward.quest_id}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-800 rounded flex items-center justify-center mb-1">
                    <Image
                      src={reward.npc_image}
                      alt={reward.npc_name_en}
                      sizes={"80"}
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                  </div>
                  <div className="font-bold text-center">
                    {reward.name_kr}
                    <br />
                    {reward.name_en}
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center mb-1">
                      <Image
                        src={reward.reward.item.gridImageLink}
                        alt={reward.reward.item.name}
                        sizes={"80"}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        placeholder="blur"
                        blurDataURL={
                          "data:image/jpeg;base64," +
                          "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        }
                      />
                    </div>
                  </div>
                  <div className="font-bold">x {reward.reward.quantity}</div>
                  <div className="font-bold">{reward.reward.item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
