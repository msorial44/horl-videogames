import { Button, Row, Col } from 'antd';
import React, { useState } from 'react';
import GameCard from './GameCard';
import logo from './logo.svg';
import './App.scss';




function App() {
  const [refresh1, setRefresh1] = useState(true);
  const [refresh2, setRefresh2] = useState(true);
  const [refresh3, setRefresh3] = useState(false);

  function refreshCard1() {
    console.log("refreshed card 1");
    setRefresh1(false);
  }

  function refreshCard2() {
    console.log("refreshed card 2");
    setRefresh2(false);
  }

  function refreshCard3() {
    console.log("refreshed card 3");
    setRefresh3(false);
  }


  return (
    <div className="App">
      <div>
        <Row>
          <Col span={10} offset={1}>
            <GameCard refresh={refresh1} refreshCallback={refreshCard1}/>
          </Col>
          <Col span={10} offset={1}>
            <GameCard refresh={refresh2} refreshCallback={refreshCard2}/>
          </Col>
        </Row>
      </div>
      
        
      
    </div>
  );
}

export default App;
