import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';
import TickItem from '../../assets/tick-item.svg';
import TickCompleted from '../../assets/tick-completed.svg';
import Remove from '../../assets/remove.svg';


const ListItem = props => {
  const {
    item,
    index,
    tickItem,
    removeItem
  } = props;

  let img = TickItem;
  if (item.completed) img = TickCompleted;

  return (
    <div className="Item">
      <img src={img}
        alt="tick"
        className="Tick"
        width="30px"
        height="30px"
        onClick={() => tickItem(item)}
      />

      <div className={
        item.completed ?
          "Title Completed" :
          "Title"
      }>{item.title}</div>

      <img src={Remove}
        alt="remove"
        className="Remove"
        width="16px"
        height="16px"
        onClick={() => removeItem(index)}
      />
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
  removeItem: PropTypes.func.isRequired
};

export default ListItem;