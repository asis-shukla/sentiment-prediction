import axios from "axios";
import React, { Component } from "react";

import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from "reactstrap";
import "./InputForm.css";

export default class InputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInputText: "",
      isResult: false,
      resultValue: "",
      resultPercen: "",
    };
  }
  onUserInputChange = (e) => {
    this.setState({
      userInputText: e.target.value,
    });
  };
  onUserSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://textsentimentapi.herokuapp.com/predictsentiment?query=";
    const urlWithInput = url + this.state.userInputText;
    axios
      .get(urlWithInput)
      .then((results) => results.data)
      .then((res) => {
        this.setState({
          isResult: true,
          resultValue: res.prediction,
          resultPercen: res.confidence,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="main-form">
        <br />
        <Form onSubmit={this.onUserSubmit}>
          <FormGroup row>
            <Label for="exampleText" sm={5}>
              <h3> Your Input Text</h3>
            </Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                onChange={this.onUserInputChange}
              />
            </Col>
          </FormGroup>

          <FormGroup row className="submit-button">
            <Button type="submit" color="primary">
              Get Result
            </Button>
          </FormGroup>
        </Form>
        <h2> Your Input text</h2>
        <h5> {this.state.userInputText}</h5>
        <h2> Result </h2>
        <h5>{this.state.resultValue}</h5>
        <h5>{this.state.resultPercen}</h5>
      </div>
    );
  }
}
