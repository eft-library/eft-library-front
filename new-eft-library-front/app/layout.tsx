import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/custom/themeProvider/themeProvider";
import Header from "@/components/custom/header/header";
import Footer from "@/components/custom/footer/footer";
import AuthContext from "@/store/AuthContext";
import { AppStoreProvider } from "@/store/provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthContext>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense>
              <AppStoreProvider>
                <Header />
                {children}
                <Footer />
              </AppStoreProvider>
            </Suspense>
          </ThemeProvider>
        </AuthContext>
      </body>
    </html>
  );
}
