import { CellData } from "../types/CellData";
import { CellState } from "../types/CellStatus";
import { GameState } from "../types/GameState";

export const generateGameState = (
    size: number, 
    numMines: number, 
    score?: number,
    highScore?: number,
    winStreak?: number,
) => {
    const newGame: GameState = {
        size: size,
        cells: generateMines(size, numMines),
        mines: numMines,
        score: score || 0,
        highScore: highScore || 0,
        win: false,
        winStreak: winStreak || 0,
        gameover: false,
    }
    return newGame;
}

export const generateMines = (size: number, mineCount: number) => {
    if (mineCount > size){
        throw RangeError("mineCount should not be larger than size")
    }
    const xSize = Math.sqrt(size);
    const cells: CellData[] = Array.from({length: size}, (_, i) => ({
        index: i,
        x: i % xSize,
        y: Math.floor(i/xSize),
        data: {
            mine: false,
            status: CellState.Unknown
        }
    }));
    let currentCount = 0;
    
    while(currentCount < mineCount){
        for(let i=0; i < size; i++)
        {
            if (currentCount >= mineCount){
                break;
            }
            if(!cells[i].data.mine){
                const isMine = Math.random() < 0.2
                cells[i].data.mine = isMine;
                if (isMine) currentCount++;
            }
        }
    }
    return cells;
}

export const revealCell = (prevState: GameState, index: number) => {
    if(prevState.win || prevState.gameover){
        return prevState;
    }

    let newState = Object.assign({}, prevState);
    newState.cells.forEach(c => {
        if(c.index === index && c.data.status !== CellState.Flagged){
            if (c.data.mine){
                c.data.status = CellState.Exploded
                newState.gameover = true;
            }else{
                if (c.data.status === CellState.Unknown){
                    c = updateCellState(c, prevState.cells, index);
                    newState.score += 100;
                    if(c.data.status === CellState.Clear){
                        newState.cells = revealClearCells(prevState.cells, index);
                    }
                }
            }
        }
    })
    if (isWinCondition(newState)){
        newState.win = true;
        newState.winStreak++;
        if (newState.score > newState.highScore){
            newState.highScore = newState.score;
        }
    }
    return newState;
}

const updateCellState = (cellData: CellData, cells: CellData[], index: number) => {
    const newData = Object.assign({}, cellData);
    const mines = countNeighboringMines(cells, index);
    newData.data.status = mines > 0 ? CellState.Danger : CellState.Clear;
    newData.data.neighboringMines = mines;
    return newData;
}

export const isWinCondition = (gameState: GameState) => {
    return !gameState.gameover && (
        gameState.cells.filter(c => c.data.status === CellState.Unknown).length
        + gameState.cells.filter(c => c.data.status === CellState.Flagged).length
        === gameState.mines);
}

export const flagCell = (prevState: GameState, index: number) => {
    if(prevState.win || prevState.gameover){
        return prevState;
    }

    let newState = Object.assign({}, prevState);
    newState.cells.forEach(c => {
        if(c.index === index){
            c.data.status = c.data.status === CellState.Flagged ? CellState.Unknown : CellState.Flagged;
        }
    });
    return newState;
}

export const countNeighboringMines = (cells: CellData[], index: number) => {
    const analyzedCell = cells[index];

    return cells
    .filter(c => isNeighbor(analyzedCell, c))
    .filter(c => c.data.mine).length
}

const isNeighbor = (self: CellData, other: CellData) => {
    const x = self.x;
    const y = self.y;
    return ([x-1, x, x+1].includes(other.x) && [y-1, y+1].includes(other.y)) 
        || ([x-1, x+1].includes(other.x) && y === other.y);
}

export const revealNeighboringClearCells = (cells: CellData[], index: number) => {
    const analyzedCell = cells[index];

    return cells
    .map(c => {
        if(isNeighbor(analyzedCell, c) && !c.data.mine){
            return updateCellState(c, cells, c.index);
        }
        return c;
    })
}

export const revealClearCells = (cells: CellData[], index: number) => {
    let updatedCells = cells;
    let clearedCells = cells.filter(c => c.data.status === CellState.Clear).length;
    let newClearedCells = 0;
    while(clearedCells !== newClearedCells){
        clearedCells = newClearedCells;
        for (let i = 0; i < cells.length; i++){
            const normalizedIndex = i % cells.length;
            if(cells[normalizedIndex].data.status === CellState.Clear){
                updatedCells = revealNeighboringClearCells(cells, normalizedIndex);
            }
        }
        newClearedCells = cells.filter(c => c.data.status === CellState.Clear).length;
    }
    return updatedCells;
}