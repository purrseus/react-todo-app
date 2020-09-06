import React, { useState, useEffect } from 'react';

import './App.css';
import Input from './components/Input/Input';
import ListItem from './components/ListItem/ListItem';

function App() {
  !localStorage.getItem('todoList') && localStorage.setItem('todoList', '[]');

  const [data, setData] = useState(JSON.parse(localStorage.getItem('todoList')));
  const [selectAll, setSelectAll] = useState(false);
  const [count, setCount] = useState(data.filter(item => item.completed === false).length);

  useEffect(() => {
    setCount(data.filter(item => item.completed === false).length);
  }, [data]);

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

      const newItem = { title: event.target.value, completed: false };
      data.push(newItem);
      const newData = [...data];
      setData(newData);
      localStorage.setItem('todoList', JSON.stringify(newData));
      event.target.value = '';
    }
  };

  const tickItem = item => {
    item.completed = !item.completed;
    const newData = [...data];
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  const removeItem = index => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    localStorage.setItem('todoList', JSON.stringify(newData));
  };

  return (
    <div className="App">
      <h1>- Todo List -</h1>
      <Input
        selectAll={selectAll}
        selectAllClick={selectAllClick}
        addItem={addItem}
      />

      <div className="ListItem">
        {
          !data.length ?
            <h3>Nothing here!</h3> :
            data.map((item, index) => <ListItem
              key={index}
              item={item}
              index={index}
              tickItem={tickItem}
              removeItem={removeItem}
            />)
        }
      </div>

      <div className="CountItem">
        {
          count === 1 ?
            `${count} item left`
            : count === 0 ?
              'Have a nice day!' :
              `${count} items left`
        }
      </div>
    </div>
  );
}

export default App;
