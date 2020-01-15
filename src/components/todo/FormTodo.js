import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";
import { addTodo } from "../actions/todos.action";
import * as utils from "../helpers/utils";
import NumberInput from "../components/common/NumberInput";
import TextInput from "../components/common/TextInput";

const FormTodo = props => {
  const { inputs, handleInputChange, handleAdd } = useAddTodoForm();

  const content = {
    title: "Content",
    id: utils.generateUUID("content"),
    name: "content",
    value: inputs.value,
    readOnly: false,
    placeHolder: "content",
    onChange: handleInputChange
  };

  const title = {
    title: "Title",
    id: "title",
    name: "title",
    readOnly: false,
    placeHolder: "title",
    value: inputs.title || "",
    onChange: handleInputChange
  };

  return (
    <React.Fragment>
      <h2>Add todo</h2>
      <form onSubmit={handleAdd} method="post">
        <div className="form-todo">
          <TextInput {...title} />
          <NumberInput {...content} />
          <button type="submit">Add</button>
        </div>
      </form>
    </React.Fragment>
  );
};

FormTodo.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string
};

const useAddTodoForm = () => {
  const [inputs, setInputs] = useState({
    id: utils.generateUUID(),
    title: "",
    value: ""
  });

  useEffect(() => {
    // utils.setCaretToPos(inputs.id, inputs.currentCursor);
  });

  const dispatch = useDispatch();

  const handleAdd = event => {
    if (event) {
      event.preventDefault();
    }

    if (utils.isEmpty(inputs.title) || utils.isEmpty(inputs.content)) {
      alert("Title and content can not empty");
    } else {
      dispatch(
        addTodo({
          title: inputs.title,
          content: inputs.content
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
      title: event.name,
      value: event.value,
      currentCursor: event.currentCursor
    };

    if (event.name === "content") {
      setInputs({
        ...input,
        content: event.value
      });
    } else {
      setInputs({
        ...input,
        [event.name]: event.value
      });
    }
  };

  return {
    handleAdd,
    handleInputChange,
    inputs
  };
};

export default FormTodo;
