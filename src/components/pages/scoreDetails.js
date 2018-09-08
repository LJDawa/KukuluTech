import React from "react";

import { Collapse, Table, Well } from "react-bootstrap";

class ScoreDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  extractScores = (rounds, player) => {
    return rounds.filter((round) => round.player === player);
  };

  renderRounds = (round, index) => {
    return (
      <tr key={round._id}>
        <td>{round.bet}</td>
        <td>{round.actual}</td>
        <td>{round.deduction}</td>
        <td>{round.score}</td>
      </tr>
    );
  };

  renderTable = (rounds, playerInfo) => {
    return (
      <Well key={playerInfo._id}>
        <h5>{playerInfo.surname}</h5>
        <Table striped hover condensed>
          <thead>
            <tr>
              <th>Bet</th>
              <th>Actual</th>
              <th>Deduction</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {this.extractScores(rounds, playerInfo._id).map(this.renderRounds)}
          </tbody>
        </Table>
      </Well>
    );
  };

  render() {
    const game = this.props.game;
    const players = this.props.players;
    return (
      <div className="row">
        <Collapse in={this.props.showDetails}>
          <div>
            {game.rounds
              ? players.map((item) =>
                  this.renderTable(game.rounds, item.player)
                )
              : "--"}
          </div>
        </Collapse>
      </div>
    );
  }
}

export default ScoreDetails;
