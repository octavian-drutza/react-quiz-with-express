import React, { useEffect } from 'react';
import QuizPreview from '../components/QuizPreview';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const QuizList = () => {
  const { quizes, getQuizes, loading, error, errorMessage } =
    useGlobalContext();
  let navigate = useNavigate();

  useEffect(() => {
    getQuizes();
  }, []);

  const goTake = (id) => {
    navigate(`/take-quiz/${id}`);
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{errorMessage}</h2>;
  }

  return (
    <section className='view-quizes-page'>
      <h3>Choose a quiz:</h3>
      <section className='view-quizes-list'>
        {quizes.map((quiz) => {
          return <QuizPreview key={quiz._id} {...quiz} goTake={goTake} />;
        })}
      </section>
    </section>
  );
};

export default QuizList;
