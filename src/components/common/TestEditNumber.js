import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../actions/todos.action";
import * as utils from "../helpers/utils";
import NumberInput from "../components/NumberInput";

const TestEditNumber = props => {
  const { inputs, handleInputChange, handleUpdate } = useEditForm();

  const number = {
    title: "Content",
    id: "content",
    name: "value",
    value: inputs.value,
    readOnly: false,
    placeHolder: "input number",
    onChange: handleInputChange
  };
  const number2 = {
    title: "Content2",
    id: "content2",
    name: "value2",
    value: inputs.value2,
    readOnly: false,
    placeHolder: "input number",
    onChange: handleInputChange
  };

  return (
    <React.Fragment>
      <h2>Edit todo</h2>
      <form onSubmit={handleUpdate} method="post">
        <div className="form-todo">
          <NumberInput {...number} />
          <NumberInput {...number2} />
          <button type="submit">Update</button>
          <button type="submit">Cancle</button>
        </div>
      </form>
    </React.Fragment>
  );
};

const useEditForm = () => {
  const props = useSelector(state => state);
  const [inputs, setInputs] = utils.useStateFromProp(
    props.todosReducer.todoEdit
  );

  const dispatch = useDispatch();
  const handleUpdate = event => {
    if (event) {
      event.preventDefault();
    }

    if (utils.isEmpty(inputs.value)) {
      alert("Title and content can not empty");
    } else {
      console.log(inputs);
      debugger;
      dispatch(
        updateTodo(inputs.id, {
          ...inputs
        })
      );
    }

    setInputs({});
    event.target.reset();
  };

  const handleInputChange = event => {
    let input = {
      ...inputs,
      id: event.id,
      [event.name]: event.value
    };

    setInputs({
      ...input
    });
  };

  return {
    handleUpdate,
    handleInputChange,
    inputs
  };
};

export default TestEditNumber;
