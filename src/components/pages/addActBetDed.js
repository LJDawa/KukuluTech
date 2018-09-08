import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Modal,
  Button,
  FormGroup,
  Form,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { addBets, addActuals, addDeductions } from "../../actions/gameActions";

class AddBetDed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actBetDed: {} };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  handleChangeFor = (propertyName) => (event) => {
    const { actBetDed } = this.state;
    const newBets = {
      ...actBetDed,
      [propertyName]: event.target.value
    };
    this.setState({ actBetDed: newBets });
  };

  closeActualBetDuductionModal = () => {
    this.setState(this.baseState);
    this.props.closeActualBetDuductionModal();
  };

  updateGameData = () => {
    let gameRound = this.props.game.game_round;
    let numOfCards = this.props.game.num_of_cards;

    if (gameRound === 0) {
      return { round: gameRound + 1, num_of_cards: 7 };
    } else if (gameRound < 7) {
      return { round: gameRound + 1, num_of_cards: numOfCards - 1 };
    } else if (gameRound >= 7) {
      return { round: gameRound + 1, num_of_cards: numOfCards + 1 };
    }
  };

  findCurrentRound = (selectedPlayerId) => {
    const rounds = this.props.game.rounds;
    const current_round = this.props.game.game_round;
    return rounds.find((round) => {
      return round.round === current_round && round.player === selectedPlayerId;
    });
  };

  calculateDeduction = (selectedPlayer) => {
    const currentRoundObj = this.findCurrentRound(selectedPlayer);
    const previous_deduction = parseInt(currentRoundObj.deduction); //of the same round
    const current_deduction = parseInt(this.state.actBetDed[selectedPlayer]);
    return previous_deduction + current_deduction;
  };

  calculateScore = (selectedPlayer) => {
    const currentRoundObj = this.findCurrentRound(selectedPlayer);
    const current_bet = currentRoundObj.bet;
    const current_actual = this.state.actBetDed[selectedPlayer];

    if (current_bet != current_actual) {
      return Math.abs(current_bet - current_actual) * -2;
    } else if (current_bet == current_actual) {
      return current_actual * 2 + 10;
    }
  };

  mapDeduction = () => {
    let playersVsDeduction = {};
    const playersOnState = Object.keys(this.state.actBetDed);
    playersOnState.forEach((playerId) => {
      playersVsDeduction[playerId] = this.calculateDeduction(playerId);
    });
    return playersVsDeduction;
  };

  mapScore = () => {
    let playersVsScore = {};
    const playersOnState = Object.keys(this.state.actBetDed);
    playersOnState.forEach((playerId) => {
      playersVsScore[playerId] = this.calculateScore(playerId);
    });
    return playersVsScore;
  };

  mapRound = () => {
    let playersVsRoundID = {};
    const playersOnState = Object.keys(this.state.actBetDed);
    playersOnState.forEach((playerId) => {
      playersVsRoundID[playerId] = this.findCurrentRound(playerId)._id;
    });
    return playersVsRoundID;
  };

  addActuals = (e) => {
    e.preventDefault();
    this.props.addActuals(
      this.props.game._id,
      this.state.actBetDed,
      this.mapScore(),
      this.mapRound()
    );
    this.closeActualBetDuductionModal();
  };

  addBets = (e) => {
    e.preventDefault();
    this.props.addBets(
      this.props.game._id,
      this.state.actBetDed,
      this.updateGameData()
    );
    this.closeActualBetDuductionModal();
  };

  addDeductions = (e) => {
    e.preventDefault();
    this.props.addDeductions(
      this.props.game._id,
      this.mapDeduction(),
      this.mapRound()
    );
    this.closeActualBetDuductionModal();
  };

  getTitle = () => {
    if (this.props.isActualModal) {
      return "Add Actuals";
    } else if (this.props.isBetModal) {
      return "Add Bets";
    } else if (this.props.isDeductionModal) {
      return "Add Penalty";
    }
  };

  mapClickEven = (e) => {
    if (this.props.isActualModal) {
      this.addActuals(e);
    } else if (this.props.isBetModal) {
      this.addBets(e);
    } else if (this.props.isDeductionModal) {
      this.addDeductions(e);
    }
  };

  getOptions = (propertyName, item, index) => {
    if (this.props.isActualModal || this.props.isBetModal) {
      return (
        <FormGroup controlId="formControlsSelect" key={index}>
          <ControlLabel>{item.player.surname}</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="0"
            onChange={this.handleChangeFor(propertyName)}
            value={this.state.actBetDed.propertyName}
          >
            <option value="0">select</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </FormControl>
        </FormGroup>
      );
    } else if (this.props.isDeductionModal) {
      return (
        <FormGroup controlId="formControlsSelect" key={index}>
          <ControlLabel>{item.player.surname}</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="0"
            onChange={this.handleChangeFor(propertyName)}
            value={this.state.actBetDed.propertyName}
          >
            <option value="0">select</option>
            <option value="0">0</option>
            <option value="-2">-2</option>
            <option value="-6">-6</option>
          </FormControl>
        </FormGroup>
      );
    }
  };

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.closeActualBetDuductionModal}
        container={this}
        bsSize="small"
        aria-labelledby="contained-modal-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">
            {this.getTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form horizontal>
            {this.props.players.map((item, index) => {
              const propertyName = item.player._id;
              return this.getOptions(propertyName, item, index);
            })}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="pull-left"
            bsStyle="primary"
            type="submit"
            onClick={this.mapClickEven}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return { game: state.game.game };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      addBets: addBets,
      addActuals: addActuals,
      addDeductions: addDeductions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddBetDed);
