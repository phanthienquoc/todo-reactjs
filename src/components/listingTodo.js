import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../actions/todos.action'


function ListingTodo() {
    const props = useSelector(state => state);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(deleteTodo(id))
    }

    const editItem = (id) => {
        dispatch(editTodo(id))
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.todosReducer.todos.length > 0 ? (
                    props.todosReducer.todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.content}</td>
                            <td>
                                <button className="button muted-button" onClick={() => editItem(todo.id)}>Edit</button>
                                <button className="button muted-button" onClick={() => deleteItem(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td colSpan={3}>No todos</td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}

export default ListingTodo;