import * as types from "../constants/todo.types";

export const addTodo = todo => ({
  type: types.ADD_TODO,
  todo: todo
});

export const updateTodo = (id, todo) => ({
  type: types.UPDATE_TODO,
  id: id,
  todo: todo
});

export const deleteTodo = id => ({
  type: types.DELETE_TODO,
  id: id
});

export const editTodo = id => ({
  type: types.EDIT_TODO,
  id: id
});

export const cancleEditTodo = () => ({
  type: types.CANCLE_EDIT_TODO
});
