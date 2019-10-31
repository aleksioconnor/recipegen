import React from 'react';
import {useEffect, useRef, useState} from 'react';
import _ from 'lodash'
import {buttonIntro, resetButtonPositions, buttonClickAnimation, fadeIn, ovalClickAnimation, resetOvalButtonPositions} from './animations'
import QuestionButtons from './QuestionButtons'


const QuestionView = ({currentQuestionIndex, setNextQuestion, questions, clickBlock, setClickBlock}) => {
    // Set current question
    const ref = useRef(null);
    const [buttonRefs, setButtonRefs] = useState([])
    const [ovalButtonRefs, setOvalButtonRefs] = useState([])
    const [ovalContainRefs, setOvalContainRefs] = useState([])
    const isFirstRun = useRef(true)
    const [oval, setOval] = useState(true)
    const question = questions[currentQuestionIndex]

    // Intro animation
    useEffect(() => {
        // set prop
        setOval((question.answer_options.map((n) => n.answer_text).reduce((r, e) => r.length < e.length ? e : r, "")).length > 15)

        // if it is not the first run
        if(!isFirstRun.current) {
            resetButtonPositions(buttonRefs)
        }
        resetOvalButtonPositions(ovalButtonRefs, ovalContainRefs)

        // set first run false in case of first run
        if (isFirstRun) isFirstRun.current = false;

        //enable blocking
        setClickBlock(true)

        // normal buttons
        if(!oval) {
            buttonIntro(ref, setClickBlock, buttonRefs)
        }

        //oval buttons
        if(oval) {
            fadeIn(ref, setClickBlock, ovalButtonRefs, ovalContainRefs)
        }
        
      }, [buttonRefs, currentQuestionIndex, oval, ovalButtonRefs, ovalContainRefs, question.answer_options, setClickBlock]);


    const setNext = (n, clickedButtonRef) => {
        setClickBlock(true) // when animation begins, enable clickblock
        if(!oval) {
            buttonClickAnimation(setNextQuestion, clickedButtonRef, ref, n)
        }
        else ovalClickAnimation(setNextQuestion, clickedButtonRef, ref, n)
    }

    const checkClickBlock = (n, clickedButtonRef) => {
        if (clickBlock) {
            return null
        }
        else {
            setNext(n, clickedButtonRef)
        }
    }



    return (
        <div className='main-container'>
            <div ref={ref} className='question-contain'>
                <h3 className='question-title'>{question.question_text}</h3>
                <div className='question-button-container'>
                    <QuestionButtons ovalContainRefs={ovalContainRefs} clickBlock={clickBlock} checkClickBlock={checkClickBlock} setNext={setNext} buttonRefs={buttonRefs} ovalButtonRefs={ovalButtonRefs} question={question} 
                    oval={oval}/>
                </div>
            </div>
        </div>
    )
}

export default QuestionView