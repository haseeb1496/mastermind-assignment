import { useEffect, useState } from 'react';
import './AnswerChoice.scss';

function AnswerChoice(props: { selectedColor: string, setAnswer: (answer: string[]) => void, isActive: boolean, answer: string[], question: string[] }) {
    const [state, setState] = useState<{
        answer: string[],
        hintClasses: string[]  
    }>({
        answer: ['', '', '', ''],
        hintClasses: []
    })

    useEffect(() => {
        setState((st) => ({
            ...st,
            answer: ['', '', '', ''],
            hintClasses: []
        }));
    }, [props.question])

    const onClickHandlerChoice = (index: number) => {
        const newAnswer = [...state.answer];
        newAnswer[index] = props.selectedColor;
        setState((st) => ({
            ...st,
            answer: newAnswer
        }));
    }

    const submitAnswerHandler = () => {
        props.setAnswer(state.answer);
        let hintClassArray: string[] = props.question.map((q, i) => q === state.answer[i] ? 'exact-match' : state.answer.includes(q) ? 'match' : 'no-match');
        hintClassArray = hintClassArray.filter((cl) => cl === 'exact-match')
            .concat(hintClassArray.filter((cl) => cl === 'match')
            .concat(hintClassArray.filter((cl) => cl === 'no-match')));
        setState((st) => ({
            ...st,
            hintClasses: hintClassArray
        }));
    }

    const tick = <div onClick={submitAnswerHandler} className='tick'></div>;

    return (
        <div className={ 'answer-choice ' + (props.isActive ? 'active' : 'inactive')}>
            {Array.from(Array(4)).map((_, i) => 
                <div className='choice'
                     key={i}
                     style={{backgroundColor: state.answer[i]}}
                     onClick={() => onClickHandlerChoice(i)}>
                </div>
            )}
            <div className='tick-container'>
                {state.answer.every((ans: string) => ans !== '') && props.isActive && tick}
            </div>
            <div className='answer-hint-container'>
                {Array.from(Array(4)).map((_, i) =>
                    <span className={'answer-hint ' + (!state.hintClasses[i] || state.hintClasses[i] === 'match' ? '' : state.hintClasses[i]) }
                          key={i}>
                    </span>
                )}
            </div>
        </div>
    );
}

export default AnswerChoice;