import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todos.action";
import * as utils from "../helpers/utils";
import NumberInput from "../components/NumberInput";

const TestNumber = props => {
  const { inputs, handleInputChange, handleAdd } = useAddTodoForm();

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
      <h2>Add todo</h2>
      <form onSubmit={handleAdd} method="post">
        <div className="form-todo">
          <NumberInput {...number} />
          <NumberInput {...number2} />
          <button type="submit">Add</button>
        </div>
      </form>
    </React.Fragment>
  );
};

const useAddTodoForm = () => {
  const [inputs, setInputs] = useState({
    value2: "",
    value: ""
  });

  const dispatch = useDispatch();

  const handleAdd = event => {
    if (event) {
      event.preventDefault();
    }

    if (utils.isEmpty(inputs.value)) {
      alert("Title and content can not empty");
    } else {
      console.log(inputs);
      dispatch(
        addTodo({
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
      [event.name]: event.value
    };

    console.log(input);

    setInputs({
      ...input
    });
  };

  return {
    handleAdd,
    handleInputChange,
    inputs
  };
};

export default TestNumber;
