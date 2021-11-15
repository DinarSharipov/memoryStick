import { Button, Typography, Grid, Box } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../../components/AddWords/AddWords";
import classes from "./MemorizedWords.module.css";
import { fetchLearnEnglichApp } from "../../store/actions/words";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { Link } from "react-router-dom";
import LearnedWords from "../MemorizedGame/LearnedWords/LearnedWords";

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
    this.props.fetchLearnEnglichApp(this.props.userId);
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
                        backgroundColor: ` rgb(${100 + i * 40}, ${
                          200 - i * 60
                        }, 0)`,
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
          <AddWords AllWords={this.props.userWords} />
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
          <Button onClick={() => console.log(this.props)}>Тест</Button>
          <LearnedWords />
        </Box>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    userWords: state.words.userWords,
    modeList: state.words.modeList,
    userBaseId: state.auth.userBaseId,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchLearnEnglichApp: (userId) => dispatch(fetchLearnEnglichApp(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemorizedWordsMode);
