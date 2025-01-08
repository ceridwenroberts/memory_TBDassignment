"use client";

import { GameProvider } from "@/contexts/GameContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GameBoard from "@/components/GameBoard";
import ScoreBoard from "@/components/ScoreBoard";
import cards from "@/data/cards.json";

export default function Home() {
  return (
    <>
      <Header />
      <GameProvider cardsData={cards}>
        <main className="mx-auto w-full h-full flex flex-col">
          <GameBoard />
          <ScoreBoard />
        </main>
      </GameProvider>
      <Footer />
    </>
  );
}
