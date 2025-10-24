export interface Card {
    id: number;
    content: string;
    isFlipped: boolean;
}

export interface Player {
    id: number;
    name: string;
    score: number;
    color: string;
}

export interface GameState {
    cards: Card[];
    matchedPairs: number;
    isGameWon: boolean;
    moves: number;
    currentPlayer?: number;
    players?: Player[];
}