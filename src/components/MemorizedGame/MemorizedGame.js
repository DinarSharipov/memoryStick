import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchModeWords } from "../../store/actions/words";
import {
  Button,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
  Collapse,
} from "@mui/material";

import LoaderComp from "../UI/Loader/LoaderComp";
import { Link } from "react-router-dom";

class MemorizedGame extends Component {
  state = {
    checked: false,
    display: "none",
    gameResults: [],
    gameRandomWords: [],
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  checkWord(event, word, index) {
    console.log(word);
    if (this.state.gameResults[index]) {
      let gameResults = this.state.gameResults;

      let statistics = word.statistics;

      word.rus === event.target.value ? ++statistics.true : ++statistics.false;

      gameResults.splice(index, 1, {
        id: word.id,
        engWord: word.eng,
        rusWord: word.rus,
        userWord: event.target.value,
        trueFalse: Boolean(word.rus === event.target.value),
        statistics,
      });
      this.setState({
        gameResults,
      });
    } else {
      let gameResults = this.state.gameResults;
      let statistics = word.statistics;

      word.rus === event.target.value ? ++statistics.true : ++statistics.false;

      gameResults.push({
        id: word.id,
        engWord: word.eng,
        rusWord: word.rus,
        userWord: event.target.value,
        trueFalse: Boolean(word.rus === event.target.value),
        statistics,
      });
      this.setState({
        gameResults,
      });
    }

    console.log(this.state.gameResults);
  }

  renderGame() {
    return this.props.AllWords.map((word, index) => {
      return (
        <>
          <Stack alignItems="center" key={index} spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                height: "50px",
                width: "100%",
                m: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Chip
                sx={{ fontSize: 24, p: 2 }}
                color="primary"
                label={word.eng}
              />
              <Chip
                sx={{
                  display: this.state.checked ? "none" : "flex",
                  fontSize: 24,
                  p: 2,
                }}
                color="success"
                label={word.rus}
              />
              <Collapse in={this.state.checked}>
                <TextField
                  sx={{ width: 300 }}
                  size="small"
                  label="Напишите перевод слова"
                  onBlur={(event) => this.checkWord(event, word, index)}
                />
              </Collapse>
            </Stack>
          </Stack>
        </>
      );
    });
  }
  componentDidMount() {
    this.props.fetchModeWords(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {!this.props.loading && this.props.AllWords ? (
          <div>
            {this.renderGame()}
            <FormControlLabel
              disabled={this.state.checked}
              control={
                <Switch
                  checked={this.state.checked}
                  onChange={this.handleChange}
                />
              }
              label="Готов!"
            />
            <Link
              to={{
                pathname: "/gameresults",
                propsSearch: this.state.gameResults,
              }}
            >
              <Button variant="outlined" color="info">
                Проверить слова!
              </Button>
            </Link>
          </div>
        ) : (
          <LoaderComp />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllWords: state.words.AllWords,
    loading: state.words.loading,
    length: state.words.length,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchModeWords: (id) => dispatch(fetchModeWords(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedGame);
