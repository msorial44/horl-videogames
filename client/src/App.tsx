import React, { useState } from 'react';
import GameCard from './GameCard';
import { useCookies } from 'react-cookie';
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
  const [cookies, setCookie] = useCookies(['highscore']);
  const [highScore, setHighScore] = useState(cookies.highscore);

  if (cookies.highscore === undefined || cookies.highscore === null || cookies.highscore === 'undefined' || !cookies.highscore) {
    setCookie('highscore', 0, { path: '/', sameSite: 'strict' });
    setHighScore(0);
    window.location.reload();
  }

  if (highScore !== cookies.highscore) {
    setCookie('highscore', highScore, { path: '/', sameSite: 'strict' });
  }


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

  function checkGuess(guess: string) {
    if (guess === "higher") {
      if (card1Pos === 1) {
        if ( score1 >= score3 ) {
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card2Pos === 1) {
        if ( score2 >= score1 ) {
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card3Pos === 1) {
        if ( score3 >= score2 ) {
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
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
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card2Pos === 1) {
        if ( score2 <= score1 ) {
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
      if (card3Pos === 1) {
        if ( score3 <= score2 ) {
          if ((score + 1) > highScore) {
            setHighScore(score + 1);
          }
          setScore(score + 1);
        } else {
          if (score > highScore) {
            setHighScore(score);
          }
          setScore(0);
          setRefresh1(true);
          setRefresh2(true);
          setRefresh3(true);
        }
      }
    }
    setCookie('highscore', highScore, { path: '/', sameSite: 'strict' });
  }


  return (
    <div className="App">
      <div className='card-container'>
          <GameCard refresh={refresh1} refreshCallback={refreshCard1} cardPos={card1Pos} cardCallback={posCallback1} scoreCallback={scoreCallback1} guessCallback={checkGuess}/>
          <div className='score-container'>
            <div>Score: {score} </div>
            <div>High Score: {highScore}</div>
          </div>
          <div className='score-divider'></div>
          <GameCard refresh={refresh2} refreshCallback={refreshCard2} cardPos={card2Pos} cardCallback={posCallback2} scoreCallback={scoreCallback2} guessCallback={checkGuess}/>
          <GameCard refresh={refresh3} refreshCallback={refreshCard3} cardPos={card3Pos} cardCallback={posCallback3} scoreCallback={scoreCallback3} guessCallback={checkGuess}/>
      </div>
    </div>
  );
}

export default App;
