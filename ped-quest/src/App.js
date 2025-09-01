import React, { useState, useEffect } from 'react';
import Main from './Components/Main';
import {AuthProvider} from './authContext'

import {auth} from './config/fireBase'
import {onAuthStateChanged, updateProfile} from 'firebase/auth'
import app from "./config/fireBase" 
import {getDatabase, ref, set} from "firebase/database"; 


import Start from './Components/start';
import {Register} from './Components/register';
import Question from './Components/Question';
import End from './Components/End';
import Modal1 from './Components/Modal1'
import quizData from './data/quiz.json';
import Itogo from './Components/Itogo';

let interval;



function App(){
  const [currentUser, setCurrentUser] = useState(null)
  const [step, setStep] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [time, setTime] = useState(0);
  const [restartCount, setRestartCount] = useState(0)
  const [currAnswer, setCurrAnswer] = useState('')
  const [answA, setAnswA] = useState(0)
  const [answB, setAnswB] = useState(0)

  useEffect(() => {
    
    if(step === 3) {
      clearInterval(interval);
    }
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    
  }, [step], );

  const quizStartHandler = (name) => {
    updateProfile(auth.currentUser, { displayName: name })
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const regStartHandler = () => {
    if(currentUser !== null){
      quizStartHandler()
    }
    setStep(1)
  }

  const resetClickHandler = () => {
    setAnswA(0)
    setAnswB(0)
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    setRestartCount(restartCount+1);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const endHandler = (correctAnswers) => {
    const db = getDatabase(app)
    const uid = currentUser.uid
    set(ref(db, 'users/' + uid), {
      Email: currentUser.email,
      UserName: currentUser.displayName,
      Points: correctAnswers,
      Restarts: restartCount
    })
    
  }
  
  return (
      <AuthProvider value={{currentUser}}>
    <div className="App">
      <Main/>
      
      {step === 0 && <Start onRegStart={regStartHandler} />}
      {step === 1 && <Register onQuizStart={quizStartHandler}/>}
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
        setCurrAnswer = {setCurrAnswer}
        answA = {answA}
        answB = {answB}
        setAnswA = {setAnswA}
        setAnswB = {setAnswB}
      />}
      {step === 3 && <End 
        results={answers}
        data={quizData.data}
        onEnd={endHandler}
        onReset={resetClickHandler}
        onAnswersCheck={() => setStep(5)}
        time={time}
        answA = {answA}
        answB = {answB}
        setAnswA = {setAnswA}
        setAnswB = {setAnswB}
      />}
      {step === 4 && <Itogo 
        selected={currAnswer}
        data = {quizData.data[activeQuestion]}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 5 && <Modal1
        results={answers}
        data={quizData.data}
        onSetStep={setStep}
      />}
      
    </div>
    </AuthProvider>
  );
}

export default App