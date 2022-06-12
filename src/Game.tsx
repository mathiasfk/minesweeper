import "./Game.css";
import { Board } from "./components/Board";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { GameState } from "./types/GameState";
import { generateGameState, revealCell } from "./state/GameStateManagement";
import { Controls } from "./components/Controls";

const INITIAL_SIZE = 9;
const INITIAL_MINES = 1;

const initalGameState: GameState = {
    size: 0,
    cells: [],
    mines: 0,
    score: 0,
    win: false,
    winStreak: 0,
    gameover: false,
}

function Game() {

    const [gameState, setGameState] = useState<GameState>(initalGameState);

    const initializeGame = useCallback((size: number, numMines: number) => {
        setGameState(generateGameState(size, numMines));
    },[]);

    const onClickUpdateState = (index: number) => {
        setGameState(revealCell(gameState, index));
    }

    const onClickNext = () => {
        initializeGame(Math.pow(Math.sqrt(gameState.size) + 1, 2), Math.round(gameState.mines * 1.5))
    }

    const onClickRestart = () => {
        initializeGame(INITIAL_SIZE, INITIAL_MINES)
    }

    useEffect(() => initializeGame(INITIAL_SIZE, INITIAL_MINES), [initializeGame]);

    return (
    <div className="App">
      <Header
        isWin={gameState.win}
        isGameover={gameState.gameover}
        score={gameState.score}
        winStreak={gameState.winStreak}
        highScore={0}
        mines={gameState.mines}
      />
      <div className="Board-container">
        <Board size={gameState.size} cells={gameState.cells} onClick={onClickUpdateState}></Board>
      </div>
      <Controls gameState={gameState} onClickNext={onClickNext} onClickRestart={onClickRestart}/>
    </div>
  );
}

export default Game;
