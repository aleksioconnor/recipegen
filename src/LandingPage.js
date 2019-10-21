import React from 'react'
import {TweenLite} from "gsap/TweenMax";
import {useState, useEffect, useRef } from 'react'
import DietButtons from './DietButtons'

const LandingPage = (props) => {
    const refButton = useRef(null);
    const refTitle = useRef(null)
    const [anim, setAnim] = useState(null)
    const [buttonClicked, setButtonClicked] = useState(false)
    const isFirstRun = useRef(true);

    const [helpActive, setHelpActive] = useState(false)


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
            { helpActive ? <div>help <button onClick={() => setHelpActive(false)}>Back</button></div> :
            <div>
            <h1 ref={refTitle} >Recipe generator! </h1>
            <h5>Any preferences before we start?</h5>
            <DietButtons selectedTags={props.selectedTags} setSelectedTags={props.setSelectedTags} tags={props.tags}/>
                <button className='start-button' ref={refButton} onClick={()=>setButtonClicked(true)}>GO</button>
                <div onClick={()=>setHelpActive(true)} className='help'>What is this?</div>
            </div>
            }
        </div>
    )
}

export default LandingPage