import React from 'react';

interface HeaderProps {
  isGameWon: boolean;
}

const Header: React.FC<HeaderProps> = ({ isGameWon }) => {
  return (
    <div className="header">
      <h1>Card Matching Game</h1>
      {isGameWon && <div className="win-message">Congratulations! You won!</div>}
    </div>
  );
};

export default Header;