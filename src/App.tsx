import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Header from './components/Header';
import PlayerScore from './components/PlayerScore';
import { useGame } from './hooks/useGame';
import './styles/app.css';

const App: React.FC = () => {
    const [isMultiplayer, setIsMultiplayer] = useState(false);
    const [playerCount, setPlayerCount] = useState(2);
    const [gameStarted, setGameStarted] = useState(false);
    
    const { cards, flipCard: handleCardClick, isWon: isGameWon, initializeGame, players, currentPlayer } = useGame(isMultiplayer, playerCount);

    const startGame = () => {
        const initialCards = ['🌟', '🎈', '🎨', '🎭', '🎮', '🎲', '🎪', '🎯'];
        initializeGame(initialCards);
        setGameStarted(true);
    };

    useEffect(() => {
        if (!gameStarted) {
            startGame();
        }
    }, [gameStarted]);

    const resetGame = () => {
        setGameStarted(false);
    };

    return (
        <div className="app">
            <Header isGameWon={isGameWon} players={isMultiplayer ? players : undefined} />
            
            {!gameStarted && (
                <div className="game-setup">
                    <h2>Game Setup</h2>
                    <div className="setup-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={isMultiplayer}
                                onChange={(e) => setIsMultiplayer(e.target.checked)}
                            />
                            Multiplayer Mode
                        </label>
                        
                        {isMultiplayer && (
                            <div className="player-count">
                                <label>
                                    Number of Players:
                                    <select
                                        value={playerCount}
                                        onChange={(e) => setPlayerCount(Number(e.target.value))}
                                    >
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                    </select>
                                </label>
                            </div>
                        )}
                        
                        <button onClick={startGame} className="start-button">Start Game</button>
                    </div>
                </div>
            )}
            
            {gameStarted && (
                <>
                    {isMultiplayer && players.length > 0 && (
                        <PlayerScore players={players} currentPlayer={currentPlayer} />
                    )}
                    <Board cards={cards} onCardClick={handleCardClick} />
                    <button onClick={resetGame} className="reset-button">New Game</button>
                </>
            )}
        </div>
    );
};

export default App;