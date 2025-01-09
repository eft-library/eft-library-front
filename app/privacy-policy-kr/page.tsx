import PrivacyPolicyKr from "@/components/page/privacyPolicyKr/privacyPolicyKr";

export const metadata = {
  title: "개인정보처리방침 - EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library 개인정보처리방침",
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-kr",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library 개인정보처리방침",
    description: "EFT Library 개인정보처리방침",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-kr",
  },
};

export default function PrivacyPolicyKrPage() {
  return <PrivacyPolicyKr />;
}
