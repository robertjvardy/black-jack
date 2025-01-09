import Card from "../../gameStructure/card";
import { CARD_ORDERS, CARD_SUITS } from "../constants";

export const compileDeck = (numberOfDecks = 5): Card[] => {
  const deck: Card[] = [];
  CARD_SUITS.forEach((suit) => {
    CARD_ORDERS.forEach((order) => {
      deck.push(new Card(order, suit));
    });
  });

  return Array(numberOfDecks).fill(deck).flat();
};

export const shuffle = (array: Card[]): Card[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};
