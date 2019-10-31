import {TweenLite, Power2, TimelineLite, Back} from "gsap/TweenMax";
import _ from 'lodash'

const buttonIntro = (ref, setClickBlock, buttonRefs) => {
    const tween = TweenLite.to(ref.current, 0.3, { opacity: 1, ease: Power2.easeInOut})
    const otherTween = new TimelineLite({onComplete: setClickBlock, onCompleteParams: [false]})
        .staggerTo(buttonRefs, 0.9, {top: 0, ease: Back.easeInOut.config(0.7)}, 0.2)
}


const fadeIn = (ref, setClickBlock, buttonRefs, ovalContainRefs) => {
    const tweenfs = TweenLite.to(ref.current, 1.1, { opacity: 1, ease: Power2.easeInOut})
    tweenfs.eventCallback("onComplete", setClickBlock, [false])

    _.forEach(ovalContainRefs, (singleRef, index) => {
        if(index % 2 === 0) {
            const tween = TweenLite.to(singleRef, 1, {left: 30})
        }
        else TweenLite.to(singleRef, 1, {left: -30})
    })

}

const resetButtonPositions = (buttonRefs) => {
    TweenLite.to(buttonRefs, 0, {top: 800}) // forces buttons to default position
}

const resetOvalButtonPositions = (buttonRefs, ovalContainRefs) => {
    _.forEach(ovalContainRefs, (singleRef, index) => {
        console.log(singleRef)
        if(index % 2 === 0) {
            TweenLite.to(singleRef, 0, {left: -500})
        }
        else TweenLite.to(singleRef, 0, {left: 500})
    })
}

const buttonClickAnimation = (setNextQuestion, clickedButtonRef, ref, n) => {
    const buttonTween = new TimelineLite({onComplete: setNextQuestion, onCompleteParams: [n]})
    buttonTween.to(clickedButtonRef, 0.4, {scaleY: 1.2, scaleX: 1.2,  ease: Power2.easeInOut})
    buttonTween.to(clickedButtonRef, 0.1, {scaleY: 0, scaleX: 0, ease: Power2.easeIn})
    buttonTween.to(ref.current, 0.3, {opacity: 0, delay: 0.2})
    buttonTween.to(clickedButtonRef, 0, {scaleY: 1, scaleX: 1})
}

const ovalClickAnimation = (setNextQuestion, clickedButtonRef, ref, n) => {
    const buttonTween = new TimelineLite({onComplete: setNextQuestion, onCompleteParams: [n]})
    buttonTween.to(clickedButtonRef, 0.5 ,{fill: "red"})
    buttonTween.to(ref.current, 0.5, {opacity: 0, delay: 0.2}); //percents
    buttonTween.to(clickedButtonRef, 0 ,{fill: "#ee936c"})
}

export {buttonIntro, resetButtonPositions, buttonClickAnimation, ovalClickAnimation, fadeIn, resetOvalButtonPositions}