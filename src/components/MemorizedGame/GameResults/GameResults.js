import React, { useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Alert,
  ButtonGroup,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { pushResults } from "../../../store/actions/words";

const GameResults = (props) => {
  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Английское слово</TableCell>
              <TableCell>Ваш перевод</TableCell>
              <TableCell>Правильный перевод</TableCell>
              <TableCell>Результат</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.location.propsSearch.map((item) => (
              <TableRow>
                <TableCell>{item.engWord}</TableCell>
                <TableCell>{item.userWord}</TableCell>
                <TableCell>{item.rusWord}</TableCell>
                <TableCell>
                  {item.trueFalse ? (
                    <Alert
                      severity="success"
                      variant="string"
                      sx={{ color: "green" }}
                    >
                      Ответ верный
                    </Alert>
                  ) : (
                    <Alert
                      severity="error"
                      variant="string"
                      sx={{ color: "red" }}
                    >
                      Ответ неверный
                    </Alert>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ButtonGroup sx={{ p: 2 }}>
        <Link to="/">
          <Button onClick={() => props.pushResults(props.location.propsSearch)}>
            Сохранить результат
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return { pushResults: (results) => dispatch(pushResults(results)) };
}

export default connect(null, mapDispatchToProps)(GameResults);
