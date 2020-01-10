import * as types from "../constants/todo.types";

const initialState = {
  todos: [],
  todoEdit: {
    id: null,
    name: "",
    value: "",
    value2: ""
  },
  isEdit: false
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO: {
      let id = state.todos.length === 0 ? 0 : state.todos[0].id + 1;
      return {
        ...state,
        todos: [
          {
            id: id,
            ...action.todo
          },
          ...state.todos
        ]
      };
    }

    case types.DELETE_TODO: {
      let newTodos = state.todos.filter(todo => todo.id !== action.id);

      return {
        ...state,
        todos: newTodos
      };
    }

    case types.EDIT_TODO: {
      let editItem = state.todos.find(todo => {
        return action.id === todo.id;
      });

      return {
        ...state,
        todoEdit: editItem,
        isEdit: true
      };
    }

    case types.UPDATE_TODO: {
      let newTodos = state.todos.map(todo => {
        if (action.id === todo.id) {
          console.log(action.todo);
          debugger;

          return {
            id: action.id,
            ...action.todo
          };
        } else {
          return todo;
        }
      });
      return {
        ...state,
        todos: newTodos,
        isEdit: false
      };
    }

    case types.CANCLE_EDIT_TODO: {
      return {
        ...state,
        isEdit: false
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
};

export default todosReducer;
