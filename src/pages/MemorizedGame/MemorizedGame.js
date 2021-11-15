import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  TextField,
  Collapse,
} from "@mui/material";
import LoaderComp from "../../components/UI/Loader/LoaderComp";
import { Link } from "react-router-dom";
import GameInputComp from "../../components/GameInputComp/GameInputComp";

class MemorizedGame extends Component {
  state = {
    checked: false,
    gameResults: {},
    results: [],
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  checkWord(userAnswer, word, wordId) {
    console.log(userAnswer, word, wordId);
    if (userAnswer === word) {
    }
  }

  componentDidMount() {}

  renderGame() {
    let wordsList = [];
    for (let [wordId, word] of Object.entries(this.props.userWords)) {
      wordsList.push(
        <GameInputComp
          key={wordId}
          word={word}
          wordId={wordId}
          checked={this.state.checked}
          checkWord={this.checkWord}
        />
      );
    }
    return wordsList;
  }

  render() {
    return (
      <div onClick={() => console.log(this.props)}>
        <div>
          {this.renderGame()}

          {/* Кнопка готов вкл/выкл */}
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
          {/* /// */}

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllWords: state.words.AllWords,
    length: state.words.length,
    userWordsValues: Object.values(state.words.userBase.words),
    userWordsKeys: Object.keys(state.words.userBase.words),
    userWords: state.words.userBase.words,
  };
}

export default connect(mapStateToProps)(MemorizedGame);
