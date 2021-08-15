import { useState } from 'react';

export const Cell = (props:any) => {

  const [clicked, setClicked] = useState(false);
  const [classes, setClasses] = useState("Cell");

  const onClick = (index:number) => {
    if(!props.gameover && !clicked){
      console.log(index);
      setClicked(true);
      setClasses (classes + (props.isMine ? " Cell-exploded" : " Cell-clicked"));
      
      props.onClick(props.isMine);
    }
  };
  return <div className={classes} onClick={() => onClick(props.index)}>[{props.index}]</div>;
}