"use strict";

//PLAYER REDUCERS
export function playersReducers(state = { players: [] }, action) {
  switch (action.type) {
    case "GET_PLAYERS":
      return {
        ...state,
        players: action.payload
      };
      break;
  }
  return state;
}
