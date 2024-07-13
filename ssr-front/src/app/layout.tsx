import type { Metadata } from "next";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppStoreProvider } from "@/store/provider";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "@/config/theme";
import AuthContext from "@/context/AuthContext";
import { Suspense } from "react";
import { Head } from "next/document";

export const metadata: Metadata = {
  title: "EFT Library",
  description: "EFT Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* <Head>
          <meta
            name="google-site-verification"
            content="fwQM42iUI8aUkCo-qQSXxpsLWW5aGnh7b6v1p4PxQKk"
          />
          <meta
            name="naver-site-verification"
            content="e81b437a336ec54d9d4603a962c921a0c72a5161"
          />
        </Head> */}
        <AuthContext>
          <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <CSSReset />
            <Suspense>
              <AppStoreProvider>
                <Header />
                {children}
              </AppStoreProvider>
            </Suspense>
            <Footer />
          </ChakraProvider>
        </AuthContext>
      </body>
    </html>
  );
}
