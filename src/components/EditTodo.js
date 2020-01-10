import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, cancleEditTodo } from "../actions/todos.action";
import * as utils from "../helpers/utils";
import NumberInput from "../components/NumberInput";

function EditTodo() {
  const {
    inputs,
    handleInputChange,
    handleUpdate,
    handleCancle
  } = useEditTodoForm();
  const title = {
    id: inputs.id || utils.generateUUID("edittitle"),
    title: "Title",
    name: "title",
    value: inputs.title,
    onChange: handleInputChange
  };
  const content = {
    id: inputs.id || utils.generateUUID("editcontent"),
    title: "Content",
    name: "content",
    value: inputs.content,
    onChange: handleInputChange
  };

  return (
    <React.Fragment>
      <h2>Edit todo</h2>
      {
        <form onSubmit={handleUpdate} method="post">
          <NumberInput {...title} />
          <NumberInput {...content} />
          <button>Update</button>
          <button onClick={handleCancle} className="button muted-button">
            Cancel
          </button>
        </form>
      }
    </React.Fragment>
  );
}

EditTodo.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string
};

const useEditTodoForm = () => {
  let props = useSelector(state => state);
  let data = props.todosReducer.todoEdit;
  const [inputs, setInputs] = utils.useStateFromProp(data);

  useEffect(() => {
    utils.setCaretToPos(inputs.id, inputs.currentCursor);
  });

  const dispatch = useDispatch();

  const handleCancle = () => {
    dispatch(cancleEditTodo());
  };

  const handleUpdate = event => {
    if (event) {
      event.preventDefault();
    }

    dispatch(
      updateTodo(inputs.id, {
        newTitle: inputs.title,
        newContent: inputs.content
      })
    );

    setInputs({
      id: null,
      title: "",
      content: "",
      id: "",
      currentCursor: 0
    });

    event.target.reset();
  };

  const handleInputChange = event => {
    let input = {
      ...inputs,
      id: event.id,
      title: event.name,
      value: event.value
    };

    setInputs({
      ...input,
      value: event.value
    });
  };

  return {
    handleCancle,
    handleUpdate,
    handleInputChange,
    inputs
  };
};

export default EditTodo;
