import React from 'react';

//style
import style from './Song.module.css';

const Song = ({currentSong}) => {
    return (
        <div className={style.songContainer}>
            <img src={currentSong.cover} alt='cover'/>
            <h2>{currentSong.name}</h2>
            <h4>{currentSong.artist}</h4>
        </div>
    );
};

export default Song;