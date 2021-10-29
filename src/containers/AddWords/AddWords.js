import React, { Component } from "react";
import { Add } from "@mui/icons-material";
import { Container, Button, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { addNewWord } from "../../store/actions/words";
import { fetchAllWordsLength } from "../../store/actions/words";
import { store } from "../..";

class AddWords extends Component {
  state = {
    engUserWord: "",
    rusUserWord: "",
    successBtn: {
      name: "Добавить новое слово",
      color: "primary",
      bg: "outlined",
    },
    wordsListLength: 0,
  };

  componentDidMount() {}

  clearInputs() {
    this.setState({
      engUserWord: "",
      rusUserWord: "",
      successBtn: {
        name: "Слово добавлено!",
        color: "success",
        bg: "contained",
      },
    });
    this.props.fetchAllWordsLength();
    setTimeout(() => {
      this.setState({
        successBtn: {
          name: "Добавить новое слово",
          color: "primary",
          bg: "outlined",
        },
      });
    }, 2000);
  }
  render() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ flexGrow: 1, mr: 1, mt: 2 }}
            size="small"
            id="1"
            value={this.state.engUserWord}
            label="Напишите слово на английском"
            onChange={(e) => {
              this.setState({
                engUserWord: e.target.value,
              });
            }}
          />
          <TextField
            sx={{ flexGrow: 1, mr: 1, mt: 2 }}
            size="small"
            id="1"
            value={this.state.rusUserWord}
            label="Напишите перевод слова"
            onChange={(e) => {
              this.setState({
                rusUserWord: e.target.value,
              });
            }}
          />
          <Button
            onClick={() => {
              this.props.addNewWord({
                eng: this.state.engUserWord,
                rus: this.state.rusUserWord,
                id: Object.keys(store.getState().words.wordsList).length + 1,
              });
              this.clearInputs();
            }}
            sx={{ p: 0.9, mt: 2 }}
            variant={this.state.successBtn.bg}
            color={this.state.successBtn.color}
          >
            {this.state.successBtn.name}
            <Add />
          </Button>
        </Box>
      </>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewWord: (newWord) => dispatch(addNewWord(newWord)),
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(null, mapDispatchToProps)(AddWords);
