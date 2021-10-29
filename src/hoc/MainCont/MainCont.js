import { Container } from "@mui/material";
import React, { Component } from "react";

export default class MainCont extends Component {
  render() {
    return <Container maxWidth="md">{this.props.children}</Container>;
  }
}
