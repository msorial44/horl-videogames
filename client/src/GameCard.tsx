import { Button, Input } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';

function GameCard(props: any) {
    const [name, setName] = useState('');
    const [platform, setPlatform] = useState('');
    const [score, setScore] = useState(0);
    const [rdate, setRdate] = useState('');
    const [refresh, setRefresh] = useState(props.refresh);
    const [showHOL, setShowHOL] = useState(true);

    if(refresh) {
        setRefresh(false);
        axios.get('/api/getGame').then((res) => {
            console.log(res.data);
            props.refreshCallback();
            setName(res.data.name);
            setPlatform(res.data.platform);
            setScore(res.data.score);
            setRdate(res.data.rdate);
        });
    }

    function setHOL() {
        setShowHOL(false)
    }

    return (
        <div className='game-card'>
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
                    <Button type="default" className ='higher-button' onClick={() => setHOL()}>
                        Higher
                    </Button>
                </div>
                <div>
                    <Button type="default" className ='lower-button' onClick={() => setHOL()}>
                        Lower
                    </Button>
                </div>
            </div>
        </div>
       

    );
}

export default GameCard;