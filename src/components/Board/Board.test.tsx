import { render, screen } from '@testing-library/react';
import { Board } from '.';
import { generateMines } from '../../state/GameStateManagement';

describe('When the Board is rendered', () => {

    test('should appear on the screen', () => {
        const size = 9;
        const mines = 2;
        render(<Board onClick={() => null} cells={generateMines(size, mines)} size={size}/>);

        const board = screen.getByTestId('board');
        expect(board).toBeInTheDocument();
    });

    test('should have the correct amount of cells', () => {
        const size = 9;
        const mines = 2;
        render(<Board onClick={() => null} cells={generateMines(size, mines)} size={size}/>);

        const cell = screen.getAllByTestId('cell');
        expect(cell.length).toBe(size);
    });
});