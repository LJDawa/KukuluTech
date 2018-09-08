"user strict";
import axios from "axios";

export function addPlayer(player) {
  return function(dispatch) {
    axios
      .post("/api/members", player)
      .then(function(response) {
        dispatch({ type: "ADD_MEMBER", payload: response.data });
      })
      .catch(function(err) {
        dispatch({
          type: "ADD_MEMBER_REJECTED",
          payload: "there was an error while adding a new player"
        });
      });
  };
}

export function getPlayers() {
  return function(dispatch) {
    axios
      .get("/api/members")
      .then(function(response) {
        dispatch({ type: "GET_MEMBERS", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "GET_MEMBERS_REJECTED", payload: err });
      });
  };
}

export function deletePlayer(name) {
  return function(dispatch) {
    axios
      .delete("/api/members/" + id)
      .then(function(response) {
        dispatch({ type: "DELETE_MEMBER", payload: id });
      })
      .catch(function(err) {
        dispatch({ type: "DELETE_MEMBER_REJECTED", payload: err });
      });
  };
}

export function updatePlayer(player) {
  return {
    type: "UPDATE_MEMBER",
    payload: player
  };
}

export function getPlayer(name) {
  return {
    type: "GET_MEMBER",
    payload: name
  };
}
