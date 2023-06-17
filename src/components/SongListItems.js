import React from 'react';

//style
import style from './SongListItems.module.css';

const SongListItems = ({song,setCurrentSong,songs,setSongs,isPlaying,setIsPlaying}) => {


    const selectItem = () => {
        const newSelectedItem = songs.filter(item => item.id === song.id);
        setCurrentSong(newSelectedItem[0]);
        setIsPlaying(!isPlaying || isPlaying);
          

        const newSongs = songs.map(item => {
            if(item.id === song.id){
                return{
                    ...item,
                    active:true
                }
            } else {
                return{
                    ...item,
                    active:false
                }
            }           
        })
        setSongs(newSongs)
        
    }

    return (
        <div  onClick={selectItem} className={`${style.songItem} ${song.active ? style.selected : ''} `}>
            <img src={song.cover} alt='cover'/>
            <div className={style.songDescription}>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>
    );
};

export default SongListItems;