import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Options.css';

const Options = props => {
  const { data, setData } = props;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(data.filter(item => item.completed === false).length);
  }, [data]);

  const deleteCompleted = () => {
    const currentData = JSON.parse(localStorage.getItem('todoList'));
    const newData = currentData.filter(item => item.completed === false);
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  return (
    <div className="Options">
      <div className="CountItem">
        {
          count === 1 ? `${count} task left` : count === 0 ?
            'Have a nice day!' : `${count} tasks left`
        }
      </div>
      {
        data.find(item => item.completed === true) &&
        <button className="Btn" onClick={deleteCompleted}>Delete Completed</button>
      }
    </div>
  );
};

Options.propsTypes = {
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
}

export default Options;