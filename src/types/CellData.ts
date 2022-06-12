import { CellState } from "./CellStatus"

export type CellData = {
    index: number,
    data: {
        mine: boolean,
        status: CellState
    }
}