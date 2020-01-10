import React from "react";
import * as utils from "../helpers/utils";

const TextInput = props => {
  const { title, id, name, value, readOnly, placeHolder, onChange } = props;
  id = utils.generateUUID(id);

  const onInputChange = event => {
    onChange({
      id: id,
      name: event.target.name,
      value: event.target.value
    });
  };

  return (
    <div>
      <div className="title"> {title || "Title"}</div>
      <div className="input">
        <input
          type="text"
          id={id}
          name={name || "name"}
          value={value || ""}
          onChange={onInputChange}
          placeholder={placeHolder || ""}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default TextInput;
