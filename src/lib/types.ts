import { Dispatch, SetStateAction } from "react";
export type HighscoreObjType = {
  name: string;
  highscore: number;
};
export type CardType = {
  id: number;
  name: string;
  imgSrc: string;
  reverse: string;
  flipped?: boolean;
  gameId?: number;
};

export interface INewHighscore {
  name: string;
  highscore: number;
}

export type GameStateType = {
  gameCards: CardType[];
  flippedCards: number[];
  pairedCards: string[];
  moves: number;
  showForm: boolean;
  highscoreObj: HighscoreObjType;
};

export type GameStateActions = {
  setGameCards: Dispatch<SetStateAction<CardType[]>>;
  setFlippedCards: Dispatch<SetStateAction<number[]>>;
  setPairedCards: Dispatch<SetStateAction<string[]>>;
  setMoves: Dispatch<SetStateAction<number>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setHighscoreObj: Dispatch<SetStateAction<HighscoreObjType>>;
};

export type NewGameProps = {
  setFlippedCards: Dispatch<SetStateAction<number[]>>;
  setPairedCards: Dispatch<SetStateAction<string[]>>;
  setMoves: Dispatch<SetStateAction<number>>;
  setShowForm: Dispatch<SetStateAction<boolean>>;
  setHighscoreObj: Dispatch<SetStateAction<HighscoreObjType>>;
  setSolved: Dispatch<SetStateAction<boolean>>;
  setNewGame: Dispatch<SetStateAction<boolean>>;
  cards: CardType[];
  cardShuffler: () => CardType[],
  setGameCards: Dispatch<SetStateAction<CardType[]>>
  
};