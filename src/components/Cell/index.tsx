import { useEffect, useState } from 'react';

export const Cell = (props:any) => {

  const [classes, setClasses] = useState<string>("");

  useEffect(() => setClasses(props.status), [props.status]);

  const onClick = (index:number) => {
      props.onClick(index);
  };
  return <div className={"Cell " + classes} onClick={() => onClick(props.index)}></div>;
}