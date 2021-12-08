import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditList from './pages/EditList';
import EditQuiz from './pages/EditQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import Navbar from './Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit-list' element={<EditList />} />
        <Route path='/edit-quiz/:quizId' element={<EditQuiz />} />
        <Route path='/quiz-list' element={<QuizList />} />
        <Route path='/take-quiz/:quizId' element={<TakeQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
