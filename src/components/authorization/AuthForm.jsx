import React from "react";
import { Modal } from "../Modal";
import { GENDERS, GenderOptions } from "./constant";
import style from "./AuthForm.module.css";
import {connect} from "react-redux";
import {loginStatus, Selectors} from "../../store";


class AuthFormOriginal extends React.Component {
  state = {
    login: "",
    password: "",
    isModalVisible: false,
    getNews: true,
    gender: GENDERS.MAN,
    errorLogin: "",
    errorPassword: "",
  };
  keyPressHandler = (event) => {
    if (event.keyCode === 27) {
      this.modalCloseHandler();
    }
  };
  componentDidMount() {
    const body = document.querySelector("body");
    body.addEventListener("keyup", this.keyPressHandler);
  }
  // componentWillUnmount() {
  //   const body = document.querySelector("body");
  //   body.removeEventListener("keyup", this.keyPressHandler);
  // }

  handleInputName = ({ target }) => {
    this.setState({ login: target.value });
  };
  handleInputPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleRegistrationBtn = () => {
    if (this.state.login.toLowerCase() === process.env.REACT_APP_LOGIN) {
      this.setState({ errorLogin: "" });
    } else {
      this.setState({ errorLogin: "Неверный логин" });
    }
    if (this.state.password === process.env.REACT_APP_PASSWORD) {
      this.setState({ errorPassword: "" });
    } else {
      this.setState({ errorPassword: "Неверный пароль" });
    }
    if (this.state.login.toLowerCase() === process.env.REACT_APP_LOGIN && this.state.password === process.env.REACT_APP_PASSWORD) {
      this.setState({
        isModalVisible: true,
      });
      this.props.loginStatus()
    }
  };

  modalCloseHandler = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const {
      login,
      password,
      isModalVisible,
      errorLogin,
      errorPassword,
    } = this.state;
    const { isAuth } = this.props;
    return (
        <div className={style.wrapper}>
          {isAuth && <h2 className={style.title}>Добро пожаловать</h2>}
          {!isAuth && <h2 className={style.title}>Войти</h2>}
          {!isAuth && <form action="" className={style.form}>
          <input
            placeholder="Логин"
            type="text"
            value={login}
            onChange={this.handleInputName}
            className={style.inputform}
          />
          {errorLogin && <span className={style.validation}>{errorLogin}</span>}
          <input
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={this.handleInputPassword}
            className={style.inputform}
          />
          {errorPassword && <span className={style.validation}>{errorPassword}</span>}
          <button
            type="button"
            onClick={this.handleRegistrationBtn}
            className={style.submitbtn}
          >
            SingIn
          </button>
        </form>}
          {isModalVisible && (
            <Modal
              login={login}
              password={password}
              onClose={this.modalCloseHandler}
              onClick={this.modalCloseHandler}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    isAuth: Selectors.getLoginStatus(state)
  }
}

const mapDispatchToProps =(dispatch)=>({
  loginStatus: ()=> dispatch(loginStatus()),
})

export const AuthForm = connect(mapStateToProps, mapDispatchToProps)(AuthFormOriginal)