import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteWord } from "../../store/actions/words";
import { fetchAllWordsLength } from "../../store/actions/words";
import LoaderComp from "../../components/UI/Loader/LoaderComp";

class WordsList extends Component {
  state = {
    words: [],
  };

  async componentDidMount() {
    console.log(this.state.words.length);
    await this.props.fetchAllWordsLength();
    const words = [...this.state.words];
    Object.keys(this.props.wordsList).forEach((item, index) => {
      words.push(this.props.wordsList[item]);
    });
    this.setState({
      words,
    });
  }

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
        {this.props.wordsList.length == 0 ? (
          <div>
            <LoaderComp />
          </div>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Number</TableCell>
                  <TableCell align="right">Слово на Аглийском</TableCell>
                  <TableCell align="right">Слово на русском</TableCell>
                  <TableCell align="right">Актуальность</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.words.map((word, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="right">{word.eng}</TableCell>
                    <TableCell align="right">{word.rus}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => this.deleteWord1(index)}>
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
