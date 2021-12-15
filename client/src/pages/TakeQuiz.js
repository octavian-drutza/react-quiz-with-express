import React, { useEffect } from 'react';
import Question from '../components/Question';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import axios from 'axios';

export const TakeQuiz = () => {
  let navigate = useNavigate();
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({ _id: '', title: '', data: [] });
  const { loading, startLoading, stopLoading, setError, error, errorMessage } =
    useGlobalContext();
  const [current, setCurrent] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getQuiz = async (id) => {
      startLoading();
      try {
        const res = await axios.get(`http://localhost:5000/api/quizes/${id}`);
        setQuiz(res.data);
        stopLoading();
        setError(false);
      } catch (error) {
        stopLoading();
        setError(true, errorMessage);
      }
    };
    getQuiz(quizId);
  }, []);

  const nextQuestion = () => {
    if (current < quiz.data.length - 1) {
      setCurrent(current + 1);
    } else if (current >= quiz.data.length - 1) {
      setQuizFinished(true);
    }
  };

  const getAnswer = (input, answer) => {
    if (quiz.data[current].type !== 'input') {
      if (input.checked) {
        let newAnswer = answer;
        setAnswers([...answers, newAnswer]);
      } else {
        let newAnswers = answers.filter((ans) => {
          return ans !== answer;
        });
        setAnswers(newAnswers);
      }
    } else {
      if (input.value.length > 0) {
        setAnswers([{ name: input.value }]);
      }
    }
  };

  const submitResult = (e) => {
    e.preventDefault();
    nextQuestion();
    if (answers.length > 0) {
      let resultPossitive;
      if (quiz.data[current].type === 'multiple') {
        let res = answers.every((answer) => {
          return answer.correct === true;
        });
        if (res && answers.length > 1) {
          resultPossitive = true;
        }
      } else if (quiz.data[current].type === 'single') {
        resultPossitive = answers.every((answer) => {
          return answer.correct === true;
        });
      } else {
        resultPossitive =
          answers[0].name === quiz.data[current].answers[0].name.toLowerCase();
      }
      if (resultPossitive) {
        setScore(score + 1);
      } else {
        setWrongAnswers([
          ...wrongAnswers,
          { question: quiz.data[current], wrongs: [...answers] },
        ]);
      }
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          question: quiz.data[current],
          wrongs: [{ name: 'You skipped answer' }],
        },
      ]);
    }
    setAnswers([]);
  };

  const restart = () => {
    navigate('/quiz-list');
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{errorMessage}</h2>;
  }

  if (quiz.data.length === 0) {
    return <h2>No questions</h2>;
  }

  if (quizFinished) {
    return (
      <section className='take-quiz-pg'>
        <article className='take-quiz-results'>
          <h3>
            Quiz finished, your total score is {score} out of {quiz.data.length}
          </h3>
          {wrongAnswers.map((wrongAnswer, index) => {
            const { question, wrongs } = wrongAnswer;
            return (
              <article key={index} className='take-quiz-res-ans'>
                In question "{question.question}", you answered:
                {wrongs.map((wrong, index) => {
                  return <li key={index}>{wrong.name}</li>;
                })}
                Correct answers were:
                {question.answers.map((answer, index) => {
                  return answer.correct && <li key={index}>{answer.name}</li>;
                })}
              </article>
            );
          })}
          <button className='back-to-quizes-btn' onClick={restart}>
            Back to Quizes
          </button>
        </article>
      </section>
    );
  }

  return (
    <Question
      current={current}
      {...quiz.data[current]}
      submitResult={submitResult}
      getAnswer={getAnswer}
    />
  );
};

export default TakeQuiz;
