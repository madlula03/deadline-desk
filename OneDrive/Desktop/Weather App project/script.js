/*const apiKey = "aa4ab6872d226f99dd5b565457fbf9fd";
const apiId = "";
//https://api.openweathermap.org/data/2.5/weather?q=Durban&appid=aa4ab6872d226f99dd5b565457fbf9fd&&units=metric
//const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?q=&&units=metric&q=";
//https://api.openweathermap.org/data/2.5/weather?q=Durban&appid=aa4ab6872d226f99dd5b565457fbf9fd&&units=metric
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=&&units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcn = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl +  city+ `&appid=${apiKey}`);
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
     console.log(data);  

    if(data.weather[0].main == "Clouds"){
        weatherIcn.src = "images/clouds.png";

    }else if(data.weather[0].main == "Clear"){
         weatherIcn.src = "images/clear.png";
    } else if(data.weather[0].main == "Rain"){
         weatherIcn.src = "images/rain.png";
    } else if(data.weather[0].main == "Drizzle"){
          weatherIcn.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
         weatherIcn.src = "images/mist.png";
    }
    
    
}
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})*/

const apiKey = "aa4ab6872d226f99dd5b565457fbf9fd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcn = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    console.log(data);

    if (data.weather[0].main === "Clouds") {
        weatherIcn.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
        weatherIcn.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
        weatherIcn.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
        weatherIcn.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
        weatherIcn.src = "images/mist.png";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
