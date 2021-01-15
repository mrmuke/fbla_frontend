import { Link } from 'react-router-dom'
import '../card.css'
export default function QuizCard({quizzes}){
    return <div>
  <section className="cards-wrapper">
  {quizzes.map(quiz=>(
            <div className="card-grid-space" key={quiz.id}>
            <Link to={"/quizzes/"+quiz.id} className="quiz-card" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/basic-types-of-html-tags/cover.jpg')"}}>
                            <div className="date">{quiz.score!=null?"Finished":"In Progress"}</div>
      
                <h1>{quiz.name}</h1>
                <h5>{quiz.description}</h5>
                <div className="tags">
                  <div className="tag">Business</div>
                  <div className="tag">FBLA</div>
                </div>
                <div style={{display:'flex', alignItems:'center',flexDirection:'column', width:'100%', fontSize:'3em'}}>
      
                  {quiz.score!=null?quiz.score+"%":<div>Resume<div style={{textAlign:'center'}}>{quiz.progress}%</div></div>}
                </div>
            </Link>
          </div>
        ))}
    

    
  </section></div>
}