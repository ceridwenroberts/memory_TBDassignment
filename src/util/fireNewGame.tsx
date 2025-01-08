import { useState } from "react";
// import { useGameContext } from "@/contexts/GameContext";
import { type CardType, type NewGameProps } from "@/lib/types";
import { cardShuffler } from "@/util/cardShuffler";
import cards from "@/data/cards.json";

const fireNewGame = ({
  setFlippedCards,
  setPairedCards,
  setMoves,
  setShowForm,
  setHighscoreObj,
  setSolved,
  setNewGame,
  setGameCards,
  cards,
}: NewGameProps): void => {
  setSolved(false);
  setPairedCards([]);
  setFlippedCards([]);
  setMoves(0);
  setShowForm(false);
  setHighscoreObj({ highscore: 0, name: "" });
  setGameCards(cardShuffler(cards));
  console.log("new game starting");
  setSolved(false);
  setNewGame(false);
};

export default fireNewGame;
