"use strict";
import React from "react";
import { Image, Row, Col, Well, Button } from "react-bootstrap";

class PlayerPage extends React.Component {
  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>
              {this.props.description.length > 50 &&
              this.state.isClicked === false
                ? this.props.description.substring(0, 50)
                : this.props.description}
              <button className="link" onClick={this.onReadMore.bind(this)}>
                {this.state.isClicked === false &&
                this.props.description !== null &&
                this.props.description.length > 50
                  ? "...read more"
                  : ""}
              </button>
            </p>
            <h6>usd. {this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle="primary">
              Buy now
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}
export default PlayerPage;
