import { useEffect, useState } from "react";
import AnswerSheet from "../components/AnswerSheet/AnswerSheet";
import ColorSelector from "../components/ColorSelector/ColorSelector";
import Endgame from "../components/Endgame/Endgame";
import "./styles.scss";

function Mastermind() {
  const colors = [
    "#ffb400",
    "#ff5a5f",
    "#8ce071",
    "#00d1c1",
    "#007a87",
    "#7b0051",
  ];

  const [state, setState] = useState<{
    showRules: boolean;
    answers: string[][];
    color: string;
    answerNumber: number;
    question: string[];
    reset: boolean;
  }>({
    showRules: false,
    answers: [],
    color: colors[0],
    answerNumber: 1,
    question: [...colors].sort(() => Math.random() - 0.5).slice(0, 4),
    reset: false,
  });

  useEffect(() => {
    if (state.reset) {
      setState((st) => ({
        ...st,
        answers: [],
        question: [...colors].sort(() => Math.random() - 0.5).slice(0, 4),
        answerNumber: 1,
        reset: false,
        color: colors[0],
      }));
    }
  }, [state.reset]);

  const rules = (
    <div className="rules-info">
      <span>
        Try to guess the pattern, in both order and color, within ten turns.
        After submitting a row, a small black peg is placed for each code peg
        from the guess which is correct in both color and position. A white peg
        indicates the existence of a correct color code peg placed in the wrong
        position. More info on{" "}
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Mastermind_(board_game)"
        >
          Wikipedia.
        </a>
      </span>
    </div>
  );

  const endgame = (
    <Endgame
      success={
        JSON.stringify(state.answers[state.answers.length - 1]) ===
        JSON.stringify(state.question)
      }
      resetHandler={() => setState((st) => ({ ...st, reset: true }))}
    />
  );

  const setAnswersHandler = (answer: string[]) => {
    setState((st) => ({
      ...st,
      answers: [...st.answers, answer],
      answerNumber: st.answerNumber + 1,
    }));
  };

  const setColorHandler = (color: string) => {
    setState((st) => ({
      ...st,
      color,
    }));
  };

  return (
    <div className="app-container">
      <div className="game-container">
        <h1 className="title-container">
          <span className="M">M</span>
          <span className="A">A</span>
          <span className="S">S</span>
          <span className="T">T</span>
          <span className="E">E</span>
          <span className="R">R</span>
          <span className="MIND">MIND</span>
        </h1>
        <div className="rules-container">
          <span
            className="rules-heading"
            onClick={() =>
              setState((st) => ({ ...st, showRules: !st.showRules }))
            }
          >
            {state.showRules ? "Hide" : "Show"} rules
          </span>
          {state.showRules && rules}
        </div>
        <div className="game">
          <AnswerSheet
            answerNumber={state.answerNumber}
            selectedColor={state.color}
            answers={state.answers}
            question={state.question}
            setAnswers={setAnswersHandler}
          />
          <ColorSelector
            colors={colors}
            selectColor={setColorHandler}
            selectedColor={state.color}
          />
        </div>
        <div className="footer">
          <span>
            You can read about how this game was done here:
            <br />
            <a
              href="http://zofiakorcz.pl/mastermind-react-es6-webpack"
              target="_blank"
            >
              Mastermind game in React and ECMAScript 6.
            </a>
          </span>
          <span className="copyright-link">
            ©{" "}
            <a href="http://zofiakorcz.pl" target="_blank">
              Zofia Korcz
            </a>
          </span>
        </div>
      </div>
      {(JSON.stringify(state.answers[state.answers.length - 1]) ===
        JSON.stringify(state.question) ||
        state.answerNumber > 10) &&
        endgame}
    </div>
  );
}

export default Mastermind;
