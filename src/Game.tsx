import "./Game.css";
import { Board } from "./components/Board";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { GameState } from "./types/GameState";
import { flagCell, generateGameState, revealCell } from "./state/GameStateManagement";
import { Controls } from "./components/Controls";

const INITIAL_SIZE = 9;
const INITIAL_MINES = 1;
const MAX_SIZE = 400;
const MAX_MINES = MAX_SIZE/2;

const initalGameState: GameState = {
    size: 0,
    cells: [],
    mines: 0,
    score: 0,
    highScore: 0,
    win: false,
    winStreak: 0,
    gameover: false,
}

function Game() {

    const [gameState, setGameState] = useState<GameState>(initalGameState);

    const saveGameState = (gameState: GameState) => {
      setGameState(gameState);
      localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    const initializeGame = useCallback(() => {
      const serializedGameState = localStorage.getItem("gameState");
      if (serializedGameState){
        saveGameState(JSON.parse(serializedGameState))
      }else {
        saveGameState(generateGameState(INITIAL_SIZE, INITIAL_MINES));
      }
    },[]);

    const onClickUpdateState = (index: number) => {
        saveGameState(revealCell(gameState, index));
    }

    const onRightClickUpdateState = (index: number) => {
      saveGameState(flagCell(gameState, index));
  }

    const onClickNext = () => {
      let newSize =  Math.pow(Math.sqrt(gameState.size) + 1, 2);
      if (newSize > MAX_SIZE) newSize = MAX_SIZE;

      let newMines =  Math.round(gameState.mines * 1.5);
      if (newMines > MAX_MINES) newMines = MAX_MINES;

      const newGame = generateGameState(
        newSize, 
        newMines,
        gameState.score,
        gameState.highScore,
        gameState.winStreak,
      )
      saveGameState(newGame);
    }

    const onClickRestart = () => {
        const newGame = generateGameState(
            INITIAL_SIZE,
            INITIAL_MINES,
            0,
            gameState.highScore,
            0,
        )
        saveGameState(newGame);
    }

    useEffect(() => initializeGame(), [initializeGame]);

    return (
    <div className="App">
      <Header
        isWin={gameState.win}
        isGameover={gameState.gameover}
        score={gameState.score}
        winStreak={gameState.winStreak}
        highScore={gameState.highScore}
        mines={gameState.mines}
      />
      <div className="Board-container">
        <Board size={gameState.size} cells={gameState.cells} onClick={onClickUpdateState} onRightClick={onRightClickUpdateState}></Board>
      </div>
      <Controls gameState={gameState} onClickNext={onClickNext} onClickRestart={onClickRestart}/>
    </div>
  );
}

export default Game;
