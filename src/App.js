import React from 'react';
import {useState} from 'react'
import QuestionView from './QuestionView'
import _ from 'lodash'
import questionAnswerPairs from './questions'
import RecipeView from './RecipeView'
import LandingPage from './LandingPage'
import 'normalize.css';
import './Style.css'

function App() {



  const drawQuestion = (len) => {
    const emptyArr = []
    _.forEach(questionAnswerPairs, (category) => {
      const selected = _.shuffle(category.questions).slice(0, 1)
      emptyArr.push(selected[0])
    })
    return _.shuffle(emptyArr)
  }



  // How many questions are shown to the user
  const [thisManyQuestions] = useState(4)

  const [questions, setQuestions] = useState(drawQuestion(thisManyQuestions))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [tags, setTags] = useState([])
  const [landingPage, setLandingPage] = useState(true)
  const [clickBlock, setClickBlock] = useState(false)

  // used for diet seleciton in beginning
  const [selectedDietTags, setSelectedDietTags] = useState([])
  const dietTags = ['Pescaterian', 'Dairy-free', 'Gluten-free', 'Vegan', 'Vegetarian']


  const setNextQuestion = (answer) => {
    console.log("callback in setNextQuestion")
    const newTags = tags.slice(0)
    const answer_tag = answer.answer_tag
    newTags.push(answer_tag)
    setTags(newTags)
    // add answer tag to tag array
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setClickBlock(false)
  }

  const restart = () => {
    setQuestions(drawQuestion(5))
    setTags([])
    setCurrentQuestionIndex(0)
  }

  const start = () => {
    setLandingPage(false)
  }

  const restartAndLandingPage = () => {
    restart()
    setLandingPage(true)
  }





  return (
    <div>
        {landingPage ? <LandingPage clickBlock={clickBlock} setClickBlock={setClickBlock} start={start} selectedTags={selectedDietTags} setSelectedTags={setSelectedDietTags} tags={dietTags}/> : currentQuestionIndex > thisManyQuestions - 1 ? 
        <RecipeView selectedDietTags={selectedDietTags} restart={restart} tags={tags} goHome={() => restartAndLandingPage()}></RecipeView> : 
        <QuestionView clickBlock={clickBlock} setClickBlock={setClickBlock} currentQuestionIndex={currentQuestionIndex} setNextQuestion={setNextQuestion} questions={questions}></QuestionView>}
        
    </div>
  )
}

export default App;
