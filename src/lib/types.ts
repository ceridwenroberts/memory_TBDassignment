export  type HighscoreObjType = {
    name: string,
    highscore: number
}
  
export type CardType = {
    id: number;
    name: string;
    imgSrc: string;
    reverse: string;
    flipped?: boolean;
    gameId?: number;
}