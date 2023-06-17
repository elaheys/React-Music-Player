import React,{useState} from 'react';
import style from './App.module.css';

//components
import Song from './components/Song';
import Player from './components/Player';
import {musicData} from './Data';
import SongList from './components/SongList';
import ToggleList from './components/ToggleList';

function App() {

  const [songs,setSongs] = useState(musicData());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
  const [displayListSong,setDisplayListSong] = useState(false);

  // console.log(currentSong)
  return (
    <div  style={{background:`linear-gradient(30deg,${currentSong.color[0]} 40%,${currentSong.color[1]} 100%)`,}}
    className={`${style.App} ${displayListSong ? style.activeList : ''}`}>
      <ToggleList displayListSong={displayListSong} setDisplayListSong={setDisplayListSong}/>
      <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} songs={songs} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <SongList songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} 
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      displayListSong={displayListSong}
      />
    </div>
  );
}

export default App;
