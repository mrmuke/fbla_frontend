import axios from 'axios';

import {API_URL} from './API_URL.js'


export default class QuizService{
    
    constructor(){}

    getQuizzes() {
        return axios.get(`${API_URL}/api/quiz/quizzes`);
      }
      getQuiz(id) {
        return axios.get(`${API_URL}/api/quiz/${id}`);
      }
    saveAnswer(response){
        return axios.patch(`${API_URL}/api/quiz/saveAnswer`,response)
    }
    getMyQuizzes(){
      return axios.get(`${API_URL}/api/quiz/myQuizzes`)
    }
    
  submitQuiz(body, id) {
    return axios.post(`${API_URL}/api/quiz/${id}/submit`, body)
  }
  uploadQuiz(data) {
    return axios.post(`${API_URL}/api/quiz/upload`, data)
  }


    
}