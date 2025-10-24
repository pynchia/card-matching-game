import { useState, useEffect } from 'react';
import { shuffle } from '../utils/shuffle';
import { fetchThemeData } from '../api/themeApi';
import { Card, GameState } from '../types';

const useGame = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [matchedCards, setMatchedCards] = useState<Card[]>([]);
    const [gameState, setGameState] = useState<GameState>('playing');

    useEffect(() => {
        const initializeGame = async () => {
            const themeData = await fetchThemeData();
            const shuffledCards = shuffle(themeData);
            setCards(shuffledCards);
        };
        initializeGame();
    }, []);

    const flipCard = (card: Card) => {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
            setFlippedCards(prev => [...prev, card]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.id === secondCard.id) {
                setMatchedCards(prev => [...prev, firstCard, secondCard]);
            }
            setTimeout(() => {
                setFlippedCards([]);
            }, 1000);
        }
    }, [flippedCards]);

    useEffect(() => {
        if (matchedCards.length === cards.length) {
            setGameState('won');
        }
    }, [matchedCards, cards.length]);

    return {
        cards,
        flippedCards,
        matchedCards,
        gameState,
        flipCard,
    };
};

export default useGame;