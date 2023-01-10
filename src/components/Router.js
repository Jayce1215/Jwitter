import React from "react";
import {HashRouter as Router, Route, Routes} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";
import SignIn from "../routes/SingIn";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div style={{marginTop: 75}}>
                <Routes>
                    {isLoggedIn ? (
                        <> 
                            <Route path="/" element={<Home userObj={userObj}/>}/>                
                            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/>
                        </>
                    ) : ( 
                        <>  
                            <Route path="/" element={<Auth />}/>
                            <Route path="/signIn" element={<SignIn isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}/>}/>
                        </> 
                    )};   
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;
