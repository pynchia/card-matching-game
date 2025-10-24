import React from 'react';

interface Player {
  id: number;
  name: string;
  score: number;
  color: string;
}

interface PlayerScoreProps {
  players: Player[];
  currentPlayer: number;
}

const PlayerScore: React.FC<PlayerScoreProps> = ({ players, currentPlayer }) => {
  return (
    <div className="player-scores">
      {players.map((player, index) => (
        <div
          key={player.id}
          className={`player-card ${index === currentPlayer ? 'active' : ''}`}
          style={{ borderColor: player.color }}
        >
          <div className="player-name" style={{ color: player.color }}>
            {player.name}
            {index === currentPlayer && ' 👈'}
          </div>
          <div className="player-score">Score: {player.score}</div>
        </div>
      ))}
    </div>
  );
};

export default PlayerScore;
