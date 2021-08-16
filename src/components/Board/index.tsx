import { Cell } from "../Cell";

export const Board = (props:any) => {

  const gridStyle = {
    gridTemplateColumns: 'auto '.repeat(Math.sqrt(props.size))
  }

  return (
  <div className="Board" style={gridStyle}>
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