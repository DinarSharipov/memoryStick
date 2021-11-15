import React, { Component } from "react";
import { Add } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { connect } from "react-redux";
import { addNewWord } from "../../store/actions/words";

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
            ml: 2,
          }}
        >
          <TextField
            sx={{ flexGrow: 1, mr: 1 }}
            color="success"
            size="small"
            variant="outlined"
            value={this.state.engUserWord}
            label="Напишите слово на английском"
            onChange={(e) => {
              let word = this.state.engUserWord;
              word = e.target.value.replace(/[ ,.0-9]/g, "");
              this.setState({
                engUserWord: word,
              });
            }}
          />
          <TextField
            sx={{ flexGrow: 1, mr: 1 }}
            color="success"
            size="small"
            variant="outlined"
            value={this.state.rusUserWord}
            label="Напишите перевод слова"
            onChange={(e) => {
              let word = this.state.rusUserWord;
              word = e.target.value.replace(/[ ,.0-9]/g, "");
              this.setState({
                rusUserWord: word,
              });
            }}
          />
          <Button
            onClick={() => {
              // console.log(this.props.userBaseId);
              this.props.addNewWord(
                {
                  eng: this.state.engUserWord,
                  rus: this.state.rusUserWord,
                  lastAnswer: "-",
                  statistics: {
                    true: 0,
                    false: 0,
                  },
                },
                this.props.userBaseId
              );
              this.clearInputs();
            }}
            sx={{ p: 0.9 }}
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

function mapStateToProps(state) {
  return {
    userBaseId: state.auth.userBaseId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addNewWord: (newWord, userId) => dispatch(addNewWord(newWord, userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWords);
