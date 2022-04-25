import { TODO_ACTIONS, APP_ACTIONS } from "./constants";

export const deleteAll = () => ({ type: TODO_ACTIONS.deleteAll });
export const deleteTask = (id) => ({
  type: TODO_ACTIONS.deleteTask,
  payload: id,
});
export const addTask = (label) => ({
  type: TODO_ACTIONS.addTask,
  payload: label,
});
export const completeTask = (id) => ({
  type: TODO_ACTIONS.completeTask,
  payload: id,
});
export const filterTasks = (filter) => ({
  type: TODO_ACTIONS.filterTasks,
  payload: filter,
});
export const loginStatus = () => ({
  type: APP_ACTIONS.isAuth,
});

export const addDescriptionTask = (text, id) => ({
  type: TODO_ACTIONS.addDescriptionTask,
  payload: { id: id, text: text },
});
export const LogoutApp = () => ({ type: APP_ACTIONS.logout });
