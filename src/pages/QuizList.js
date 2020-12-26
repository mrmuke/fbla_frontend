import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizService from '../services/QuizService'
const quizService = new QuizService();
export default function QuizList(){
    const [quizzes, setQuizzess]=useState([])
    const [quizFile, setQuizFile] = useState(null)
    useEffect(async()=>{
        const {data} = await quizService.getQuizzes()
        setQuizzess(data)
            
    },[])
    function selectQuizFile(e){
        setQuizFile(e.target.files[0])
    }
    function uploadQuiz(){
        console.log(quizFile)
        const formData = new FormData(); 
     
      // Update the formData object 
      formData.append( 
        "myFile", 
        quizFile, 
        quizFile.name
      ); 
quizService.uploadQuiz(formData)
    }

    if(quizzes.length==0){
        return <h2 className="quizzes-container text-center">No Quizzes Left to Master</h2>
    }
    return <div className="quizzes-container">
    <h2 style={{textAlign:'center', textDecoration:'underline'}}>Discover Quizzes</h2>
    <button>Upload Quiz</button>
    <input accept="application/pdf" type="file" onChange={selectQuizFile} /> 
    <button onClick={uploadQuiz}> 
        Upload! 
    </button> 
    
    {quizzes.map(quiz=>
        <Quiz quiz={quiz} key={quiz.id}/>
    )}
</div>
}
function Quiz({quiz}){
    return(
    <Link  to={`/quizzes/${quiz.id}`}>
        <div className="quiz-item">
        
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
            <div style={{display:'flex'}}>

        <span>{quiz.questions_count} Questions</span>


            </div></div>
            

    </Link>);
}