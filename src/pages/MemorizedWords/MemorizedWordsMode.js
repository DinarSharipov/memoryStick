import { Button, Typography, Grid, Box } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddWords from "../../components/AddWords/AddWords";
import classes from "./MemorizedWords.module.css";
import { fetchLearnEnglichApp } from "../../store/actions/words";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/system";
import { theme } from "../../components/UI/UIColors/UiColors";

class MemorizedWordsMode extends Component {
  state = {
    textStyle: {
      border: "1px solid #fff",
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
            Повтори слова которые уже знаешь.
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {this.props.modeList.map((item, i) => {
              return (
                <Grid item xs="auto" key={i}>
                  <NavLink
                    to={{
                      pathname: "/mode/" + item.modeLength,
                      propsSearch: item.modeLength,
                    }}
                  >
                    <Button
                      sx={{
                        fontSize: "22px",
                        p: "0px 20px",
                        m: 1,
                        backgroundColor: ` rgb(${100 + i * 40}, ${
                          200 - i * 60
                        }, 0)`,
                        border: "1px solid #fff",
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
            Для расширения своего словарного запаса добавляй новые слова ниже!
          </Typography>
          <AddWords restartPage={this.componentDidMount} />
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
            <ThemeProvider theme={theme}>
              <Button variant="outlined" color="BgGradient12">
                Показать мой словарный запас
                <ViewListOutlinedIcon />
              </Button>
            </ThemeProvider>
          </Link>
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
