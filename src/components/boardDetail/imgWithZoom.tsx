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
  const [scale, setScale] = useState(1); // Zoom 배율 상태
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // 이미지 이동 상태
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [lastMousePosition, setLastMousePosition] = useState(null); // 마지막 마우스 위치

  const handleImageClick = (event) => {
    const img = event.target;
    if (img.tagName === "IMG") {
      setSelectedImage(img.src);
      setScale(1); // Reset zoom when opening a new image
      setOffset({ x: 0, y: 0 }); // Reset offset when opening a new image
      onOpen();
    }
  };

  const handleWheel = (event) => {
    if (!event.ctrlKey) return; // Ctrl 키가 눌려있지 않으면 확대/축소 무시

    event.preventDefault();
    const zoomSpeed = 0.1; // 줌 속도
    const newScale = Math.min(Math.max(scale - event.deltaY * zoomSpeed, 1), 5); // 배율 제한 (1배 ~ 5배)
    setScale(newScale);
  };

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !lastMousePosition) return;

    // 이동 거리 계산
    const deltaX = event.clientX - lastMousePosition.x;
    const deltaY = event.clientY - lastMousePosition.y;

    // 이동 거리 반영
    setOffset({
      x: offset.x + deltaX,
      y: offset.y + deltaY,
    });

    // 현재 마우스 위치 업데이트
    setLastMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLastMousePosition(null); // 드래그 종료 시 위치 초기화
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
        <ModalContent
          bg={ALL_COLOR.EDITOR_IMAGE_SHADOW}
          maxW="80vw"
          minW="20vw"
        >
          <ModalBody>
            <Box
              w="100%"
              h="100%"
              overflow="hidden"
              position="relative"
              onWheel={handleWheel} // Ctrl + Scroll 확대/축소
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp} // 마우스가 박스 밖으로 나갔을 때 드래그 종료
              cursor={isDragging ? "grabbing" : "grab"}
            >
              <Image
                src={selectedImage}
                alt={selectedImage}
                maxW="100%" // 최대 너비를 Modal의 너비에 맞춤
                maxH="80vh" // 최대 높이를 화면의 80%로 제한
                objectFit="contain" // 이미지 비율 유지하면서 최대 크기 안에 맞춤
                w="100%"
                h="auto"
                transform={`scale(${scale}) translate(${offset.x}px, ${offset.y}px)`}
                transformOrigin="center"
                transition={isDragging ? "none" : "transform 0.1s ease"} // 드래그 중에는 애니메이션 없음
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
