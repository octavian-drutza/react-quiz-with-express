import React from 'react';
import { useGlobalContext } from '../context';

const QuizPreview = ({ _id, title, isEdit, goEdit, goTake }) => {
  const { deleteQuiz } = useGlobalContext();

  return (
    <section className='quiz-preview'>
      <h4>Quiz ID: {_id}</h4>
      <h4>Quiz Title: {title}</h4>

      {isEdit ? (
        <div>
          <button
            className='edit-quiz-btn'
            onClick={() => {
              goEdit(_id);
            }}
          >
            Edit Quiz
          </button>
          <button
            className='del-quiz-btn'
            onClick={() => {
              deleteQuiz(_id);
            }}
          >
            Delete Quiz
          </button>
        </div>
      ) : (
        <div>
          <button
            className='take-quiz-btn'
            onClick={() => {
              goTake(_id);
            }}
          >
            Take Quiz
          </button>
        </div>
      )}
    </section>
  );
};

export default QuizPreview;
