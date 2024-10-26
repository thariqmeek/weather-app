import React, { useState } from "react";
import axios from "axios";
import "./WeatherFinder.css";

const WeatherFinder = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "YOUR-API-KEY";

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError("City not found or invalid API key.");
      setWeatherData(null);
    }
  };

  const handleInputChange = (e) => setCity(e.target.value);

  const handleSearch = () => {
    if (city) getWeather();
  };

  const getLocalTime = (timezoneOffset) => {
    const currentUtcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(currentUtcTime + timezoneOffset * 1000);
    return localTime.toLocaleString();
  };

  // Function to set background image based on temperature
  const getBackgroundImage = (temperature) => {
    if (temperature > 30) {
      return "url('https://womenlovetech.com/wp-content/uploads/2020/12/weatherplus-01_xhcqwf.jpg')"; // Replace with actual sunny image URL
    } else if (temperature > 20 && temperature <= 30) {
      return "url('https://images.pexels.com/photos/416920/pexels-photo-416920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"; // Replace with actual cloudy image URL
    } else if (temperature > 10 && temperature <= 20) {
      return "url('https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"; // Replace with actual cold image URL
    } else {
      return "url('https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"; // Optional default image
    }
  };

  // Set the default image as the background if no weather data is available
const backgroundImage = weatherData
? getBackgroundImage(weatherData.main.temp)
: "url('https://png.pngtree.com/thumb_back/fw800/background/20230930/pngtree-collection-of-3d-weather-icons-for-weather-forecast-app-and-web-image_13541310.png')"; // Replace with your initial default image URL


  return (
    <div
      className="weather-container"
      style={{
        backgroundImage: backgroundImage,
      }}
    >
      <h1 className="title">Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="input"
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p><strong>Local Date & Time:</strong> {getLocalTime(weatherData.timezone)}</p>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherFinder;