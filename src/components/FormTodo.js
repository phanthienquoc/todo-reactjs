import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todos.action';
import * as utils from '../helpers/utils';


function FormTodo() {
    const { inputs, handleInputChange, handleAdd } = useAddTodoForm();

    return (
        <React.Fragment>
            <h2>Add todo</h2>
            <form onSubmit={handleAdd} method="post">
                <div className='form-todo'>
                    <div className="title">Title </div>
                    <div className="input">
                        <input type="text" name="title" value={inputs.title} onChange={handleInputChange} />
                    </div>
                    <div className="title"> Content</div>
                    <div className="input">
                        <input type="text" name="content" value={inputs.content} onChange={handleInputChange} />
                    </div>
                    <button type="submit" >Add</button>
                </div >
            </form>
        </React.Fragment>
    )
}

FormTodo.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
}

const useAddTodoForm = (callback) => {
    const [inputs, setInputs] = useState({
        title: '',
        content: ''
    });

    const dispatch = useDispatch()


    const handleAdd = (event) => {
        if (event) {
            event.preventDefault();
        }

        if (utils.isEmpty(inputs.title) || utils.isEmpty(inputs.content)) {
            alert('Title and content can not empty')
        } else {
            dispatch(addTodo({
                title: inputs.title,
                content: inputs.content
            }))
        }

        setInputs({})
        event.target.reset();
    };

    const handleInputChange = (event) => {
        let number;
        event.persist();

        if (event.target.name === 'content') {
            number = utils.removeComma(event.target.value);
            if (utils.isNumber(number)) {
                number = utils.maxNumberInt(number);
                number = utils.formatNumberThousand(number);
                setInputs(inputs => ({
                    ...inputs,
                    content: number
                }));
            } else {
                setInputs(inputs => ({
                    ...inputs
                }));
            }
        } else {
            setInputs(inputs => ({
                ...inputs,
                [event.target.name]: event.target.value
            }));
        }
    };

    return {
        handleAdd,
        handleInputChange,
        inputs
    };

};

export default FormTodo;