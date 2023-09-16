const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
const APIKey = "a5be9974535c2310ada48e74be0f718f"


//Header elements
const searchEl = document.getElementById("search-el")
const searchBtnEl = document.getElementById("search-btn-el")
const errorEl = document.getElementById("error-el")

//Weather element
const weatherEl = document.getElementById("weather-el")

//Main elements
const weatherImgEl = document.getElementById("weather-img-el")
const mainEl = document.getElementById("main-el")
const celsiusEl = document.getElementById("celcius-el")
const cityEl = document.getElementById("city-el")

//Footer elements
const footerEl = document.getElementById("footer-el")
const humidityPercentEl = document.getElementById("humidity-percent-el")
const windSpeedEl = document.getElementById("wind-speed-el")

async function getWheter(city){
    const response = await fetch(url + city + `&appid=${APIKey}`)
    
    if (response.status === 404) {
        setError("Invalid city name")
        return
    }
    const data = await response.json();

    const weatherIcon = data.weather[0].main
    const temp = data.main.temp
    const cityName = data.name
    const humidity = data.main.humidity
    const wind = data.wind.speed

    setWeather(weatherIcon, temp, cityName, humidity, wind)
}

searchBtnEl.addEventListener("click", function() {
    if (searchEl.value){
        getWheter(getCity())
        errorEl.style.display = "none"
        searchEl.style.border = "none"
    } else {
        setError("Enter a city")
        searchEl.style.border = "1px solid red"
    }
})

function getCity() {
    const city = searchEl.value
    searchEl.value = ""
    return city
}

function setError(errorMessage) {
    errorEl.textContent = errorMessage
    errorEl.style.display = "block"
}

function setWeather(weatherIcon, temp, city, humidity, wind) {
    weatherImgEl.src = selectWeatherIcon(weatherIcon)
    celsiusEl.textContent = Math.floor(parseInt(temp)) + "℃"
    cityEl.textContent = city
    humidityPercentEl.textContent = humidity + " %" 
    windSpeedEl.textContent = wind + " km/h"

    weatherEl.style.display = "block"
}

function selectWeatherIcon(currentWeather) {
    switch (currentWeather) {
        case "Clear":
            return "./images/clear.png"
        case "Clouds":
            return "./images/clouds.png"
        case "Drizzle":
            return "./images/drizzle.png"
        case "Mist":
            return "./images/mist.png"
        case "Rain":
            return "./images/rain.png"
        case "Snow":
            return "./images/snow.png"
    }
}