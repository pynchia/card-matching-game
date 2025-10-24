import { useState, useCallback, useEffect } from 'react';

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
    setFlippedCards([]);
    setIsWon(false);
  }, []);

  const checkWinCondition = useCallback(() => {
    const allMatched = cards.every(card => card.isMatched);
    setIsWon(allMatched);
  }, [cards]);

  const flipCard = useCallback((id: number) => {
    if (flippedCards.length === 2) return;
    
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isMatched || clickedCard.isFlipped) return;

    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards(prev => [...prev, clickedCard]);
  }, [cards, flippedCards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (first.value === second.value) {
        // Match found
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isMatched: true }
              : card
          )
        );
      }
      
      // Reset flipped cards after a delay
      const timer = setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            !card.isMatched ? { ...card, isFlipped: false } : card
          )
        );
        setFlippedCards([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  useEffect(() => {
    checkWinCondition();
  }, [cards, checkWinCondition]);

  return {
    cards,
    flippedCards,
    isWon,
    initializeGame,
    flipCard
  };
};