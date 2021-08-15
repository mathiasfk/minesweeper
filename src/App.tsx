import './App.css';
import { Board } from './components/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Score: 1000
      </header>
      <div className="Board-container">
        <Board size={25}></Board>
      </div>
    </div>
  );
}

export default App;
