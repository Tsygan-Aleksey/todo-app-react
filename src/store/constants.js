export const FILTER_STATUSES = {
  ALL: "all",
  DONE: "completed",
  ACTIVE: "inProgress",

};

export const filterOptions = [
  { value: FILTER_STATUSES.ALL, label: "all" },
  { value: FILTER_STATUSES.ACTIVE, label: "inProgress" },
  { value: FILTER_STATUSES.DONE, label: "completed" },
];


export const TODO_ACTIONS ={
  deleteAll: 'deleteAll',
  addTask: 'AddTask',
  deleteTask: 'deleteTask',
  completeTask: 'completeTask',
  filterTasks: 'filterTasks',
  addDescriptionTask: 'addDescriptionTask'
}

export const APP_ACTIONS ={
  isAuth: 'isAuth',
  logout: 'logout'
}


