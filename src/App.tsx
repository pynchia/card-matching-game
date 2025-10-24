import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import { useGame } from './hooks/useGame';
import './styles/app.css';

const App: React.FC = () => {
    const { cards, handleCardClick, isGameWon } = useGame();

    return (
        <div className="app">
            <Header isGameWon={isGameWon} />
            <Board cards={cards} onCardClick={handleCardClick} />
        </div>
    );
};

export default App;