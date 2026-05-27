import { ZoomableImagePopup } from "@/components/shared/zoomable-image-popup";

import type { LiveMapPopupImage } from "./live-map-canvas";

export function LiveMapImagePopup({
  image,
  onClose,
}: {
  image: LiveMapPopupImage | null;
  onClose: () => void;
}) {
  return <ZoomableImagePopup image={image} onClose={onClose} />;
}
