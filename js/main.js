var todDayName = document.getElementById("todDayName");
var todDayNum = document.getElementById("todDayNum");
var todMonth = document.getElementById("todMonth");
var todLocation = document.getElementById("todLocation");
var todDegree = document.getElementById("todDegree");
var humididty = document.getElementById("humididty");
var wind = document.getElementById("wind");
var wind_direction = document.getElementById("wind_direction");
var img_tod = document.getElementById("img_tod");
var condition = document.getElementById("condition");


var nextDayName = document.getElementsByClassName("nextDayName");
var neximg = document.getElementsByClassName("neximg");
var nextempMax = document.getElementsByClassName("nextempMax");
var nextempMin = document.getElementsByClassName("nextempMin");
var nexPoss = document.getElementsByClassName("nexPoss");

var search = document.getElementById("search")

async function getdata(city) {
    var weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5cd8f05cbc0745dc8e4140755242401&q=${city}&days=3`)
    var weatherData = await weatherResponse.json()
    return weatherData;
}


function disptoday(data) {
    todLocation.innerHTML = data.location.name;
    todDegree.innerHTML = data.current.temp_c;
    humididty.innerHTML = data.current.humidity + "%";
    img_tod.setAttribute("src",data.current.condition.icon)
    wind.innerHTML = data.current.wind_kph + "Km/hr";
    wind_direction.innerHTML = data.current.wind_dir;
    condition.innerHTML = data.current.condition.text;
    var tdDate = new Date();
    todDayName.innerHTML = tdDate.toLocaleDateString("en-US", { weekday: "long" })
    todMonth.innerHTML = tdDate.toLocaleDateString("en-US", { month: "short" })
    todDayNum.innerHTML = tdDate.getDate();
}

function next(data) {
    var forecastdata = data.forecast.forecastday;
    for (var i = 0; i < 2; i++) {
        var nextDate = new Date(forecastdata[i + 1].date)
        nextDayName[i].innerHTML = nextDate.toLocaleDateString("en-US", { weekday: "long" });
        neximg[i].setAttribute("src", forecastdata[i + 1].day.condition.icon);
        nexPoss[i].innerHTML = forecastdata[i + 1].day.condition.text;
        nextempMax[i].innerHTML = forecastdata[i + 1].day.maxtemp_c + `<sup>o</sup>C`;
        nextempMin[i].innerHTML = forecastdata[i + 1].day.mintemp_c;

    }
}

search.addEventListener("keydown", function () {
    app(search.value)
})
async function app(city = "london") {
    var weatherData = await getdata(city);
    if (!weatherData.error) {
        disptoday(weatherData);
        next(weatherData);
    }
    
}
search.addEventListener("keydown", function () {
    app(search.value)
})
app()