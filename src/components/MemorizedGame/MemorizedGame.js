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
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

class MemorizedGame extends Component {
  state = {
    checked: true,
  };
  componentDidMount() {
    this.props.fetchModeWords(this.props.match.params.id);
    console.log(this.props.length);
  }
  render() {
    return (
      <div>
        {!this.props.loading && this.props.AllWords[0] ? (
          <div>
            {this.props.AllWords.map((item, index) => {
              return (
                <Stack alignItems="center" key={index} spacing={1}>
                  <Stack direction="row" spacing={1} sx={{ m: 1 }}>
                    <Chip color="primary" label={item.eng} />
                    <Chip color="success" label={item.rus} />
                  </Stack>
                </Stack>
              );
            })}
          </div>
        ) : (
          <h1 onClick={() => console.log(this.props.loading)}>Ждем....</h1>
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
