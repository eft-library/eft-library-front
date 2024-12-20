"use client";

import { useState } from "react";
import {
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  List,
  ListItem,
} from "@chakra-ui/react";
import { PiWarningCircleBold } from "react-icons/pi";
import type { UserQuestPopOver } from "@/types/types";

export default function UserQuestPopOver({ quest }: UserQuestPopOver) {
  const [isMouseEnter, setIsMouseEnter] = useState<boolean>(false);

  const changePopoverState = (condition: boolean) => {
    setIsMouseEnter(condition);
  };

  return (
    <Popover
      placement="top"
      isOpen={isMouseEnter}
      onClose={() => changePopoverState(false)}
    >
      <PopoverTrigger>
        <div
          onMouseEnter={() => changePopoverState(true)}
          onMouseLeave={() => changePopoverState(false)}
        >
          <PiWarningCircleBold color="yellow" size={40} />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => changePopoverState(true)}
        onMouseLeave={() => changePopoverState(false)}
      >
        <PopoverArrow />
        <PopoverBody>
          <List>
            {quest.requirements_kr.map((require, index) => (
              <ListItem key={`${quest.quest_id}-${index}`}>
                <Text
                  fontWeight={700}
                  p={1}
                  dangerouslySetInnerHTML={{
                    __html: `*&nbsp;&nbsp;${require}`,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
