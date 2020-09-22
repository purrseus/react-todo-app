import React, { useState } from 'react';

import './App.css';
import Input from './components/Input/Input';
import ListItem from './components/ListItem/ListItem';
import Options from './components/Options/Options';

function App() {
  !localStorage.getItem('todoList') && localStorage.setItem('todoList', '[]');

  const [data, setData] = useState(JSON.parse(localStorage.getItem('todoList')));

  return (
    <div className="App">
      <h1>Todo List</h1>
      <Input data={data} setData={setData} />
      {
        !data.length
          ? <h3>Nothing here!</h3>
          : data.map((item, index) => <ListItem
              key={index}
              item={item}
              index={index}
              data={data}
              setData={setData}
            />)
      }
      <Options data={data} setData={setData} />
    </div>
  );
}

export default App;