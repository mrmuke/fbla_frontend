import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QuizService from '../services/QuizService'
const quizService = new QuizService()
export default function Plan() {
    const [plan, setPlan] = useState(false)
    const [testDate, setTestDate] = useState(null)
    const [category, setCategory] = useState("Advertising")
    const [goals, setGoals] = useState(null)
    useEffect(() => {
        getGoals()
    }, [])
    function getGoals() {
        quizService.getPlan().then(result => {
            setGoals(result.data)
        })
    }
    function createPlan() {
        if (testDate) {
            quizService.createPlan({ "testDate": testDate, "category": category }).then(result => {
                setGoals(result.data)
            })
        }
        else {
            alert("Please select your test date...")
        }
    }
    const datesAreOnSameDay = (first, second) =>
    {
        return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
    }
    function dateWithinDateRange(date, min, max){
        return date>new Date(min) && date< new Date(max)
    }
    
    return (
        //do analyutics
        //follow guidelines
        //dropdown, true or false, multiple choice, multiple answers, fill in the blank
        //401 error
        //analytics dashboard and take quizzes apge
        //add code to extension
        <div className="goal-header"  >
            {!goals?
            <div style={{color:'white'}}>Loading...</div>
            :
            goals.length > 0 ?
                <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}>
                    <h2 style={{ textDecorationLine: 'underline',marginBottom:'10px' }}>Reach Nationals</h2>
                    {goals.map((goal, index) => (
                        <div key={goal.id}>
                            
                        <div className="step">
                            <h1 className={new Date()>new Date(goal.date)?"filled-step-header":"step-header"}>{index + 1}</h1>
                            <p className="step-text">{goal.date} : <a href={`/quizzes/${goal.quiz.id}`}><strong>{goal.quiz.name}</strong></a> {datesAreOnSameDay(new Date(),new Date(goal.date))&&<> &#x2190; You are here</>}</p>

                        </div>
                        <div className="step border-left">
                            <p className="step-text">{goal.date} to {goals[index+1]?goals[index+1].date:"Test Date"} : <strong>Study</strong>{dateWithinDateRange(new Date(),goal.date,goals[index+1]?goals[index+1].date:"2099-10-12")&&<> &#x2190; You are here</>}</p>

                        </div>
                        </div>
                        
                    ))}
                    <div className="step">
                            <h1 className="step-header">{goals.length+1}</h1>
                            <p className="step-text">Ready for your <b>Objective Test</b></p>

                        </div>
                    </div> :

                !plan ?
                    <>
                        <img className="goal-image" src="https://cdn.kastatic.org/images/sat/overview-ctas/schedule.svg" alt="" aria-hidden="true" />
                        <div style={{ color: 'white', padding: '15px' }}>
                            <h2 style={{ marginBottom: '10px' }}>Set up new goals today!</h2>
    Based on your test date, we'll put together a practice plan to ensure you're ready.<br></br>
                            <button style={{ color: '#1586CA', backgroundColor: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px' }} onClick={() => setPlan(true)}>Plan Your Studying</button></div>
                    </> : <div style={{ color: 'white', display: 'flex', flexDirection: 'column' }}><strong style={{ margin: '10px' }}>Enter testing date...</strong><input type="date" onChange={e => setTestDate(e.target.value)} /><strong style={{ margin: '10px' }}>Testing Category</strong><select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="Journalism">Journalism</option>
                        <option value="Securities and Investments">Securities and Investments</option>
                        <option value="Advertising">Advertising</option>
                    </select>
                        <button style={{ color: '#1586CA', backgroundColor: 'white', padding: '10px', borderRadius: '10px', marginTop: '10px' }} onClick={createPlan}>Create My Study Plan</button>


                    </div>}


        </div>)

}