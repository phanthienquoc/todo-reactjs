import React, { useState, useEffect } from 'react';

const NumberInput = props => {
    const { title, id, name, content, onChange } = props;

    return (
        <div>
            <div className="title"> {title || 'Title'}</div>
            <div className="input">
                <input type="text" id={id} name={name || 'name'} value={content} onChange={onChange} />
            </div>
        </div>
    )
}

export default NumberInput;