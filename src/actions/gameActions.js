"user strict";
import axios from "axios";
import { getPlayers } from "./playersActions";

export function createGame(players) {
  return function(dispatch) {
    axios
      .post("/api/game", players)
      .then(function(response) {
        dispatch({
          type: "START_GAME",
          payload: response.data
        });
      })
      .catch(function(err) {
        dispatch({ type: "START_GAME", payload: err });
      });
  };
}

// Add Bets
export const addBets = (gameId, betsData, gameData) => (dispatch) => {
  const requestBody = {};
  const requestBody2 = {};
  requestBody.betsData = betsData;
  requestBody.round = gameData.round;
  requestBody.num_of_cards = gameData.num_of_cards;
  requestBody2.betsData = betsData;
  axios
    .post(`/api/game/bet/${gameId}`, requestBody)
    .then((response) => {
      requestBody2.players = response.data.players;
      return axios.post(`/api/game/current_bet/${gameId}`, requestBody2);
    })
    .then((res) => {
      res.data.forEach((game) =>
        dispatch({
          type: "POST_SCORE",
          payload: game
        })
      );
    })
    .catch((err) =>
      dispatch({
        type: "POST_SCORE_REJECTED",
        payload: "there was an error while posting a new score"
      })
    );
};
// Add Actuals
export const addActuals = (gameId, actualsData, scores, mappedRound) => (
  dispatch
) => {
  let playersData = [];
  const playersId = Object.keys(actualsData);

  playersId.forEach((playerID) => {
    let playersDataObj = {
      roundID: mappedRound[playerID],
      player: playerID,
      actual: actualsData[playerID],
      score: scores[playerID]
    };
    playersData.unshift(playersDataObj);
  });

  axios
    .post(`/api/game/actual/${gameId}`, playersData)
    .then((res) => {
      res.data.forEach((game) =>
        dispatch({
          type: "POST_SCORE",
          payload: game
        })
      );
    })
    .catch((err) =>
      dispatch({
        type: "POST_SCORE_REJECTED",
        payload: "there was an error while posting a new score"
      })
    );
};
// Add Deductions
export const addDeductions = (gameId, deductionsData, mappedRound) => (
  dispatch
) => {
  let playersData = [];
  const playersId = Object.keys(deductionsData);

  playersId.forEach((playerID) => {
    let playersDataObj = {
      roundID: mappedRound[playerID],
      deduction: deductionsData[playerID]
    };
    playersData.unshift(playersDataObj);
  });

  axios
    .post(`/api/game/deduction/${gameId}`, playersData)
    .then((res) => {
      res.data.forEach((game) =>
        dispatch({
          type: "POST_SCORE",
          payload: game
        })
      );
    })
    .catch((err) =>
      dispatch({
        type: "POST_SCORE_REJECTED",
        payload: "there was an error while posting a new score"
      })
    );
};

export function getScores() {
  return function(dispatch) {
    axios
      .get("/api/game")
      .then(function(response) {
        dispatch({ type: "GET_SCORES", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "GET_SCORES_REJECTED", payload: err });
      });
  };
}

export function getGame(gameId) {
  return function(dispatch) {
    axios
      .get(`/api/games/${gameId}`)
      .then(function(response) {
        dispatch({
          type: "GET_GAME",
          payload: response.data
        });
      })
      .catch(function(err) {
        dispatch({ type: "GET_GAME", payload: err });
      });
  };
}
