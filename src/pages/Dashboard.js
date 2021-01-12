import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'
import Plan from '../components/Plan'
import QuizCard from '../components/QuizCard'
import QuizService from '../services/QuizService'
import Analytics from './Analytics'
const quizService = new QuizService()
export default function Dashboard(){
    const [mine, setMine] = useState([])
    const [show, setShow] =useState(false)
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
        <Plan/>
        <div style={{padding:'22px'}}>
        {!show?
        <QuizCard quizzes={mine}/>:<Analytics quizzes={mine}/>}
        <div style={{display:'flex',justifyContent:'center'}}>
        <button style={{color:'white',backgroundColor:'#1586CA', padding:'20px', borderRadius:'10px', marginTop:'10px'}} onClick={()=>setShow(!show)}>{show?"Back to My Quizzes":"Show Progress and Quiz Analytics"}</button></div>

       
        </div>
        
    </div>
}