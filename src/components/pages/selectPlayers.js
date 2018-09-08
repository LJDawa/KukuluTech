import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  ListGroup,
  ListGroupItem,
  FormControl
} from "react-bootstrap";
import { createGame } from "../../actions/gameActions";

class SelectPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      selected_player: { surname: "", name: "", id: "" }
    };
    this.baseState = this.state;
    this.handleChange = this.handleChange.bind(this);
    this.closeSelectPlayersModal = this.closeSelectPlayersModal.bind(this);
  }

  game() {
    this.props.createGame({ players: this.state.players });
    this.props.play();
  }

  closeSelectPlayersModal() {
    this.props.closeSelectPlayersModal();
    this.setState(this.baseState);
  }
  handleChange(event) {
    const selectedPlayer = this.props.members[event.target.value];

    this.setState((prevState) => ({
      selected_player: {
        ...prevState.selected_player,
        name: selectedPlayer.name,
        surname: selectedPlayer.surname,
        id: selectedPlayer._id
      }
    }));
  }
  addPlayer(event) {
    event.preventDefault();
    this.setState((prevState) => ({
      players: [...prevState.players, this.state.selected_player]
    }));
  }

  render() {
    const wellStyles = { maxWidth: 400, margin: "0 auto 30px" };
    function renderMembers(member, index) {
      return (
        <option key={index} value={index}>
          {member.surname} {member.name}
        </option>
      );
    }
    function renderSelectedPlayers(player, index) {
      return (
        <ListGroupItem bsStyle="success" key={index}>
          {player.surname} {player.name}
        </ListGroupItem>
      );
    }
    return (
      <Modal
        show={this.props.showSelectPlayersModal}
        onHide={this.closeSelectPlayersModal}
        container={this}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Add players</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="well" style={wellStyles}>
            <ListGroup>
              {this.state.players.map(renderSelectedPlayers)}
            </ListGroup>

            <form onSubmit={(event) => this.addPlayer(event)}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Members</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  {this.props.members.map(renderMembers)}
                </FormControl>
              </FormGroup>
              <Button
                onClick={this.addPlayer.bind(this)}
                bsStyle="primary"
                bsSize="small"
                block
              >
                Add
              </Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.game.bind(this)}
            className="pull-left"
            bsStyle="success"
          >
            Play
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createGame: createGame
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(SelectPlayers);
