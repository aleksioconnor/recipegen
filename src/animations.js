import {TweenLite, Power2, TimelineMax, TimelineLite, Back} from "gsap/TweenMax";

const buttonIntro = (ref, setClickBlock, buttonRefs) => {
    const tween = TweenLite.to(ref.current, 0.3, { opacity: 1, ease: Power2.easeInOut})
    const otherTween = new TimelineLite({onComplete: setClickBlock, onCompleteParams: [false]})
        .staggerTo(buttonRefs, 0.9, {top: 0, ease: Back.easeInOut.config(1.1)}, 0.2)
}

const resetButtonPositions = (buttonRefs) => {
    TweenLite.to(buttonRefs, 0, {top: 800}) // forces buttons to default position
}

const buttonClickAnimation = (setNextQuestion, clickedButtonRef, ref, n) => {
    const buttonTween = new TimelineLite({onComplete: setNextQuestion, onCompleteParams: [n]})
    buttonTween.to(clickedButtonRef, 0.4, {scaleY: 1.2, scaleX: 1.2,  ease: Power2.easeInOut})
    buttonTween.to(clickedButtonRef, 0.1, {scaleY: 0, scaleX: 0, ease: Power2.easeIn})
    // buttonTween.to(clickedButtonRef, 0.5 ,{width: 130, height: 130})
    // buttonTween.to(clickedButtonRef, 1.2, {width: 10, height: 10})
    buttonTween.to(ref.current, 0.3, {opacity: 0, delay: 0.2})
    buttonTween.to(clickedButtonRef, 0, {scaleY: 1, scaleX: 1})
    // buttonTween.to(clickedButtonRef, 0, {width: 100, height: 100})
    // const tween = TweenLite.to(ref.current, 0.3, {opacity: 0})
    // buttonTween.eventCallback("onComplete", setNextQuestion, [n])
}

export {buttonIntro, resetButtonPositions, buttonClickAnimation}