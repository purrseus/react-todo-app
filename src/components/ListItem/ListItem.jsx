import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';
import Edit from '../../assets/Item/edit.svg';
import Exit from '../../assets/Item/exit.svg';
import Remove from '../../assets/Item/remove.svg';
import TickCompleted from '../../assets/Item/tick-completed.svg';
import TickItem from '../../assets/Item/tick-item.svg';

const ListItem = props => {
  const {
    item,
    index,
    data,
    setData
  } = props;

  const [value, setValue] = useState('');

  let img = TickItem;
  if (item.completed) img = TickCompleted;

  const inputElement = useRef(null);
  useEffect(() => {
    if (item.editMode) {
      inputElement.current.focus();
    }
  }, [item.editMode]);

  const tickItem = () => {
    item.completed = !item.completed;
    const newData = [...data];
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  const changeEditMode = () => {
    item.editMode = !item.editMode;
    setValue(item.title);
    const newData = [...data];
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  const editItem = event => {
    if (value) {
      event.target.value = value;
      setValue('');
    }
    if (event.keyCode === 13) {
      if (!event.target.value.trim()) {
        return;
      }

      data[index].title = event.target.value;
      const newData = [...data];
      setData(newData);
      localStorage.setItem('todoList', JSON.stringify(newData));
      changeEditMode(data[index]);
    }
  };

  const removeItem = () => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  return (
    <div className="Item">
      <img src={img}
        alt="tick"
        className="Tick"
        title="Tick"
        width="30px"
        height="30px"
        onClick={tickItem}
      />

      {
        !item.editMode
          ? <div className="Content">
              <div
                className={
                  item.completed ?
                    "Title Completed" :
                    "Title"
                }
              >{item.title}</div>

              <img
                src={Edit}
                alt="edit"
                className="EditBtn"
                title="Edit"
                width="20px"
                height="20px"
                onClick={changeEditMode}
              />

              <img src={Remove}
                alt="remove"
                className="Remove"
                title="Remove"
                width="16px"
                height="16px"
                onClick={removeItem}
              />
            </div>

          : <div className="Content">
              <input
                className="Edit"
                type="text"
                placeholder="Edit item..."
                ref={inputElement}
                onKeyUp={event => editItem(event)}
              />

              <img src={Exit}
                alt="cancel"
                className="Cancel"
                title="Cancel"
                width="20px"
                height="20px"
                onClick={changeEditMode}
              />
            </div>
      }
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }),
  index: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
};

export default ListItem;