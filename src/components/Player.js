import React,{useRef, useState,useEffect} from 'react';

//icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faPlay,faPause } from '@fortawesome/free-solid-svg-icons';

//style
import style from './Player.module.css';


const Player = ({setCurrentSong,currentSong,isPlaying,setIsPlaying,songs,setSongs}) => {

    const audioRef = useRef(null);
    
    const [songInfo,setSongInfo] = useState({
        currentTime:0,
        duration:0,
        animationPer:0
    })

    useEffect(() => {
        const newSongs = songs.map(item => {
            if(item.id === currentSong.id){
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
        justPlay()
    },[currentSong])

    const justPlay = () => {
        if(isPlaying ){
            audioRef.current.play();
            setIsPlaying(!isPlaying || isPlaying)
        }
    }
            
    const nextPlay = () =>{
        if(!isPlaying ){
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }   
    
    const playSong = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }

    const updateTime = (event) =>{
        const currentTime = event.target.currentTime
        const duration = event.target.duration
        //calculatePer
        const roundCurrent = Math.round(currentTime);
        const roundDuration = Math.round(duration);
        const animationPer = Math.round((roundCurrent / roundDuration) * 100);
            if(currentTime === duration){
                const currentIndex = songs.findIndex(item => item.id === currentSong.id);
            if(currentIndex === songs.length - 1){
                setCurrentSong(songs[0])
            }else{
               setCurrentSong(songs[currentIndex + 1]) 
            }
            justPlay()
        }
            
        setSongInfo({...songInfo,currentTime,duration,animationPer})
           
    }

    const timeFormat = (time) =>{
       return(
            Math.floor(time / 60) + ':' + ('0'+ Math.floor(time % 60)).slice(-2) 
        ) 
    }

    const targetHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({...songInfo,
            currentTime:event.target.value
        });
    }

   

    const skipSong = (dir) => {
        const currentIndex = songs.findIndex(item => item.id === currentSong.id);
        if(dir === 'next'){
            if(currentIndex === songs.length - 1){
                setCurrentSong(songs[0])
            }else{
               setCurrentSong(songs[currentIndex + 1]) 
            
            }
            
        }

        if(dir === 'back'){
            if(currentIndex === 0){
                setCurrentSong(songs[songs.length - 1])
            }else{
               setCurrentSong(songs[currentIndex - 1]) 
            } 
        }nextPlay()
     
    }

    //add the style
    const trackAnimate = {
        transform:`translateX(${songInfo.animationPer}%)`
    };
   
    return (
        <div className={style.player}>
            <div className={style.timeControl}>
               <p >{timeFormat(songInfo.currentTime)}</p>
               <div style={{background:`linear-gradient(to right,${currentSong.color[1]},${currentSong.color[0]})`,}}
               className={style.track}>
                 <input 
                min={0} 
                max={songInfo.duration || 0}
                onChange={targetHandler}
                value={songInfo.currentTime}
                type='range'/>
                <div style={trackAnimate} className={style.animateTrack}></div>
               </div>
               
                <p>{timeFormat(songInfo.duration)}</p> 
            </div>
            <div className={style.playControl}>
                < FontAwesomeIcon onClick={() => skipSong('back')} className={style.skipBack} icon={faAngleLeft} size='5x'/>
                < FontAwesomeIcon onClick={playSong} className={style.play} icon={isPlaying  ? faPause : faPlay} size='5x'/>
                < FontAwesomeIcon onClick={() => skipSong('next')} className={style.skipForward} icon={faAngleRight } size='5x' />
            </div>
            <audio 
            onLoadedMetadata={updateTime} 
            onTimeUpdate={updateTime} 
            ref={audioRef} 
            src={currentSong.audio}
            />
        </div>
    );
};

export default Player;