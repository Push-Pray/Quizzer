import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizList from './components/TeacherDashboard/QuizList'
import QuestionList from './components/TeacherDashboard/QuestionList'
import OptionList from './components/TeacherDashboard/OptionList';
import CategoryList from './components/TeacherDashboard/CategoryList';

function App() {
  

  return (
    <Router>
      <div className="app-shell">
        <main className="app-content">
          <Routes>
            <Route path= "/" element={<QuizList />} />
            <Route path= "/quizz/:id" element={<QuestionList />} />
            <Route path= "/quizz/:quizId/question/:questionId" element={<OptionList />} />
            <Route path= "/categories" element={<CategoryList />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
