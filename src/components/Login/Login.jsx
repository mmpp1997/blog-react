import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
import {server} from "../../App"

function Login(props) {
    const [login, setlogin] = useState(false);
    const [regForm, setRegForm] = useState(false);
    const [action, setAction] = useState("Login");
    const [user, setUser] = useState({});
    const [error, setError]=useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Object.keys(user).length > 0) {
                    var response;
                    if (regForm) {
                        response = await axios.post(server+"/register", user, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                    else if (!regForm) {
                        response = await axios.post(server+"/login", user, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                    if (response.data.message === "Success") {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        setError("");
                        setlogin(true);
                    }
                    else if(response.data.message !== ""){
                        setError(response.data.message);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [user,regForm,props]);



    function handleReg() {
        setRegForm(!regForm);
        if (regForm) {
            setAction("Login");
        }
        else {
            setAction("Register");
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        var newUser = { username: username, password: password };
        if (regForm) {
            const nickname = event.target.nickname.value;
            const location = event.target.location.value;
            newUser = { ...newUser, nickname: nickname, location: location };
        }
        setUser(newUser);
        event.target.reset();
    }

    const google = () => {
        window.open("http://localhost:3001/auth/google", "_self");
    };
    
    return (
        <div className="main">
            <form name="login" className="form" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="username" className="input" type="text" title="Enter your email" placeholder="Email" required />
                    </div>
                    <div>
                        <input name="password" className="input" type="password" title="Enter your password" placeholder="Password" required />
                    </div>
                    <div style={{ display: regForm ? "inline" : "none" }}>
                        <input name="nickname" className="input" type="text" title="Enter your nickname" placeholder="Nickname" required={regForm} />
                    </div>
                    <div style={{ display: regForm ? "inline" : "none" }}>
                        <input name="location" className="input" type="text" title="Enter your hometown" placeholder="Hometown" required={regForm} />
                    </div>
                    <div>
                        <p className="error">{error}</p>
                    </div>
                    <div>
                        <p className="prompt">{regForm ? "Already" : "Not"} a user? <input onClick={handleReg} type="button" value={regForm ? "Login" : "Register"} /></p>
                    </div>
                    <div>
                        <input className="btn" type="submit" value={action} />
                        <input className="btn google" type="button" onClick={google} value={action + " with Google"} />
                    </div>
                </div>
            </form>
            {login && (<Navigate to="/blog" replace={true} />)}
        </div>
    );
}

export default Login;