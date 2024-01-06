import './WeatherComponent.css';
import { useEffect, useState } from "react";
import axios from "axios";

function WeatherComponent() {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get('http://localhost:3001/weather');
                setWeather(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWeather();
    }, []);

    return (
        <div className="weather-flex">
            <p>{weather.city}</p>
            <img src={weather.image} alt="weather" />
            <p>{weather.text}</p>
        </div>
    );
};

export default WeatherComponent;