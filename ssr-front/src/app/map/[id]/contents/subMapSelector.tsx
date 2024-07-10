"use client";

import { HStack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMap, SubMapSelector } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function SubMapSelector({ onClickMap, mapId }: SubMapSelector) {
  const param = useParams<{ id: string }>();
  const [subMap, setSubMap] = useState<SubMap[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_SUB_MAP}/${param.id}`, setSubMap);
  }, [param.id]);

  if (!subMap) return null;

  return (
    <HStack justifyContent="center">
      {subMap.map((sub) => (
        <Text
          key={sub.id}
          onClick={() => onClickMap(sub)}
          color={mapId === sub.id ? ALL_COLOR.YELLOW : ALL_COLOR.DARK_YELLOW}
          fontWeight="bold"
          _hover={{ color: ALL_COLOR.YELLOW }}
          p="2"
          cursor="pointer"
        >
          * {sub.name_kr}
        </Text>
      ))}
    </HStack>
  );
}
