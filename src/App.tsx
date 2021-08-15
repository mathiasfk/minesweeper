import './App.css';
import { Board } from './components/Board';
import { useEffect, useState } from 'react';

const BOARD_SIZE = 25;
const MAX_MINES = Math.sqrt(BOARD_SIZE);

const isLeftColumn = (index:number) => {
  const rowSize = Math.sqrt(BOARD_SIZE);
  return (index % rowSize) === 0;
}

const isRightColumn = (index:number) => {
  const rowSize = Math.sqrt(BOARD_SIZE);
  return ((index + 1) % rowSize) === 0;
}

const isTopRow = (index:number) => {
  const rowSize = Math.sqrt(BOARD_SIZE);
  return (index < rowSize);
}

const isBottomRow = (index:number) => {
  const rowSize = Math.sqrt(BOARD_SIZE);
  return (index >= BOARD_SIZE - rowSize);
}

const generateMines = () => {
  let cells = [];
  let mineCount = 0;

  for(let i=0; i < BOARD_SIZE; i++)
  {
    const isMine = Math.random() < 0.2 && (mineCount++ < MAX_MINES);
    cells.push({
      index: i,
      data: {
        mine: isMine,
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
    const validIndex = (index + BOARD_SIZE) % BOARD_SIZE;
    return cells.some((cell:any) => {
      return (cell.index === validIndex && cell.data.mine)
    });
  }

  const countNeighbors = (index:number) => {
    const rowSize = Math.sqrt(BOARD_SIZE);
    let count = 0;

    if(!isLeftColumn(index) && checkMine(index - 1)) count += 1;
    if(!isRightColumn(index) && checkMine(index + 1)) count += 1;

    if(!isTopRow(index) && checkMine(index - rowSize)) count += 1;
    if(!isBottomRow(index) && checkMine(index + rowSize)) count += 1;

    if(!isTopRow(index) && !isLeftColumn(index) && checkMine(index - rowSize - 1)) count += 1;
    if(!isTopRow(index) && !isRightColumn(index) && checkMine(index - rowSize + 1)) count += 1;
    if(!isBottomRow(index) && !isRightColumn(index) && checkMine(index + rowSize + 1)) count += 1;
    if(!isBottomRow(index) && !isLeftColumn(index) && checkMine(index + rowSize - 1)) count += 1;

    return count;
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

  const selectStatus = (hitMine: boolean, neighborMines: number) => {
    let status = '';
    if (hitMine){
      status = 'exploded';
    } else if(neighborMines === 0){
      status = 'clear';
    } else if(neighborMines === 1){
      status = 'warning';
    } else if(neighborMines > 1){
      status = 'danger';
    }
    return status;
  }

  const onClick = (index:number) => {
    if (gameover) return;

    const hitMine = checkMine(index);
    setScore(hitMine ? score : score + 100);

    const neighborMines = countNeighbors(index);
    updateStatus(index, selectStatus(hitMine, neighborMines));

    if(hitMine) setGameover(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {gameover ? "Game over - " : " "} Score: {score}
      </header>
      <div className="Board-container">
        <Board cells={cells} onClick={onClick}></Board>
      </div>
    </div>
  );
}

export default App;
