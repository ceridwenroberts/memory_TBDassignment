import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import {
  type GameStateType,
  type GameStateActions,
  type CardType,
  type HighscoreObjType,
} from "@/lib/types";
import { cardShuffler } from "@/util/cardShuffler";

type GameContextType = {
  setGameState: Dispatch<SetStateAction<GameStateType>>;
  cardsData: CardType[];
  startNewGame: () => void;
  moves: number;
  setMoves: Dispatch<SetStateAction<number>>;
  highscoreObj: HighscoreObjType;
  setHighscoreObj: Dispatch<SetStateAction<HighscoreObjType>>;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  flippedCards: number[];
  setFlippedCards: Dispatch<SetStateAction<number[]>>;
  pairedCards: string[];
  setPairedCards: Dispatch<SetStateAction<string[]>>;
  solved: boolean;
  setSolved: Dispatch<SetStateAction<boolean>>;
  newGame: boolean;
  setNewGame: Dispatch<SetStateAction<boolean>>;
  gameEnd: boolean;
  setGameEnd: Dispatch<SetStateAction<boolean>>;
};

interface GameProviderProps {
  children: ReactNode;
  cardsData: CardType[];
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children, cardsData }: GameProviderProps) => {
  // const [gameCards, setGameCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [pairedCards, setPairedCards] = useState<string[]>([]);
  const [solved, setSolved] = useState<boolean>(false);
  const [newGame, setNewGame] = useState<boolean>(false);
  const [gameEnd, setGameEnd] = useState<boolean>(false);
  const [highscoreObj, setHighscoreObj] = useState<HighscoreObjType>({
    highscore: 0,
    name: "",
  });

  const newGameState: GameStateType = {
    gameCards: cardShuffler(cardsData),
    flippedCards: [],
    pairedCards: [],
    moves: 0,
    showForm: false,
    highscoreObj: {
      highscore: 0,
      name: "",
    },
  };

  const [gameState, setGameState] = useState<GameStateType>(newGameState);

  const startNewGame = (): void => {
    setGameState(newGameState);
  };

  return (
    <GameContext.Provider
      value={{
        cardsData,
        startNewGame,
        moves,
        showForm,
        highscoreObj,
        flippedCards,
        pairedCards,
        setFlippedCards,
        setPairedCards,
        setMoves,
        setShowForm,
        setHighscoreObj,
        setGameState,
        solved,
        setSolved,
        newGame,
        setNewGame,
        gameEnd,
        setGameEnd,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "No Context! Hint: useGame must be used within a GameProvider"
    );
  }
  return context;
};
