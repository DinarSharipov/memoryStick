import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

const modal = {
  display: "flex",
  left: 0,
  right: 0,
  margin: "auto",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ffffff",
  borderRadius: "15px",
  maxWidth: "650px",
  padding: "20px",
  position: "absolute",
};

class Auth extends Component {
  state = {
    login: "",
    password: "",
  };

  setLogin(e) {
    let login = this.state.login;
    login = e.target.value;
    this.setState({
      login,
    });
  }
  setPassword(e) {
    let password = this.state.password;
    password = e.target.value;
    this.setState({
      password,
    });
  }

  render() {
    return (
      <Box sx={modal}>
        <Typography variant="h4" color="white">
          Войдите в систему
        </Typography>

        <TextField
          sx={{ width: "100%", p: 1 }}
          color="success"
          label="Введите логин"
          value={this.state.login}
          onChange={(e) => this.setLogin(e)}
        />
        <TextField
          sx={{ width: "100%", p: 1 }}
          color="success"
          label="Введите пароль"
          value={this.state.password}
          onChange={(e) => this.setPassword(e)}
        />

        <ButtonGroup>
          <Button
            onClick={() =>
              this.props.auth(this.state.login, this.state.password, true)
            }
          >
            Войти
          </Button>
          <Button
            onClick={() =>
              this.props.auth(this.state.login, this.state.password, false)
            }
          >
            Зарегистрироваться
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password, isLogin) =>
      dispatch(auth(login, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
