import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";

export const metadata: Metadata = {
  title: "Tarkov Korea Library",
  description: "Tarkov Korea Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <CSSReset />
          <Header />
          <AppStoreProvider>{children}</AppStoreProvider>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
