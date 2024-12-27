import {CardType} from "@/types/cardType";

export function cardShuffler(cards: CardType[]): CardType[]  {
    const allCards = cards.concat(cards);

    for (let i = allCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
    }
    return allCards;
}