function setup() {
  noCanvas();
  const video = createCapture(VIDEO); // open or access webcam of the device
  video.size(160, 120);

  let lat, long;
  if('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      // console.log(position);
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const data = { lat, long };

      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = long;
      
      // await postLongLat(data);
    }, function error(msg) {
      alert('Please enable your GPS postion feature');
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000
    });
  } else {
    console.log('geolocation not avalable');
  }

  const button = document.getElementById('addToDb');
  button.addEventListener('click', async event => {
    const randomText = document.getElementById('randomText').value;
    video.loadPixels(); // alert p5 to load the video to a canvas element like snapshot ready to be converted to b64
    const image64 = video.canvas.toDataURL(); //base 64 encoding of the image
    const addData = { long, lat, randomText, image64 };
    await postLongLat(addData);
    document.getElementById('randomText').value = "";
  });

  async function postLongLat(data) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    const response = await fetch('/api', options);
    const jsonData = await response.json();
    console.log(jsonData);
  }
}