import React from 'react';

interface BoardProps {
  cards: any[];
  onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
  return (
    <div className="grid">
      {cards.map(card => (
        <div
          key={card.id}
          className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
          onClick={() => onCardClick(card.id)}
        >
          {card.isFlipped || card.isMatched ? card.value : '?'}
        </div>
      ))}
    </div>
  );
};

export default Board;