import React, { useState } from "react";
import { dbService, storageService } from "../fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";


const Jweet = ({jweetObj, isOwner})=>{
    const [editing, setEditing] = useState(false);
    const [newJweet,setNewJweet] = useState(jweetObj.text);
    const onDeleteClick = async ()=>{
        const ok = window.confirm("Are you sure?")  
        if (ok){
           await dbService.doc(`Jwitter/${jweetObj.id}`).delete();
           await storageService.refFromURL(jweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = ()=>{setEditing((prev)=>!prev)};
    const onSubmit = async (event)=>{
        event.preventDefault();
        await dbService.doc(`Jwitter/${jweetObj.id}`).update({
            text:newJweet,
        })
        setEditing(false);
    };
    const onChange = (event)=>{
        const {target:{value},
        } = event;
        setNewJweet(value)
    };
    
    const datetime = new Date(jweetObj.time.seconds * 1000 + jweetObj.time.nanoseconds / 1000000)
    return (
        <div className="jweet">
            {editing ? (
            <>
                <form onSubmit={onSubmit} className="container jweetEdit">
                    <input onChange={onChange} type="text" value={newJweet} required autoFocus className="formInput"/>
                    <div className="formBtn">
                        <input type="submit" value="Edit" className="formBtn editBtn"/>
                        <div onClick={toggleEditing} className="formBtn cancelBtn">
                            Cancel
                        </div>
                    </div>
                    
                </form>
               
            </>
            ) : (
            <>  
                <h4 style={{maxWidth:400}}>{jweetObj.text}</h4>
                <div className="userName">
                    {jweetObj.userName}
                </div>
                <div className="time">
                    {datetime.toLocaleString()}
                </div>

                {isOwner &&  (
                    <div className="jweet_actions">
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} className="jweet_edit"/>
                        </span>
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} className="jweet_cancel"/>
                        </span>
                    </div>
                )}
                {jweetObj.attachmentUrl && (
                    <img src={jweetObj.attachmentUrl} />
                   )}
            </>
            )}    
        </div>
    );
};
    

export default Jweet;