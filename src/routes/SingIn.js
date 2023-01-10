import React, {useState}  from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../fBase";


const SignIn = ({refreshUser}) => {
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [error,setError] = useState("");
    const [userName,setUserName] = useState();
    const navigate = useNavigate();
    const onChange = (event)=>{
        const {target : {name,value}}= event;
        if(name==="email"){
            setEmail(value);
        }
        else if (name==="password"){
            setPassword(value);
        }
        else if (name==="userName") {
            setUserName(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                ).then((result)=> 
                result.user.updateProfile({
                    displayName:userName
                }))
            await refreshUser();
            }
        catch (error) {
            setError(error.message);
        } 
        navigate("/"); 
    };
     

    return(
      <div className="test">
          <div>
              <form onSubmit={onSubmit} className="testForm">
                <div>
                    ID (Email)
                </div>
                <input className="id" name="email" type="email" value={email} onChange={onChange} required />
                <div>
                    Password
                </div>
                <input className="pw" name="password" type="password" value={password} onChange={onChange} required />
                <div>
                    Username
                </div>
                <input className="name" name="userName" type="text" value={userName} onChange={onChange} required />
                <div className="testError">
                    {error}
                </div>
                <div>
                    <input className="signInBtn" type="submit" value="Welcome !"/>
                </div>
              </form>
                
          </div>
      </div>  
    )

}

export default SignIn;