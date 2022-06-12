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
        if(c.index === index){
            if (c.data.mine){
                c.data.status = CellState.Exploded
                newState.gameover = true;
            }else{
                const mines = countNeighboringMines(prevState.cells, index);
                c.data.status = mines > 0 ? CellState.Danger : CellState.Clear;
                c.data.neighboringMines = mines;
                newState.score += 100;
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
    const x = cells[index].x;
    const y = cells[index].y;

    return cells
    .filter(c => ([x-1, x, x+1].includes(c.x) && [y-1, y+1].includes(c.y)) 
                 || ([x-1, x+1].includes(c.x) && y === c.y))
    .filter(c => c.data.mine).length
}