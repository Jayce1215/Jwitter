import {React,useState, useRef} from "react";
import { storageService } from "../fBase";
import { dbService } from "../fBase";
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";



const JweetFactory = ({userObj})=>{
    const [attachment, setAttachment] = useState("");
    const [jweet,setJweet] = useState("");
    const onSubmit = async (event)=>{
        if (jweet ===""){
            return;
        }
        event.preventDefault();
        let attachmentUrl="";
        if (attachment!==""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, 'data_url');
            attachmentUrl = await response.ref.getDownloadURL();
        }
     
        const jweetObj = {
                text : jweet,
                time : new Date(),
                creatorId : userObj.uid,
                userName : userObj.displayName,
                attachmentUrl,
        };
        
        await dbService.collection("Jwitter").add(jweetObj);
        setJweet("");
        setAttachment("");
    };

    const onChange = (event) =>{
        const{
            target:{value},
        } = event;
        setJweet(value);
    };   
    const onFileChange = (event)=>{
        const {
            target:{files},
        }  = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent)=>{
            const {
                currentTarget : {result},
            } = finishedEvent;
            setAttachment(result)
        };
        reader.readAsDataURL(theFile);  
    };
    const fileInput = useRef();
    const onClickClear = ()=>{
        setAttachment("");
        fileInput.current.value = null;
    }


    return (

        <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput_container">
                    <input type="text" placeholder="What's on your mind?" onChange={onChange} value={jweet} maxLength={120} className="factoryInput_input"/>
                    <input type="submit" value="&rarr;" className="factoryInput_arrow" /> 
                </div>
                <label htmlFor="attach-file" className="factoryInput_label">
                    <span>Jweet with Photos</span>
                    <span className="plus"><FontAwesomeIcon icon={faPlus}/></span>
                </label>   d
                <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0,}} />
                {attachment && (
                    <div className="factoryForm_attachment">
                        <img src={attachment} style={{backgroundImage: attachment}}/>
                        <div className="factoryForm_clear" onClick={onClickClear}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTrash}/>
                        </div>
                    </div>
                )}
        </form>
    )
}

export default JweetFactory;