import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchModeWords } from "../../store/actions/words";
import {
  Button,
  Stack,
  Chip,
  FormControlLabel,
  Switch,
  Box,
  Fade,
  TextField,
  Collapse,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import LoaderComp from "../UI/Loader/LoaderComp";

class MemorizedGame extends Component {
  state = {
    checked: false,
    display: "none",
  };

  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  renderGame() {
    return this.props.AllWords.map((item, index) => {
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
                label={item.eng}
              />
              <Chip
                sx={{
                  display: this.state.checked ? "none" : "flex",
                  fontSize: 24,
                  p: 2,
                }}
                color="success"
                label={item.rus}
              />
              <Collapse in={this.state.checked}>
                <TextField
                  sx={{ width: 300 }}
                  size="small"
                  label="Напишите перевод слова"
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
              control={
                <Switch
                  checked={this.state.checked}
                  onChange={this.handleChange}
                />
              }
              label="Show"
            />
            <Button variant="outlined" color="info">
              Проверить слова!
            </Button>
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
