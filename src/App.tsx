import React, { useEffect, useState } from 'react';
import { getQuizData } from './services/quizService';
import { QuestionType} from './Types/quizTypes';
import QuestionCard from './components/questionCard';
import './App.css';

function App() {
  let [quiz, setQuiz] = useState<QuestionType[]>([])
  let [currentStep, setCurrentStep] = useState<number>(0)
  let [noOfQue, setNoOfQue] = useState<number>(5)
  let [level, setLevel] = useState<string>('')
  let [score, setScore] = useState<number>(0)
  let [result, setResult] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      const questions: QuestionType[] = await getQuizData(noOfQue, level)
      // console.log(questions)
      setQuiz(questions)
    }
    fetchData();
  }, [noOfQue, level])
  
  
  const handleSubmit = (e: React.FormEvent<EventTarget>, selectedAns: string) => {
    e.preventDefault();
    const currentQue: QuestionType = quiz[currentStep]    
    if(selectedAns === currentQue.correct_answer)
      setScore(++score)
    
    if (currentStep !== quiz.length - 1)
      setCurrentStep(++currentStep)
    
    else {
      setResult(true)
    }

  }
  if(result){
    return(
      <div className='result-cont'>
        <h2>Result</h2><hr/>
        <p>Your final score is {score} out of {quiz.length}</p>
        <button className='submit' onClick={()=>window.location.reload()}>Restart</button>
      </div>
    )
  }
  if (!quiz.length) {
    return <h2>Loading...</h2>
  }
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>QUIZ APP</h1>
      <form className='selection-form' onSubmit={(e: any) => e.preventDefault()}>
        Select no of question: <input type='number' required size={3} value={noOfQue} onChange={(e: any) => setNoOfQue(Number(e.target.value))} />
        Select Level: <select onChange={(e: any) => setLevel(e.target.value)}>
          <option value='easy' >easy</option>
          <option value='medium'>medium</option>
          <option value='hard'>hard</option>
        </select>
      </form>
      <QuestionCard
        question={quiz[currentStep].question}
        option={quiz[currentStep].option}
        callback={handleSubmit} />
    </div>
  );
}

export default App;
