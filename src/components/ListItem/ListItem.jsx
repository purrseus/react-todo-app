import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';
import TickItem from '../../assets/tick-item.svg';
import TickCompleted from '../../assets/tick-completed.svg';
import Remove from '../../assets/remove.svg';
import Exit from '../../assets/exit.svg';

const ListItem = props => {
  const {
    item,
    index,
    tickItem,
    changeEditMode,
    editItem,
    removeItem
  } = props;

  let img = TickItem;
  if (item.completed) img = TickCompleted;

  const inputElement = useRef(null);
  useEffect(() => {
    if (item.editMode) {
      inputElement.current.focus();
    }
  }, [item.editMode]);

  return (
    <div className="Item">
      <img src={img}
        alt="tick"
        className="Tick"
        width="30px"
        height="30px"
        onClick={() => tickItem(item)}
      />

      {
        !item.editMode ?
          <div className="Content">
            <div
              className={
              item.completed ?
                "Title Completed" :
                "Title"
            }
              onClick={() => changeEditMode(item)}
            >{item.title}</div>

            <img src={Remove}
              alt="remove"
              className="Remove"
              width="16px"
              height="16px"
              onClick={() => removeItem(index)}
            />
          </div>
        :
          <div className="Content">
            <input
              className="Edit"
              type="text"
              placeholder="Edit item..."
              ref={inputElement}
              onKeyUp={event => editItem(event, index)}
            />

            <img src={Exit}
              alt="cancel"
              className="Cancel"
              width="20px"
              height="20px"
              onClick={() => changeEditMode(item)}
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
  tickItem: PropTypes.func.isRequired,
  changeEditMode: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default ListItem;