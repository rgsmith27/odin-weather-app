const getTodaysDate = () => {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate() + 1).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getWeatherData = async (location) => {
  const today = getTodaysDate();
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${today}/?key=F9BGND9T6RTUHU25KKSJQ3A9K`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Could not fetch weather data: ", error);
  }
};

export { getWeatherData };
