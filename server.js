'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const weatherData = require('./data/weather.json');


class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.use(cors());
const PORT = process.env.PORT || 3002;
app.get('/weather', (request, response) => {
  const lat = parseInt(request.query.lat);
  const lon = parseInt(request.query.lon);
  const searchQuery = request.query.searchQuery;
  const city = weatherData.find(cityObj => cityObj.city_name.toLowerCase() === searchQuery.toLowerCase());
  try {
    const forecastArr = city.data.map(day => new Forecast(day.valid_date, day.weather.description));
    response.send(forecastArr);
  } catch (error) {
    response.send(error.message);
  }
});
app.listen(PORT, () => console.log(`I'm Alive${PORT}`));

