import React from 'react'
import _ from 'lodash'
import {useEffect, useState, useRef} from 'react'
import {TimelineLite} from 'gsap'

const DietButtons = ({selectedTags, setSelectedTags, tags, buttonClicked, clickBlock}) => {

  const [elements, setElements] = useState([])
  const isFirstRun = useRef(true);

  const buttonClick = (dietn) => {
    if(clickBlock) {
      return null
    }
    else {
    // if selected tags include word of the clicked button remove from selected tags
      const copyOfSelectedTags = selectedTags.slice()
      if (_.includes(selectedTags, dietn)) {
            _.remove(copyOfSelectedTags, (tag) => {
                return (tag === dietn)
            })
            setSelectedTags(copyOfSelectedTags)
        }
        else {
            copyOfSelectedTags.push(dietn)
            setSelectedTags(copyOfSelectedTags)
        }
    }
  }

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
  }
    const myTween = new TimelineLite();
    myTween.staggerTo(elements, 0.1, {opacity: 0, visibility: 'hidden'}, 0.1);

    myTween.play()
  }, [buttonClicked])



    const className = (dietn) => _.includes(selectedTags, dietn) ? 'diet-button--selected' : 'diet-button'


    const buttons = tags.map((diet, index) => <button ref={button => elements[index] = button} key={diet} onClick={() => buttonClick(diet)} className={className(diet)}>{diet}</button>)
  return (
    <div className='diet-button-container'>
      {buttons}
    </div>
  )
}

export default DietButtons