import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import AnswerForm from './AnswerForm';

const QuestionForm = ({ content, deleteQuestion, setQuestion }) => {
  const { _id, type, question, answers } = content;

  const [questionData, setQuestionData] = useState({
    type,
    question,
    answers,
    _id,
  });

  const [answerData, setAnswerData] = useState({
    name: '',
    correct: false,
  });

  useEffect(() => {
    setQuestion(_id, questionData);
  }, [questionData]);

  const setType = (value) => {
    setQuestionData({ ...questionData, type: value });
  };

  const setQuestionContent = (value) => {
    setQuestionData({ ...questionData, question: value });
  };

  const setAnswer = () => {
    setQuestionData({ ...questionData, answers: [...answers, answerData] });
  };

  const deleteAnswer = (name) => {
    let newAnswers = questionData.answers.filter((answer) => {
      return answer.name !== name;
    });
    setQuestionData({ ...questionData, answers: newAnswers });
  };

  const getAnswerValue = (value) => {
    setAnswerData({ ...answerData, name: value });
  };

  const getAnswerStatus = (input) => {
    if (input.checked) {
      setAnswerData({ ...answerData, correct: true });
    } else {
      setAnswerData({ ...answerData, correct: false });
    }
  };

  return (
    <section className='question-edit'>
      <article className='edit-input'>
        <label htmlFor='titleInput'>Question Title:</label>
        <input
          size='50'
          type='text'
          name='titleInput'
          value={questionData.question}
          onChange={(e) => {
            setQuestionContent(e.target.value);
          }}
        />
      </article>
      <article className='edit-type'>
        <label htmlFor='typeSelect'>Question Type:</label>
        <select
          name='typeSelect'
          value={questionData.type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value='multiple'>Multiple Answers</option>
          <option value='single'>Single Answer</option>
          <option value='input'>Input</option>
        </select>
      </article>

      <article className='add-answer'>
        <div className='add-answer-group'>
          <label htmlFor='addAnswerInput'>Add new answer:</label>
          <input
            name='addAnswerInput'
            type='text'
            value={answerData.name}
            onChange={(e) => {
              getAnswerValue(e.target.value);
            }}
          />
          <button className='add-answer-btn' onClick={setAnswer}>
            +
          </button>
        </div>
        <div className='add-answer-group'>
          <label htmlFor='addAnswerCheck'>Check if correct: </label>
          <input
            className='add-answer-check'
            name='addAnswerCheck'
            type='checkbox'
            checked={answerData.correct}
            onChange={(e) => {
              getAnswerStatus(e.target);
            }}
          />
        </div>
      </article>

      <article className='answers-list'>
        <h5>Answers:</h5>
        {questionData.answers ? (
          questionData.answers.map((answer, index) => {
            return (
              <AnswerForm key={index} {...answer} deleteAnswer={deleteAnswer} />
            );
          })
        ) : (
          <div></div>
        )}
      </article>

      <button
        className='del-question-btn'
        onClick={() => {
          deleteQuestion(_id, question);
        }}
      >
        Delete Question
      </button>
    </section>
  );
};

export default QuestionForm;
