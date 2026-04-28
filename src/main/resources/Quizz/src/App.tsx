import './App.css'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import QuizList from './components/TeacherDashboard/QuizList'
import QuestionList from './components/TeacherDashboard/QuestionList'
import OptionList from './components/TeacherDashboard/OptionList';
import CategoryList from './components/TeacherDashboard/CategoryList';
import StudentQuizzList from './components/StudentDashboard/StudentQuizzList';
import StudentCategoryList from './components/StudentDashboard/StudentCategoryList';
import StudentCategoryQuizzList from './components/StudentDashboard/StudentCategoryQuizzList';
import StudentQuizQuestions from './components/StudentDashboard/StudentQuizQuestions';
import StudentQuizResults from './components/StudentDashboard/StudentQuizResults';

function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="app-header">
          <nav className="app-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Teacher Dashboard
            </NavLink>
            <NavLink to="/student" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Student Dashboard
            </NavLink>
          </nav>
        </header>
        <main className="app-content">
          <Routes>
            <Route path= "/" element={<QuizList />} />
            <Route path= "/quizz/:id" element={<QuestionList />} />
            <Route path= "/quizz/:quizId/question/:questionId" element={<OptionList />} />
            <Route path= "/categories" element={<CategoryList />} />
            <Route path= "/student" element={<StudentQuizzList />} />
            <Route path= "/student/categories" element={<StudentCategoryList />} />
            <Route path= "/student/categories/:categoryName" element={<StudentCategoryQuizzList />} />
            <Route path= "/student/quizz/:id" element={<StudentQuizQuestions />} />
            <Route path= "/student/quizz/:id/results" element={<StudentQuizResults />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
