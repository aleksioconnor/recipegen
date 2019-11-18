
    import React from 'react';
    import {useEffect, useRef, useState} from 'react';

    const QuestionButtons = ({oval, question, clickBlock, checkClickBlock, buttonRefs, ovalButtonRefs, ovalContainRefs}) => {


    const buttons = question.answer_options.map((n, index) => <div key={n.answer_id + 60} className='single-question-button-contain'><button 
        ref={button => buttonRefs[index] = button} 
        className={clickBlock ? 'question-button no-pointer' : 'question-button'} 
        onClick={()=>checkClickBlock(n, buttonRefs[index])} 
        key={n.answer_id}>
            {n.answer_text}
    </button></div>)

    const ovalButtons = question.answer_options.map((n, index) => <div key={n.answer_id + 40} ref={n => ovalContainRefs[index] = n} className='oval-question-button-contain' style={{left: ((index+1)%2)===0 ? 30 : -30}}>
    <svg key={n.answer_id + 10} height="100" width="260">
        <ellipse className={`ovalbutton ${clickBlock ? 'no-pointer' : ''}`} cx="130" cy="50" rx="130" ry="40" style={{fill: "#ee936c"} } key={n.answer_id + 20}
        ref={button => ovalButtonRefs[index] = button} 
        onClick={()=>checkClickBlock(n, ovalButtonRefs[index], ovalContainRefs[index])} >
        </ellipse>
        <text className={`ovaltext ${clickBlock ? 'no-pointer' : ''}`} x="50%" y="50%" textAnchor="middle" fill="black" fontSize="15 px" fontFamily="Roboto" dy=".3em" key={n.answer_id + 30}>{n.answer_text}</text>
        </svg>
    </div>
)
        return (
            <div>
                <div style={oval ? {display: "block"} : {display: "none"}}>{ovalButtons}</div>
                <div style={oval ? {display: "none"} : {display: "flex"}} className="question-button-container">{buttons}</div>
            </div>
        )

    }
    
export default QuestionButtons
