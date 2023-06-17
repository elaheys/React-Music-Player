import React from 'react';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

//style
import style from './ToggleList.module.css';

const ToggleList = ({displayListSong,setDisplayListSong}) => {
    return (
       <nav >
        <h1 className={style.toggleTitle}>Waves</h1>
        <button onClick={() => setDisplayListSong(!displayListSong)}>
            <span className={style.span}>Song List</span>
            <FontAwesomeIcon icon={faMusic}/>
        </button>
       </nav>
    );
};

export default ToggleList;