import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";

class WordsList extends Component {
  state = {
    words: [{ eng: "efew", rus: "everv" }],
  };

  render() {
    return (
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Number</TableCell>
              <TableCell align="right">Слово на Аглийском</TableCell>
              <TableCell align="right">Слово на русском</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.words.map((word, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="right">{word.eng}</TableCell>
                <TableCell align="right">{word.rus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordsList: state.words.wordsList,
  };
}

export default connect(mapStateToProps)(WordsList);
