import './WeatherComponent.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from '../../../App';

function WeatherComponent(props) {

    const [weather, setWeather] = useState({});
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchWeather = async () => {
            try {
                const response = await axios.post(server+"/weather", { location: props.location }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setWeather(response.data);
            } catch (error) {
                console.log("Loš zahtjev");
            }
        };
        fetchWeather();
    },[props.location]);

    return (
        <div className="weather-flex">
            <p>{weather.city}</p>
            <img src={weather.image} alt="weather" />
            <p>{weather.text}</p>
        </div>
    );
};

export default WeatherComponent;