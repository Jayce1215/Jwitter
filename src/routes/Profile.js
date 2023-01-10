import React, {useEffect, useState} from "react";
import { authService, dbService } from "../fBase";
import { useNavigate } from "react-router-dom";


const Profile = ({userObj, refreshUser})=>{
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName]  = useState(userObj.displayName);
    const onLogOutClick = ()=>{
        authService.signOut();
        navigate("/");
    }
    const [profileJweets,setProfileJweets] = useState([]);
    const getMyJweets = async ()=>{
        const test = await dbService
        .collection("Jwitter")
        .where("creatorId","==",userObj.uid)
        .orderBy("time")
        .get();
        const test2 = test.docs.map((doc)=>(doc.data()))
        setProfileJweets(test2)
    }
    const onChange = (event)=>{
        const {
            target:{value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) =>{
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName : newDisplayName,
            });
        }
        setNewDisplayName("");
        refreshUser();
    };
    useEffect(()=>{
        getMyJweets();
    },[])
    
    return (
        
            <div>
                <form onSubmit={onSubmit}>
                    <input 
                        onChange={onChange}
                        type="text"
                        placeholder="Display Name"
                        value = {newDisplayName}
                        autoFocus
                        className="ProfileInput"
                        />
                    <input 
                        type="submit" 
                        value="Update Name"
                        className="updateBtn"
                        style={{margineTop : 10,}} />
                    <div className="line"></div>
                    <div className="logOutBtn" onClick={onLogOutClick} >
                        Log out
                    </div>
                </form>

                <div className="ProfileJweets">
                    <h1>My Jweets</h1>
                    <ul className="myJweets">
                        {profileJweets.map((Jweet)=>(
                        <li key={Jweet.time}>
                         {Jweet.text}
                        </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
};
export default Profile;
