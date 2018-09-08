"use strict";
import { combineReducers } from "redux";

// HERE IMPORT REDUCERS TO BE COMBINED
import { gameReducers } from "./gameReducers";
import { membersReducers } from "./membersReducers";
import { playersReducers } from "./playersReducers";

//HERE COMBINE THE REDUCERS
export default combineReducers({
  game: gameReducers,
  members: membersReducers,
  players: playersReducers
});
