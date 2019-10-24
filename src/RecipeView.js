import React from 'react';
import { useRef } from 'react';
import {TweenLite, Power2, TimelineMax, TimelineLite, Back} from "gsap/TweenMax";



const RecipeView = (props) => {
    const containRef = useRef(null)
    const Tags = () => props.tags.map(v => <div>{v}</div>)
    const animateFunction = (func) => {
        const tween = TweenLite.to(containRef.current, 0.3, { opacity: 0, ease: Power2.easeInOut})
        tween.eventCallback("onComplete", func)

    }

    return (
    <div className='main-container'>
        <div ref={containRef}>
            <h1>Your recipe is: Hot dogs!</h1>
            <button onClick={()=>animateFunction(props.restart)}>restart</button>
            <button onClick={()=>animateFunction(props.goHome)}>Home page</button>
            <div>your tags: <Tags/>
            </div>
        </div>
    </div>
    )
}

export default RecipeView