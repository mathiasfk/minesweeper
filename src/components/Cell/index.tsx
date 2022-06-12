import { CellState } from '../../types/CellStatus';

type Props = {
  index: number,
  onClick: (index:number) => void,
  status: CellState,
}

export const Cell = (props:Props) => {

  const onClick = (index:number) => {
      props.onClick(index);
  };
  return <div data-testid="cell" className={"Cell " + CellState[props.status]} onClick={() => onClick(props.index)}></div>;
}