import * as types from '../constants/todo.types';

export const addTodo = (todo) => ({
    type: types.ADD_TODO,
    title: todo.title,
    content: todo.content
});

export const updateTodo = (id, todo) => ({
    type: types.UPDATE_TODO,
    id: id,
    title: todo.newTitle,
    content: todo.newContent
});

export const deleteTodo = (id) => ({
    type: types.DELETE_TODO,
    id: id
});

export const editTodo = (id) => ({
    type: types.EDIT_TODO,
    id: id
});