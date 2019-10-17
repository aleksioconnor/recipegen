import React from 'react';

const RecipeView = (props) => {
    const Tags = () => props.tags.map(v => <div>{v}</div>)
    return (
    <div className='main-container'>
        <h1>Your recipe is: Hot dogs!</h1>
        <button onClick={()=>props.restart()}>restart</button>
        <div>your tags: <Tags/>
</div>
    </div>
    )
}

export default RecipeView