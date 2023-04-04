import { ADD_SCORE, ADD_SETUP_INFO, RESET_SCORE } from "./actionTypes";

const setupInfo = (payload) => (dispatch) => {
  dispatch({ type: ADD_SETUP_INFO, payload });
};

const addScore = () => (dispatch) => {
  dispatch({ type: ADD_SCORE });
};

const resetScore = () => (dispatch) => {
  dispatch({ type: RESET_SCORE });
}

export { setupInfo, addScore,resetScore };
