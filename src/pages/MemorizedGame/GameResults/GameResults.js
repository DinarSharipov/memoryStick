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
import { useEffect, useState } from "react";

const GameResults = (props) => {
  const [words, setWords] = useState(
    Object.entries(props.location.propsSearch).map((item) => {
      return item[1];
    })
  );

  function preparationAndPushResults() {
    let readyWords = Object.entries(props.location.propsSearch);
    readyWords.map((word) => {
      let readyWord = word;
      if (readyWord[1].userAnswer == readyWord[1].rus) {
        readyWord[1].lastAnswer = true;
        readyWord[1].statistics.true += 1;
        delete readyWord[1].userAnswer;
      } else {
        readyWord[1].lastAnswer = false;
        readyWord[1].statistics.false += 1;
        delete readyWord[1].userAnswer;
      }
    });
    props.pushResults(readyWords, props.userBaseId);
  }

  return (
    <div>
      {}
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
            {words.map((item) => (
              <TableRow>
                <TableCell>{item.eng}</TableCell>
                <TableCell>{item.userAnswer}</TableCell>
                <TableCell>{item.rus}</TableCell>
                <TableCell>
                  {item.userAnswer == item.rus ? (
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
      <ButtonGroup
        sx={{ p: 2, display: "flex", justifyContent: "space-around" }}
      >
        <Link to="/allwords">
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            color="success"
            onClick={() => {
              preparationAndPushResults();
              // props.pushResults(props.location.propsSearch, props.userBaseId);
            }}
          >
            Сохранить результат
          </Button>
        </Link>
        <Link to="/learnEnglishApp">
          <Button color="error" variant="outlined" sx={{ m: 1 }}>
            Выйти без сохранения
          </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userBaseId: state.auth.userBaseId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pushResults: (results, userBaseId) =>
      dispatch(pushResults(results, userBaseId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameResults);
