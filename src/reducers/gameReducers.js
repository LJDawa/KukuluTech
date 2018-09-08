"use strict";

// GAME REDUCERS

export function gameReducers(state = {}, action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...state,
        game: action.payload
      };
      break;
    case "GET_SCORES":
      return {
        ...state,
        game: action.payload
      };
      break;
    case "GET_GAME":
      return {
        ...state,
        game: action.payload
      };
      break;
    case "POST_SCORE":
      return {
        ...state,
        game: action.payload
      };
      break;
    case "UPDATE_SCORE":
      return {
        ...state,
        game: action.payload
      };
      break;
    case "DELETE_SCORE":
      return {
        ...state,
        game: action.payload
      };
      break;
  }
  return state;
}
