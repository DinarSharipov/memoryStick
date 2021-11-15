import { Container } from "@mui/material";
import React, { Component } from "react";

class MainCont extends Component {
  render() {
    return (
      <Container maxWidth="xl" sx={{ mt: 2 }}>
        {this.props.children}
      </Container>
    );
  }
}

export default MainCont;
