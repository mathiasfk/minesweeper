import { useState } from 'react';

export const Cell = (props:any) => {

  const [clicked, setClicked] = useState(false);

  const onClick = (index:number) => {
    console.log(index);
    setClicked(true);
  };
  return <div className={"Cell " + (clicked ? "Cell-clicked" : "")} onClick={() => onClick(props.index)}>[{props.index}]</div>;
}