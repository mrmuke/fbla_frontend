import { Link } from "react-router-dom";
import '../home.css'
export default function Home() {
    return <div>
    <div class="welcome-area">


<div class="header-text">
    <div class="container">
        <div class="row">
            <div class="offset-xl-3 col-xl-6 offset-lg-2 col-lg-8 col-md-12 col-sm-12">
                <h1>We provide the best <strong>strategy</strong><br/> to prepare you for <strong>FBLA</strong></h1>
                <p>Use the best tool out there to help you achieve your maximum potential on FBLA objective tests...</p>
                <Link to="/signup" class="welcome-button">Get Started</Link>
            </div>
        </div>
    </div>
</div>

</div>
<section class="section home-feature">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.2s">
                            <div class="features-small-item">
                                <div class="icon">
                                    <i><img src="/checklist.png" style={{width:'50px'}} alt=""/></i>
                                </div>
                                <h5 class="features-title">Plan Your Studying</h5>
                                <p>Ace the test by creating a study plan, and we will provide dates for you to take our practice quizzes</p>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.4s">
                            <div class="features-small-item">
                                <div class="icon">
                                    <i><img src="/quiz.png" style={{width:'50px'}} alt=""/></i>
                                </div>
                                <h5 class="features-title">Take Quizzes</h5>
                                <p>Take our already existing quizzes or import your own to hone your FBLA skills and prep for objective tests</p>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 col-sm-6 col-12" data-scroll-reveal="enter bottom move 50px over 0.6s after 0.6s">
                            <div class="features-small-item">
                                <div class="icon">
                                    <i><img src="/analyze.png" style={{width:'50px'}} alt=""/></i>
                                </div>
                                <h5 class="features-title">Analyze Your Results</h5>
                                <p>View your quiz efficiency and other analytics on your dashboard and also keep track of your results after you take a test</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        

    </div>
}