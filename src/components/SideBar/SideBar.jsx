
import './SideBar.css';
import topics from '../../topics';
import WeatherComponent from './WeatherComponent/WeatherComponent';

function Sidebar(props) {
    const filters = [
    { name: "All Posts", color: "transparent" },
    { name: "My Posts", color: "transparent" },
    { name: "Other Posts", color: "transparent" },
    ...topics
    ];

    function handleLogOut() {
        console.log("logout");
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
        </div>
    );
};

export default Sidebar;