import { MouseEvent } from "react";
import { type CardType } from "@/lib/types"

type NewGameButtonProps = {
  newRound: () => void;
  paired: string[];
};

const NewGameButton = ({ newRound }: NewGameButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    newRound();
  };

  return (
    <button
      onClick={handleClick}
      className={`border border-orange-800 rounded-md py-2 px-4 text-center text-orange-800 text-sm hover:shadow-lg`}
      data-testid="new-game-btn"
    >
      New Game
    </button>
  );
};

export default NewGameButton;
