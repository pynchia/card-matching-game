import { useState, useCallback, useEffect } from 'react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Player {
  id: number;
  name: string;
  score: number;
  color: string;
}

export const useGame = (isMultiplayer: boolean = false, playerCount: number = 2) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const initializeGame = useCallback((cardValues: string[]) => {
    const initialCards: Card[] = cardValues.flatMap((value, index) => [
      { id: index * 2, value, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, value, isFlipped: false, isMatched: false }
    ]);
    setCards(initialCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setIsWon(false);
    setCurrentPlayer(0);
    
    if (isMultiplayer) {
      const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'];
      const initialPlayers: Player[] = Array.from({ length: playerCount }, (_, i) => ({
        id: i,
        name: `Player ${i + 1}`,
        score: 0,
        color: colors[i % colors.length]
      }));
      setPlayers(initialPlayers);
    }
  }, [isMultiplayer, playerCount]);

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
      const isMatch = first.value === second.value;
      
      if (isMatch) {
        // Match found
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isMatched: true }
              : card
          )
        );
        
        // Update score for current player if multiplayer
        if (isMultiplayer && players.length > 0) {
          setPlayers(prevPlayers =>
            prevPlayers.map((player, index) =>
              index === currentPlayer
                ? { ...player, score: player.score + 1 }
                : player
            )
          );
        }
      }
      
      // Reset flipped cards after a delay
      const timer = setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            !card.isMatched ? { ...card, isFlipped: false } : card
          )
        );
        setFlippedCards([]);
        
        // Switch to next player if no match in multiplayer mode
        if (isMultiplayer && !isMatch && players.length > 0) {
          setCurrentPlayer((prev) => (prev + 1) % players.length);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards, isMultiplayer, players.length, currentPlayer]);

  useEffect(() => {
    checkWinCondition();
  }, [cards, checkWinCondition]);

  return {
    cards,
    flippedCards,
    isWon,
    initializeGame,
    flipCard,
    players,
    currentPlayer
  };
};