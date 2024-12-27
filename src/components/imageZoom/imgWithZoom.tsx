"use client";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ImgWithZoom({ content }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (event) => {
    const img = event.target;
    if (img.tagName === "IMG") {
      setSelectedImage(img.src);
      onOpen();
    }
  };

  return (
    <>
      <Text
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={handleImageClick}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={ALL_COLOR.KEY_CARD_THREE} maxW="80vw" minW="20vw">
          <ModalBody>
            <Box
              w="auto"
              h="80vh" // 화면의 80% 크기
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              onClick={onClose}
            >
              <Image
                src={selectedImage}
                alt={selectedImage}
                maxW="100%" // 이미지 최대 너비를 부모 컨테이너에 맞춤
                maxH="100%" // 이미지 최대 높이를 부모 컨테이너에 맞춤
                objectFit="contain" // 비율을 유지하면서 이미지 크기 맞춤
                w="auto" // 자동으로 너비 설정
                h="auto" // 자동으로 높이 설정
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
