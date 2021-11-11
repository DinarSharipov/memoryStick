import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllWordsLength } from "../../store/actions/words";
import { ThemeProvider } from "@mui/system";
import { theme } from "../UI/UIColors/UiColors";
import { Button } from "@mui/material";
import { logout } from "../../store/actions/auth";

class HeaderComp extends Component {
  componentDidMount() {
    this.props.fetchAllWordsLength();
  }
  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          <Box>
            <AppBar position="relative" color="BgGradient1">
              <Toolbar>
                <NavLink to="/" style={{ marginRight: 20, color: "#fff" }}>
                  <Typography variant="h6">
                    {this.props.isAuth ? "Мои приложения" : "Авторизация"}
                  </Typography>
                </NavLink>
                {this.props.isAuth ? (
                  <Button onClick={() => this.props.logout()}>Выйти</Button>
                ) : (
                  <Redirect to="/" />
                )}
              </Toolbar>
            </AppBar>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuth: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComp);
