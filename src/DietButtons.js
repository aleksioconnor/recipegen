import React from 'react'
import _ from 'lodash'

const DietButtons = ({selectedTags, setSelectedTags, tags}) => {

    const buttonClick = (dietn) => {
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

    const className = (dietn) => _.includes(selectedTags, dietn) ? 'diet-button--selected' : 'diet-button'


    const buttons = tags.map(diet => <button key={diet} onClick={() => buttonClick(diet)} className={className(diet)}>{diet}</button>)
return (
    <div className='diet-button-container'>
        {buttons}
    </div>
)
}

export default DietButtons