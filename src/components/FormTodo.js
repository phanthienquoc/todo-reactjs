import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todos.action';
import * as utils from '../helpers/utils';
import NumberInput from '../components/NumberInput';


const FormTodo = props => {
    const { inputs, handleInputChange, handleAdd } = useAddTodoForm();

    const data = {
        ...inputs,
        title: 'Content',
        id: 'addcontent',
        name: 'addcontent',
        onChange: handleInputChange,
    }

    console.log(data)

    return (
        <React.Fragment >
            <h2>Add todo</h2>
            <form onSubmit={handleAdd} method="post">
                <div className='form-todo'>
                    <div className="title">Title </div>
                    <div className="input">
                        <input id="addtitle" type="text" name="title" value={inputs.title} onChange={handleInputChange} />
                    </div>
                    <NumberInput {...data} />
                    {/* <div className="title"> Content</div>
                    <div className="input">
                        <input id="addcontent" type="text" name="addcontent" value={inputs.content} onChange={handleInputChange} />
                    </div> */}
                    <button type="submit" >Add</button>
                </div >
            </form>
        </React.Fragment >
    )
}

FormTodo.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string
}


const useAddTodoForm = () => {
    const [inputs, setInputs] = useState({
        inputId: '',
        title: '',
        content: '',
        currentCursor: 0,
        numberOldComma: 0,
        numberNewComma: 0
    });

    useEffect(() => {
        utils.setCaretToPos(inputs.inputId, inputs.currentCursor)
    })

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
        let currentCursor = event.target.selectionStart || 0;
        let spaceFromLastCharacter = 0;

        let inputId = event.target.id;
        event.persist();


        if (event.target.name === 'addcontent') {
            if (event.target.value.length < 2) {
                spaceFromLastCharacter = 0;
            } else {
                spaceFromLastCharacter = event.target.value.length - currentCursor;
            }

            number = utils.handleNumber(event.target.value);
            setInputs(inputs => ({
                ...inputs,
                currentCursor: (number.length - spaceFromLastCharacter),
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
        handleAdd,
        handleInputChange,
        inputs
    };

};

export default FormTodo;