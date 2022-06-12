import { CellState } from "./CellStatus"

export type CellData = {
    index: number,
    x: number,
    y: number,
    data: {
        mine: boolean,
        status: CellState,
        neighboringMines?: number,
    }
}