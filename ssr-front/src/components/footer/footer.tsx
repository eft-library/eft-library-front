import { Text, Grid, GridItem, Box, Flex } from "@chakra-ui/react";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { fetchDataWithNone } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Footer() {
  interface FooterType {}

  const [footer, setFooter] = useState<FooterType>({});
}
