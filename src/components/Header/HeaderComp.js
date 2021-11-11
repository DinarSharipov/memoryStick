import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllWordsLength } from "../../store/actions/words";
import { ThemeProvider } from "@mui/system";
import { theme } from "../UI/UIColors/UiColors";

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
                  <Typography variant="h6">Учим English!</Typography>
                </NavLink>
              </Toolbar>
            </AppBar>
            <div className="wrapper"></div>
          </Box>
        </ThemeProvider>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllWordsLength: () => dispatch(fetchAllWordsLength()),
  };
}

export default connect(null, mapDispatchToProps)(HeaderComp);
