import { Button, Typography, Grid, Box } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../../components/AddWords/AddWords";
import classes from "./MemorizedWords.module.css";
import { fetchAllWordsLength } from "../../store/actions/words";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { Link } from "react-router-dom";
import LearnedWords from "../../components/MemorizedGame/LearnedWords/LearnedWords";

class MemorizedWordsMode extends Component {
  state = {
    textStyle: {
      background: "linear-gradient(180deg, rgb(32, 53, 122), rgb(41, 22, 9))",
      border: "2px solid #fff",
      color: "#fff",
      borderRadius: 4,
      textAlign: "center",
      p: "10px 20px",
      m: 2,
    },
  };
  componentDidMount() {
    this.props.fetchAllWordsLength();
  }
  render() {
    return (
      <div className={classes.root}>
        <>
          <Typography variant="h6" sx={this.state.textStyle}>
            Протестируй сколько слов ты помнишь
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {this.props.modeList.map((item, i) => {
              return (
                <Grid item xs="auto" key={i}>
                  <NavLink to={"/mode/" + item.modeLength}>
                    <Button
                      sx={{
                        fontSize: "22px",
                        p: "0px 20px",
                        m: 1,
                        backgroundColor: "rgba(255, 255, 255, 0)",
                        border: "2px solid #fff",
                        borderRadius: 4,
                        color: "#fff",
                      }}
                      variant="outlined"
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
          <Typography variant="h6" color="initial" sx={this.state.textStyle}>
            Добавьте новое слово в ваш словарный запас!
          </Typography>
          <AddWords AllWords={this.props.AllWords} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            mt: 2,
          }}
        >
          <Link to="/wordslist" style={{ color: "white" }}>
            <Button variant="contained" color="primary">
              Показать мой словарный запас
              <ViewListOutlinedIcon />
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
