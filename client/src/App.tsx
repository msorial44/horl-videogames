import { Button, Row, Col } from 'antd';
import React, { useState } from 'react';
import 'animate.css';
import GameCard from './GameCard';
import logo from './logo.svg';
import FlipMove from 'react-flip-move';
import './App.scss';




function App() {
  const [refresh1, setRefresh1] = useState(true);
  const [refresh2, setRefresh2] = useState(true);
  const [refresh3, setRefresh3] = useState(true);

  const [card1Pos, setCard1Pos] = useState(0);
  const [card2Pos, setCard2Pos] = useState(1);
  const [card3Pos, setCard3Pos] = useState(2);

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);

  const [score, setScore] = useState(0);


  function posCallback1(num: number) {
      setCard1Pos(num);
      if (num === 0) {
        setCard2Pos(1)
        setCard3Pos(2)
      }
      if (num === 1) {
        setCard2Pos(2)
        setCard3Pos(0)
      }
      if (num === 2) {
        setCard2Pos(0)
        setCard3Pos(1)
      }
  }

  function posCallback2(num: number) {
    setCard2Pos(num);
    if (num === 0) {
      setCard3Pos(1)
      setCard1Pos(2)
    }
    if (num === 1) {
      setCard3Pos(2)
      setCard1Pos(0)
    }
    if (num === 2) {
      setCard3Pos(0)
      setCard1Pos(1)
    }
  }

  function posCallback3(num: number) {
    setCard3Pos(num);
    if (num === 0) {
      setCard1Pos(1)
      setCard2Pos(2)
    }
    if (num === 1) {
      setCard1Pos(2)
      setCard2Pos(0)
    }
    if (num === 2) {
      setCard1Pos(0)
      setCard2Pos(1)
    }

  }

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


  function scoreCallback1(num: number) {
    setScore1(num);
  }

  function scoreCallback2(num: number) {
    setScore2(num);
  }

  function scoreCallback3(num: number) {
    setScore3(num);
  }

  let content = ["card1", "card2", "card3"];
  let duration = 1000;

  function slide() {
    let cards = document.getElementsByClassName("game-card")!;

    for (let i = 0; i < cards.length; i++) {
      let card: any = cards.item(i);
      content[i] = card.innerHTML;
      card.animate([{ transform: "translate(-50vw)" }], { duration: duration, fill: "both" });
      
      setTimeout(() => {
        card.remove();
        
        let newCard = document.createElement("GameCard"), classes = ["game-card-left", "game-card-center", "game-card-right"];
        newCard.classList.add("game-card");
        newCard.classList.add(classes[i])
        newCard.innerHTML = content[i];
        document.getElementsByClassName("card-container")[0].appendChild(newCard);
      }, duration);
    }

    content.push(content.shift()!);
    //then, change html string at index 2 to the next game's gameCard html
    setCard1Pos(0);
  }

  function checkGuess(guess: string) {
    setTimeout(slide, 500);
    if (guess === "higher") {
      
      if (card1Pos === 1) {
        if ( score1 >= score3 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card2Pos === 1) {
        if ( score2 >= score1 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card3Pos === 1) {
        if ( score3 >= score2 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
    }
    if (guess === "lower") {
      if (card1Pos === 1) {
        if ( score1 <= score3 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card2Pos === 1) {
        if ( score2 <= score1 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card3Pos === 1) {
        if ( score3 <= score2 ) {
          setScore(score + 1);
        } else {
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
    }
  }

  return (
    <div className="App">
      {score}
      <div className='card-container'>
          <GameCard refresh={refresh1} refreshCallback={refreshCard1} cardPos={card1Pos} cardCallback={posCallback1} scoreCallback={scoreCallback1} guessCallback={checkGuess}/>
          <GameCard refresh={refresh2} refreshCallback={refreshCard2} cardPos={card2Pos} cardCallback={posCallback2} scoreCallback={scoreCallback2} guessCallback={checkGuess}/>
          <GameCard refresh={refresh3} refreshCallback={refreshCard3} cardPos={card3Pos} cardCallback={posCallback3} scoreCallback={scoreCallback3} guessCallback={checkGuess}/>
      </div>
    </div>
  );
}

export default App;
