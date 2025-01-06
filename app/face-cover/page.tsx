import FaceCover from "@/components/page/faceCover/faceCover";

export const metadata = {
  title: "타르코프 얼굴 커버",
  description: "타르코프 얼굴 커버, tarkov face cover",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 얼굴 커버",
    description: "EFT Library 얼굴 커버",
    images: "/og.png",
    url: "https://eftlibrary.com/face-cover",
  },
};

export default function FaceCoverPage() {
  return <FaceCover />;
}
