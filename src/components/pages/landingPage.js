"use strict";
import React from "react";
import { findDOMNode } from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Modal,
  Button,
  FormGroup,
  Form,
  Grid,
  Col,
  Row,
  ControlLabel,
  FormControl,
  Carousel
} from "react-bootstrap";
import { addPlayer, getPlayers } from "../../actions/membersActions";
import SelectPlayers from "./selectPlayers";

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getPlayers();
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      showSelectPlayersModal: false
    };
  }

  open() {
    this.setState({ showModal: true });
  }
  close() {
    this.setState({ showModal: false });
  }
  openSelectPlayersModal() {
    this.setState({ showSelectPlayersModal: true });
  }
  closeSelectPlayersModal() {
    this.setState({ showSelectPlayersModal: false });
  }

  game() {
    this.props.history.push("/game");
  }

  handleSubmit() {
    const member = [
      {
        name: findDOMNode(this.refs.name).value,
        surname: findDOMNode(this.refs.surname).value
      }
    ];
    this.props.addPlayer(member);
  }

  resetForm() {
    findDOMNode(this.refs.name).value = "";
    findDOMNode(this.refs.surname).value = "";
  }
  render() {
    const membersList = this.props.members.map(function(membersArray) {
      return (
        <Carousel.Item key={membersArray._id}>
          <img
            width={900}
            height={300}
            alt="900x300"
            src="images/lighthouse-900x300.jpg"
          />
          <Carousel.Caption>
            <h3>{membersArray.surname}</h3>
            <p>{membersArray.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });

    return (
      <Grid>
        <Row style={{ marginBottom: "20px" }}>
          <Carousel>{membersList}</Carousel>
        </Row>

        <SelectPlayers
          showSelectPlayersModal={this.state.showSelectPlayersModal}
          closeSelectPlayersModal={this.closeSelectPlayersModal.bind(this)}
          members={this.props.members}
          play={this.game.bind(this)}
        />

        <Button onClick={this.open.bind(this)} bsStyle="info">
          New member
        </Button>
        <Button
          onClick={this.openSelectPlayersModal.bind(this)}
          bsStyle="success"
        >
          Start game
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={this.close.bind(this)}
          container={this}
          bsSize="small"
          aria-labelledby="contained-modal-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">New Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup controlId="name">
                <Col componentClass={ControlLabel} sm={2}>
                  First name
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="First name"
                    ref="name"
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="surname">
                <Col componentClass={ControlLabel} sm={2}>
                  Surname
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Surname"
                    ref="surname"
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="pull-left"
              bsStyle="primary"
              type="submit"
              onClick={this.handleSubmit.bind(this)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return { members: state.members.members };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getPlayers: getPlayers,
      addPlayer: addPlayer
    },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
