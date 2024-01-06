
import './SideBar.css';
import topics from '../../topics';
import WeatherComponent from './WeatherComponent/WeatherComponent';

function Sidebar(props) {
    
    function handleLogOut() {
        console.log("loging out");
    }

    return (
        <div className="side-drawer" style={{ display: props.toggle ? "flex" : "none" }}>
            <div className="list">
                <p className="topic-title">Select topic:</p>
                <ul className="topic-list">
                    {topics.map((topic) => {
                        return (
                            <li key={topic.name} className="topic-item" style={{ backgroundColor: topic.color }}>{topic.name}</li>
                        );
                    })}
                    <li className="topic-item">----------------</li>
                    <li className="topic-item">My posts</li>
                    <li className="topic-item">Other posts</li>
                </ul>
            </div>
            <WeatherComponent />
            <div className="logout-btn-div">
                <input className="logout-btn" type="button" value="Log out" onClick={handleLogOut} />
            </div>
        </div>
    );
};

export default Sidebar;