import { Cell } from "../Cell";

export const Board = (props:any) => {

  let cells = [];
  for(let i=0; i < props.size; i++)
  {
    cells.push(
    <Cell 
      key={i} 
      index={`${i}`} 
      onClick={props.onClick} 
      isMine={Math.random() < 0.3}
      gameover={props.gameover}
    ></Cell>);
  }

  return (
  <div className="Board">
    {
      cells
    }
  </div>
)}