function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");
  
    if (city === "") {
      result.innerHTML = "Please select a city!";
      return;
    }
  
    result.innerHTML = "Fetching data...";
  
    // Fetch data from local JSON file
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const weather = data[city];
        if (weather) {
          result.innerHTML = `
            <b>Temperature:</b> ${weather.temp}<br>
            <b>Humidity:</b> ${weather.humidity}<br>
            <b>Condition:</b> ${weather.condition}
          `;
        } else {
          result.innerHTML = "City data not found!";
        }
      })
      .catch(error => {
        result.innerHTML = "Error fetching data.";
      });
  }
  