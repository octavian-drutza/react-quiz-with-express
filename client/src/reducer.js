const reducer = (state, action) => {
  if (action.type === 'DELETE_QUIZ') {
    return {
      ...state,
      quizes: state.quizes.filter((quiz) => quiz._id !== action.payload),
    };
  }
  // change update to use map
  if (action.type === 'UPDATE_QUIZ') {
    let newQuizes = state.quizes.filter((quiz) => {
      return quiz._id !== action.payload._id;
    });
    return { ...state, quizes: [...newQuizes, action.payload] };
  }

  if (action.type === 'ADD_QUIZ') {
    return { ...state, quizes: [...state.quizes, action.payload] };
  }

  if (action.type === 'GET_QUIZES') {
    return { ...state, quizes: action.payload };
  }

  if (action.type === 'STOP_LOADING') {
    return { ...state, loading: false };
  }

  if (action.type === 'START_LOADING') {
    return { ...state, loading: true };
  }

  if (action.type === 'ERROR_CONNECTION') {
    return { ...state, error: true };
  }

  throw new Error('not found action type');
};

export default reducer;
