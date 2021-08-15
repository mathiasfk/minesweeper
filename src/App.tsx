import './App.css';
import { Board } from './components/Board';
import { useEffect, useState } from 'react';

const generateMines = () => {
  let cells = [];

  for(let i=0; i < 25; i++)
  {
    cells.push({
      index: i,
      data: {
        mine: Math.random() < 0.3,
        status: 'unknown'
      }
    });
  }
  return cells;
}


function App() {
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [cells, setCells] = useState<any>([]);

  useEffect(() => setCells(generateMines()),[]);

  const checkMine = (index:number) => {
    return cells.some((cell:any) => {
      if(cell.index === index && cell.data.mine)
      {
        console.log(cells);
      }
      return (cell.index === index && cell.data.mine)
    });
  }

  const updateStatus = (index:number, status:string) => {
    const updateCells = cells.map((cell:any) => {
      if(cell.index === index){
        return {
          index: cell.index, 
          data: {
            mine: cell.mine,
            status: status
          }
        }
      }else{
        return cell;
      }
    })
    setCells(updateCells);
  }

  const onClick = (index:number) => {
    if (gameover) return;

    const hitMine = checkMine(index);
    setScore(hitMine ? score : score + 100);
    updateStatus(index, hitMine ? 'exploded' : 'clear');

    if(hitMine) setGameover(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {gameover ? "Game over - " : " "} Score: {score}
      </header>
      <div className="Board-container">
        <Board cells={cells} onClick={onClick} gameover={gameover}></Board>
      </div>
    </div>
  );
}

export default App;
