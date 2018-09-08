"user strict";
import axios from "axios";

export function getPlayers() {
  return function(dispatch) {
    axios
      .get("/api/game/players")
      .then(function(response) {
        dispatch({
          type: "GET_PLAYERS",
          payload: response.data
        });
      })
      .catch(function(err) {
        dispatch({ type: "GET_PLAYERS", payload: err });
      });
  };
}
