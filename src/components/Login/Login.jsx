import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

function Login(props) {
    const [regForm, setRegForm] = useState(false);
    const [action, setAction] = useState("Login");
    const [user, setUser] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setSuccess(false);
        const fetchData = async () => {
            try {
                if (Object.keys(user).length > 0) {
                    var response;
                    if (regForm) {
                        response = await axios.post('http://localhost:3001/register', user, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                    else if (!regForm) {
                        response = await axios.post('http://localhost:3001/login', user, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                    }
                    if (response.data.message === "Success") {
                        const token = response.data.token;
                        localStorage.setItem('token', token);
                        setSuccess(true);
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
                        <p className="prompt">{regForm ? "Already" : "Not"} a user? <input onClick={handleReg} type="button" value={regForm ? "Login" : "Register"} /></p>
                    </div>
                    <div>
                        <input className="btn" type="submit" value={action} />
                        <a href="/blog"><input className="btn google" type="button" value={action + " with Google"} /></a>
                    </div>
                </div>
            </form>
            {success && (<Navigate to="/blog" replace={true} />)}
        </div>
    );
}

export default Login;