import { GameState } from "../../types/GameState"

type Props = {
    gameState: GameState,
    onClickNext: () => void,
    onClickRestart: () => void,
}

export const Controls: React.FC<Props> = (props) => {
    return (
    <div>
        {props.gameState.win && "Congratulations!"}
        {props.gameState.gameover && "Better luck next time..."}
        {props.gameState.win && <button onClick={props.onClickNext}>Next game</button>}
        {props.gameState.gameover && <button onClick={props.onClickRestart}>Restart</button>}
    </div>)
}