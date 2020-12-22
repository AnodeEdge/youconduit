import React from "react";

function InputValueField(props) {
  const [inputValue, setValue] = React.useState(props.defaultValue);

  const handleChange = (evt) => {
    setValue(evt.target.value);
    props.callback({
      stateID: props.stateID,
      value: evt.target.value,
    });
  };

  return (
    <div style={props.componentStyle}>
      <label style={props.headerStyle}>{props.inputDescription}</label>
      <div>
        <input
          type="text"
          stateID={props.stateID}
          value={inputValue}
          onChange={handleChange}
        />
        {props.unit}
      </div>
    </div>
  );
}

export default InputValueField;
