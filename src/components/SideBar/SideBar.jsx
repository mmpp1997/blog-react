import { useState } from 'react';
import { Navigate } from "react-router-dom";

import './SideBar.css';
import {filters} from '../../topics';
import WeatherComponent from './WeatherComponent/WeatherComponent';

function Sidebar(props) {
    const [logOut, setlogOut] = useState(false);


    function handleLogOut() {
        setlogOut(true);
    }

    return (
        <div className="side-drawer" style={{ display: props.toggle ? "flex" : "none" }}>
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
                                    borderColor:filter.name === props.sort && "white"  }} />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <WeatherComponent />
            <div className="logout-btn-div">
                <input className="logout-btn" type="button" value="Log out" onClick={handleLogOut} />
            </div>
            {logOut && (<Navigate to="/" replace={true} />)}
        </div>
    );
};

export default Sidebar;