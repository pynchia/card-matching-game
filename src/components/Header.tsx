import React from 'react';

const Header: React.FC<{ winState: boolean }> = ({ winState }) => {
    return (
        <header>
            <h1>Card Matching Game</h1>
            {winState && <h2>Congratulations! You've matched all the cards!</h2>}
        </header>
    );
};

export default Header;