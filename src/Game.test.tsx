import { render, screen } from '@testing-library/react';
import Game, { generateMines } from './Game';

describe('When the Game loads', () => {
  beforeEach(() => render(<Game />));

  test('there should be a header', () => {  
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  test('there should be a board', () => {
    const header = screen.getByTestId('board');
    expect(header).toBeInTheDocument();
  });
})

describe('When the mines are generated', () => {

  test.each([
    [1, 1],
    [1, 4],
    [1, 16],
    [2, 4],
    [2, 16],
    [16, 16],
  ])('with %p mines, there should be %p cells', (numMines, numCells) => {  
    const cells = generateMines(numCells, numMines);
    expect(cells?.length).toBe(numCells);
  });
  
  test.each([
    [1, 1],
    [4, 1],
    [9, 1],
    [16, 1],
    [4, 2],
    [9, 2],
    [16, 2],
    [16, 16]
  ])('with %p cells, there should be %p mines', (numCells, numMines) => {  
    const cells = generateMines(numCells, numMines);
    expect(cells?.filter(c => c.data.mine).length).toBe(numMines);
  });
  
})