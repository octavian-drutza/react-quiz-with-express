import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useGlobalContext } from '../context';
import QuestionForm from '../components/QuestionForm';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EditQuiz = () => {
  let navigate = useNavigate();
  const { quizId } = useParams();
  const {
    updateQuiz,
    loading,
    startLoading,
    stopLoading,
    setError,
    error,
    errorMessage,
    loggedUser,
  } = useGlobalContext();
  const [stateQuiz, setStateQuiz] = useState({
    id: '',
    title: '',
    data: [],
    creator: '',
  });
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    type: 'multiple',
    answers: [],
  });
  console.log(loggedUser);

  useEffect(() => {
    const getQuiz = async (id) => {
      startLoading();
      try {
        const res = await axios.get(`http://localhost:5000/api/quizes/${id}`);
        setStateQuiz(res.data);
        stopLoading();
        setError(false);
      } catch (error) {
        setError(true, errorMessage);
        stopLoading();
      }
    };
    getQuiz(quizId);
  }, []);

  // edit
  const setTitle = (value) => {
    setStateQuiz({ ...stateQuiz, title: value });
  };

  const setQuestion = (id, newData) => {
    let otherQuestions = stateQuiz.data.filter((question) => {
      if (question._id) {
        return question._id !== id;
      } else {
        return question.question !== newData.question;
      }
    });
    setStateQuiz({ ...stateQuiz, data: [...otherQuestions, newData] });
  };

  const deleteQuestion = (id, title) => {
    let newQuestions = stateQuiz.data.filter((question) => {
      if (question._id) {
        return question._id !== id;
      } else {
        return question.question !== title;
      }
    });
    setStateQuiz({ ...stateQuiz, data: newQuestions });
  };

  // new question
  const addNewQuestion = () => {
    setStateQuiz({ ...stateQuiz, data: [...stateQuiz.data, newQuestion] });
  };

  const setNewQuestionContent = (value) => {
    setNewQuestion({
      ...newQuestion,
      question: value,
    });
  };

  const setNewQuestionType = (value) => {
    setNewQuestion({
      ...newQuestion,
      type: value,
    });
  };

  const submitAndGo = () => {
    updateQuiz(stateQuiz);
    navigate('/edit-list');
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>{errorMessage}</h2>;
  }

  if (!loggedUser || loggedUser !== stateQuiz.creator) {
    return <h2>Wrong path, can not edit this quiz</h2>;
  }
  return (
    <section className='quiz-edit-pg'>
      <article className='question-list'>
        <h5>Quiz ID: {quizId}</h5>
        <article className='title-add'>
          <article className='change-title-input'>
            <label htmlFor='titleInput'>Title:</label>
            <input
              type='text'
              name='titleInput'
              value={stateQuiz.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </article>
        </article>
        <h3>Add new question to quiz:</h3>
        <section className='question-add'>
          <article className='add-question-input'>
            <label htmlFor='questionAddTitle'>Question Title:</label>
            <div className='add-question-input-group '>
              <input
                name='questionAddTitle'
                type='text'
                value={newQuestion.question}
                onChange={(e) => {
                  setNewQuestionContent(e.target.value);
                }}
              />
              <button className='add-question-btn' onClick={addNewQuestion}>
                +
              </button>
            </div>
          </article>

          <article className='add-question-type'>
            <label htmlFor='typeSelect'>Question Type:</label>
            <select
              name='typeSelect'
              value={newQuestion.type}
              onChange={(e) => {
                setNewQuestionType(e.target.value);
              }}
            >
              <option value='multiple'>Multiple Answers</option>
              <option value='single'>Single Answer</option>
              <option value='input'>Input</option>
            </select>
          </article>
        </section>
        <h3>Edit Questions:</h3>
        {stateQuiz.data ? (
          stateQuiz.data.map((question, index) => (
            <QuestionForm
              key={question._id ? question._id : index}
              content={question}
              deleteQuestion={deleteQuestion}
              setQuestion={setQuestion}
            />
          ))
        ) : (
          <h4>no questions yet</h4>
        )}
        <div>
          <button className='submit-changes-btn' onClick={submitAndGo}>
            Submit All Changes
          </button>
        </div>
      </article>
    </section>
  );
};

export default EditQuiz;
