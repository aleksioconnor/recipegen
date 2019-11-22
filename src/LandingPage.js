import React from 'react'
import {TweenLite, TweenMax, TimelineMax, CSSPlugin, Power2} from "gsap/TweenMax";
import {useState, useEffect, useRef } from 'react'
import DietButtons from './DietButtons'

const LandingPage = (props) => {
    const refButton = useRef(null);
    const refTitle = useRef(null)
    const refSub = useRef(null)
    const refMainContainer = useRef(null) // card flip animation, refers to main container class
    const refCard = useRef(null) // card flip animation, refers to container that contains card faces
    const refBack = useRef(null) // card flip animation, refers to back card face
    const refFront = useRef(null) // card flip animation, refers to front
    const [buttonClicked, setButtonClicked] = useState(false)
    const isFirstRun = useRef(true);
    const [animation, setAnimation] = useState(null)
    const [fadeIn, setFadeIn] = useState(false)
    const whatIsThisRef = useRef(null)

    const checkForClickBlock = () => {
      if(props.clickBlock) {
        return null
      }
      else {
        setButtonClicked(true)
      }
    }


  const flipCard = (reverse) => {
    props.setClickBlock(true)
    CSSPlugin.defaultTransformPerspective = 1000;
    TweenMax.set((refBack.current), {rotationY:-180});
    const tl = new TimelineMax({paused:true})
      .to(refFront.current, 1, {rotationY:180, ease: Power2.easeInOut})
      .to(refBack.current, 1, {rotationY:0, ease: Power2.easeInOut},0)


    tl.eventCallback("onComplete", props.setClickBlock, [false])

    tl.play()
    setAnimation(tl)

  }

  const reverseCard = () => {
    animation.reverse()
  }

  const fadeInAnim = () => {
    setFadeIn(true)
    TweenLite.to(refButton.current, 0, { opacity: 0 })
    TweenLite.to(refTitle.current, 0, { opacity: 0 })
    TweenLite.to(refSub.current, 0, { opacity: 0 })
    TweenLite.to(whatIsThisRef.current, 0, { opacity: 0 })
    TweenLite.to(refButton.current, 0.8, { opacity: 1 , delay: 0.2})
    TweenLite.to(refTitle.current, 0.8, { opacity: 1, delay: 0.2 })
    TweenLite.to(refSub.current, 0.8, { opacity: 1, delay: 0.2 })
    TweenLite.to(whatIsThisRef.current, 0.8, { opacity: 1, delay: 0.2 })
  }



  useEffect(() => {
    if (isFirstRun.current) {
      fadeInAnim()
      isFirstRun.current = false;
      return;
    }
    if(buttonClicked) {
      const tweenButton = TweenLite.to(refButton.current, 0.8, { opacity: 0 })
      TweenLite.to(refTitle.current, 0.8, { opacity: 0 })
      TweenLite.to(refSub.current, 0.8, { opacity: 0 })
      TweenLite.to(whatIsThisRef.current, 0.8, { opacity: 0 })

      tweenButton.eventCallback("onComplete", props.start)
    }
  }, [buttonClicked, props.start]);


  return (
    <div 
      ref={refMainContainer} 
      className='main-container--landing-page'>
      <div 
      className='cards-container' 
      ref={refCard} >
        <div className='backOfCard card' ref={refBack}>
          <h1 className='about-title'>About recipe generator</h1>
          <p className='about'>Recipe Generator is a playful service that aims to provide recipe inspiration. The service suggests a recipe to the user based on a series of questions that must first be answered. The questions are presented through a simplified, easy-to-use, and visually attractive interface. Give it a try and find new and exciting recipes! </p>
          <p className='about'>Created by: Maija Jääskeläinen, Aleksi O'Connor and Laura Toikka</p>
          <button className='final-button' onClick={()=>reverseCard()} >Back</button>
        </div>
        <div className='backOfCard card' ref={refFront}>
          <img ref={refTitle} className='logo' src='/recipegen/logo.png' alt='logo'></img>
          <h5 className='opacity' ref={refSub}>
            Any preferences before we start?
          </h5>
          <DietButtons 
            clickBlock={props.clickBlock} 
            fadeIn={fadeIn}
            setFadeIn={setFadeIn}
            buttonClicked={buttonClicked} 
            selectedTags={props.selectedTags} 
            setSelectedTags={props.setSelectedTags} 
            tags={props.tags}/>
          <button 
            className='start-button' 
            ref={refButton} 
            onClick={()=>checkForClickBlock() }>
              GO
            </button>
          <div onClick={()=>flipCard(false)} className='help' ref={whatIsThisRef}>
            What is this?
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage