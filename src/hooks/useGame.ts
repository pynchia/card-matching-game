import { useState, useCallback } from 'react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const useGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [isWon, setIsWon] = useState(false);

  const initializeGame = useCallback((cardValues: string[]) => {
    const initialCards: Card[] = cardValues.flatMap((value, index) => [
      { id: index * 2, value, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, value, isFlipped: false, isMatched: false }
    ]);
    setCards(initialCards.sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = useCallback((id: number) => {
    if (flippedCards.length === 2) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prev => {
      const clickedCard = cards.find(card => card.id === id);
      if (clickedCard) {
        return [...prev, clickedCard];
      }
      return prev;
    });
  }, [cards, flippedCards]);

  return {
    cards,
    flippedCards,
    isWon,
    initializeGame,
    flipCard
  };
};