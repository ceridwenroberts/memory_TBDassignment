import { Dispatch, SetStateAction } from "react";
import NewGameButton from "@/components/NewGameButton";
import { useGameContext } from "@/contexts/GameContext";
type ScoreBoardProps = {
  highscore: number;
  name: string;
};

const ScoreBoard = () => {
  const { moves, highscoreObj } = useGameContext();
  const { name, highscore } = highscoreObj;

  return (
    <div className="flex justify-around w-full py-6 px-4 text-sm leading-6">
      <div className="flex flex-col place-items-center">
        <p>Moves</p>
        <p data-testid="moves">{moves}</p>
      </div>
      <NewGameButton data-testid="new-game-btn" />
      <div className="flex flex-col place-items-center">
        <p>High Score</p>
        <div className="inline-flex gap-1">
          {name && <p data-testod="highscore-name">{`${name}:`}</p>}
          <p data-testid="highscore">{highscore}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
