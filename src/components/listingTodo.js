import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../actions/todos.action'
import { Menu, Icon } from 'antd';



function ListingTodo() {
    const props = useSelector(state => state);
    const dispatch = useDispatch();

    const deleteItem = (id) => {
        dispatch(deleteTodo(id))
    }

    const editItem = (id) => {
        console.log('dispatch', id)
        dispatch(editTodo(id))
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            {
                props.todosReducer.todos.map(todo => {
                    return (
                        <Menu.Item key={todo.id}>{todo.id} -  {todo.title} <Icon type="laptop" />{todo.content}
                            <button onClick={() => deleteItem(todo.id)} >delete</button>
                            <button onClick={() => editItem(todo.id)} >edit</button>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
}

export default ListingTodo;