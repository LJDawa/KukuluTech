var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require("mongoose");
//const Promise = require("bluebird");
//mongoose.Promise = Promise;
//mongoose.connect("mongodb://localhost:27017/kukulutech");
mongoose.connect("mongodb://kukulu:kukulu1@ds149732.mlab.com:49732/kukulutech");

var Members = require("./models/members");
var Games = require("./models/games");

//---->>>> POST MEMBERS <<<<-----
app.post("/members", function(req, res) {
  var player = req.body;

  Members.create(player, function(err, members) {
    if (err) {
      throw err;
    }
    res.json(members);
  });
});

//---->>>> GET MEMBERS <<<<-----
app.get("/members", function(req, res) {
  Members.find(function(err, members) {
    if (err) {
      throw err;
    }
    res.json(members);
  });
});

//---->>>> POST GAME <<<<-----
app.post("/game", function(req, res) {
  const selected_players = req.body.players;
  const game = {};
  const players = [];

  selected_players.forEach((element) => {
    const player = {};
    player.player = element.id;
    player.total_score = 0;
    player.current_bet = 0;
    players.push(player);
  });
  game.game_num = 1;
  game.game_round = 0;
  game.num_of_cards = 0;
  game.player = req.body.player;
  game.players = players;

  Games.create(game, function(err, games) {
    if (err) {
      throw err;
    }
    res.json(games);
  });
});

//---->>>> GET PLAYERS <<<<-----
app.get("/game/players", (req, res) => {
  Games.find()
    .populate("players.player")
    .select("players -_id")
    .then((players) => res.json(players[0].players))
    .catch((err) => res.status(404).json({ nogamefound: "No players found." }));
});

//---->>>> POST ACTUAL-SCORE <<<<-----
app.post("/game/actual/:_id", function(req, res) {
  const gameId = req.params._id;
  const playersDataArray = req.body;

  let promiseArr = [];

  function runUpdate(playerObj) {
    return new Promise((resolve, reject) => {
      //you update code here
      Games.findOneAndUpdate(
        {
          _id: gameId,
          "rounds._id": playerObj.roundID
        },
        {
          $set: {
            "rounds.$.actual": playerObj.actual,
            "rounds.$.score": playerObj.score
          }
        },
        { new: true }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  playersDataArray.forEach((playerData) =>
    promiseArr.push(runUpdate(playerData))
  );

  Promise.all(promiseArr)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(404).json({ gamenotfound: "No game found" });
    });
});
//---->>>> POST BET <<<<-----
app.post("/game/bet/:_id", function(req, res) {
  var gameId = req.params._id;
  const betsObject = req.body.betsData;
  const members = Object.keys(betsObject);

  Games.findById(gameId)
    .then((game) => {
      members.forEach((element) => {
        const newRound = {
          player: element,
          round: req.body.round,
          bet: betsObject[element],
          deduction: 0
        };
        // Add to rounds array
        game.rounds.unshift(newRound);
      });

      //Update round
      game.game_round = req.body.round;
      //Update number of cards
      game.num_of_cards = req.body.num_of_cards;
      // Save
      game.save().then((game) => res.json(game));
    })
    .catch((err) => res.status(404).json({ gamenotfound: "No game found" }));
});
//---->>>> POST CURRENT_BET <<<<-----
app.post("/game/current_bet/:_id", function(req, res) {
  const gameId = req.params._id;
  const betsObject = req.body.betsData;
  const players = req.body.players;

  let promiseArr = [];

  function runUpdate(playerObj) {
    return new Promise((resolve, reject) => {
      Games.findOneAndUpdate(
        {
          _id: gameId,
          "players.player": playerObj.player
        },
        { $set: { "players.$.current_bet": betsObject[playerObj.player] } },
        { new: true }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  players.forEach((player) => promiseArr.push(runUpdate(player)));

  Promise.all(promiseArr)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(404).json({ gamenotfound: "No game found" });
    });
});
//---->>>> POST DEDUCTION <<<<-----
app.post("/game/deduction/:_id", function(req, res) {
  const gameId = req.params._id;
  const playersDataArray = req.body;

  let promiseArr = [];

  function runUpdate(playerObj) {
    return new Promise((resolve, reject) => {
      //you update code here
      Games.findOneAndUpdate(
        {
          _id: gameId,
          "rounds._id": playerObj.roundID
        },
        {
          $set: {
            "rounds.$.deduction": playerObj.deduction
          }
        },
        { new: true }
      )
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  playersDataArray.forEach((playerData) =>
    promiseArr.push(runUpdate(playerData))
  );

  Promise.all(promiseArr)
    .then((game) => {
      res.json(game);
    })
    .catch((err) => {
      res.status(404).json({ gamenotfound: "No game found" });
    });
});

//---->>>> GET GAMES <<<<-----
app.get("/games", (req, res) => {
  Games.find()
    .distinct("rounds.member")
    .populate("rounds.member")
    //.select("rounds.member")

    .then((games) => res.json(games))
    .catch((err) =>
      res.status(404).json({ nogamefound: "No game found with that ID" })
    );
});

app.get("/games/:id", (req, res) => {
  Games.findById(req.params.id)
    .populate("rounds.member")
    .then((post) => res.json(post))
    .catch((err) =>
      res.status(404).json({ nogamefound: "No game found with that ID" })
    );
});

//END APIs

app.listen(3051, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("API Server is listening on http://localhost:3051");
});
