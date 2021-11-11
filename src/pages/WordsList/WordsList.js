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
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteWord } from "../../store/actions/words";
import { fetchAllWordsLength } from "../../store/actions/words";
import LoaderComp from "../../components/UI/Loader/LoaderComp";
import SearchComp from "../../components/SearchComp/SearchComp";
import { Link } from "react-router-dom";

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
    await this.props.fetchAllWordsLength();
    const words = [...this.state.words];
    const wordsCopy = [...this.state.words];
    Object.keys(this.props.wordsList).forEach((item, index) => {
      words.push(this.props.wordsList[item]);
      wordsCopy.push(this.props.wordsList[item]);
    });
    this.setState({
      words,
      wordsCopy,
    });
  }

  searchFunc = (e) => {
    let words = [...this.state.words];
    let regexp = new RegExp(e, "i");
    words = this.state.wordsCopy.filter((item, index) => {
      return (
        regexp.test(item.eng) || regexp.test(item.rus) || regexp.test(item.id)
      );
    });

    this.setState({
      words,
    });
  };

  deleteWord1(index) {
    const id = Object.keys(this.props.wordsList)[index];
    this.props.deleteWord(id);
    const words = [...this.state.words];
    words.splice(index, 1);
    this.setState({
      words,
    });
  }

  lastAnswer(answer) {
    if (answer === true) {
      return (
        <Alert variant="string" sx={{ color: "green" }} severity="success">
          Ответ был правльным
        </Alert>
      );
    } else if (answer === undefined) {
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
    if (word.lastAnswer === undefined) {
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
        {this.state.wordsCopy.length === 0 ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item xs={2}>
                <Link to="/allwords">
                  <Button size="large" color="success" variant="outlined">
                    Назад
                  </Button>
                </Link>
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
                        <TableCell
                          key={i}
                          sx={{ fontSize: "20px" }}
                          align="right"
                        >
                          {item}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.words.map((word, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word.eng}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word.rus}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {this.lastAnswer(word.lastAnswer)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {this.getStatistics(word)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        <Button onClick={() => this.deleteWord1(index)}>
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordsList: state.words.wordsList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteWord: (id) => dispatch(deleteWord(id)),
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
