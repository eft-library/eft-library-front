import Terms from "@/components/page/terms/terms";

export const metadata = {
  title: "이용약관 - EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library 이용 약관",
    description: "EFT Library 이용 약관",
    images: "/og.png",
    url: "https://eftlibrary.com/terms",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library 이용 약관",
    description: "EFT Library 이용 약관",
    images: "/og.png",
    url: "https://eftlibrary.com/terms",
  },
};

export default function TermsPage() {
  return <Terms />;
}
