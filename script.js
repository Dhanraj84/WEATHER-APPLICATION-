const apiKey = "47a959659ee84b36a7332817251906";

// User clicks "Get Weather"
function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  if (location !== "") {
    fetchWeather(location);
  } else {
    alert("Please enter a location.");
  }
}

// User clicks "Use My Location"
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        fetchWeather(`${lat},${lon}`);
      },
      () => alert("Could not get your location.")
    );
  } else {
    alert("Geolocation not supported.");
  }
}

// Fetch weather and update UI
function fetchWeather(query) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const condition = data.current.condition.text.toLowerCase();
      const temp = data.current.temp_c;
      const city = data.location.name;
      const country = data.location.country;

      // Display weather info
      document.getElementById("weatherResult").innerHTML = `
        <h2>${city}, ${country}</h2>
        <p>${condition}</p>
        <p>${temp}°C</p>
      `;

      updateBackground(condition);
    })
    .catch(err => {
      alert("Error fetching weather data.");
      console.error(err);
    });
}

// Change background based on weather
function updateBackground(condition) {
  const body = document.body;
  body.classList.remove("sunny", "cloudy", "rainy");

  if (condition.includes("rain")) {
    body.classList.add("rainy");
  } else if (condition.includes("cloud")) {
    body.classList.add("cloudy");
  } else if (condition.includes("sun") || condition.includes("clear")) {
    body.classList.add("sunny");
  } else {
    console.log("Unknown condition:", condition);
  }
}


