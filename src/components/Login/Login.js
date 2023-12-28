import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";
function Login() {
    const [regForm, setRegForm] = useState(false);
    const [action, setAction] = useState("Login");
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (Object.keys(user).length > 0) {
                    const response = await axios.post('http://localhost:3001/user', user, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log(response.data); // Access the data property of the response object
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [user]);



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
        const email = event.target.email.value;
        const password = event.target.password.value;
        var newUser = { email: email, password: password };
        if (regForm) {
            const nickname = event.target.nickname.value;
            const hometown = event.target.hometown.value;
            newUser = { ...newUser, nickname: nickname, hometown: hometown };
        }
        setUser(newUser);
        event.target.reset();
    }
    return (
        <div className="main">
            <form name="login" className="form" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input name="email" className="input" type="text" title="Enter your email" placeholder="Email" required />
                    </div>
                    <div>
                        <input name="password" className="input" type="password" title="Enter your password" placeholder="Password" required />
                    </div>
                    <div style={{ display: regForm ? "inline" : "none" }}>
                        <input name="nickname" className="input" type="text" title="Enter your nickname" placeholder="Nickname" required={regForm} />
                    </div>
                    <div style={{ display: regForm ? "inline" : "none" }}>
                        <input name="hometown" className="input" type="text" title="Enter your hometown" placeholder="Hometown" required={regForm} />
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
            {Object.keys(user).length > 0 && (<Navigate to="/blog" replace={true} />)}
        </div>
    );
}

export default Login;