import React from "react";
import { FILTER_STATUSES, filterOptions } from "./constants";
import { RadioGroup } from "./common";

function filterTasks(filter, task) {
  if (filter === FILTER_STATUSES.ALL) {
    return true;
  }

  if (filter === FILTER_STATUSES.DONE) {
    return task.isDone;
  }

  return !task.isDone;
}

const generateUniqId = (tasks) => {
  const ids = tasks.map(({ id }) => id);

  return Math.max(...ids) + 1;
}

export class App extends React.Component {
  state = {
    tasks: [
      { id: 1, label: "Выучить JS", isDone: true },
      { id: 2, label: "Выучить React", isDone: false },
      { id: 3, label: "Сделать проект на React", isDone: false },
      { id: 4, label: "Закончить курс Frontend developer", isDone: false },
    ],
    taskInput: '',
    filter: FILTER_STATUSES.ALL,
  };
  deleteAllTaskHandler = () =>{
    this.setState({tasks: []})
  }
  deleteTaskHandler = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter(({ id: taskID }) => taskID !== id),
    }));
  };
  toggleCheckbox = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (id === task.id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      }),
    }));
  };
  addTaskHandler = () =>{
    this.setState((prevState) =>({
      tasks: prevState.tasks.concat([{id: generateUniqId(prevState.tasks), label: prevState.taskInput, isDone: false}])
    }))
  }
  inputChangeHandler = (event) => {
    this.setState({ taskInput: event.target.value })
  }

  changeFilterHandler = (event) => {
    this.setState({ filter: event.target.value });
  }
  render() {
    const { tasks,filter } = this.state;
    return (
      <div>
        <h1 className="">Todo</h1>
        <form>
          <button type="button" onClick={this.deleteAllTaskHandler}>Delete All</button>
          <input onChange = {this.inputChangeHandler}/>
          <button type="button" onClick={this.addTaskHandler}>Add</button>
        </form>
        <div>
          <RadioGroup options={filterOptions} value={filter} onChange={this.changeFilterHandler} />
        </div>
        <ul>
          {tasks
            .filter((task) => filterTasks(filter, task))
            .map(({ label, id, isDone }) => (
              <li key={id}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => {
                    this.toggleCheckbox(id);
                  }}
                />
                {label}
                <button
                  onClick={() => {
                    this.deleteTaskHandler(id);
                  }}
                >
                  X
                </button>
                <span>Date</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
