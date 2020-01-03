import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../actions/todos.action';
import * as utils from '../helpers/utils';


function EditTodo() {
    const { inputs, handleInputChange, handleUpdate } = useEditTodoForm();
    return (
        <React.Fragment>
            {
                <form onSubmit={handleUpdate} method="post">
                    <div className='form-todo'>
                        <div className="title">Title </div>
                        <div className="input">
                            <input type="text" name="title" defaultValue={inputs.title} onChange={handleInputChange} />
                        </div>
                        <div className="title"> Content</div>
                        <div className="input">
                            <input type="text" name="content" defaultValue={inputs.content} onChange={handleInputChange} />
                        </div>
                        <button type="submit" >Update</button>
                    </div >
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

    const dispatch = useDispatch()
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
        handleUpdate,
        handleInputChange,
        inputs
    };

};

export default EditTodo;