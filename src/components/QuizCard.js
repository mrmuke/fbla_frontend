import { Link } from 'react-router-dom'
import '../card.css'
export default function QuizCard({quizzes}){
    return <div>
  <section className="cards-wrapper">
  {quizzes.map(quiz=>(
            <div className="card-grid-space" key={quiz.id}>
            <Link to={"/quizzes/"+quiz.id} className="card" style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&resize_w=1500&url=https://codetheweb.blog/assets/img/posts/basic-types-of-html-tags/cover.jpg')"}}>
                            <div className="date">Taken 9 Oct 2017</div>
      
                <h1>{quiz.name}</h1>
                <h5>{quiz.description}</h5>
                <div className="tags">
                  <div className="tag">Business</div>
                  <div className="tag">Mastery 4</div>
                </div>
                <div style={{display:'flex', justifyContent:'center', width:'100%', fontSize:'5em'}}>
      
                  {quiz.score}%
                </div>
            </Link>
          </div>
        ))}
    

    
  </section></div>
}