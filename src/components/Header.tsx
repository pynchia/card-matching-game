import React from 'react';

interface Player {
  id: number;
  name: string;
  score: number;
  color: string;
}

interface HeaderProps {
  isGameWon: boolean;
  players?: Player[];
}

const Header: React.FC<HeaderProps> = ({ isGameWon, players }) => {
  const getWinnerMessage = () => {
    if (!players || players.length === 0) {
      return 'Congratulations! You won!';
    }
    
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    
    if (winners.length > 1) {
      return `It's a tie! ${winners.map(w => w.name).join(' and ')} tied with ${maxScore} matches!`;
    }
    
    return `${winners[0].name} wins with ${maxScore} matches!`;
  };

  return (
    <div className="header">
      <h1>Card Matching Game</h1>
      {isGameWon && <div className="win-message">{getWinnerMessage()}</div>}
    </div>
  );
};

export default Header;