import { CellState } from "../types/CellStatus";
import { GameState } from "../types/GameState";
import { countNeighboringMines, generateGameState, generateMines, revealCell } from "./GameStateManagement";

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

  test('the score should be zero', () => {
    const gameState = generateGameState(3,1);
    expect(gameState.score).toBe(0);
  })

  test('the win streak should be zero', () => {
    const gameState = generateGameState(3,1);
    expect(gameState.winStreak).toBe(0);
  })

  test('the win condition should be false', () => {
    const gameState = generateGameState(3,1);
    expect(gameState.win).toBeFalsy();
  })

  test('the gameover condition should be false', () => {
    const gameState = generateGameState(3,1);
    expect(gameState.gameover).toBeFalsy();
  })

  test('the number of mines shouldnt be larger than cells', () => {
    expect(() => generateGameState(3,4)).toThrow()
  })
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

  describe('and the cell has no bomb or neighboring bombs', () => {
    test('should be clear', () => {
      const gameState: GameState = generateGameState(1, 0);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.cells[0].data.status).toBe(CellState.Clear);
    })

    test('the score should be incremented', () => {
      const gameState: GameState = generateGameState(1, 0);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.score).toBeGreaterThan(0);
    })

    test('should win the game (1 cell)', () => {
      const gameState: GameState = generateGameState(1, 0);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.win).toBeTruthy();
      expect(newGameState.gameover).toBeFalsy();
    })

    test('should win the game (2 cells)', () => {
      const gameState: GameState = generateGameState(2, 1);
      gameState.cells[0].data.mine = false;
      gameState.cells[1].data.mine = true;
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.win).toBeTruthy();
      expect(newGameState.gameover).toBeFalsy();
    })

    test('should lose the game (1 cell)', () => {
      const gameState: GameState = generateGameState(1, 1);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.gameover).toBeTruthy();
      expect(newGameState.win).toBeFalsy();
    })

    test('should lose the game (2 cells)', () => {
      const gameState: GameState = generateGameState(2, 1);
      gameState.cells[0].data.mine = false;
      gameState.cells[1].data.mine = true;
      const newGameState = revealCell(gameState, 1);
  
      expect(newGameState.gameover).toBeTruthy();
      expect(newGameState.win).toBeFalsy();
    })
  })

  describe('and the cell has a bomb', () => {
    test('should be exploded', () => {
      const gameState: GameState = generateGameState(1, 1);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.cells[0].data.status).toBe(CellState.Exploded);
    })

    test('should be gameover', () => {
      const gameState: GameState = generateGameState(1, 1);
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.gameover).toBeTruthy();
    })
  })

  describe('and the cell has no bomb but do have neighboring bombs', () => {
    test('should be danger', () => {
      const gameState: GameState = generateGameState(2, 0);
      gameState.cells[1].data.mine = true;
      const newGameState = revealCell(gameState, 0);
  
      expect(newGameState.cells[0].data.status).toBe(CellState.Danger);
    })
  })
})

describe('The number of neighbouring mines', () => {

  test('should be 0', () => {
    const gameState: GameState = generateGameState(9, 0);
    gameState.cells[8].data.mine = true;
    const mines = countNeighboringMines(gameState.cells, 0)

    expect(mines).toBe(0);
  })

  test('should be 1', () => {
    const gameState: GameState = generateGameState(9, 0);
    gameState.cells[1].data.mine = true;
    const mines = countNeighboringMines(gameState.cells, 0)

    expect(mines).toBe(1);
  })

  test('should be 2', () => {
    const gameState: GameState = generateGameState(9, 0);
    gameState.cells[0].data.mine = true;
    gameState.cells[2].data.mine = true;
    const mines = countNeighboringMines(gameState.cells, 1)

    expect(mines).toBe(2);
  })

  test('should be 4', () => {
    const gameState: GameState = generateGameState(9, 0);
    gameState.cells[0].data.mine = true;
    gameState.cells[2].data.mine = true;
    gameState.cells[3].data.mine = true;
    gameState.cells[5].data.mine = true;
    const mines = countNeighboringMines(gameState.cells, 4)

    expect(mines).toBe(4);
  })

  test('should be 6', () => {
    const gameState: GameState = generateGameState(9, 0);
    gameState.cells[0].data.mine = true;
    gameState.cells[2].data.mine = true;
    gameState.cells[3].data.mine = true;
    gameState.cells[5].data.mine = true;
    gameState.cells[6].data.mine = true;
    gameState.cells[8].data.mine = true;
    const mines = countNeighboringMines(gameState.cells, 4)

    expect(mines).toBe(6);
  })
})