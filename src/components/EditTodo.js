import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo, cancleEditTodo } from '../actions/todos.action';
import * as utils from '../helpers/utils';


function EditTodo() {
    const { inputs, handleInputChange, handleUpdate, handleCancle } = useEditTodoForm();
    return (
        <React.Fragment>
            <h2>Edit todo</h2>
            {
                <form onSubmit={handleUpdate} method="post" >
                    <label>Title</label>
                    <input type="text" id="edittitle" name="title" value={inputs.title} onChange={handleInputChange} />
                    <label>Content</label>
                    <input type="text" id="editcontent" name="content" value={inputs.content} onChange={handleInputChange} />
                    <button>Update</button>
                    <button onClick={handleCancle} className="button muted-button">Cancel</button>
                </form>
            }
        </React.Fragment>
    )
}

EditTodo.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
}

const useEditTodoForm = () => {
    let props = useSelector(state => state);
    let data = props.todosReducer.todoEdit;
    const [inputs, setInputs] = utils.useStateFromProp(data);

    useEffect(() => {
        utils.setCaretToPos(inputs.inputId, inputs.currentCursor)
    })


    const dispatch = useDispatch();


    const handleCancle = () => {
        dispatch(cancleEditTodo())
    }

    const handleUpdate = (event) => {
        if (event) {
            event.preventDefault();
        }

        dispatch(updateTodo(inputs.id, {
            newTitle: inputs.title,
            newContent: inputs.content
        }))

        setInputs({
            id: null,
            title: '',
            content: '',
            inputId: '',
            currentCursor: 0
        })

        event.target.reset();

    }

    const handleInputChange = (event) => {
        let number;
        let currentCursor = event.target.selectionStart || inputs.currentCursor;
        let inputId = event.target.id;
        event.persist();

        if (event.target.name === 'content') {
            number = utils.handleNumber(event.target.value);
            setInputs(inputs => ({
                ...inputs,
                currentCursor: currentCursor,
                inputId: inputId,
                content: number
            }))

        } else {
            setInputs(inputs => ({
                ...inputs,
                currentCursor: currentCursor,
                inputId: inputId,
                [event.target.name]: event.target.value
            }));
        }
    };

    return {
        handleCancle,
        handleUpdate,
        handleInputChange,
        inputs
    };

};

export default EditTodo;