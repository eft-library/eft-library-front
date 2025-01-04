import PrivacyPolicyEn from "@/components/custom/privacyPolicyEn/privacyPolicyEn";

export const metadata = {
  title: "Privacy Policy | EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library Privacy Policy",
    description: "EFT Library Privacy Policy",
    images: "/og.png",
    url: "https://eftlibrary.com/privacy-policy-en",
  },
};

export default function PrivacyPolicyEnPage() {
  return <PrivacyPolicyEn />;
}
