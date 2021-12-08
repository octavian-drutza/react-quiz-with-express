import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    quizes: [],
    loading: true,
    error: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getQuizes = async () => {
    startLoading();
    try {
      const quizes = await axios.get('http://localhost:5000/api/quizes');
      dispatch({ type: 'GET_QUIZES', payload: quizes.data });
      stopLoading();
    } catch (error) {
      stopLoading();
      setError();
    }
  };

  const addQuiz = async (quiz) => {
    startLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/api/quizes',
        quiz,
        config
      );
      dispatch({ type: 'ADD_QUIZ', payload: res.data });
      stopLoading();
    } catch (error) {
      stopLoading();
      setError();
    }
  };

  const updateQuiz = async (quiz) => {
    startLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/quizes/${quiz._id}`,
        quiz,
        config
      );
      dispatch({ type: 'UPDATE_QUIZ', payload: res.data });
      stopLoading();
    } catch (error) {
      stopLoading();
      setError();
    }
  };

  const deleteQuiz = async (id) => {
    startLoading();
    try {
      const res = await axios.delete(`http://localhost:5000/api/quizes/${id}`);
      dispatch({ type: 'DELETE_QUIZ', payload: id });
      stopLoading();
    } catch (error) {
      stopLoading();
      setError();
    }
  };

  const stopLoading = () => {
    dispatch({ type: 'STOP_LOADING' });
  };

  const startLoading = () => {
    dispatch({ type: 'START_LOADING' });
  };

  const setError = () => {
    dispatch({ type: 'ERROR_CONNECTION' });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        deleteQuiz,
        updateQuiz,
        addQuiz,
        getQuizes,
        startLoading,
        stopLoading,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
