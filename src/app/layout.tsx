import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black font-[family-name:var(--font-geist-sans)]`}>
        <nav className="flex items-center justify-between p-4 bg-white text-black">
          <h1>
            TODO LIST APP
          </h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
