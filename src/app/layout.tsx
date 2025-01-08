"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/contexts/GameContext"
import cardsData from "@/data/cardsData.json"

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Memorista",
  description: "The ultimate mfkin memory game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ `flex min-h-screen ${inter.className}` }>
            {/* <GameProvider cardsData={cardsData}> */}
        <section className="flex w-full flex-col justify-between min-h-full">
          {children}
          </section>
          {/* </GameProvider> */}
      </body>
    </html>
  );
}
