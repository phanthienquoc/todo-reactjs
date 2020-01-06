import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import FormTodo from './components/FormTodo';
import EditTodo from './components/EditTodo';
import ListingTodo from '../src/components/listingTodo';

function App() {
  const props = useSelector(state => state);



  return (

    <div className="container">
      <h1>Demo</h1>
      <div className="flex-row view">
        <div className="flex-large">
          {props.todosReducer.isEdit ? <EditTodo /> : <FormTodo />}
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