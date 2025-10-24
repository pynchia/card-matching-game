import { render, screen, fireEvent } from '@testing-library/react';
import Board from '../src/components/Board';
import { useGame } from '../src/hooks/useGame';

jest.mock('../src/hooks/useGame');

describe('Card Matching Game', () => {
  beforeEach(() => {
    useGame.mockReturnValue({
      cards: [
        { id: 1, content: 'A', flipped: false, matched: false },
        { id: 2, content: 'B', flipped: false, matched: false },
        { id: 3, content: 'A', flipped: false, matched: false },
        { id: 4, content: 'B', flipped: false, matched: false },
      ],
      flipCard: jest.fn(),
      checkMatch: jest.fn(),
      resetGame: jest.fn(),
      winState: false,
    });
  });

  test('renders the board with cards', () => {
    render(<Board />);
    const cards = screen.getAllByRole('button');
    expect(cards).toHaveLength(4);
  });

  test('flips a card when clicked', () => {
    render(<Board />);
    const card = screen.getByText('A');
    fireEvent.click(card);
    expect(useGame().flipCard).toHaveBeenCalledWith(1);
  });

  test('detects a match', () => {
    useGame.mockReturnValueOnce({
      cards: [
        { id: 1, content: 'A', flipped: true, matched: false },
        { id: 2, content: 'B', flipped: true, matched: false },
        { id: 3, content: 'A', flipped: true, matched: false },
        { id: 4, content: 'B', flipped: true, matched: false },
      ],
      flipCard: jest.fn(),
      checkMatch: jest.fn(),
      resetGame: jest.fn(),
      winState: false,
    });
    render(<Board />);
    expect(useGame().checkMatch).toHaveBeenCalled();
  });

  test('displays win state when all matches are found', () => {
    useGame.mockReturnValueOnce({
      cards: [
        { id: 1, content: 'A', flipped: true, matched: true },
        { id: 2, content: 'B', flipped: true, matched: true },
        { id: 3, content: 'A', flipped: true, matched: true },
        { id: 4, content: 'B', flipped: true, matched: true },
      ],
      flipCard: jest.fn(),
      checkMatch: jest.fn(),
      resetGame: jest.fn(),
      winState: true,
    });
    render(<Board />);
    expect(screen.getByText(/you win/i)).toBeInTheDocument();
  });
});