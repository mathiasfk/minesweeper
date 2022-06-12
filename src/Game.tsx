import "./App.css";
import { Board } from "./components/Board";
import { useCallback, useEffect, useState } from "react";
import { Header } from "./components/Header";
import { GameState } from "./types/GameState";
import { generateGameState, revealCell } from "./state/GameStateManagement";

const initalGameState: GameState = {
    cells: [],
    score: 0,
    win: false,
    winStreak: 0,
}

function Game() {

    const [gameState, setGameState] = useState<GameState>(initalGameState);

    const initializeGame = useCallback((size: number, numMines: number) => {
        setGameState(generateGameState(size, numMines));
    },[]);

    const onClickUpdateState = (index: number) => {
        setGameState(revealCell(gameState, index));
    }

    useEffect(() => initializeGame(9, 1), [initializeGame]);

    return (
    <div className="App">
      <Header
        isWin={false}
        isGameover={false}
        score={gameState.score}
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
