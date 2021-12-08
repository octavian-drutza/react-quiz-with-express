import React, { useEffect } from 'react';
import QuizPreview from '../components/QuizPreview';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const EditList = () => {
  const { quizes, addQuiz, getQuizes, loading, error } = useGlobalContext();
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

  if (error) {
    return <h2>Connection Error, Try again later!</h2>;
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
          return (
            <QuizPreview
              key={quiz._id}
              {...quiz}
              isEdit={true}
              goEdit={goEdit}
            />
          );
        })}
      </section>
    </section>
  );
};

export default EditList;
