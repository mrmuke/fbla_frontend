
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register'
import PrivateRoute from './PrivateRoute';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import { AuthContext } from "./auth";
import React,{ useState } from "react";
import Navbar from "./components/Navbar";
import axios from 'axios'
import QuizList from "./pages/QuizList";
import TakeQuiz from "./pages/TakeQuiz";

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }
    if(authTokens)
    {
        axios.defaults.headers.common['Authorization'] = "Token " +authTokens.token
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens:setTokens }}>
      
      <Router>
        <Navbar/>
      <Switch>
        
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PrivateRoute exact path="/quizzes" component={QuizList}/>
      <PrivateRoute exact path="/quizzes/:id" component={TakeQuiz}/>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/" component={Home}/>
                

            </Switch></Router>
  </AuthContext.Provider>
  );
}
export default App