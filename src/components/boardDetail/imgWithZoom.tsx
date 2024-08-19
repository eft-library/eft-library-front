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
        <ModalContent bg={ALL_COLOR.EDITOR_IMAGE_SHADOW} maxW="60vw" w="60vw">
          <ModalBody>
            <Image
              src={selectedImage}
              w={"100%"}
              alt="Selected Image"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
