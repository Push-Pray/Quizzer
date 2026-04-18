import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from './components/TeacherDashboard/QuizList'
import QuestionList from './components/TeacherDashboard/QuestionList'
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path= "/" element={<QuizList />} />
          <Route path= "/quizz/:id" element={<QuestionList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
