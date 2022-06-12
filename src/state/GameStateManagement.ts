import { CellData } from "../types/CellData";
import { CellState } from "../types/CellStatus";
import { GameState } from "../types/GameState";

export const generateMines = (size: number, mineCount: number) => {
    const cells: CellData[] = Array.from({length: size}, (_, i) => ({
        index: i,
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
            if(cells[i].data.mine){
                continue;
            }else{
                const isMine = Math.random() < 0.2
                cells[i].data.mine = isMine;
                if (isMine) currentCount++;
            }
        }
    }
    return cells;
}

export const revealCell = (prevState: GameState, index: number) => {
    let newState = Object.assign({}, prevState);
    newState.cells.forEach(c => {
        if(c.index === index){
            c.data.status = c.data.mine ? CellState.Exploded : CellState.Clear;
        }
    })
    newState.score += 100;
    return newState;
}

export const generateGameState = (size: number, numMines: number) => {
    const newGame: GameState = {
        cells: generateMines(size, numMines),
        score: 0,
        win: false,
        winStreak: 0,
    }
    return newGame;
}