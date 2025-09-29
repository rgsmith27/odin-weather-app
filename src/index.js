import "./styles.css";
import {getWeatherData} from "./weather-api-calls.js";

const weatherQueryForm = document.getElementById("weather-query-form");
const locationInput = document.getElementById("location");

async function handleGetWeather(e) {
    e.preventDefault();
    const location = locationInput.value;

    const weatherData = await getWeatherData(location);
    console.log(weatherData);
}

weatherQueryForm.addEventListener("submit", handleGetWeather);

const createSimpleWeatherObject = (weatherData) => {
    const temp = weatherData.days[0].temp;
    const dewp = weatherData.days[0].dew;
    const conditions = weatherData.days[0].conditions;

    return {"temp": temp, "dewp": dewp, "conditions": conditions };
}
