type Props = {
    isWin: boolean,
    isGameover: boolean,
    score: number,
    highScore: number,
    winStreak: number,
}

export function Header(props: Props){
    return (
    <header className="App-header" data-testid="header">
        {props.isWin && !props.isGameover ? "You won! - " : ""}
        {props.isGameover ? "Game over - " : ""}
        Score: {props.score}
        <br/>
        High score: {props.highScore}
        <br/>
        Win streak: {props.winStreak}
  </header>)
}