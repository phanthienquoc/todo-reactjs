import { combineReducers } from "redux";
import todosReducer from "./todo.reducer";
import postReducer from "./post.reducer";

export default combineReducers({
  todosReducer,
  postReducer
});
