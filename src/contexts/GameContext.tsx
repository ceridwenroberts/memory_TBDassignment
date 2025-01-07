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
import { type CardType } from "@/lib/types";
import { cardShuffler } from "@/util/cardShuffler";
type GameContextType = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  startNewGame: () => void;
};

interface GameProviderProps {
  children: ReactNode;
  cardsData: CardType[];
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children, cardsData }: GameProviderProps) => {
  const newGameState: GameState = {
    gameCards: cardShuffler(cardsData),
    flippedCards: [],
    pairedCardsArray: [],
    moves: 0,
  };

  const [gameState, setGameState] = useState<GameState>(newGameState);

  const startNewGame = (): void => {
    setGameState(newGameState);
  };

  return (
    <GameContext.Provider value={{ gameState, setGameState, startNewGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      "No Context! Hint: useGame must be used within a GameProvider"
    );
  }
  return context;
};
