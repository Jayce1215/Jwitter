import React, { useEffect , useState } from "react";
import { dbService} from "../fBase";
import Jweet from "../components/Jweet";
import JweetFactory from "../components/JweetFactory";

const Home = ({userObj})=> {
    const [jweets,setJweets] = useState([]);
  

    useEffect(()=>{
        dbService.collection("Jwitter").orderBy("time","desc")
        .onSnapshot((snapshot)=>{
            const jweetArray = snapshot.docs.map((doc)=>(
                {id : doc.id,
                ...doc.data(),
                }
            ));
            setJweets(jweetArray);
        });
    },[]);

    
    return (
        <div className="container">
            <JweetFactory userObj={userObj}/>

            <div style={{marginTop: 120}}> 
                {jweets.map((jweet)=>(
                   <Jweet 
                        key={jweet.id}
                        jweetObj={jweet}
                        isOwner={jweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
           
        </div>
        
    );
};
export default Home;

