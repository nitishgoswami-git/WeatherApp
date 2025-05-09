const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherData = require("../utils/weatherData");
const forecastData = require("../utils/forecastData");
const weatherML = require("../utils/weatherML");

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address is required" });
  }
  weatherData(req.query.address, (error, currentData) => {
    if (error) {
      return res.send({ error: error });
    }
    forecastData(req.query.address, (error, forecastResult) => {
      if (error) {
        return res.send({ error: error });
      }
      const mlPrediction = weatherML.predictClothing(currentData, forecastResult);
      res.send({
        current: currentData,
        forecast: forecastResult.list.slice(0, 5),
        mlPrediction: mlPrediction
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", { title: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
