import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Input.css';
import Tick from '../../assets/Input/tick.svg';
import TickAll from '../../assets/Input/tick-all.svg';

const Input = props => {
  const { data, setData } = props;
  const [selectAll, setSelectAll] = useState(false);

  let img = Tick;
  if (selectAll) img = TickAll;

  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  });

  const selectAllClick = () => {
    const newData = data.map(item => {
      return { ...item, completed: !selectAll };
    });
    setData(newData);
    setSelectAll(!selectAll);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  const addItem = event => {
    if (event.keyCode === 13) {
      if (!event.target.value.trim()) {
        return;
      }

      const newItem = {
        title: event.target.value,
        completed: false,
        editMode: false
      };
      const newData = [newItem, ...data];
      setData(newData);
      localStorage.setItem('todoList', JSON.stringify(newData));
      event.target.value = '';
    }
  };

  return (
    <div className="Input">
      <img src={img}
        alt="tick"
        className="TickAll"
        title="Tick all"
        width="40px"
        height="40px"
        onClick={selectAllClick}
      />

      <input
        type="text"
        placeholder="Create a new item..."
        ref={inputElement}
        onKeyUp={event => addItem(event)}
      />
    </div>
  );
};

Input.propTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
};

export default Input;