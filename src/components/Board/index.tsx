import "./board.css";
import { CellData } from "../../types/CellData";
import { Cell } from "../Cell";

type Props = {
  size:number,
  cells:CellData[], 
  onClick:(index:number) => void,
}

export const Board = (props:Props) => {

  const gridStyle = {
    gridTemplateColumns: 'auto '.repeat(Math.sqrt(props.size))
  }

  return (
  <div className="Board" style={gridStyle} data-testid="board">
    {
      props.cells.map(
        cell => <Cell 
          key={cell.index} 
          index={cell.index} 
          onClick={props.onClick} 
          status={cell.data.status}
          neighboringMines={cell.data.neighboringMines}
        >
        </Cell>)
    }
  </div>
)}