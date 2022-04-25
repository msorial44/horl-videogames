import { Button } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';

function GameCard(props: any) {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');
    const [score, setScore] = useState(0);
    const [rdate, setRdate] = useState('');
    const [img, setImg] = useState('');
    const [refresh, setRefresh] = useState(props.refresh);
    const [showHOL, setShowHOL] = useState(true);
    const [pos, setPos] = useState(props.cardPos);

    if (props.cardPos !== pos) {
        setPos(props.cardPos);
        if (props.cardPos === 2) {
            setRefresh(true);
            setTimeout(() => {
                setShowHOL(true);
            }, 1000);
            
        }
    }

    if (showHOL && props.cardPos === 0) {
        setShowHOL(false);
    }

    if(refresh && props.cardPos === 2) {
        setTimeout(() => {
            setRefresh(false);
            axios.get('/server/api/getGame').then((res) => { //digital ocean server
            //axios.get('/api/getGame').then((res) => { //local server
                console.log(res.data);
                props.refreshCallback();
                setName(res.data.name);
                setPlatform(res.data.platform);
                setScore(res.data.score);
                setRdate(res.data.rdate);
                if (res.data.image[0] === '/') {
                    setImg("https:" +  res.data.image);
                    console.log("https:" +  res.data.image)
                } else {
                    setImg(res.data.image)
                }
                props.scoreCallback(res.data.score);
            });
        }, 750);
    }

    if(refresh && props.cardPos !== 2) {
        setRefresh(false);
        axios.get('/server/api/getGame').then((res) => { //digital ocean server
        //axios.get('/api/getGame').then((res) => { //local server
            console.log(res.data);
            props.refreshCallback();
            setName(res.data.name);
            setPlatform(res.data.platform);
            setScore(res.data.score);
            setRdate(res.data.rdate);
            if (res.data.image[0] === '/') {
                setImg("https:" +  res.data.image);
                console.log("https:" +  res.data.image)
            } else {
                setImg(res.data.image)
            }
            props.scoreCallback(res.data.score);
        });
    }

    function setHOL(guess: string) {
        setShowHOL(false)
        setPos(0);
        props.cardCallback(0);
        props.guessCallback(guess)
    }

    return (
        <div className={`game-card ${pos === 1 ? 'game-card-center ' : ''} ${pos === 0 ? 'game-card-left' : ''} ${pos === 2 ? 'game-card-right' : ''}`}>
            <div className="game-img">
                <img src={img} alt="game-img" />
            </div>
            <div className='game-title'>
                {name + " (" + String(rdate.split(',')[1]).trim() + ")"}
            </div>
            <div className='platform'>
                {platform}
            </div>
            <div className={`meta-score ${showHOL ? '' : 'meta-score-toggled'}`}>
                {score}
                <div className='score-subtitle'>
                    Metacritic Rating
                </div>
            </div>
            <div className={`hol-buttons ${showHOL ? 'hol-buttons-toggled' : ''}`}>
                <div>
                    <Button type="default" className ='higher-button' onClick={() => setHOL('higher')}>
                        Higher
                    </Button>
                </div>
                <div>
                    <Button type="default" className ='lower-button' onClick={() => setHOL('lower')}>
                        Lower
                    </Button>
                </div>
            </div>
        </div>
       

    );
}

export default GameCard;