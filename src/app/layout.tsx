import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ChatAppProvider } from "@/Context/ChatAppContext";
import { Navbar } from "@/components/index";
import ToggleTheme from "@/components/ToggleTheme";
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
  title: "Decentralized Chat App",
  description: "A decentralized chat app made with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ChatAppProvider>
          <Navbar />
          <ToggleTheme />
          {children}
        </ChatAppProvider>
      </body>
    </html>
  );
}
