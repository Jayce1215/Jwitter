import React, { useEffect, useState } from "react";
import AppRouter from './Router';
import {authService} from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import mp3 from '/Users/jayce/Documents/web/jwitter/src/mp3/goosebumpss.mp3'


function App() {
  const [init, setInit] = useState(false);
  const [userObj,setUserObj] = useState(null);
  const [play,setPlay] = useState(false);
  const [audio,setAudio] = useState(new Audio(mp3))

  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args)=> user.updateProfile(args),   
        });
      } else { 
        setUserObj(null);
      }
      setInit(true);
    });
  },[]);


 
  const refreshUser = ()=>{
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args)=> user.updateProfile(args),   
    });
  }

 

  const onClick = () => {
    if(play){
      setPlay(false);
      audio.pause();
    }
    else{
      setPlay(true);
      audio.play();
    }
  }
  

  return (
    <>
      {init? ( 
        <AppRouter 
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser} />
        ) : (
          "Wait.." 
        )}
      <div className="control">
        <footer>
          <ul>
            <li>&copy; {new Date().getFullYear()} <span> Jwitter </span></li>
            {play? (
              <li className="pause" onClick={onClick}><FontAwesomeIcon icon={faPause} /></li> 
            ):( 
              <li className="play" onClick={onClick}><FontAwesomeIcon icon={faPlay} /></li> 
            )}
          </ul>
        </footer>   
  
      </div>
       
      


    </>
    
  );
}

export default App;
