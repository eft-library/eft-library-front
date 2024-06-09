import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/config/theme";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChakraProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <CSSReset />
          <Header />
          <AppStoreProvider>{children}</AppStoreProvider>
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
