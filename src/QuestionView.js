import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {TweenLite, Power2, TimelineLite} from "gsap/TweenMax";


const QuestionView = ({currentQuestionIndex, setNextQuestion, questions}) => {
    // Set current question
    const ref = useRef(null);
    const [anim, setAnim] = useState(null)
    useEffect(() => {
        const tween = TweenLite.to(ref.current, 0.3, { opacity: 1 })
        setAnim(tween)
      }, [currentQuestionIndex]);
    useEffect(() => {
    })

    const setNext = (n) => {
        const tween = TweenLite.to(ref.current, 0.3, {opacity: 0})
        tween.eventCallback("onComplete", setNextQuestion, [n])
    }
    const question = questions[currentQuestionIndex]
    const buttons = question.answer_options.map((n) => <button className='question-button' onClick={()=>setNext(n)} key={n.answer_tag}>{n.answer_text}</button>)

    return (
        <div className='main-container'>
            <div ref={ref} className='question-contain'>
                <h3>{question.question_text}</h3>
                <div className='question-button-container'>
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default QuestionView