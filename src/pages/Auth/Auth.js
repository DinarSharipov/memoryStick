import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

const modal = {
  display: "flex",
  margin: "auto",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid #ffffff",
  borderRadius: "10px",
  maxWidth: "650px",
  padding: "10px",
};

class Auth extends Component {
  state = {
    login: "",
    password: "",
    loginTest: false,
    passwordTest: false,
  };

  setLogin(e) {
    let loginReg = new RegExp(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/i);
    let loginRegRus = new RegExp(/[а-яА-Я]/i);
    let login = this.state.login;
    if (loginReg.test(e.target.value) && !loginRegRus.test(e.target.value)) {
      login = e.target.value;
      this.setState({
        login,
        loginTest: true,
      });
    } else {
      login = e.target.value;
      this.setState({
        login,
        loginTest: false,
      });
    }
  }
  setPassword(e) {
    let password = this.state.password;
    password = e.target.value;
    this.setState({
      password,
      passwordTest: true,
    });
  }

  enter(login, password, isLogin) {
    this.props.auth(login, password, isLogin);
  }

  render() {
    return (
      <Box sx={modal}>
        
        <Typography variant="h6" color="white">
          Войдите в приложение
        </Typography>

        <TextField
          sx={{ width: "100%", p: 1 }}
          color={this.state.loginTest ? "success" : "error"}
          label="Введите адрес электронной почты"
          value={this.state.login}
          onChange={(e) => this.setLogin(e)}
        />
        <TextField
          sx={{ width: "100%", p: 1 }}
          color={this.state.passwordTest ? "success" : "error"}
          label="Введите пароль"
          value={this.state.password}
          onChange={(e) => this.setPassword(e)}
        />

        <ButtonGroup sx={{width: "100%"}}>
          <Button 
            disabled={
              this.state.loginTest && this.state.passwordTest ? false : true
            }
            onClick={() =>
              this.enter(this.state.login, this.state.password, true)
            }
          >
            Войти
          </Button>
          <Button
            disabled={
              this.state.loginTest && this.state.passwordTest ? false : true
            }
            onClick={() =>
              this.enter(this.state.login, this.state.password, false)
            }
          >
            Зарегистрироваться
          </Button>
        </ButtonGroup>
        {this.props.errorAuth}
      </Box>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorAuth: state.auth.errorAuth ? (
      <Typography variant="h6" sx={{ pt: 2 }}>
        Ошибка авторизации!
      </Typography>
    ) : null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (login, password, isLogin) =>
      dispatch(auth(login, password, isLogin)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
