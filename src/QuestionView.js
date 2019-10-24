import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {TweenLite, Power2, TimelineMax, TimelineLite, Back} from "gsap/TweenMax";


const QuestionView = ({currentQuestionIndex, setNextQuestion, questions, clickBlock, setClickBlock}) => {
    // Set current question
    const ref = useRef(null);
    const [anim, setAnim] = useState(null)
    const [buttonRefs, setButtonRefs] = useState([])
    const isFirstRun = useRef(true)

    // Intro animation
    useEffect(() => {
        if(isFirstRun) {
        const tween = TweenLite.to(ref.current, 0.3, { opacity: 1, ease: Power2.easeInOut})
        const otherTween = new TimelineLite()
            .staggerTo(buttonRefs, 0.1, {top: 0, ease: Back.easeInOut.config(1.6)}, 0.1)
            .play()
            isFirstRun.current = false;
        return
        }
        else {
            // here you should set the position of the elemtns to required locations
        }
      }, [currentQuestionIndex]);


    const setNext = (n) => {
        setClickBlock(true) // when animation begins, enable clickblock
        const tween = TweenLite.to(ref.current, 0.3, {opacity: 0})
        tween.eventCallback("onComplete", setNextQuestion, [n])
    }

    const checkClickBlock = (n) => {
        if (clickBlock) {
            return null
        }
        else {
            setNext(n)
        }
    }

    const question = questions[currentQuestionIndex]
    const buttons = question.answer_options.map((n, index) => <button ref={button => buttonRefs[index] = button} className={clickBlock ? 'question-button-nopointer' : 'question-button'} onClick={()=>checkClickBlock(n)} key={n.answer_id}>{n.answer_text}</button>)

    return (
        <div className='main-container'>
            <div ref={ref} className='question-contain'>
                <h3 className='question-title'>{question.question_text}</h3>
                <div className='question-button-container'>
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default QuestionView