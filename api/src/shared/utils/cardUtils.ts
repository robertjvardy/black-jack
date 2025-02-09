import Card from "../../gameStructure/card";
import { CARD_ORDERS, CARD_SUITS, TWENTY_ONE } from "../constants";
import { CardOrderType } from "../types";

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

const cardOrderMap: Record<CardOrderType, number[]> = {
  A: [1, 11],
  "2": [2],
  "3": [3],
  "4": [4],
  "5": [5],
  "6": [6],
  "7": [7],
  "8": [8],
  "9": [9],
  "10": [10],
  J: [10],
  Q: [10],
  K: [10],
};

export const calculateHandTotal = (hand: Card[]) => {
  const handOrders = hand.map((card) => card.order);

  const aces = handOrders.filter((order) => order === "A");
  const nonAces = handOrders.filter((order) => order !== "A");

  const nonAceTotal = nonAces
    .map((order) => cardOrderMap[order][0])
    .reduce((acc, curr) => acc + curr, 0);

  var acesTotal: number[] = [];
  if (aces.length) {
    aces.forEach((ace, index) => {
      if (index === 0) {
        acesTotal = cardOrderMap["A"];
      } else {
        acesTotal[0] += 1;
        acesTotal[1] += 1;
      }
    });

    const combinedTotal = acesTotal.map((value) => value + nonAceTotal);
    if (combinedTotal[1] > TWENTY_ONE) {
      return [combinedTotal[0]];
    }
    return combinedTotal;
  }

  return [nonAceTotal];
};

// const card1 = new Card("A", "C");
// const card2 = new Card("A", "C");
// const card3 = new Card("A", "C");
// const card4 = new Card("10", "C");

// console.log(calculateHandTotal([card1, card2]));
