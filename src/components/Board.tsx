import React, { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import Card from './Card';
import './Board.css';

const Board: React.FC = () => {
    const { cards, flipCard, checkForMatch, resetGame, isGameWon } = useGame();

    useEffect(() => {
        if (isGameWon) {
            alert('Congratulations! You have matched all the cards!');
        }
    }, [isGameWon]);

    return (
        <div className="board">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    card={card}
                    onClick={() => flipCard(card.id)}
                />
            ))}
            {isGameWon && <button onClick={resetGame}>Play Again</button>}
        </div>
    );
};

export default Board;