import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from './components/TeacherDashboard/QuizList'
import QuestionList from './components/TeacherDashboard/QuestionList'
import OptionList from './components/TeacherDashboard/OptionList';
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path= "/" element={<QuizList />} />
          <Route path= "/quizz/:id" element={<QuestionList />} />
          <Route path= "/quizz/:quizId/question/:questionId" element={<OptionList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
