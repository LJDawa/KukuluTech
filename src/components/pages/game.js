import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Col, Row, Image, Button, Badge } from "react-bootstrap";
import { getPlayers } from "../../actions/playersActions";
import { getGame } from "../../actions/gameActions";
import ScoreDetails from "./scoreDetails";
import AddBetDed from "./AddActBetDed";

class ScoreBoard extends React.Component {
  componentDidMount() {
    //if (this.props.game) {
    this.props.getGame(/*this.props.game._id*/ "5b93f253017e24101c316837");
    this.props.getPlayers();
    //}
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDetails: false,
      openActualBetDuductionModal: false,
      showActualModal: false,
      isActual: false,
      isBet: false,
      isDeduction: false
    };
  }
  openActualBetDuductionModal = () => {
    this.setState({ openActualBetDuductionModal: true });
  };
  openActualModal() {
    this.setState({ isActual: true });
    this.openActualBetDuductionModal();
  }
  openBetModal() {
    this.setState({ isBet: true });
    this.openActualBetDuductionModal();
  }
  openDeductionModal() {
    this.setState({ isDeduction: true });
    this.openActualBetDuductionModal();
  }
  closeActualBetDuductionModal() {
    this.setState({ openActualBetDuductionModal: false });
    this.setState({ isActual: false });
    this.setState({ isBet: false });
    this.setState({ isDeduction: false });
    this.props.getPlayers();
  }

  openDetails() {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails
    }));
    //this.setState({ showDetails: true });
    //this.getPlayersId();
  }

  closeDetails() {
    this.setState({ showDetails: false });
  }
  /*   getPlayersId() {
    var resArr = [];
    this.props.game.rounds.filter(function(item) {
      var i = resArr.findIndex((x) => x.id == item.member);
      if (i <= -1) {
        resArr.push({ id: item.member });
      }
      return null;
    });
    return resArr;
  } */
  render() {
    let gameContent;

    const players = this.props.players;

    if (this.props.players.length > 0 && this.props.game) {
      gameContent = (
        <div>
          <GameContent
            retrievedGame={this.props.game}
            retrievedPlayers={this.props.players}
            showDetails={this.state.showDetails}
          />
          <AddBetDed
            showModal={this.state.openActualBetDuductionModal}
            closeActualBetDuductionModal={this.closeActualBetDuductionModal.bind(
              this
            )}
            isActualModal={this.state.isActual}
            isBetModal={this.state.isBet}
            isDeductionModal={this.state.isDeduction}
            players={players}
          />
        </div>
      );
    } else {
      gameContent = null;
    }

    return (
      <Grid>
        {gameContent}
        <div>
          <Row className="show-grid">
            <Col xs={3} md={3}>
              <Button
                onClick={this.openBetModal.bind(this)}
                bsStyle="warning"
                block
              >
                Add bets
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <Button
                onClick={this.openActualModal.bind(this)}
                bsStyle="primary"
                block
              >
                Add actuals
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <Button
                onClick={this.openDeductionModal.bind(this)}
                bsStyle="danger"
                block
              >
                Penalty
              </Button>
            </Col>
            <Col xs={3} md={3}>
              <Button
                onClick={this.openDetails.bind(this)}
                bsStyle="info"
                block
              >
                Details
              </Button>
            </Col>
          </Row>
        </div>
      </Grid>
    );
  }
}
function GameContent(props) {
  const retrievedPlayers = props.retrievedPlayers;
  const showDetails = props.showDetails;
  const retrievedGame = props.retrievedGame;

  const playersList = retrievedPlayers.map(function(item) {
    return (
      <Col xs={2} md={3} key={item.player._id}>
        <Image src="images/ESY_opt_small.jpg" circle />

        <h5>{item.player.surname}</h5>
        <h5>{item.player.name}</h5>
        <Badge>
          <h4>{item.total_score}</h4>
        </Badge>
        <h4>{item.current_bet}</h4>
      </Col>
    );
  });
  return (
    <div>
      {retrievedPlayers.length > 0 && (
        <div>
          <Row>
            <Col xs={6} md={6}>
              <h4>Round: {retrievedGame.game_round}</h4>
            </Col>
            <Col xs={6} md={6}>
              <h4>Number of cards: {retrievedGame.num_of_cards}</h4>
            </Col>
          </Row>
          <Row>{playersList}</Row>

          <ScoreDetails
            game={retrievedGame}
            players={retrievedPlayers}
            showDetails={showDetails}
          />
        </div>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { players: state.players.players, game: state.game.game };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlayers: getPlayers,
      getGame: getGame
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);
