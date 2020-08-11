let lat, long, temperature, sunrise, sunset, summary, windspeed, particulateMatter, value, unit, lastRead;

if('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {

    try {
      console.log(position)
      lat = position.coords.latitude;
      long = position.coords.longitude;
  
      const response = await fetch(`/api/weather/${lat},${long}`);
      const responseJson = await response.json();
      console.log(responseJson);
  
      const weather = responseJson.weather[0];
      const air_quality = responseJson.air_quality.results[0].measurements[0];
      temperature = weather.temp.value;
      sunrise = weather.sunrise.value;
      sunset = weather.sunset.value;
      summary = weather.weather_code.value;
      windspeed = weather.wind_speed.value;
      particulateMatter = air_quality.parameter;
      value = air_quality.value;
      unit = air_quality.unit;
      lastRead = air_quality.lastUpdated;
  
      document.getElementById('latitude').textContent = lat.toFixed(2);
      document.getElementById('longitude').textContent = long.toFixed(2);
      document.getElementById('temperature').textContent = temperature;
      document.getElementById('sunrise').textContent = sunrise;
      document.getElementById('sunset').textContent = sunset;
      document.getElementById('summary').textContent = summary;
      document.getElementById('windspeed').textContent = windspeed;
      document.getElementById('particulateMatter').textContent = particulateMatter;
      document.getElementById('value').textContent = value;
      document.getElementById('unit').textContent = unit;
      document.getElementById('lastRead').textContent = lastRead;


      const pageData = {lat, long, temperature, summary, windspeed, particulateMatter, value, unit, lastRead, sunrise, sunset};
      await postData(pageData)

    } catch(error) {
      console.error(error);
      console.log('something went wrong');
      document.getElementById('particulateMatter').textContent = 'NO READING';
      document.getElementById('value').textContent = 'NO VALUE';
      document.getElementById('unit').textContent = '';
      document.getElementById('lastRead').textContent = 'NO READING';
    }
  }, function error(msg) {
    alert('Please enable your GPS feature');
  },{
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 10000
  });
} else {
  console.log('geolocation not available');
}

// const button = document.getElementById('checkin');
// button.addEventListener('click', async event => {
//   const pageData = {lat, long, temperature, sunrise, sunset, windspeed};
//   await postData(pageData);
// });

async function postData(data) {
  const options = {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(data)
  };

  const res = await fetch('/api/checkin', options);
  const jsonData = await res.json();
  console.log('response from database and server: ', jsonData);
}