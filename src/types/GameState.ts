import { CellData } from "./CellData"

export type GameState = {
    size: number,
    cells: CellData[],
    mines: number,
    score: number,
    highScore: number,
    win: boolean,
    winStreak: number,
    gameover: boolean,
}