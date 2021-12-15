import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './reducer';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    quizes: [],
    loading: true,
    error: false,
    loggedUser: null,
    token: null,
    errorMessage: '',
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const cookData = (user, token, expiration) => {
    document.cookie = `quizUser=${user};expires=${expiration}`;
    document.cookie = `quizToken=${token};expires=${expiration}`;
    console.log(document.cookie);
  };

  const getCookie = () => {
    let user;
    let token;
    document.cookie.split(';').forEach((cookie) => {
      let arr = cookie.split('=');
      if (arr[0].trim() === 'quizUser') {
        user = arr[1];
      }
      if (arr[0].trim() === 'quizToken') {
        token = arr[1];
      }
    });
    return { user, token };
  };

  const loginUser = async (credentials) => {
    let date = new Date();
    date.setTime(date.getTime() + 60 * 1000);
    startLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/users/login',
        credentials,
        config
      );
      setLoggedUser(res.data.user._id);
      setToken(res.data.token);
      cookData(res.data.user._id, res.data.token, date.toUTCString());
      stopLoading();
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Login Failed! Try again or change credentials!');
    }
  };

  const registerUser = async (credentials) => {
    logoutUser();
    startLoading();
    let date = new Date();
    date.setTime(date.getTime() + 60 * 1000);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'http://localhost:5000/users/register',
        credentials,
        config
      );
      setLoggedUser(res.data.user._id);
      setToken(res.data.token);
      cookData(res.data.user._id, res.data.token, date.toUTCString());
      stopLoading();
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Register Failed! Try again or change credentials!');
    }
  };

  const logoutUser = () => {
    let date = new Date();
    date.setTime(date.getTime() + 100);
    cookData(null, null, date.toUTCString());
    setLoggedUser(null);
    setToken(null);
  };

  const getQuizes = async () => {
    startLoading();
    try {
      const quizes = await axios.get('http://localhost:5000/api/quizes');
      dispatch({ type: 'GET_QUIZES', payload: quizes.data });
      stopLoading();
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Failed to load quizes');
    }
  };

  const addQuiz = async (quiz) => {
    startLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
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
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Failed to add quiz');
    }
  };

  const updateQuiz = async (quiz) => {
    startLoading();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.token}`,
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
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Failed to update quiz');
    }
  };

  const deleteQuiz = async (id) => {
    startLoading();
    const config = {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    };

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/quizes/${id}`,
        config
      );
      dispatch({ type: 'DELETE_QUIZ', payload: id });
      stopLoading();
      setError(false);
    } catch (error) {
      stopLoading();
      setError(true, 'Failed to delete quiz');
    }
  };

  const stopLoading = () => {
    dispatch({ type: 'STOP_LOADING' });
  };

  const startLoading = () => {
    dispatch({ type: 'START_LOADING' });
  };

  const setError = (err, message) => {
    dispatch({ type: 'ERROR_CONNECTION', payload: { err, message } });
  };

  const setToken = (token) => {
    dispatch({ type: 'SET_TOKEN', payload: token });
  };

  const setLoggedUser = (user) => {
    dispatch({ type: 'LOGIN_USER', payload: user });
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
        loginUser,
        setToken,
        setLoggedUser,
        getCookie,
        logoutUser,
        registerUser,
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
