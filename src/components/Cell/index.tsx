import "./cell.css";
import { CellState } from '../../types/CellStatus';

type Props = {
  index: number,
  onClick: (index:number) => void,
  onRightClick: (index:number) => void,
  status: CellState,
  neighboringMines?: number,
}

export const Cell: React.FC<Props> = props => {
  return (
    <div data-testid="cell" 
        className={`Cell  ${CellState[props.status]}${props.neighboringMines || ''}`}
        onClick={() => props.onClick(props.index)}
        onContextMenu={(e) => {props.onRightClick(props.index); e.preventDefault();}}>
          <p>{props.neighboringMines}</p>
    </div>);
}