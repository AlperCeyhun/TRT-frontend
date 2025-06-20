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
        <nav className="flex items-center justify-between p-4 bg-white text-black overflow-hidden">
          <h1 className="truncate text-lg font-bold">TODO LIST APP</h1>
        </nav>
        {children}
        <footer className="text-center text-white mt-auto">
           <p>&copy; {new Date().getFullYear()} TRT todo app. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}