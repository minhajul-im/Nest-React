import "@/app/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { type Locale } from "@/lib/locales";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Header } from "@/components/header/header";
import { ThemeProvider } from "@/provider/theme-provider";
import { ImgKitProvider } from "@/provider/image-kit-provider";
import Footer from "@/components/footer/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jutlee",
  description: "This application is jute & leather related products!",
};

type RootType = {
  children: React.ReactNode;
  params: {
    locale: Locale;
  };
};

const RootLayout = async ({ children, params }: RootType) => {
  const message = await getMessages();
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider messages={message}>
            <ImgKitProvider>
              <Header />
              {children}
              <Footer />
            </ImgKitProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
