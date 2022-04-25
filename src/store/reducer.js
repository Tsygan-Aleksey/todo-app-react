import { FILTER_STATUSES } from "./constants";
import { TODO_ACTIONS, APP_ACTIONS } from "./constants";
import { combineReducers } from "redux";

const INITIAL_TASKS_STATE = {
  tasks: [
    { id: 1, label: "Выучить JS", isDone: true, date: "17.03.2022", description: '' },
    { id: 2, label: "Выучить React", isDone: false, date: "18.03.2022", description: '' },
    {
      id: 3,
      label: "Сделать проект на React",
      isDone: false,
      date: "19.03.2022",
      description: ''
    },
    {
      id: 4,
      label: "Закончить курс Frontend developer",
      isDone: false,
      date: "20.03.2022",
      description: ''
    },
  ],
  filter: FILTER_STATUSES.ALL,
};

const generateUniqId = (tasks) => {
  if (tasks.length) {
    const ids = tasks.map(({ id }) => id);
    return Math.max(...ids) + 1;
  } else return 1;
};

const tasksReducer = (state = INITIAL_TASKS_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case TODO_ACTIONS.deleteAll: {
      return {
        tasks: [],
        filter: state.filter,
      };
    }
    case TODO_ACTIONS.addTask: {
      console.log(state.tasks);
      return {
        tasks: state.tasks.concat([
          {
            id: generateUniqId(state.tasks),
            label: action.payload,
            isDone: false,
            date: new Date().toLocaleDateString(),
          },
        ]),
        filter: state.filter,
      };
    }
    case TODO_ACTIONS.deleteTask: {
      return {
        tasks: state.tasks.filter(
          ({ id: taskID }) => taskID !== action.payload
        ),
        filter: state.filter,
      };
    }
    case TODO_ACTIONS.completeTask: {
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload === task.id) {
            return { ...task, isDone: !task.isDone };
          }
          return task;
        }),
        filter: state.filter,
      };
    }
    case TODO_ACTIONS.filterTasks: {
      return {
        tasks: state.tasks,
        filter: action.payload,
      };
    }

    case TODO_ACTIONS.addDescriptionTask: {
      console.log(action.payload.id)
      console.log(action.payload.text)
      return {
        tasks: state.tasks.map((task) => {
          if (action.payload.id === task.id) {
            return { ...task, description: action.payload.text };
          }
          return task;
        }),
        filter: state.filter,
      };
    }
  }
};

const INITIAL_APP_STATE = {
  isAuth: false,
};

const appReducer = (state = INITIAL_APP_STATE, action) => {
  switch (action.type) {
    default:
      return state;
    case APP_ACTIONS.isAuth: {
      return {
        isAuth: true,
      };
    }
    case APP_ACTIONS.logout: {
      return {
        isAuth: false,
      };
    }
  }
};

export const rootReducer = combineReducers({ tasksReducer, appReducer });
