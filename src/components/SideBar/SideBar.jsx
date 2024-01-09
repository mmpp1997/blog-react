import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './SideBar.css';
import { filters } from '../../topics';
import WeatherComponent from './WeatherComponent/WeatherComponent';
import {setCurrentUser} from "../../store/store";
import { useState } from 'react';

function Sidebar(props) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    const [logOut,setLogOut]=useState(false);

    async function handleLogOut() {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data === "Success") {
                setLogOut(true);
                dispatch(setCurrentUser({}));
                localStorage.removeItem('token');
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="side-drawer">
            {logOut && (<Navigate to="/" replace={true} />)}
            <div className="list">
                <p className="topic-title">Select filter:</p>
                <ul className="topic-list">
                    {filters.map((filter) => {
                        return (
                            <li key={filter.name}>
                                <input className="topic-btn" type="button" value={filter.name}
                                    onClick={(e) => {
                                        props.filter(e.target.value);
                                        props.close();
                                    }}
                                    style={{
                                        backgroundColor: filter.color,
                                        borderColor: filter.name === props.sort && "white"
                                    }} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            {!logOut && <WeatherComponent location={currentUser.location} />}
            <div className="user-div">
                <p className="current-user">Logged in as <span className="user">{currentUser.nickname}</span></p>
            </div>
            <div className="logout-btn-div">
                <input className="logout-btn" type="button" value="Log out" onClick={handleLogOut} />
            </div>
        </div>
    );
};

export default Sidebar;