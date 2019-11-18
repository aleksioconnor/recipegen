import React from 'react';
import { useRef, useEffect, useState } from 'react';
import {TweenLite, Power2, TimelineLite} from "gsap/TweenMax";
import _ from 'lodash'




const RecipeView = (props) => {
    const containRef = useRef(null)
    const gradientRef = useRef(null)
    const homeRef = useRef(null)
    const Tags = () => props.tags.map(v => <div>{v}</div>)
    const DietTags = () => props.selectedDietTags.map(v => <div>{v}</div>)
    const [finalRecipes, setFinalRecipes] = useState([])
    const [likes, setLikes] = useState(0)
    const [clicked, setClicked] = useState(false)
    const [finalRecipe, setFinalRecipe] = useState([])
    const animateFunction = (func) => {
        const tween = TweenLite.to(containRef.current, 1, { opacity: 0, ease: Power2.easeInOut})
        const tween1 = TweenLite.to(gradientRef.current, 1, { opacity: 0, ease: Power2.easeInOut})
        const tween2 = TweenLite.to(homeRef.current, 1, { opacity: 0, ease: Power2.easeInOut})
        tween.eventCallback("onComplete", func)

    }

    const recipePriority = [["sweet", "savoury", "spicy", "icy"], ["simple", "challenging", "time-consuming", "easy"], ["healthy", "unhealthy"], ["spring", "summer", "autumn", "winter"]]

    const fireBaseInit = async () => {
          const database = props.firebaseState.database()
          const asd = await database.ref('/recipes/').once('value')
          const recipeJson = asd.toJSON()
          let filteredRecipes = []

          // this is so lazy but it works
          const sortTags = () => {
              let newArr = ["", "", "", ""]
              _.forEach(props.tags, (tag) => {
                  if(_.includes(recipePriority[0], tag)) {
                      newArr[0] = tag
                  }
                  else if (_.includes(recipePriority[1], tag)) {
                       newArr[1] = tag
                  }
                  else if (_.includes(recipePriority[2], tag)) {
                       newArr[2] = tag
                  }
                  else if (_.includes(recipePriority[3], tag)) {
                       newArr[3] = tag
                  }
              })
              return newArr
          }

          const sortedTags = sortTags()

          _.forEach(recipeJson, (recipe) => {
              let thisArrayShouldBeAllTrue = [] // lol lets make an array that should only contain true values if recipe contains correct diet tags
                _.forEach(props.selectedDietTags, (dietTag) => {
                    const doesItInclude = _.includes(recipe.tags, dietTag)   // check that the current recipe that is being iterated contains a single diet tag.
                    thisArrayShouldBeAllTrue.push(doesItInclude)
                }) // loop through diet tags
                // now lets check which of the recipes include the tags the user has selected
                const check = thisArrayShouldBeAllTrue.every((val) => val === true)
                if(check) {
                    filteredRecipes.push(recipe)
                }
                // now lets move on to filtering by tags
          })
    
          let finalRecipes = []


          _.forEach(filteredRecipes, (recipe) => {
            let thisArrayShouldBeAllTrue = []
            // first find all recipes with the first tag that is tru
          _.forEach(sortedTags, (tag) => {
              const doesItInclude = _.includes(recipe.tags, tag)
              thisArrayShouldBeAllTrue.push(doesItInclude)
          })
          const check = thisArrayShouldBeAllTrue.every((val) => val === true)
          if (check) {
              finalRecipes.push(recipe)
          }
      })

      // ok now if final recipes is empty, lets lower priority


      if(finalRecipes.length < 1) {
          finalRecipes = []
          sortedTags.pop()
        _.forEach(filteredRecipes, (recipe) => {
            let thisArrayShouldBeAllTrue = []
            _.forEach(sortedTags, (tag) => {
                const doesItInclude = _.includes(recipe.tags, tag)
                thisArrayShouldBeAllTrue.push(doesItInclude)
            })
            const check = thisArrayShouldBeAllTrue.every((val) => val === true)
            if (check) {
                finalRecipes.push(recipe)
            }
        })
      }


      if(finalRecipes.length < 1) {
        finalRecipes = []
        sortedTags.pop()
      _.forEach(filteredRecipes, (recipe) => {
          let thisArrayShouldBeAllTrue = []
          _.forEach(sortedTags, (tag) => {
              const doesItInclude = _.includes(recipe.tags, tag)
              thisArrayShouldBeAllTrue.push(doesItInclude)
          })
          const check = thisArrayShouldBeAllTrue.every((val) => val === true)
          if (check) {
              finalRecipes.push(recipe)
          }
      })
    }


    if(finalRecipes.length < 1) {
        finalRecipes = []
        sortedTags.pop()
      _.forEach(filteredRecipes, (recipe) => {
          let thisArrayShouldBeAllTrue = []
          _.forEach(sortedTags, (tag) => {
              const doesItInclude = _.includes(recipe.tags, tag)
              thisArrayShouldBeAllTrue.push(doesItInclude)
          })
          const check = thisArrayShouldBeAllTrue.every((val) => val === true)
          if (check) {
              finalRecipes.push(recipe)
          }
      })
    }


          setFinalRecipes(finalRecipes)
          const random = Math.floor(Math.random() * finalRecipes.length)
          setFinalRecipe(finalRecipes[random]) // this should be random

    }

    useEffect(() => {
        fireBaseInit()
    }, [])

    const drawNewRecipe = () => {
        setClicked(false)
        const generateRandom = (min, max) => {
            const notThisOne = _.findIndex(finalRecipes, (n) => n === finalRecipe)
            var num = Math.floor(Math.random() * (max - min + 1)) + min;
            return (num === notThisOne) ? generateRandom(min, max) : num;
        }
        let random =  generateRandom(0, finalRecipes.length - 1)
        setFinalRecipe(finalRecipes[random])
    }
    const introAnimation = () => {
        const tweeny= new TimelineLite();
        tweeny.to(gradientRef.current, 0, {opacity: 0})
        tweeny.to(homeRef.current, 0, {opacity: 0})
        tweeny.to(containRef.current, 0, {opacity: 0})
        tweeny.to([containRef.current, homeRef.current, gradientRef.current], 1, {opacity: 1})
    }

    useEffect(() => {
        introAnimation();
    },[])


    const likeRecipe = async () => {
        await props.firebaseState.database().ref("/recipes/").orderByChild('id').equalTo(finalRecipe.id).on("child_added", (snapshot) => {
            props.firebaseState.database().ref("/recipes/"+snapshot.key).update({likes: finalRecipe.likes + 1})
        })
        setFinalRecipe(Object.assign(finalRecipe, {likes: finalRecipe.likes + 1}))
        setClicked(true)
        setLikes(finalRecipe.likes)
       
    }


    return (
    <div className='main-container'>
        <div className='top-gradient opacity' ref={gradientRef}>
        </div>
        <div onClick={() => animateFunction(props.goHome)} className='home opacity' ref={homeRef}>Home</div>
        <div ref={containRef} className='recipe-contain opacity'>
            <h3 className='makesome'>Make some:</h3>
            <h1 className='recipename'>{finalRecipe.length !== 0 ? finalRecipe.name : null}</h1>
            <div className='time'>takes {finalRecipe.length !== 0 ? finalRecipe.time : null} to cook</div>
            <div className='servings'>has {finalRecipe.length !== 0 ? finalRecipe.servings : null} servings</div>
        <div className='final-img' style={{backgroundImage: `url(/recipegen/${finalRecipe.img})`}}></div>
        <div className='likes'>
            This recipe has {clicked ? likes : finalRecipe.likes} likes
            <div className='likebutton' onClick={()=>likeRecipe()} >Click to like</div>
        </div>
        <div className='final-button-contain'>
            {/* <button className='final-button' onClick={() => setShowRecipe(!showRecipe)}>See full recipe</button> */}
            {finalRecipes.length > 1 ? <button onClick={() => drawNewRecipe()}className='final-button'>New suggestion</button> : null}
        </div>
        <div className='recipe'>
            <div className='ingredients-title'>Ingredients:</div>
            <ul className='ingredients'>{finalRecipe.length !== 0 ? Object.keys(finalRecipe.ingredients).map((key) => <li>{'- ' + finalRecipe.ingredients[key]}</li>) : null}</ul>
            <div className='instructions-title'>Instructions:</div>
            <ul className='instructions'>{finalRecipe.length !== 0 ? Object.keys(finalRecipe.instructions).map((key) => <li>{Number(key)+1 + '. ' + finalRecipe.instructions[key]}</li>) : null}</ul>
        </div>
        </div>

    </div>
    )
}

export default RecipeView