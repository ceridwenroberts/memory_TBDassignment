import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { type GameState } from "@/lib/types";
import cardsData from "@/data/cardsData.json";
import { type CardType, type HighscoreObjType } from "@/lib/types";
import { cardShuffler } from "@/util/cardShuffler";

type GameContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
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
  pairedCardsArray: string[];
  setPairedCardsArray: Dispatch<SetStateAction<string[]>>;
};

interface GameProviderProps {
  children: ReactNode;
  cardsData: CardType[];
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children, cardsData }: GameProviderProps) => {
  const [moves, setMoves] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [pairedCardsArray, setPairedCardsArray] = useState<string[]>([]);
  const [highscoreObj, setHighscoreObj] = useState<HighscoreObjType>({
    highscore: 0,
    name: "",
  });

  const newGameState: GameState = {
    gameCards: cardShuffler(cardsData),
    flippedCards: [],
    pairedCardsArray: [],
    moves: 0,
    showForm: false,
  };

  const [gameState, setGameState] = useState<GameState>(newGameState);

  const startNewGame = (): void => {
    setGameState(newGameState);
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        moves,
        setMoves,
        highscoreObj,
        setHighscoreObj,
        showForm,
        flippedCards,
        setFlippedCards,
        pairedCardsArray,
        setPairedCardsArray,
        setShowForm,
        startNewGame,
        cardsData,
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
