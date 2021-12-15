import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useGlobalContext } from './context';
import Home from './pages/Home';
import EditList from './pages/EditList';
import EditQuiz from './pages/EditQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './Navbar';

function App() {
  const { setToken, setLoggedUser, getCookie } = useGlobalContext();

  useEffect(() => {
    const { user, token } = getCookie();
    setLoggedUser(user);
    setToken(token);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit-list' element={<EditList />} />
        <Route path='/edit-quiz/:quizId' element={<EditQuiz />} />
        <Route path='/quiz-list' element={<QuizList />} />
        <Route path='/take-quiz/:quizId' element={<TakeQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
