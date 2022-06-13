import { render, screen } from '@testing-library/react';
import { Cell } from '.';
import { CellState } from '../../types/CellStatus';

describe('When the a Cell is rendered', () => {

    test('should appear on the screen', () => {
        render(<Cell index={0} onClick={() => null} onRightClick={() => null} status={CellState.Unknown}/>);

        const cell = screen.getByTestId('cell');
        expect(cell).toBeInTheDocument();
    });

    test.each([
        [CellState.Unknown, CellState[CellState.Unknown]],
        [CellState.Clear, CellState[CellState.Clear]],
        [CellState.Exploded, CellState[CellState.Exploded]],
    ])('when the state is %p the class should be %p', (state: CellState, className: string) => {
        const { container } = render(<Cell index={0} onClick={() => null} onRightClick={() => null} status={state}/>);

        const cell = container.getElementsByClassName(className);
        expect(cell.length).toBe(1);
    });

    test.each([
        0, 1, 3, 4, 5, 6, 7, 8
    ])('it should have the Flagged class with %p neighboring mines', (mines) => {
        render(<Cell index={0} onClick={() => null} onRightClick={() => null} status={CellState.Flagged} neighboringMines={mines}/>);

        const cell = screen.getByTestId('cell');
        expect(cell).toHaveClass('Flagged');
    });
});