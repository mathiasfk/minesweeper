import './App.css';
import { Board } from './components/Board';
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { CellData } from './types/CellData';

const BOARD_SIZE = 36;
const MAX_MINES = Math.sqrt(BOARD_SIZE) - 1;
const POINTS_INCREMENT = 100;
const POINTS_WIN = 500;

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

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [win, setWin] = useState(false);
  const [cells, setCells] = useState<CellData[]>([]);
  const [winStreak, setWinStreak] = useState(0);

  const generateMines = () => {
    let cells = [];
    let mineCount = 0;
    
    for(let i=0; i < BOARD_SIZE; i++)
    {
      let isMine = false;
      if(Math.random() < 0.2 && mineCount < MAX_MINES){
        isMine = true;
        mineCount++;
      }

      //console.log(mineCount);
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

  useEffect(() => setCells(generateMines()),[]);

  const checkMine = (index:number) => {
    const validIndex = (index + BOARD_SIZE) % BOARD_SIZE;
    return cells.some(cell => {
      return (cell.index === validIndex && cell.data.mine)
    });
  }

  const getStatus = (index:number) => {
    const validIndex = (index + BOARD_SIZE) % BOARD_SIZE;
    return cells.filter(cell => cell.index === validIndex)[0].data.status;
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
    const updateCells = cells.map(cell => {
      if(cell.index === index){
        return {
          index: cell.index, 
          data: {
            mine: cell.data.mine,
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
    }else if(neighborMines > 0){
      status = `danger-${neighborMines}`;
    }
    return status;
  }

  const countUnknown = () => {
    return cells.filter(
      cell => cell.data.status === 'unknown'
    ).reduce(
      (sum: number,) => sum + 1, 0
    )
  }

  const countMines = () => {
    return cells.filter(
      cell => cell.data.mine
    ).reduce(
      (sum: number,) => sum + 1, 0
    )
  }

  const onClick = (index:number) => {
    if (gameover || win) return;

    const hitMine = checkMine(index);
    
    if (getStatus(index) === 'unknown' && !hitMine)
    {
      updateScore(score + POINTS_INCREMENT);
    }

    const neighborMines = countNeighbors(index);
    const unknownCount = countUnknown();
    const mineCount = countMines();

    //console.log(unknownCount);
    updateStatus(index, selectStatus(hitMine, neighborMines));

    if(unknownCount <= mineCount + 1){
      onWin();
    }

    if(hitMine){
      onLose();
    }
  };

  const updateScore = (score: number) => {
    setHighScore(score >= highScore ? score : highScore);
    setScore(score);
  }

  const onWin = () => {
    setWin(true);
    updateScore(score + POINTS_WIN);
    setWinStreak(winStreak + 1);
  }

  const onLose = () => {
    setGameover(true);
  }

  const onRestart = () => {
    setCells(generateMines());
    setGameover(false);
    setHighScore(score > highScore ? score : highScore);
    setScore(0);
    setWin(false);
    setWinStreak(0);
  }

  const onNext = () => {
    setCells(generateMines());
    setGameover(false);
    setWin(false);
  }

  return (
    <div className="App">
      <Header 
        isWin={win} 
        isGameover={gameover} 
        score={score} 
        winStreak={winStreak} 
        highScore={highScore}
      />
      <div className="Board-container">
        <Board size={BOARD_SIZE} cells={cells} onClick={onClick}></Board>
      </div>
      <div className="Button-container">
        {gameover && !win ?<button className="Button restart" onClick={onRestart}>Restart</button> : <></>}
      </div>
      <div className="Button-container">
        {win && !gameover ? <button className="Button next" onClick={onNext}>Continue</button> : <></>}
      </div>
    </div>
  );
}

export default App;
