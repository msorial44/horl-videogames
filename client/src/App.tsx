import { Button, Input } from 'antd';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';



function App() {
  const [data, setData] = useState("");

  const getGame = async () => {
    axios.get('/api/getGame').then((res) => {
      console.log(res);
      setData(res.data.name)
    });
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data}
        </p>
        <Button className="auth-primary-btn" type="primary" onClick={() => getGame()} >
          get score
        </Button>
      </header>
    </div>
  );
}

export default App;
