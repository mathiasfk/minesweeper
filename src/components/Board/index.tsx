import { Cell } from "../Cell";

export const Board = (props:any) => {

  return (
  <div className="Board">
    {
      props.cells.map(
        (cell:any) => <Cell 
          key={cell.index} 
          index={cell.index} 
          onClick={props.onClick} 
          status={cell.data.status}
        ></Cell>)
    }
  </div>
)}