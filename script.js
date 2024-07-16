async function fetchWeather(){
    let searchInput = document.getElementById("search").value;
    const weatherData = document.getElementById("weather-data");
    weatherData.style.display = "block";
    const apiKey = "96f6590be5abbce6a960a3dd23d096ab";

    if(searchInput===""){
        weatherData.innerHTML=`
        <div>
            <h2>Empty Input!</h2>
            <p>Please try again with a valid <u>city name</u>.</p>
        </div>
        `
        return;
    }

    async function getLonAndLat() {
        
        const countryCode = 91;
        const cityName = searchInput.replace(" ","%20");
        const geocodeURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${apiKey}`;
        const response = await fetch(geocodeURL);
        
        if(!response.ok){
            console.log("Bad response! ",response.status);
            return;
        }
        
        const data = await response.json();
        
        if(data.length==0){
            console.log("Something went wrong here.");
            weatherData.innerHTML=`
            <div>
                <h2>Invalid Input: "${searchInput}"</h2>
                <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `
            return;
        }else return data[0];

    }

    async function getWeatherData(lon, lat) {
        
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(weatherURL);

        if (!response.ok) {
        console.log("Bad response! ", response.status);
        return;
        }

        const data = await response.json();
        console.log(data);
        weatherData.style.display="flex";
        weatherData.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" width="100" />
        <div>
            <h2>${data.name}</h2>
            <p><strong>Temperature:</strong> ${Math.round(data.main.temp - 273.15)}°C</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
            <p><strong>Description:</strong> ${data.weather[0].description}</p>
            
        </div>
        `
    }
    document.getElementById("search").value = "";
    const geocodeData = await getLonAndLat();
    getWeatherData(geocodeData.lon, geocodeData.lat);
}