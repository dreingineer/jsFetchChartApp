const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();

app.listen(3001, () => {
  console.log('listening at port 3001')
});

app.use(express.static('public')); // serve static file inside public
app.use(express.json({ limit: '1mb'})); // understand incoming json with limit

const database = new Datastore('databaseCheckin.db');
database.loadDatabase();

app.get('/api/checkin', (request, response) => {
  console.log('GET request');
  database.find({}, (err, data) => { // find data from db, result is in data
    if(err) {
      response.end();
      return;
    }
    response.json(data); // send the data using response
  });
});

app.post('/api/checkin', (request, response) => {
  console.log('POSTed a request');
  const data = request.body;
  const timestamp = new Date(Date.now());
  data.timestamp = timestamp.toString();
  database.insert(data);
  response.json(data);
});

app.get('/api/weather/:latlong', async (request, response) => {
  console.log(request.params);
  const latlong = request.params.latlong.split(',');
  console.log(latlong);
  const lat = latlong[0];
  const long = latlong[1];
  const api_key = 'EZ4KKdhEMSvs6Ukd7q4rpnDevByvdYVl';
  const api_url = `https://api.climacell.co/v3/weather/nowcast?lat=${lat}&lon=${long}&timestep=5&unit_system=si&fields=precipitation%3Ain%2Fhr,temp%3AC,feels_like%3AC,dewpoint%3AC,wind_speed%3Akph,wind_gust%3Akph,baro_pressure%3AmmHg,visibility%3Akm,humidity%3A%25,wind_direction%3Adegrees,sunrise,sunset&start_time=now&apikey=${api_key}`;
  // hardcoded
  // const api_url = `https://api.climacell.co/v3/weather/nowcast?lat=14.10&lon=121.08&timestep=5&unit_system=si&fields=precipitation%3Ain%2Fhr,temp%3AC,feels_like%3AC,dewpoint%3AC,wind_speed%3Akph,wind_gust%3Akph,baro_pressure%3AmmHg,visibility%3Akm,humidity%3A%25,wind_direction%3Adegrees,sunrise,sunset&start_time=now&apikey=EZ4KKdhEMSvs6Ukd7q4rpnDevByvdYVl`;
  const fetchResponse = await fetch(api_url);
  const responseJson = await fetchResponse.json();
  response.json(responseJson);
});
