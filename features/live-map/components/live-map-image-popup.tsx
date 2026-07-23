import { ZoomableImagePopup } from "@/components/shared/zoomable-image-popup";

import type { LiveMapPopupImage } from "./live-map-canvas";

export function LiveMapImagePopup({
  image,
  onNavigate,
  onClose,
}: {
  image: LiveMapPopupImage | null;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  return (
    <ZoomableImagePopup
      compact={image?.fit === "contain"}
      currentIndex={image?.index}
      image={image}
      images={image?.images}
      onClose={onClose}
      onNavigate={onNavigate}
    />
  );
}
