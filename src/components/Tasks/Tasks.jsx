import React from "react";
import style from "./Tasks.module.css";
import { RadioGroup } from "../common";
import { FILTER_STATUSES, filterOptions, Selectors, TodoAC } from "../../store";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
function filterTasks(filter, task) {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.DONE) {
    return task.isDone;
  }

  return !task.isDone;
}

class TasksOriginal extends React.Component {
  state = {
    taskTitleInput: "",
  };
  deleteAllTaskHandler = () => {
    this.props.deleteAll();
  };
  addTaskHandler = () => {
    if (this.state.taskTitleInput.trim()) {
      this.props.addTask(this.state.taskTitleInput);
    }
  };
  deleteTaskHandler = (id) => {
    this.props.deleteTask(id);
  };
  toggleCheckbox = (id) => {
    this.props.completeTask(id);
  };
  inputTitleChangeHandler = (event) => {
    this.setState({ taskTitleInput: event.target.value });
  };

  changeFilterHandler = (event) => {
    this.props.filterTasks(event.target.value);
  };

  render() {
    const { taskTitleInput } = this.state;
    const { tasks, filter } = this.props;
    return (
      <>
        <form className={style.form}>
          <button type="button" onClick={this.deleteAllTaskHandler}>
            Delete All
          </button>
          <input
            value={taskTitleInput}
            onChange={this.inputTitleChangeHandler}
            placeholder="Введите название"
            name={taskTitleInput}
          />
          <button type="button" onClick={this.addTaskHandler}>
            Add
          </button>
        </form>
        <div>
          <RadioGroup
            options={filterOptions}
            value={filter}
            onChange={this.changeFilterHandler}
          />
        </div>
        <ol className={style.container}>
          {tasks
            .filter((task) => filterTasks(filter, task))
            .map(({ label, id, isDone, date }) => (
              <li key={id} className={style.task}>
                <input
                  className={style.checkbox}
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {
                    this.toggleCheckbox(id);
                  }}
                />
                <span>№ {id}</span>
                <p className={style.taskinfo}>{label}</p>
                <Link to={`/tasks/task/${id}`}>Перейти</Link>
                <button
                  className={style.delete}
                  onClick={() => {
                    this.deleteTaskHandler(id);
                  }}
                >
                  X
                </button>
                <span className={style.date}>{date}</span>
              </li>
            ))}
        </ol>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: Selectors.getTasks(state),
  filter: Selectors.getFilterStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteAll: () => dispatch(TodoAC.deleteAll()),
  addTask: (label) => dispatch(TodoAC.addTask(label)),
  deleteTask: (id) => dispatch(TodoAC.deleteTask(id)),
  completeTask: (id) => dispatch(TodoAC.completeTask(id)),
  filterTasks: (filter) => dispatch(TodoAC.filterTasks(filter)),
});

export const Tasks = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(TasksOriginal);
