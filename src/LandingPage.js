import React from 'react'
import {TweenLite, Power2, TimelineLite} from "gsap/TweenMax";
import {useState, useEffect, useRef } from 'react'

const LandingPage = (props) => {
    const refButton = useRef(null);
    const refTitle = useRef(null)
    const [anim, setAnim] = useState(null)
    const [buttonClicked, setButtonClicked] = useState(false)
    const isFirstRun = useRef(true);


    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const tweenButton = TweenLite.to(refButton.current, 0.2, { opacity: 0 })
        const tweenTitle = TweenLite.to(refTitle.current, 0.2, { opacity: 0 })
        tweenButton.eventCallback("onComplete", props.start)
        setAnim(tweenTitle)
      }, [buttonClicked]);

    return (
        <div className='main-container'>
           <h1 ref={refTitle} > Welcome to recipe generator! </h1>
            <button className='start-button' ref={refButton} onClick={()=>setButtonClicked(true)}>Start</button>
        </div>
    )
}

export default LandingPage