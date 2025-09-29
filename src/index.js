import "./styles.css";
import { getWeatherData } from "./weather-api-calls.js";

const weatherQueryForm = document.querySelector("#weather-query-form");
const locationInput = document.querySelector("#location");
const conditonsDisplay = document.querySelector(".conditions-display");
const tempDewpDisplay = document.querySelector(".temp-dewp-display");
const unitToggle = document.querySelector(".unit-toggle");

let celsius = false;

unitToggle.addEventListener("click", () => {
    celsius = !celsius;
    if(celsius) {
        unitToggle.textContent = "Celsius";
    }
    else {
        unitToggle.textContent = "Fahrenheit";
    }
});

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

const convertToCelsius = (temp) => {
    return Math.floor((temp - 32) * (5/9));
}

const createSimpleWeatherObject = (weatherData) => {

    let temp = weatherData.days[0].temp;
let dewp = weatherData.days[0].dew;
    if(celsius){
        temp = convertToCelsius(temp);
        dewp = convertToCelsius(dewp);
    }

  const conditions = weatherData.days[0].conditions;

  return { temp: temp, dewp: dewp, conditions: conditions };
}
