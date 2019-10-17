import React from 'react';
import {useState} from 'react'
import {History} from 'stateshot'
import QuestionView from './QuestionView'
import _ from 'lodash'
import questionAnswerPairs from './questions'
import RecipeView from './RecipeView'
import LandingPage from './LandingPage'
import 'normalize.css';
import style from './Style.css'

function App() {
  
  const state = { question: questionAnswerPairs[0], answers: [] }
  const history = new History()
  history.pushSync(state) 

  // Function generates sequence of questions. Returns array of objects.
  // Parameter (len) is how many questions will be in the resulting array.
  const generateRandomSequenceOfQuestions = (len) => _.shuffle(questionAnswerPairs).slice(0, len)

  // How many questions are shown to the user
  const [thisManyQuestions, setThisManyQuestions] = useState(5)

  const [questions, setQuestions] = useState(generateRandomSequenceOfQuestions(thisManyQuestions))
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [tags, setTags] = useState([])
  const [landingPage, setLandingPage] = useState(true)


  const setNextQuestion = (answer) => {
    const newTags = tags.slice(0)
    const answer_tag = answer.answer_tag
    newTags.push(answer_tag)
    setTags(newTags)
    // add answer tag to tag array
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const restart = () => {
    setQuestions(generateRandomSequenceOfQuestions(thisManyQuestions))
    setTags([])
    setCurrentQuestionIndex(0)
  }

  const start = () => {
    setLandingPage(false)
  }





  return (
    <div>
        {landingPage ? <LandingPage start={start}/> : currentQuestionIndex > thisManyQuestions - 1 ? 
        <RecipeView restart={restart} tags={tags}></RecipeView> : 
        <QuestionView currentQuestionIndex={currentQuestionIndex} setNextQuestion={setNextQuestion} questions={questions}></QuestionView>}
        
    </div>
  )
}

export default App;
