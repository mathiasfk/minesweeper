import { CellData } from "./CellData"

export type GameState = {
    size: number,
    cells: CellData[],
    score: number,
    win: boolean,
    winStreak: number,
    gameover: boolean,
}