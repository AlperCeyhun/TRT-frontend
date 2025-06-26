import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ClientChatToggle from "@/components/chat/ClientChatToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRT Todo app",
  description: "Generated without consent",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black font-[family-name:var(--font-geist-sans)]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header/>
          {children}
          <Toaster richColors position="bottom-right" />
          <div className="fixed bottom-4 right-4 z-50">
            <ClientChatToggle/>
          </div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}