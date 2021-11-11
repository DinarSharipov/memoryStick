import { Container, Button, Typography, Grid, Box } from "@mui/material";

import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../AddWords/AddWords";
import classes from "./MemorizedWords.module.css";
import { fetchAllWordsLength } from "../../store/actions/words";
import { bgcolor } from "@mui/system";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { Link } from "react-router-dom";
import LearnedWords from "../../components/MemorizedGame/LearnedWords/LearnedWords";
import { Directions } from "@mui/icons-material";

class MemorizedWordsMode extends Component {
  componentDidMount() {
    this.props.fetchAllWordsLength();
  }
  render() {
    return (
      <div className={classes.root}>
        <>
          <Typography variant="h4" m={2}>
            Протестируй сколько слов ты помнишь
          </Typography>
          <Grid container spacing={2}>
            {this.props.modeList.map((item) => {
              return (
                <Grid item xs={3} key={item.id}>
                  <NavLink to={"/mode/" + item.modeLength}>
                    <Button
                      sx={{
                        fontSize: "22px",
                        p: 1,
                        m: 1,
                        width: 300,
                        backgroundColor: "rgb(0, 188, 255, 0.3)",
                        borderRadius: 8,
                      }}
                      variant="text"
                    >
                      {item.name}
                    </Button>
                  </NavLink>
                </Grid>
              );
            })}
          </Grid>
        </>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mt: 2,
          }}
        >
          <Typography variant="h4" color="initial" m={2}>
            Добавьте новое слово в ваш словарный запас!
          </Typography>
          <AddWords AllWords={this.props.AllWords} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            mt: 2,
          }}
        >
          <Link to="/wordslist" style={{ marginLeft: 20, color: "white" }}>
            <Button variant="contained" color="primary">
              Показать мой словарный запас
              <ViewListOutlinedIcon sx={{ ml: 2 }} />
            </Button>
          </Link>
          <LearnedWords />
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    AllWords: state.words.AllWords,
    modeList: state.words.modeList,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedWordsMode);
