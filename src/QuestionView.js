import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {TweenLite, Power2, TimelineMax, TimelineLite, Back} from "gsap/TweenMax";
import _ from 'lodash'
import {buttonIntro, resetButtonPositions, buttonClickAnimation} from './animations'


const QuestionView = ({currentQuestionIndex, setNextQuestion, questions, clickBlock, setClickBlock}) => {
    // Set current question
    const ref = useRef(null);
    const [anim, setAnim] = useState(null)
    const [buttonRefs, setButtonRefs] = useState([])
    const isFirstRun = useRef(true)

    // Intro animation
    useEffect(() => {
        if(!isFirstRun.current) {
            resetButtonPositions(buttonRefs)
        }
        if (isFirstRun) isFirstRun.current = false;

        setClickBlock(true)
        buttonIntro(ref, setClickBlock, buttonRefs)
        
      }, [currentQuestionIndex]);


    const setNext = (n, clickedButtonRef) => {
        setClickBlock(true) // when animation begins, enable clickblock
        buttonClickAnimation(setNextQuestion, clickedButtonRef, ref, n)
    }

    const checkClickBlock = (n, clickedButtonRef) => {
        if (clickBlock) {
            return null
        }
        else {
            setNext(n, clickedButtonRef)
        }
    }

    const question = questions[currentQuestionIndex]

    // maps buttons 
    const buttons = question.answer_options.map((n, index) => <div className='single-question-button-contain'><button 
        ref={button => buttonRefs[index] = button} 
        className={clickBlock ? 'question-button no-pointer' : 'question-button'} 
        onClick={()=>checkClickBlock(n, buttonRefs[index])} 
        key={n.answer_id}>
            {n.answer_text}
        </button></div>)

    const ovalButtons = question.answer_options.map((n, index) => <div className='oval-question-button-contain'>
        <svg height="100" width="200">
    <ellipse cx="100" cy="50" rx="90" ry="40" style={{fill: "#ee936c"}}
    ref={button => buttonRefs[index] = button} 
    className={clickBlock ? 'question-button no-pointer' : 'question-button'} 
    onClick={()=>checkClickBlock(n, buttonRefs[index])} 
    key={n.answer_id}>
    </ellipse>
    <text x="50%" y="50%" text-anchor="middle" fill="black" font-size="14px" font-family="Arial" dy=".3em">{n.answer_text}</text>
    </svg></div>)


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