import React, { useRef, useEffect } from 'react';
import './Input.css';
import Tick from '../../assets/tick.svg';
import TickAll from '../../assets/tick-all.svg';

const Input = props => {
  const {
    selectAll,
    selectAllClick,
    addItem
  } = props;

  let img = Tick;
  if (selectAll) img = TickAll;

  const inputElement = useRef(null);

  useEffect(() => {
    inputElement.current.focus();
  });

  return (
    <div className="Input">
      <img src={img}
        alt="tick"
        className="TickAll"
        width="40px"
        height="40px"
        onClick={() => selectAllClick()}
      />

      <input
        type="text"
        placeholder="Create a new item..."
        ref={inputElement}
        maxLength="40"
        onKeyUp={(event) => addItem(event)}
      />
    </div>
  );
};

export default Input;