import React from 'react';
import {useState, useEffect} from 'react'
import QuestionView from './QuestionView'
import _ from 'lodash'
import questionAnswerPairs from './questions'
import RecipeView from './RecipeView'
import LandingPage from './LandingPage'
import 'normalize.css';
import './Style.css'
import * as firebase from "firebase/app";
import 'firebase/database'

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
  const dietTags = ['pescatarian', 'DF', 'GF', 'vegan', 'vegetarian']
  const [firebaseState, setFirebaseState] = useState(null)

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyA8YvUHrQ46G-2AzTZ8FCcurpgwaGuj04g",
      authDomain: "recipegen-fa395.firebaseapp.com",
      databaseURL: "https://recipegen-fa395.firebaseio.com",
      projectId: "recipegen-fa395",
      storageBucket: "recipegen-fa395.appspot.com",
    }

    firebase.initializeApp(firebaseConfig);
    setFirebaseState(firebase)
  },[])

  const setNextQuestion = (answer) => {
    const newTags = tags.slice(0)
    const answer_tag = answer.answer_tag
    newTags.push(answer_tag)
    setTags(newTags)
    // add answer tag to tag array
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setClickBlock(false)
    console.log(clickBlock, "value of block")
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
        <RecipeView firebaseState={firebaseState} selectedDietTags={selectedDietTags} restart={restart} tags={tags} goHome={() => restartAndLandingPage()}></RecipeView> : 
        <QuestionView clickBlock={clickBlock} setClickBlock={setClickBlock} currentQuestionIndex={currentQuestionIndex} setNextQuestion={setNextQuestion} questions={questions}></QuestionView>}
        
    </div>
  )
}

export default App;
