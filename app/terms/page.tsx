import Terms from "@/components/custom/terms/terms";

export const metadata = {
  title: "Terms | EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 이용 약관",
    description: "EFT Library 이용 약관",
    images: "/og.png",
    url: "https://eftlibrary.com/terms",
  },
};

export default function TermsPage() {
  return <Terms />;
}
