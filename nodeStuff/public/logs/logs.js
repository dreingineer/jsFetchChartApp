getData();

async function getData() {
  const res = await fetch('/api');
  const datafromdb = await res.json();
  console.log(datafromdb);

  for (item of datafromdb) {
    const root = document.createElement('p');
    const thought = document.createElement('div');
    const location = document.createElement('div');
    const date = document.createElement('div');
    const image = document.createElement('img');
    

    thought.textContent = `mood: ${item.randomText}`;
    location.textContent = `location: ${item.long}° , ${item.lat}°`;
    date.textContent = `${item.timestamp}`;
    image.src = item.image64;
    image.alt = "Andrei random and silly images."

    root.append(thought, location, date, image);
    document.body.append(root);
  }
}