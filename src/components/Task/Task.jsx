import React, { createRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Selectors, TodoAC } from "../../store";
import style from "./Task.module.css";
class TaskOriginal extends React.Component {
  deleteTaskHandler = (id) => {
    this.props.deleteTask(id);
    this.props.history.push("/tasks");
  };
  toggleCheckbox = (id) => {
    this.props.completeTask(id);
  };
  textAreaHandler = (event) => {
    const text = event.target.value;
    this.props.addDescriptionTask(text, Number(this.props.match.params.id));
  };

  render() {
    if (!this.props.getTaskByID(this.props.match.params.id)) {
      return <div>Задача №{this.props.match.params.id} не найдена </div>;
    }
    const { id, isDone, label, date, description } = this.props.getTaskByID(
      this.props.match.params.id
    );
    return (
      <div className={style.container}>
        <div className={style.task}>
          <h1>№ {id}</h1>
          <span className={style.title}>{label}</span>
          <button
            className={style.delete}
            onClick={() => {
              this.deleteTaskHandler(id);
            }}
          >
            X
          </button>
        </div>
        <div className={style.containerinfo}>
          <input
            className={style.checkbox}
            type="checkbox"
            checked={isDone}
            onChange={() => {
              this.toggleCheckbox(id);
            }}
          />
          <textarea
            value={description}
            name="descriptions"
            id=""
            cols="30"
            rows="10"
            placeholder="описание"
            className={style.description}
            onChange={this.textAreaHandler}
          />

          <span className={style.date}>{date}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getTaskByID: (id) => Selectors.getTaskByID(id)(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteTask: (id) => dispatch(TodoAC.deleteTask(id)),
  completeTask: (id) => dispatch(TodoAC.completeTask(id)),
  addDescriptionTask: (text, id) =>
    dispatch(TodoAC.addDescriptionTask(text, id)),
});

export const Task = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(TaskOriginal);
