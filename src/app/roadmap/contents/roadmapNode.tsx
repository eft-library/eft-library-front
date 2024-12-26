"use client";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { Box, Checkbox, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function RoadMapNode(props) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  const onClickTitle = useCallback((data) => {
    // 퀘스트 상세 페이지 새 창으로 띄우기
    console.log(data);
  }, []);

  const getTitle = () => {
    // 첫 번째 부분 추출
    let firstPart = props.data.title_kr
      .substring(0, props.data.title_kr.indexOf("("))
      .trim();

    // 두 번째 부분 추출
    let secondPart = props.data.title_kr
      .substring(props.data.title_kr.indexOf("("))
      .trim();

    return (
      <Text
        textAlign={"center"}
        fontWeight={600}
        cursor={"pointer"}
        color={ALL_COLOR.WHITE}
        _hover={{ color: ALL_COLOR.YELLOW }}
        onClick={() => onClickTitle(props.data)}
      >
        {firstPart}
        <br />
        {secondPart}
      </Text>
    );
  };

  return (
    <Box
      border={"1px solid"}
      borderColor={ALL_COLOR.QUEST_RELATED_ONE} // LEVER_THREE
      borderRadius={6}
      p={2}
      w={"200px"}
      h={"90px"}
      bg={ALL_COLOR.BACKGROUND}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={5}
    >
      <Box w={"100%"} display={"flex"} justifyContent={"flex-end"}>
        <Checkbox w={4} h={4} borderColor={ALL_COLOR.SCROLL_HOVER} />
      </Box>
      <Box
        display={"flext"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"}
      >
        {getTitle()}
      </Box>

      {["top", "bottom"].includes(props.sourcePosition) ? (
        <>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={props.isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={props.isConnectable}
          />
        </>
      ) : (
        <>
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={props.isConnectable}
          />
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={props.isConnectable}
          />
        </>
      )}
    </Box>
  );
}
