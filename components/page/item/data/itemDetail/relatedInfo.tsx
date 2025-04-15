import type { RelatedInfo } from "../itemType";
import Image from "next/image";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { getQuestTitle } from "@/lib/func/jsxfunction";
import { MoveRight } from "lucide-react";
import TextSpan from "@/components/custom/gridContents/textSpan";
import Link from "next/link";

export default function RelatedInfo({ item }: RelatedInfo) {
  const getMaxSuffix = (id: number) => {
    if (id === 1) return ALL_COLOR.SandyOchre;
    if (id === 2) return ALL_COLOR.BurningOrange;
    if (id === 3) return ALL_COLOR.OliveTeal;
    if (id === 4) return ALL_COLOR.CobaltBlue;
    if (id === 5) return ALL_COLOR.IndigoViolet;
    if (id === 6) return ALL_COLOR.RoyalPurple;
    return ALL_COLOR.SoftAlloy; // maxDepth === -1일 경우 기본값
  };
  const changeTime = (sec: number | undefined) => {
    if (!sec) return "0 분";

    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);

    if (hours > 0 && minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${minutes}분`;
    }
  };
  return (
    <div className="min-h-screen p-6">
      {item.rewarded_by_npcs.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">상인 교환</h2>
          <div className="grid grid-cols-3 border-2 border-white py-1 px-2 rounded-lg mb-2">
            <div className="text-center font-bold">상인</div>
            <div className="text-center font-bold">재료</div>
            <div className="text-center font-bold">보상</div>
          </div>
          <div className=" rounded-lg border-2 border-white">
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
                      <div className="relative mb-1">
                        <Image
                          src={reqItem.item.gridImageLink}
                          alt={reqItem.item.name}
                          sizes="80px"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          placeholder="blur"
                          blurDataURL={
                            "data:image/jpeg;base64," +
                            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                          }
                        />
                        <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                          x {reqItem.quantity}
                        </div>
                      </div>
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
          <div className="grid grid-cols-2 border-2 border-white py-1 px-2 rounded-lg mb-2">
            <div className="text-center font-bold">은신처</div>
            <div className="text-center font-bold">재료</div>
          </div>
          <div className="border-2 border-white rounded-lg">
            {item.hideout_items.map((hideout) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`hideout-${hideout.level_id}`}
              >
                <div className="flex flex-col  justify-center items-center">
                  <div className="rounded flex items-center justify-center mb-1">
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

                <div className="flex flex-col  justify-center items-center">
                  <div className="rounded flex items-center justify-center mb-1">
                    <div className="relative mb-1">
                      <Image
                        src={hideout.image}
                        alt={hideout.name_en}
                        sizes="80px"
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        placeholder="blur"
                        blurDataURL={
                          "data:image/jpeg;base64," +
                          "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        }
                      />
                      <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                        x {hideout.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">{hideout.name_kr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.used_in_crafts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">은신처 제작</h2>
          <div className="grid grid-cols-4 border-2 border-white py-1 px-2 mb-2 rounded-lg">
            <div className="text-center font-bold">요건</div>
            <div className="text-center font-bold">재료</div>
            <div className="text-center font-bold">시간</div>
            <div className="text-center font-bold">보상</div>
          </div>
          <div className="border-2 border-white rounded">
            {item.used_in_crafts.map((craft) => (
              <div
                className="grid grid-cols-4 p-4 gap-2"
                key={`craft-${craft.id}`}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="rounded flex items-center justify-center mb-1">
                    {getStationSVG(
                      craft.master_id,
                      80,
                      80,
                      getMaxSuffix(parseInt(craft.level_id.split("-")[1], 10))
                    )}
                  </div>
                  <div className=" font-bold text-center">
                    {craft.master_name_kr}
                    <br />
                    LV {craft.level}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                  {craft.req_item.map((reqItem) => (
                    <div
                      className="flex flex-col items-center"
                      key={`craft-req-${reqItem.item.id}`}
                    >
                      <div className="rounded flex items-center justify-center">
                        <div className="relative mb-1">
                          <Image
                            src={reqItem.item.gridImageLink}
                            alt={reqItem.item.name}
                            sizes="80px"
                            width={80}
                            height={80}
                            style={{ objectFit: "contain" }}
                            placeholder="blur"
                            blurDataURL={
                              "data:image/jpeg;base64," +
                              "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                            }
                          />
                          <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                            x {reqItem.quantity}
                          </div>
                        </div>
                      </div>
                      <div className=" font-bold">{reqItem.item.name}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col w-[100px] justify-center items-center">
                    <MoveRight strokeWidth={1} size={60} />
                    <TextSpan size="base">
                      {changeTime(craft.duration)}
                    </TextSpan>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="relative mb-1">
                    <Image
                      src={craft.image}
                      alt={craft.name_en}
                      sizes="80px"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                    <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                      x {craft.quantity}
                    </div>
                  </div>
                  <div className="font-bold">{craft.name_kr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(item.required_by_quest_item.length > 0 ||
        item.required_by_quest_item_array.length > 0) && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">퀘스트 필요</h2>
          <div className="grid grid-cols-2 border-2 border-white py-1 px-2 mb-2 rounded-lg">
            <div className="text-center font-bold">퀘스트</div>
            <div className="text-center font-bold">재료</div>
          </div>
          <div className="border-2 border-white rounded">
            {item.required_by_quest_item.map((questItem) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`required_by_quest_item-${questItem.objective.id}`}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded flex items-center justify-center mb-1">
                    <Image
                      src={questItem.npc_image}
                      alt={questItem.npc_name_en}
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
                  <Link
                    href={`/quest/detail/${questItem.url_mapping}`}
                    target="_blank"
                  >
                    <div className="font-bold text-center hover:text-GoldenYellow">
                      {getQuestTitle(questItem.name_kr, "kr")}
                      <br />
                      {getQuestTitle(questItem.name_kr, "en")}
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="rounded flex items-center justify-center mb-1">
                      <div className="relative mb-1">
                        <Image
                          src={questItem.objective.questItem.gridImageLink}
                          alt={questItem.objective.questItem.name}
                          sizes="80px"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          placeholder="blur"
                          blurDataURL={
                            "data:image/jpeg;base64," +
                            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                          }
                        />
                        <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                          x {questItem.objective.count}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">
                    {questItem.objective.questItem.name}
                  </div>
                </div>
              </div>
            ))}
            {item.required_by_quest_item_array.map((questItem) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`required_by_quest_item-${questItem.objective.id}`}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded flex items-center justify-center mb-1">
                    <Image
                      src={questItem.npc_image}
                      alt={questItem.npc_name_en}
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
                  <Link
                    href={`/quest/detail/${questItem.url_mapping}`}
                    target="_blank"
                  >
                    <div className="font-bold text-center hover:text-GoldenYellow">
                      {getQuestTitle(questItem.name_kr, "kr")}
                      <br />
                      {getQuestTitle(questItem.name_kr, "en")}
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="rounded flex items-center justify-center mb-1">
                      <div className="relative mb-1">
                        <Image
                          src={
                            questItem.objective.items.find(
                              (qItem) => qItem.id === item.id
                            )?.gridImageLink || ""
                          }
                          alt={
                            questItem.objective.items.find(
                              (qItem) => qItem.id === item.id
                            )?.name || ""
                          }
                          sizes="80px"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          placeholder="blur"
                          blurDataURL={
                            "data:image/jpeg;base64," +
                            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                          }
                        />
                        <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                          x {questItem.objective.count}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="font-bold">
                    {
                      questItem.objective.items.find(
                        (qItem) => qItem.id === item.id
                      )?.name
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.rewarded_by_quests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">퀘스트 보상</h2>
          <div className="grid grid-cols-2 border-2 border-white py-1 px-2 mb-2 rounded-lg">
            <div className="text-center font-bold">퀘스트</div>
            <div className="text-center font-bold">보상</div>
          </div>
          <div className="border-2 border-white rounded">
            {item.rewarded_by_quests.map((reward) => (
              <div
                className="grid grid-cols-2 p-4 gap-2"
                key={`reward-${reward.quest_id}`}
              >
                <div className="flex flex-col items-center">
                  <div className="rounded flex items-center justify-center mb-1">
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
                  <Link
                    href={`/quest/detail/${reward.url_mapping}`}
                    target="_blank"
                  >
                    <div className="font-bold text-center hover:text-GoldenYellow">
                      {getQuestTitle(reward.name_kr, "kr")}
                      <br />
                      {getQuestTitle(reward.name_kr, "en")}
                    </div>
                  </Link>
                </div>

                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <div className="rounded flex items-center justify-center mb-1">
                      <div className="relative mb-1">
                        <Image
                          src={reward.reward.item.gridImageLink}
                          alt={reward.reward.item.name}
                          sizes="80px"
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          placeholder="blur"
                          blurDataURL={
                            "data:image/jpeg;base64," +
                            "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                          }
                        />
                        <div className="absolute bottom-0 right-0 text-white text-sm px-1 font-bold">
                          x {reward.reward.quantity}
                        </div>
                      </div>
                    </div>
                  </div>
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
