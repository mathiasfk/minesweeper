import { render, screen } from '@testing-library/react';
import Game, { generateGameState, generateMines, revealCell } from './Game';
import { CellState } from './types/CellStatus';
import { GameState } from './types/GameState';

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

describe('When the game state is generated', () => {

  test.each([
    [1, 1],
    [4, 1],
    [9, 1],
    [16, 1],
    [4, 2],
    [9, 2],
    [16, 2],
    [16, 16]
  ])('with %p cells and %p mines, the number of cells should be correct', (numCells, numMines) => {  
    const gameState = generateGameState(numCells, numMines);
    expect(gameState.cells?.length).toBe(numCells);
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
  ])('with %p cells and %p mines, the number of mines should be correct', (numCells, numMines) => {  
    const gameState = generateGameState(numCells, numMines);
    expect(gameState.cells?.filter(c => c.data.mine).length).toBe(numMines);
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

describe('When an a cell is revealed', () => {

  test('should be clear', () => {
    const gameState: GameState = {
      cells: generateMines(1, 0),
    }
    const newGameState = revealCell(gameState, 0);

    expect(newGameState.cells[0].data.status).toBe(CellState.Clear);
  })

  test('should be exploded', () => {
    const gameState: GameState = {
      cells: generateMines(1, 1),
    }
    const newGameState = revealCell(gameState, 0);

    expect(newGameState.cells[0].data.status).toBe(CellState.Exploded);
  })
  
})