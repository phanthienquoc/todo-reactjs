import React, { useState, useEffect } from 'react';
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
                    <input type="text" name="title" value={inputs.title} onChange={handleInputChange} />
                    <label>Content</label>
                    <input type="text" name="content" value={inputs.content} onChange={handleInputChange} />
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

export function useStateFromProp(initialValue) {
    const [inputs, setInputs] = useState(initialValue);

    useEffect(() => setInputs(initialValue), [initialValue]);

    return [inputs, setInputs];
}


const useEditTodoForm = () => {
    let props = useSelector(state => state);
    let data = props.todosReducer.todoEdit;
    const [inputs, setInputs] = useStateFromProp(data);

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
            content: ''
        })

        event.target.reset();

    }

    const handleInputChange = (event) => {
        let number;


        if (event.target.name === 'content') {
            number = utils.removeComma(event.target.value);
            if (utils.isNumber(number)) {
                number = utils.maxNumberInt(number);
                number = utils.formatNumberThousand(number);

                setInputs({
                    ...inputs,
                    content: number
                });
            }
        } else {
            setInputs({
                ...inputs,
                title: event.target.value
            });
        }

        event.persist();
    };

    return {
        handleCancle,
        handleUpdate,
        handleInputChange,
        inputs
    };

};

export default EditTodo;