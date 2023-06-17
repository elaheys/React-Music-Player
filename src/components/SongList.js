import React from 'react';

//style
import style from './SongList.module.css';

//components
import SongListItems from './SongListItems';

const SongList = ({songs,setCurrentSong,setSongs,isPlaying,setIsPlaying,displayListSong}) => {
    return (
        <div className={`${style.songList} ${displayListSong ? '' : style.displayList}`}>
            <h2 className={style.title}>List Of Songs</h2>
            <div className={style.songListItems}>
                {
                    songs.map(song => <SongListItems 
                        song={song}
                        key={song.id}
                        setCurrentSong={setCurrentSong}
                        songs={songs}
                        setSongs={setSongs}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        />)
                }
            </div>
        </div>
    );
};

export default SongList;