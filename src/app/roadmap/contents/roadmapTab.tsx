import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Tabs, TabList, Tab } from "@chakra-ui/react";

export default function RoadmapTab({ npcList, setTabState }) {
  return (
    <Tabs variant="enclosed" size={"lg"} isFitted border={"1px solid white"}>
      <TabList>
        <Tab
          fontWeight={600}
          color={ALL_COLOR.WHITE}
          onClick={() => setTabState("all")}
        >
          전체
        </Tab>
        {npcList.length < 1 ? (
          <></>
        ) : (
          npcList.map((npc) => (
            <Tab
              fontWeight={600}
              key={npc.id}
              color={ALL_COLOR.WHITE}
              onClick={() => setTabState(npc.id)}
            >
              {npc.name_kr}
            </Tab>
          ))
        )}
      </TabList>
    </Tabs>
  );
}
