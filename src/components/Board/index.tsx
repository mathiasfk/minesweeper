import { Cell } from "../Cell";

export const Board = (props:any) => {

  let cells = [];
  for(let i=0; i < props.size; i++)
  {
    cells.push(<Cell key={i} index={`${i}`}></Cell>);
  }

  return (
  <div className="Board">
    {
      cells
    }
  </div>
)}