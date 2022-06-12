import "./controls.css";
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
        <div className="Button-container">
            {props.gameState.win && <button className="Button next" onClick={props.onClickNext}>Next game</button>}
        </div>
        <div className="Button-container">
            {props.gameState.gameover && <button className="Button restart" onClick={props.onClickRestart}>Restart</button>}
        </div>
    </div>)
}