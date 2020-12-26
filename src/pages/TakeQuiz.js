import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { API_URL } from "../services/API_URL"
import QuizService from '../services/QuizService'
const quizService = new QuizService()
export default function TakeQuiz(props){
    const [quiz,setQuiz] = useState(null)
const id = props.match.params.id
    const [answers, setAnswers] = useState([])
    const [index, setIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [score,setScore] = useState(-1)
    useEffect(()=>{
        quizService.getQuiz(id)
            .then(result=>{
                setQuiz(result.data.quiz)
                if(result.data.quiz.quiztakers_set.completed) {
                    setScore(result.data.quiz.quiztakers_set.score)
                  }
                initAnswers(result.data.quiz)
            })
    },[])
    function initAnswers(quiz) {
        const usersAnswers = quiz.quiztakers_set.usersanswer_set;
        let array = []
        for(let i=0; i<usersAnswers.length; i++) {
          if(usersAnswers[i]['answer']){
            array.push(usersAnswers[i]['answer']);
          }
          
        }
        console.log(array)
        setAnswers(array)
      }
      function saveAnswer() {
        const body = {
          "quiztaker": quiz.quiztakers_set.id,
          "question": quiz.question_set[index].id,
          "answer": selectedAnswer
        }
        quizService.saveAnswer(body)
      }
    
     function submitQuiz() {
        const body = {
          "quiztaker": quiz.quiztakers_set.id,
          "question": quiz.question_set[index].id,
          "answer": selectedAnswer
        }
        quizService.submitQuiz(body,id).then(result=>{
          setScore(result.data.quiztaker_set.score)
        })
      }
      function next() {
        
        if(index === quiz.question_set.length-1) {
          submitQuiz();
          return;
        }
        if(selectedAnswer!=null) {
          saveAnswer()
        }
    
        
    
        if(index !== quiz.question_set.length-1) {
         setIndex(index+1)
        setSelectedAnswer(null)
        }
      }
    
      function selectAnswer(id) {
        setSelectedAnswer(id)
        var arr = answers 
        arr[index]=id
        console.log(arr)
        setAnswers(arr)
        
      }
    
      function previous() {
        if(selectedAnswer) {
          saveAnswer()
        }
    
        if(index!=0) {
            setIndex(index-1)
            setSelectedAnswer(null)
        }
      }
      if(score!=-1){
          return <div style={{display:'flex', alignItems:'center', flexDirection:'column', textAlign:'center'}}><FontAwesomeIcon icon={faCoffee} /><h1>You've completed {quiz.name}</h1><h3>With a score of {score}</h3></div>
      }
      if(!quiz){
          return null
      }
    return <div>
    <div className="question-wrapper">
    <div className="question-number">
                QUESTION  {index + 1} OF {quiz.question_set.length}
            </div>
    <Question selectedAnswer ={answers[index]} question={quiz['question_set'][index]} selectAnswer={selectAnswer}/>

            
        </div>
    
    <div className="buttons">
        <button onClick={previous}>
            Previous
        </button>
        <button onClick={next}> {index == quiz.question_set.length - 1 ? 'Submit' : 'Next'}
        </button>
    </div>
</div>
}
function Question({question, selectAnswer, selectedAnswer}){
    return (
        <div  style={{padding:'15px'}}>
    <h2 style={{fontWeight:'bold'}}>{question.label}</h2>
    <hr/>
        {question['answer_set'].map((answer,index)=>(
            <Answer key={answer.id} answer={answer} index={index} selectAnswer={selectAnswer} selectedAnswer={selectedAnswer}/>
        ))}
</div>
    )
}
function Answer({answer, index, selectAnswer, selectedAnswer}){
    return <div className="answer" onClick={()=>selectAnswer(answer.id)} >
    <div className={selectedAnswer==answer.id?"selected-letter":""}>{answer.label}</div>
</div>
}