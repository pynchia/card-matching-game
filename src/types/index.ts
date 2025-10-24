export interface Card {
    id: number;
    content: string;
    isFlipped: boolean;
}

export interface GameState {
    cards: Card[];
    matchedPairs: number;
    isGameWon: boolean;
    moves: number;
}