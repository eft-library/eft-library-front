import PrivacyPolicy from "@/components/page/privacyPolicy/privacyPolicy";

export const metadata = {
  title: "개인정보처리방침 - EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library 개인정보처리방침",
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library 개인정보처리방침",
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy",
  },
  alternates: {
    canonical: "https://eftlibrary.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
