import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Login.css";
function Login() {
    const [regForm, setRegForm] = useState(false);
    const [action, setAction] = useState("Login");
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log(user);
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
        event.preventDefault();
        try {
            const response = await axios.get('http://localhost:3001/api/data');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        };
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
        </div>
    );
}

export default Login;