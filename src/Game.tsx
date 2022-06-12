import "./App.css";
import { Board } from "./components/Board";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { CellData } from "./types/CellData";
import { GameState } from "./types/GameState";
import { CellState } from "./types/CellStatus";

const initalGameState: GameState = {
    cells: []
}

export const generateMines = (size: number, mineCount: number) => {
    const cells: CellData[] = Array.from({length: size}, (_, i) => ({
        index: i,
        data: {
            mine: false,
            status: CellState.Unknown
        }
    }));
    let currentCount = 0;
    
    while(currentCount < mineCount){
        for(let i=0; i < size; i++)
        {
            if (currentCount >= mineCount){
                break;
            }
            if(cells[i].data.mine){
                continue;
            }else{
                const isMine = Math.random() < 0.2
                cells[i].data.mine = isMine;
                if (isMine) currentCount++;
            }
        }
    }
    return cells;
}

export const revealCell = (prevState: GameState, index: number) => {
    let newState = prevState;
    newState.cells.forEach(c => {
        if(c.index === index){
            c.data.status = c.data.mine ? CellState.Exploded : CellState.Clear;
        }
    })
    return newState;
}

export const generateGameState = (size: number, numMines: number) => {
    const newGame: GameState = {
        cells: generateMines(size, numMines),
    }
    return newGame;
}

function Game() {

    const [gameState, setGameState] = useState<GameState>(initalGameState);

    const initializeGame = useCallback((size: number, numMines: number) => {
        setGameState(generateGameState(size, numMines));
    },[]);

    const onClickUpdateState = (index: number) => {

    }

    useEffect(() => initializeGame(9, 1), [initializeGame]);

    return (
    <div className="App">
      <Header
        isWin={false}
        isGameover={false}
        score={0}
        winStreak={0}
        highScore={0}
      />
      <div className="Board-container">
        <Board size={9} cells={gameState.cells} onClick={onClickUpdateState}></Board>
      </div>
    </div>
  );
}

export default Game;
