import { Container, Button, Typography } from "@mui/material";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../AddWords/AddWords";
import classes from "./MemorizedWords.module.css";

class MemorizedWordsMode extends Component {
  componentDidMount() {
    console.log(this.props.modeList);
  }
  render() {
    return (
      <Container maxWidth="md">
        <ul className={classes.modeList}>
          <Typography variant="h4" sx={{ pb: 10, pt: 10 }} color="primary">
            Выберите количество слов для запоминания!
          </Typography>
          {this.props.modeList.map((item) => {
            return (
              <li key={item.id}>
                <NavLink to={"/mode/" + item.id}>
                  <Button
                    sx={{ fontSize: "22px", p: 1, width: 300 }}
                    variant="text"
                    onClick={() => console.log(this.props)}
                  >
                    {item.name}
                  </Button>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <AddWords />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    modeList: state.words.modeList,
  };
}

export default connect(mapStateToProps)(MemorizedWordsMode);
