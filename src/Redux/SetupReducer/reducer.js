import { ADD_SCORE, ADD_SETUP_INFO, RESET_SCORE } from "./actionTypes";

const initialState = {
  name: "",
  category: "",
  difficulty: "",
  numQuestions: null,
  score: 0,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_SETUP_INFO:
      return {
        ...state,
        name: payload.name,
        category: payload.category,
        difficulty: payload.difficulty,
        numQuestions: payload.numQuestions,
      };

    case ADD_SCORE: {
      return {
        ...state,
        score: state.score + 1,
      };
    }

    case RESET_SCORE: {
      return {
        ...state,
        score: 0,
      };
    }

    default:
      return state;
  }
};

export { reducer };
