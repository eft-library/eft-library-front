import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/config/theme";
import AuthContext from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Tarkov Library",
  description: "Tarkov Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthContext>
          <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Header />
            <AppStoreProvider>{children}</AppStoreProvider>
            <Footer />
          </ChakraProvider>
        </AuthContext>
      </body>
    </html>
  );
}
