const request = require("request");

const openWeatherMap = {
  BASE_URL: "https://api.openweathermap.org/data/2.5/forecast?q=",
  SECRET_KEY: "644852249310ade9179a8408f3a8c945"
};

const forecastData = (address, callback) => {
  const url =
    openWeatherMap.BASE_URL +
    encodeURIComponent(address) +
    "&APPID=" +
    openWeatherMap.SECRET_KEY;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to fetch forecast data, please try again.", undefined);
    } else if (response.body.cod !== "200") {
      callback("Error fetching forecast: " + response.body.message, undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecastData;
