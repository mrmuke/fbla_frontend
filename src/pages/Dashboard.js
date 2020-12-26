import React, { useEffect, useState } from 'react'
import QuizCard from '../components/QuizCard'
import QuizService from '../services/QuizService'
import Goals from './Goals'
const quizService = new QuizService()
export default function Dashboard(){
    const [mine, setMine] = useState([])
    useEffect(()=>{
        getMyQuizzes()
    },[])
    function getMyQuizzes(){
        quizService.getMyQuizzes().then(result=>{
            setMine(result.data)
            console.log(result.data)

    })
    }
    return <div>
        <h1 style={{textAlign:'center'}}>Quizzes You've Started/Taken</h1>
        <QuizCard quizzes={mine}/>
        
        <Goals/>
    </div>
}