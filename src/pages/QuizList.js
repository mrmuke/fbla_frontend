import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QuizService from '../services/QuizService'
const quizService = new QuizService();
export default function QuizList(){
    const [quizzes, setQuizzess]=useState([])
    const [quizFile, setQuizFile] = useState(null)
    const [query, setQuery] = useState("")
    const [importQuiz,setImportQuiz] = useState(false)
    const hiddenFileInput = useRef(null);
    const handleUploadClick = event => {
        hiddenFileInput.current.click();
      };
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
quizService.uploadQuiz(formData).then(result=>{
    setImportQuiz(false)
    setQuizzess(oldArray => [...oldArray, result.data])
})
    }

    return <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><div className="quizzes-container">
        {importQuiz?
        <div   className="create-quiz" style={{justifyContent:'space-between'}}>
            <div>
            <a className="upload-btn" onClick={handleUploadClick}>Select Quiz</a>
        <input ref={hiddenFileInput} style={{display:'none'}} accept="application/pdf" type="file" onChange={selectQuizFile} /> </div>
        <button onClick={uploadQuiz}> 
            Submit! 
        </button></div>
    :<>
         <div className="create-quiz"><button onClick={()=>setImportQuiz(true)}>Import Your Own</button></div></>}
         <div style={{textAlign:'center'}}>or</div>
   
   {/*  <input accept="application/pdf" type="file" onChange={selectQuizFile} /> 
    <button onClick={uploadQuiz}> 
        Upload! 
    </button>  */}
    <input style={{padding:'10px',width:'100%',margin:'5px',border:'2px solid #eee'}} onChange={e=>setQuery(e.target.value)} placeholder="Search for a quiz.."/>

    
    {quizzes.length>0?quizzes.filter(q=>q.name.toLowerCase().includes(query.toLowerCase())).map(quiz=>
        <Quiz quiz={quiz} key={quiz.id}/>
    ):<div style={{textAlign:'center'}}>No quizzes left.. Check your dashboard to resume quizzes..</div>}
</div></div>
}
function Quiz({quiz}){
    return(
    <Link  to={`/quizzes/${quiz.id}`}>
        <div className="quiz-item">
        <div>
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
            <div style={{display:'flex'}}>

        <span>{quiz.questions_count} Questions</span>


            </div></div>
                <button className="take-quiz"> Take Quiz</button>

            </div>
            

    </Link>);
}