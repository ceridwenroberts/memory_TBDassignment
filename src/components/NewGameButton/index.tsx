import { useGameContext } from "@/contexts/GameContext";
import { useState } from "react";

const NewGameButton = () => {
  const { pairedCards, setNewGame, gameEnd, setGameEnd } = useGameContext();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  pairedCards.length === 6 && setGameEnd(true);
  return (
    <button
      className={`border border-orange-800 rounded-md py-2 px-4 text-center text-orange-800 text-sm hover:shadow-lg ${
        gameStarted ? "bg-orange-800 bg-opacity-25 text-opacity-100" : ""
      }${gameEnd && "bg-orange-800 text-orange-50 "}`}
      onClick={() => setNewGame(true)}
      data-testid="new-game-btn"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
