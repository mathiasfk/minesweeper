import { useEffect, useState } from 'react';

type Props = {
  index: number,
  onClick: (index:number) => void,
  status: string,
}

export const Cell = (props:Props) => {

  const [classes, setClasses] = useState<string>("");

  useEffect(() => setClasses(props.status), [props.status]);

  const onClick = (index:number) => {
      props.onClick(index);
  };
  return <div className={"Cell " + classes} onClick={() => onClick(props.index)}></div>;
}