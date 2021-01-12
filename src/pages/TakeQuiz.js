
import { useEffect, useState } from "react"
import QuizService from '../services/QuizService'
import Modal from 'react-modal';
const quizService = new QuizService()
export default function TakeQuiz(props) {
  const [quiz, setQuiz] = useState(null)
  const id = props.match.params.id
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [score, setScore] = useState(-1)
  const [messages, setMessages] = useState([])
  const [confirmModal, setConfirmModal] = useState(false)
  useEffect(() => {
    quizService.getQuiz(id)
      .then(result => {
        setQuiz(result.data.quiz)
        if (result.data.quiz.quiztakers_set.completed) {
          setMessages(result.data.quiz.quiztakers_set.usersanswer_set.map(answer => answer.message))

          setScore(result.data.quiz.quiztakers_set.score)
          //quizService.getAnswers(result.data.quiz.id)
        }
        initAnswers(result.data.quiz)
      })
  }, [])
  function initAnswers(quiz) {
    const usersAnswers = quiz.quiztakers_set.usersanswer_set;
    let array = []
    var set = false
    for (let i = 0; i < usersAnswers.length; i++) {
      if (usersAnswers[i]['answer'].length > 0) {
        array.push(usersAnswers[i]['answer']);

      }
      else {
        if (!set) {
          set = true
          setIndex(i)
        }


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
    quizService.submitQuiz(body, id).then(result => {
      setScore(result.data.quiztakers_set.score)
      setMessages(result.data.quiztakers_set.usersanswer_set.map(answer => answer.message))
    })
  }
  function next() {

    if (index == quiz.question_set.length - 1) {
      setConfirmModal(true)
      return;
    }
    if (selectedAnswer && selectedAnswer.length > 0) {
      saveAnswer()
    }



    if (index !== quiz.question_set.length - 1) {
      setIndex(index + 1)
      setSelectedAnswer(null)
    }
  }

  function selectAnswer(id) {
    setSelectedAnswer(id)
    var arr = answers
    arr[index] = id
    console.log(arr)
    setAnswers(arr)

  }


  function previous() {
    if (selectedAnswer) {
      saveAnswer()
    }

    if (index != 0) {
      setIndex(index - 1)
      setSelectedAnswer(null)
    }
  }
  if (!quiz) {
    return null
  }
  if (score != -1) {
    return (<div><div className="table-title">
     
      <div style={{ padding: '15px' }}>
        <Score score={score} /></div>
        <h2>{quiz.name} </h2>
    </div>
      <table className="table-fill">
        <thead>
          <tr>
            <th className="text-left">Question</th>
            <th className="text-left">Answer</th>
          </tr>
        </thead>
        <tbody className="table-hover">

          {messages.map((message, index) => (
            <tr>
              <td className="text-left">{quiz.question_set[index] && quiz.question_set[index].label}</td>
              <td className="text-left">{message}</td>
            </tr>
          ))}

        </tbody>
      </table></div>)
  }

  return <div style={{display:'flex',justifyContent:'center'}}>
    <Modal
      isOpen={confirmModal}>
      <div className="buttons" style={{ diplay: 'flex', flexDirection: 'column',justifyContent:'center', marginTop:'10%'}}>
        <h2>Confirm Submission</h2>
        <p>{quiz.question_set.length-answers.filter(e=>e.length>0).length?`You have ${quiz.question_set.length-answers.filter(e=>e.length>0).length} unanswered, are you sure you want to submit?`:"Check all of your answers"}</p>
        <button onClick={submitQuiz}>Submit</button><button onClick={() => setConfirmModal(false)}>Cancel</button>
      </div>
    </Modal>

  <div style={{maxWidth:'400px'}}>
    <div className="question-wrapper">
      <div className="question-number">
        QUESTION  {index + 1} OF {quiz.question_set.length}
      </div>
      <Question selectedAnswer={answers[index]} question={quiz['question_set'][index]} selectAnswer={selectAnswer} />


    </div>

    <div className="buttons">
      <button onClick={previous}>
        Previous
        </button>
      <button onClick={next}> {index == quiz.question_set.length - 1 ? 'Submit' : 'Next'}
      </button>
    </div>
  </div></div>
}
function Question({ question, selectAnswer, selectedAnswer }) {
  return (
    <div style={{ padding: '15px' }}>
      <h5 style={{ fontWeight: 'bold' }}>{question.label}</h5>
      <hr />
      {question.question_type === "multiple" ? question['answer_set'].map((answer, index) => (
        <Answer key={answer.id} answer={answer} index={index} selectAnswer={selectAnswer} selectedAnswer={selectedAnswer} />
      )) :
        question.question_type === "dropdown" ?
          <select value={selectedAnswer} onChange={e => selectAnswer([+e.target.value])}>
            <option value={null} selected disabled hidden>Choose here</option>
            {question['answer_set'].map(c => (
              <option value={c.id} key={c.id}>{c.label}</option>

            ))}

          </select> :
          <div>
            {question['answer_set'].map(c => (
              <Checkbox selectedAnswer={selectedAnswer} selectAnswer={selectAnswer} key={c.id} answer={c} />

            ))}     </div>}
    </div>
  )
}
function Checkbox({ answer, selectAnswer, selectedAnswer }) {
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    if (selectedAnswer && selectedAnswer.includes(answer.id)) {
      setChecked(true)
    }
  }, [selectedAnswer])
  function changeAnswer(e){
    if (!checked) {
      if(!selectedAnswer){
        selectedAnswer=[]
      }
     selectedAnswer.push(+e.target.value); 
     selectAnswer(selectedAnswer); 
     setChecked(true) 
    } else {
       selectedAnswer.splice(selectedAnswer.indexOf(+e.target.value), 1); 
       selectAnswer(selectedAnswer); 
       setChecked(false)
    } 
  }
  return <div><input checked={checked} type="checkbox" onChange={e => changeAnswer(e)} value={answer.id} />{answer.label}</div>
}
function Answer({ answer, selectAnswer, selectedAnswer }) {
  return <div className="answer" onClick={() => selectAnswer([answer.id])} >
    <div className={selectedAnswer == answer.id ? "selected-letter" : ""}>{answer.label}</div>
  </div>
}
function Score({ score }) {
  if (score <= 60) {
    return <div><h1 style={{ fontSize: '100px' }}>&#128546;{score}%</h1><h2 style={{ color: 'red', textDecorationLine: 'underline' }}>Uh oh. Better luck next time.</h2></div>
  }
  else if (score <= 80) {
    return <div><h1 style={{ fontSize: '100px' }}>&#128512;{score}%</h1><h2 style={{ color: 'orange', textDecorationLine: 'underline' }}>
      You can do it! Keep trying!</h2></div>
  }
  else {
    return <div><h1 style={{ fontSize: '100px' }}>&#x1F61C;{score}%</h1><h2 style={{ color: 'green', textDecorationLine: 'underline' }}>
      Congrats! You did it!</h2></div>
  }

}