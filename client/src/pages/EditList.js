import React, { useEffect } from 'react';
import QuizPreview from '../components/QuizPreview';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';

export const EditList = () => {
  const {
    quizes,
    addQuiz,
    getQuizes,
    loading,
    error,
    errorMessage,
    loggedUser,
  } = useGlobalContext();
  let navigate = useNavigate();
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    data: [],
  });

  useEffect(() => {
    getQuizes();
  }, []);

  const goEdit = (id) => {
    navigate(`/edit-quiz/${id}`);
  };

  const setNewQuizTitle = (value) => {
    setNewQuiz({
      ...newQuiz,
      title: value,
    });
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error && !loggedUser) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>{errorMessage}</h2>
      </div>
    );
  }

  if (!loggedUser) {
    return (
      <div>
        <h2>Login to edit or add quizes</h2>
        <Login />
      </div>
    );
  }

  return (
    <section className='edit-quizes-page'>
      <h3>Add New Quiz:</h3>
      <article className='add-new-quiz'>
        <article className='quiz-title-input'>
          <label htmlFor='quizTitleInput'>Quiz Title: </label>
          <div className='quiz-title-input-group'>
            <input
              name='quizeTitleInput'
              type='text'
              value={newQuiz.title}
              onChange={(e) => setNewQuizTitle(e.target.value)}
            />
            <button
              className='add-quiz-btn'
              onClick={() => {
                addQuiz(newQuiz);
              }}
            >
              +
            </button>
          </div>
        </article>
      </article>
      <h3>Edit Quizes:</h3>
      <section className='edit-quizes-list'>
        {quizes.map((quiz) => {
          console.log(quiz.creator);
          if (quiz.creator === loggedUser) {
            return (
              <QuizPreview
                key={quiz._id}
                {...quiz}
                isEdit={true}
                goEdit={goEdit}
              />
            );
          }
        })}
      </section>
    </section>
  );
};

export default EditList;
