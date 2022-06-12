import { CellData } from "./CellData"

export type GameState = {
    size: number,
    cells: CellData[],
    mines: number,
    score: number,
    win: boolean,
    winStreak: number,
    gameover: boolean,
}