"use client";

import { HStack, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMap, SubMapSelector } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function SubMapSelector({ onClickMap, mapId }: SubMapSelector) {
  const { lightDarkYellow, darkLightYellow } = useColorValue();
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
          color={mapId === sub.id ? darkLightYellow : lightDarkYellow}
          fontWeight="bold"
          _hover={{ color: darkLightYellow }}
          p="2"
          cursor="pointer"
        >
          * {sub.name_kr}
        </Text>
      ))}
    </HStack>
  );
}
