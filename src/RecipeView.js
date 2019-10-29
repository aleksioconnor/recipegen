import React from 'react';
import { useRef } from 'react';
import {TweenLite, Power2} from "gsap/TweenMax";



const RecipeView = (props) => {
    const containRef = useRef(null)
    const Tags = () => props.tags.map(v => <div>{v}</div>)
    const DietTags = () => props.selectedDietTags.map(v => <div>{v}</div>)
    const animateFunction = (func) => {
        const tween = TweenLite.to(containRef.current, 0.3, { opacity: 0, ease: Power2.easeInOut})
        tween.eventCallback("onComplete", func)

    }

    return (
    <div className='main-container'>
        <div className='top-gradient'></div>
        <div ref={containRef} className='recipe-contain'>
            <h3>Make some:</h3>
            <h1>Chicken stew with black beans and peppers</h1>
            <button onClick={()=>animateFunction(props.restart)}>restart</button>
            <button onClick={()=>animateFunction(props.goHome)}>Home page</button>
            <div>your tags: <Tags/>
            <DietTags />
            </div>
        </div>
        <div className='final-button-contain'>
            <button className='final-button'>See full recipe</button>
            <button className='final-button'>New suggestion</button>
        </div>
    </div>
    )
}

export default RecipeView