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
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import GameInputComp from "../../components/GameInputComp/GameInputComp";
import { fetchLearnEnglichApp } from "../../store/actions/words";

class MemorizedGame extends Component {
  state = {
    checked: false,
    gameResults: {},
    randomWord: [],
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  checkWord = (userAnswer, word, wordId) => {
    let gameResults = { ...this.state.gameResults };
    if (gameResults[wordId]) {
      gameResults[wordId] = { userAnswer, ...word };
    } else {
      gameResults[wordId] = { userAnswer, ...word };
    }
    this.setState({
      gameResults,
    });
  };

  async componentDidMount() {
    await this.props.fetchLearnEnglichApp(this.props.userId);
    if (this.props.userWords == null) {
      return;
    }
    let randomWord = [...Object.entries(this.props.userWords)];
    randomWord.sort(() => Math.random() - 0.5);
    this.setState({
      randomWord,
    });
  }

  renderGame() {
    let wordsList = [];
    for (let [wordId, word] of this.state.randomWord) {
      if (this.props.location.propsSearch === wordsList.length) {
        return wordsList;
      }
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
      <>
        {this.props.userWords != null ? (
          <div>
            <div>
              <Link to="/learnEnglishApp">
                <Button color="success" variant="outlined">
                  Назад
                </Button>
              </Link>
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
        ) : (
          <>
            <Typography variant="h3">Слов пока нет</Typography>
            <Link to="/learnEnglishApp">
              <Button variant="outlined" color="success">
                Назад
              </Button>
            </Link>
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllWords: state.words.AllWords,
    userId: state.auth.userId,
    userWords:
      state.words.userBase.words != null ? state.words.userBase.words : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchLearnEnglichApp: (userId) => dispatch(fetchLearnEnglichApp(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedGame);
