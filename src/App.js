import React from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import FormTodo from './components/FormTodo';
import EditTodo from './components/EditTodo';
import ListingTodo from './components/ListingTodo';

function App() {
  const props = useSelector(state => state);
  return (
    <div className="container">
      <h1>Demo</h1>
      <div className="flex-row view">
        <div className="flex-large">
          {props.todosReducer.isEdit || props.todosReducer.todos.length > 0 ? <EditTodo {...props} /> : <FormTodo {...props} />}
        </div>
        <div className="flex-large">
          <h2>View todos</h2>
          <ListingTodo />
        </div>
      </div>
    </div>
  );
}


export default App;