import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Alert,
  Grid,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteWord } from "../../store/actions/words";
import { fetchLearnEnglichApp } from "../../store/actions/words";
import LoaderComp from "../../components/UI/Loader/LoaderComp";
import SearchComp from "../../components/SearchComp/SearchComp";
import { Link } from "react-router-dom";
import LearnedWords from "../MemorizedGame/LearnedWords/LearnedWords";

class WordsList extends Component {
  state = {
    words: [],
    wordsCopy: [],
    tableHeadRowCells: [
      "Номер по порядку",
      "Слово на Аглийском",
      "Слово на русском",
      "Последний результат игры",
      "Статистика правильных ответов",
      " Актуальность",
    ],
  };

  async componentDidMount() {
    await this.props.fetchLearnEnglichApp(this.props.userId);
    const words = [...this.state.words];
    const wordsCopy = [...this.state.words];
    if (this.props.userWords) {
      this.props.userWords.forEach((word) => {
        words.push(word);
        wordsCopy.push(word);
      });
      this.setState({
        words,
        wordsCopy,
      });
    } else {
      console.log(1);
    }
  }

  searchFunc = (e) => {
    let words = [...this.state.words];
    let regexp = new RegExp(e, "i");
    words = this.state.wordsCopy.filter((item, index) => {
      let baseWord = item[1];
      return (
        regexp.test(baseWord.eng) ||
        regexp.test(baseWord.rus) ||
        regexp.test(baseWord.id)
      );
    });
    this.setState({
      words,
    });
  };

  async deleteWord1(wordId, userBaseId) {
    console.log(this.props.userId);
    await this.props.deleteWord(wordId, userBaseId);

    this.setState({
      words: [],
      wordsCopy: [],
    });
    this.componentDidMount();
  }

  lastAnswer(answer) {
    if (answer === true) {
      return (
        <Alert variant="string" sx={{ color: "green" }} severity="success">
          Ответ был правльным
        </Alert>
      );
    } else if (answer === "-") {
      return "Не было игр";
    } else {
      return (
        <Alert variant="string" sx={{ color: "red" }} severity="error">
          Ответ был ошибочным
        </Alert>
      );
    }
  }

  getStatistics(word) {
    if (word.lastAnswer === "-") {
      return "-";
    }
    return (
      (word.statistics.true * 100) /
        (word.statistics.true + word.statistics.false) +
      "%"
    );
  }

  render() {
    return (
      <div>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={2}>
            <Link to="/allwords">
              <Button size="large" color="success" variant="outlined">
                Назад
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4}>
            {this.props.userWords ? <LearnedWords /> : null}
          </Grid>
          <Grid item xs={3}>
            <SearchComp searchFunc={this.searchFunc} />
          </Grid>
        </Grid>
        <TableContainer>
          <Table sx={{ minWidth: 850 }} aria-label="caption table">
            <TableHead sx={{ fontSize: "34px" }}>
              <TableRow>
                {this.state.tableHeadRowCells.map((item, i) => {
                  return (
                    <TableCell key={i} sx={{ fontSize: "20px" }} align="right">
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.userWords != {}
                ? this.state.words.map((word, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word[1].eng}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word[1].rus}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {this.lastAnswer(word[1].lastAnswer)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {this.getStatistics(word[1])}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        <Button
                          onClick={() =>
                            this.deleteWord1(word[0], this.props.userBaseId)
                          }
                        >
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        {this.props.userWords == null ? (
          <Typography variant="h3">Тут пока нет слов</Typography>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBaseId: state.auth.userBaseId,
    userWords:
      state.words.userBase.words != null
        ? Object.entries(state.words.userBase.words)
        : null,

    userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteWord: (wordId, userBaseId) =>
      dispatch(deleteWord(wordId, userBaseId)),
    fetchLearnEnglichApp: (userId) => dispatch(fetchLearnEnglichApp(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
