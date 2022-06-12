import { render, screen } from '@testing-library/react';
import { Cell } from '.';
import { CellState } from '../../types/CellStatus';

describe('When the a Cell is rendered', () => {

    test('should appear on the screen', () => {
        render(<Cell index={0} onClick={() => null} status={CellState.Unknown}/>);

        const cell = screen.getByTestId('cell');
        expect(cell).toBeInTheDocument();
    });

    test.each([
        [CellState.Unknown, CellState[CellState.Unknown]],
        [CellState.Clear, CellState[CellState.Clear]],
        [CellState.Exploded, CellState[CellState.Exploded]],
    ])('when the state is %p the class should be %p', (state: CellState, className: string) => {
        const { container } = render(<Cell index={0} onClick={() => null} status={state}/>);

        const cell = container.getElementsByClassName(className);
        expect(cell.length).toBe(1);
    });
});