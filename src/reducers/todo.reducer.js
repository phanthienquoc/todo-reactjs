import * as types from '../constants/todo.types';

const initialState = {
    todos: [],
    todoEdit: {
        id: null,
        title: '',
        content: ''
    }
};

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_TODO: {
            return {
                ...state,
                todos: [
                    {
                        id: (state.todos.length === 0) ? 0 : state.todos[0].id + 1,
                        title: action.title,
                        content: action.content,
                    },
                    ...state.todos
                ]
            }
        }

        case types.DELETE_TODO: {
            let newTodos = state.todos.filter((todo) => todo.id !== action.id)
            return {
                ...state,
                todos: newTodos
            }
        }

        case types.EDIT_TODO: {
            let editItem = state.todos.find((todo) => {
                return action.id === todo.id
            })

            return {
                ...state,
                todoEdit: editItem
            }
        }

        case types.UPDATE_TODO: {
            let newTodos = state.todos.map((todo) => {
                if (action.id === todo.id) {
                    return {
                        id: action.id,
                        title: action.title,
                        content: action.content
                    }
                } else {
                    return todo
                }
            })
            return {
                ...state,
                todos: newTodos
            }
        }

        default: {
            return {
                ...state
            };
        }
    }
}

export default todosReducer;