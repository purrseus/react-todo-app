import React from 'react';
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
        width="40px"
        height="40px"
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
        width="20px"
        height="20px"
        onClick={() => removeItem(index)}
      />
    </div>
  );
};

export default ListItem;