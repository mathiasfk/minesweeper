import './App.css';
import { Board } from './components/Board';
import { useState } from 'react';

function App() {
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);

  const onClick= (hitMine:boolean) => {
    setScore(hitMine ? score : score + 100);
    if(hitMine) setGameover(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        {gameover ? "Game over - " : " "} Score: {score}
      </header>
      <div className="Board-container">
        <Board size={25} onClick={onClick} gameover={gameover}></Board>
      </div>
    </div>
  );
}

export default App;
