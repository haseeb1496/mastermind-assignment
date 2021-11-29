import AnswerChoice from './AnswerChoice/AnswerChoice';

function AnswerSheet(props: { setAnswers: (answer: string[]) => void, selectedColor: string, answerNumber: number, answers: string[][], question: string[] }) {
    return (
        <div>
            {Array.from(Array(10)).map((_, i) =>
                <AnswerChoice answer={props.answers[i]} isActive={props.answerNumber === i + 1}
                              setAnswer={props.setAnswers} 
                              selectedColor={props.selectedColor}
                              question={props.question}
                              key={i}/>
                )}
        </div>
    );
}

export default AnswerSheet;