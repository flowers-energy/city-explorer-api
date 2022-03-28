'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');



app.use(cors());

const PORT = process.env.PORT || 3002;
const getWeather = async (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  //const searchQuery = request.query.searchQuery;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=7`;
  try {
    const weatherData = await axios.get(url);
    const forecastArr = weatherData.data.data.map(day => new Forecast(day.valid_date, day.weather.description));
    response.send(forecastArr);
  } catch (error) {
    response.send(error.message);
  }
};

app.get('/weather', getWeather);

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }

}

const findMovies = async (request, response) => {
  const movQuery = request.query.searchQuery;
  const url = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${movQuery}`;
  console.log(movQuery);
  try {
    const movData = await axios.get(url);
    console.log(movData);
    const movArr = movData.data.results.map(value => new Movies(value));
    response.send(movArr);
  } catch (error) {
    response.send(error.message);
  }
};

app.get('/movies', findMovies);

class Movies {
  constructor(film) {
    this.title = film.title;
    this.overview = film.overview;
    this.img_url = film.poster_path;

  }
}
app.listen(PORT, () => console.log(`I'm Alive${PORT}`));

