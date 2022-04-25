export const getTasks = (state) => state.tasksReducer.tasks;
export const getFilterStatus = (state) => state.tasksReducer.filter;
export const getLoginStatus = (state) => state.appReducer.isAuth;
export const getTaskByID = (taskID) => (state) => getTasks(state).find(({id}) => id === Number(taskID))