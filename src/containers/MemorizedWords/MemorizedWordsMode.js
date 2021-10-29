import { Container, Button, Typography } from "@mui/material";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../AddWords/AddWords";
import classes from "./MemorizedWords.module.css";
import { fetchAllWordsLength } from "../../store/actions/words";
import { bgcolor } from "@mui/system";

class MemorizedWordsMode extends Component {
  componentDidMount() {
    this.props.fetchAllWordsLength();
  }
  render() {
    return (
      <Container maxWidth="md">
        <ul className={classes.modeList}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              mt: 3,
              p: 2,
              backgroundColor: "rgb(0, 188, 255, 0.3)",
              borderRadius: 8,
            }}
            color="Window"
          >
            Выберите количество слов для запоминания!
          </Typography>
          {this.props.modeList.map((item) => {
            return (
              <li key={item.id}>
                <NavLink to={"/mode/" + item.id}>
                  <Button
                    sx={{
                      fontSize: "22px",
                      p: 1,
                      m: 1,
                      width: 300,
                      backgroundColor: "rgb(0, 188, 255, 0.3)",
                      borderRadius: 8,
                    }}
                    variant="text"
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
function mapDispatchToProps(dispatch) {
  return {
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedWordsMode);
