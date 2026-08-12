const form = document.querySelector(".searchForm")
const input = document.querySelector(".searchInput")
const cityName = document.querySelector(".cityName")
const date = document.querySelector(".date")
const temperature = document.querySelector(".temperature")
const weather = document.querySelector(".weather")
const dynamicIcon = document.querySelector(".dynamicIcon")
const perceivedTemperatureValue = document.querySelector(".perceivedTemperatureValue")
const windValue = document.querySelector(".windValue")
const humidityValue = document.querySelector(".humidityValue")
const forecast = document.querySelector(".forecast")
const loadingCard = document.querySelector(".loadingCard")
const errorCard = document.querySelector(".errorCard")
const iconElement = dynamicIcon.querySelector("i")
const errorMessage = document.querySelector(".errorMessage")
function getWeather(code) {
    if (code === 0) return { text: "Açık", icon: "fa-solid fa-sun" }
    if (code <= 2) return { text: "Parçalı bulutlu", icon: "fa-solid fa-cloud-sun" }
    if (code === 3) return { text: "Kapalı", icon: "fa-solid fa-cloud" }
    if (code <= 48) return { text: "Sisli", icon: "fa-solid fa-smog" }
    if (code <= 67) return { text: "Yağmurlu", icon: "fa-solid fa-cloud-rain" }
    if (code <= 77) return { text: "Karlı", icon: "fa-solid fa-snowflake" }
    if (code <= 82) return { text: "Sağanak", icon: "fa-solid fa-cloud-showers-heavy" }
    if (code <= 86) return { text: "Karlı", icon: "fa-solid fa-snowflake" }
    return { text: "Gök gürültülü", icon: "fa-solid fa-cloud-bolt" }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    errorCard.classList.remove("show")
    try {
        loadingCard.classList.add("show")
        const city = input.value.trim()
        if (city === "") return
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=tr`
        const geoResponse = await fetch(geoUrl)
        const geoData = await geoResponse.json()
        if (!geoData.results) {
            throw new Error("Şehir bulunamadı")
        }
        const latitude = geoData.results[0].latitude
        const longitude = geoData.results[0].longitude
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
        const weatherResponse = await fetch(weatherUrl)
        const data = await weatherResponse.json()
        cityName.textContent = `${geoData.results[0].name}, ${geoData.results[0].country_code}`
        temperature.textContent = Math.round(data.current.temperature_2m) + "°"
        perceivedTemperatureValue.textContent = Math.round(data.current.apparent_temperature) + "°"
        windValue.textContent = Math.round(data.current.wind_speed_10m) + "km/s"
        humidityValue.textContent = "%" + data.current.relative_humidity_2m
        const info = getWeather(data.current.weather_code)
        weather.textContent = info.text
        iconElement.className = info.icon
        const dateObject = new Date(data.current.time + "Z")
        const dayName = dateObject.toLocaleDateString("tr-TR", { weekday: "long", timeZone: "UTC" })
        const clock = dateObject.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })

        date.textContent = `${dayName}, ${clock}`
        let forecastHTML = ""

        for (let i = 0; i < 5; i++) {
            const info = getWeather(data.daily.weather_code[i])
            const dayObject = new Date(data.daily.time[i])
            const dayShort = dayObject.toLocaleDateString("tr-TR", { weekday: "short", timeZone: "UTC" })
            const max = Math.round(data.daily.temperature_2m_max[i])
            const min = Math.round(data.daily.temperature_2m_min[i])

            forecastHTML += `
        <div class="day">
            <span class="dayName">${dayShort}</span>
            <span class="dayIcon"><i class="${info.icon}" aria-hidden="true"></i></span>
            <span class="tempMax">${max}°</span>
            <span class="tempMin">${min}°</span>
        </div>
    `
        }

        forecast.innerHTML = forecastHTML
    } catch (error) {
        errorMessage.textContent = error.message
        console.log(error)
        errorCard.classList.add("show")
        setTimeout(() => {
            errorCard.classList.remove("show")
        }, 3000)
    } finally {
        loadingCard.classList.remove("show")
    }


})