"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  useDisclosure,
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
      <div
        className="view-editor"
        dangerouslySetInnerHTML={{ __html: content }}
        onClick={handleImageClick}
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image
              src={selectedImage}
              alt="Selected Image"
              maxW="100%"
              maxH="80vh"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
