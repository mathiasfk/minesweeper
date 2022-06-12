import "./cell.css";
import { CellState } from '../../types/CellStatus';

type Props = {
  index: number,
  onClick: (index:number) => void,
  status: CellState,
  neighboringMines?: number,
}

export const Cell: React.FC<Props> = props => {

  const onClick = (index:number) => {
      props.onClick(index);
  };
  return (
    <div data-testid="cell" 
        className={`Cell  ${CellState[props.status]}${props.neighboringMines || ''}`}
        onClick={() => onClick(props.index)}>
          <p>{props.neighboringMines}</p>
    </div>);
}