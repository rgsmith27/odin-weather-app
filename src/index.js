import "./styles.css";
import { getWeatherData } from "./weather-api-calls.js";

const weatherQueryForm = document.querySelector("#weather-query-form");
const locationInput = document.querySelector("#location");
const conditonsDisplay = document.querySelector(".conditions-display");
const tempDewpDisplay = document.querySelector(".temp-dewp-display");

async function displayWeatherData(location){
    const weatherData = createSimpleWeatherObject(await getWeatherData(location));

    conditonsDisplay.textContent = `${weatherData.conditions}`;
    tempDewpDisplay.textContent = `${weatherData.temp} / ${weatherData.dewp}`;
}

async function handleGetWeather(e) {
  e.preventDefault();
  const location = locationInput.value;

  await displayWeatherData(location);
}

weatherQueryForm.addEventListener("submit", handleGetWeather);

const createSimpleWeatherObject = (weatherData) => {

  const temp = weatherData.days[0].temp;
  const dewp = weatherData.days[0].dew;
  const conditions = weatherData.days[0].conditions;

  return { temp: temp, dewp: dewp, conditions: conditions };
}
