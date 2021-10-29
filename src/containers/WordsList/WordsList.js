import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteWord } from "../../store/actions/words";
import { fetchAllWordsLength } from "../../store/actions/words";
import LoaderComp from "../../components/UI/Loader/LoaderComp";
import { Box } from "@mui/system";
import SearchComp from "../../components/SearchComp/SearchComp";

class WordsList extends Component {
  state = {
    words: [],
    wordsCopy: [],
  };

  async componentDidMount() {
    console.log(this.props.wordsList);
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

  render() {
    return (
      <div>
        {this.state.wordsCopy.length == 0 ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <>
            <SearchComp searchFunc={this.searchFunc} />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead sx={{ fontSize: "34px" }}>
                  <TableRow>
                    <TableCell sx={{ fontSize: "20px" }} align="left">
                      Номер по порядку
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="left">
                      id
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="right">
                      Слово на Аглийском
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="right">
                      Слово на русском
                    </TableCell>
                    <TableCell sx={{ fontSize: "20px" }} align="right">
                      Актуальность
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.words.map((word, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="left">
                        {word.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word.eng}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">
                        {word.rus}
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
