import "./Endgame.scss";

function Endgame(props: { success: boolean; resetHandler: () => void }) {
  return (
    <div className="endgame-container">
      <div className="backdrop"></div>
      <div className={"dialog " + (props.success ? "success" : "failure")}>
        <h2>{props.success ? "CONGRATULATIONS!" : "GAME OVER!"}</h2>
        <button onClick={props.resetHandler}>PLAY AGAIN</button>
      </div>
    </div>
  );
}

export default Endgame;
