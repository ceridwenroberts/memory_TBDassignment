import NewGameButton from "@/components/NewGameButton";
type ScoreBoardProps = {
  moves: number;
  highscore: number;
  name: string;
  handleNewGame: () => void;
};

const ScoreBoard = ({ moves, highscore, name, handleNewGame }: ScoreBoardProps) => {
  return (
    <div className="flex w-full bg-slate-300">
      <div className="flex-1">
        <p>Moves:</p>
        <p data-testid="moves">{moves}</p>
      </div>
      <NewGameButton data-testid="new-game-btn" handleNewGame={ handleNewGame }/>
      <div className="flex-1">
        <p>High Score:</p>
        { name && <p data-testod="highscore-name">{ `${name}:` }</p> }
        <p data-testid="highscore">{highscore}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
