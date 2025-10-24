import React from 'react';

interface CardProps {
  id: number;
  content: string;
  isFlipped: boolean;
  onClick: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ id, content, isFlipped, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
      {isFlipped ? content : '?'}
    </div>
  );
};

export default Card;