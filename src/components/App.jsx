import React from "react";
import { Selectors, LogoutApp } from "../store";
import style from "./app.module.css";
import { connect } from "react-redux";
import { AuthForm } from "./authorization/AuthForm";
import { Tasks } from "./Tasks";
import { withRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { compose } from "redux";
import {Task} from "./Task";

class AppOriginal extends React.Component {
  state ={
    searchInput: ''
  }

  logoutBtnHandler = () => {
    this.props.logout();
  };

  inputNumberChangeHandler = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  searchBtnHandler = ()=>{
    const id = this.state.searchInput
    if(this.state.searchInput.trim()){

    }
    this.props.history.push(`/tasks/task/${id}`)
  }

  render() {
    const { isAuth } = this.props;
    const { searchInput } = this.state;
    return (
      <div className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.title}>Todos</h1>
          <nav className={style.navigation}>
            <Link to="/tasks" className={style.navlink}>
              Tasks
            </Link>
            <Link to="/about" className={style.navlink}>
              About us
            </Link>
          </nav>
          {isAuth && (
            <button className={style.headerbtn} onClick={this.logoutBtnHandler}>
              Logout
            </button>
          )}
          <div className={style.searchcontainer}>
            <span>Поиск по номеру </span>
            <input value={searchInput} onChange={this.inputNumberChangeHandler} placeholder='Введите номер' name={searchInput}/>
            <button onClick={this.searchBtnHandler}>Перейти</button>
          </div>
        </header>
        <Switch>
          <Route path="/login" exact>
            <AuthForm />
          </Route >
          {!isAuth && <Redirect to="/login"/>}
          <Route path="/tasks" exact>
            <Tasks />
          </Route>

          <Route path="/about" exact>
            <h1>Almost like TRELLO</h1>
          </Route>
          <Route path="/tasks/task/:id">
            <Task />
          </Route>
          <Redirect to="/tasks"/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: Selectors.getLoginStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(LogoutApp()),
});

export const App = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AppOriginal);
