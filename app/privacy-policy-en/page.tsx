import PrivacyPolicyEn from "@/components/page/privacyPolicyEn/privacyPolicyEn";

export const metadata = {
  title: "Privacy Policy - EFT Library",
  description: "EFT Library Privacy Policy",
  openGraph: {
    siteName: "EFT Library",
    title: "EFT Library Privacy Policy",
    description: "EFT Library Privacy Policy",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-en",
  },
  twitter: {
    siteName: "EFT Library",
    title: "EFT Library Privacy Policy",
    description: "EFT Library Privacy Policy",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-en",
  },
};

export default function PrivacyPolicyEnPage() {
  return <PrivacyPolicyEn />;
}
