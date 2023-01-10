import React from "react";
import { useState } from "react";
import { authService } from "../fBase";
import { useNavigate } from "react-router-dom";

const AuthForm = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error,setError] = useState("");

    const onChange = (event)=>{
        const {target : {name,value}}= event;
        if(name==="email"){
            setEmail(value);
        }
        else if (name==="password"){
            setPassword(value);
        }
    };
    
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            }
            else {
                data = await authService.signInWithEmailAndPassword(
                    email, password
                );
            }
        } catch (error) {
            setError(error.message);
        } 
    };
    
    const toggleAccount = ()=> setNewAccount(false);
    const navigate = useNavigate();

    const onCreatAccount = () => { 
        navigate("/signIn");
    }
    return(
        <div className="authForm">
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
                {error && <span className="authError">{error}</span>}
            </form>
            
            <span onClick={onCreatAccount}> 
                <input type="submit" value="Create Account" className="authBtns authSignIn" />
            </span>
            <span>
                <form onSubmit={onSubmit} className="authBtns authLogIn">
                        <input type="submit" value="Log In" onClick={toggleAccount}/>
                </form>
            </span>
        </div>
    )
}

export default AuthForm;