import {
  Box,
  Image,
  SimpleGrid,
  Text,
  GridItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import type { ProfileLeft } from "@/types/types";
import { useState } from "react";

export default function ProfileLeft({
  userInfo,
  changeIcon,
  icon_list,
}: ProfileLeft) {
  const [selectIcon, setSelectIcon] = useState<string>();

  const onClickIcon = (icon: string) => {
    setSelectIcon(icon);
  };

  return (
    <SimpleGrid columns={2} spacing={6}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        borderRadius={"lg"}
      >
        {userInfo.icon && (
          <Image
            src={formatImage(userInfo.icon)}
            w="100px"
            alt="icon"
            fallbackSrc="/loading.gif"
            borderRadius={"lg"}
          />
        )}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor={ALL_COLOR.ICON_SAHDOW}
          opacity="0"
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease-in-out"
        >
          <Popover>
            <PopoverTrigger>
              <Button
                p={2}
                color={ALL_COLOR.WHITE}
                bg={ALL_COLOR.BLACK}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              >
                변경
              </Button>
            </PopoverTrigger>
            <PopoverContent
              maxH={"340px"}
              maxW={"300px"}
              bg={ALL_COLOR.LIGHT_GRAY}
              borderColor={ALL_COLOR.WHITE}
            >
              <PopoverArrow
                bg={ALL_COLOR.LIGHT_GRAY}
                borderColor={ALL_COLOR.WHITE}
                borderTop={"1px solid"}
                borderLeft={"1px solid"}
              />
              <PopoverBody>
                <SimpleGrid columns={4} spacing={6}>
                  {icon_list.map((icon, index) => (
                    <Box
                      key={index}
                      onClick={() => onClickIcon(icon)}
                      outline="1px solid"
                      outlineColor={
                        selectIcon === icon ? ALL_COLOR.YELLOW : "transparent"
                      }
                      _hover={{
                        outlineColor: ALL_COLOR.WHITE,
                      }}
                    >
                      <Image
                        src={formatImage(icon)}
                        alt={icon}
                        w="100px"
                        fallbackSrc="/loading.gif"
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              </PopoverBody>
              <PopoverFooter
                border="0"
                display="flex"
                alignItems="center"
                justifyContent={"end"}
                pb={4}
              >
                <Button
                  borderRadius={"lg"}
                  p={1}
                  color={ALL_COLOR.WHITE}
                  bg={ALL_COLOR.BLACK}
                  _hover={{ bg: ALL_COLOR.DARK_GRAY }}
                  onClick={() => changeIcon(selectIcon)}
                >
                  적용
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight={800} mb={2}>
          {userInfo.nick_name}
        </Text>
        <Text fontWeight={600}>{userInfo.grade}</Text>
      </Box>
      <GridItem colSpan={2}>
        <Box
          display="flex"
          flexDirection="column"
          bg={ALL_COLOR.LIGHT_GRAY}
          borderRadius="lg"
          p={4}
        >
          <Text fontWeight={600}>EFT Library를 이용해주셔서 감사합니다.</Text>
          <Text fontWeight={600}>
            {userInfo.nick_name}님은 {userInfo.grade} 등급 입니다.
          </Text>
          <Text fontWeight={600}>
            게시글과 댓글을 작성하시면 포인트를 획득하여,
          </Text>
          <Text fontWeight={600}>더 많은 아이콘을 구매하실 수 있습니다.</Text>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}
