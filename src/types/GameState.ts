import { CellData } from "./CellData"

export type GameState = {
    cells: CellData[],
    score: number,
    win: boolean,
    winStreak: number,
}