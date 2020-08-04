let lat, long, temperature, sunrise, sunset, windspeed;

if('geolocation' in navigator) {
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    console.log(position)
    lat = position.coords.latitude;
    long = position.coords.longitude;

    const response = await fetch(`/api/weather/${lat},${long}`);
    const responseJson = await response.json();
    console.log('Weather API: ', responseJson[0]);
    temperature = responseJson[0].temp.value;
    sunrise = responseJson[0].sunrise.value;
    sunset = responseJson[0].sunset.value;
    windspeed = responseJson[0].wind_speed.value;

    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = long.toFixed(2);
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.getElementById('windspeed').textContent = windspeed;
    
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

const button = document.getElementById('checkin');
button.addEventListener('click', async event => {
  const pageData = {lat, long, temperature, sunrise, sunset, windspeed};
  await postData(pageData);
});

async function postData(data) {
  const options = {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(data)
  };

  const res = await fetch('/api/checkin', options);
  const jsonData = await res.json();
  console.log('response from server: ', jsonData);
}