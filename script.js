// get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp')
const dateOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const icon = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.getElementById('locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')

//default city 
let cityInput = 'London';

//add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {

        //change from default city to the clicked one
        cityInput = e.target.innerHTML;
        //functions that fetches and displays all the data from thw eather api
        fetchWeatherData();
        //fade out the app
        app.style.opacity = "0";
    });
})

//add sugbmit event to the form
form.addEventListener('submit', (e) => {
    if(search.value.length == 0) {
        alert('Please type in a city name');
    } else{
        //change from default city to the one written
        cityInput = search.value;
        fetchWeatherData();
        search.value = '';
        app.style.opacity = "0";
    }

    //prevents the default behaviour of the form
    e.preventDefault();
});

//function that returns a day of the week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// function that fetches and display the data from the weather api

function fetchWeatherData() {
    // fetch the data and dynamicaly add the city name with template
    fetch(`http://api.weatherapi.com/v1/current.json?key=d1297a2261ac445d93e231227222003=${cityInput}`)
    //take the data which is in json format and convert to regular js
    .then(responde => Response.json())
    .then(data => {
        console.log(data);

        //adding temperature and weather condition
        temp.innerHTML = data.current.temp_c + "&#176;";
        conditionOutput.innerHTML = data.current.condition.text;

        //get the date and time from the city and extract
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = data.substr(11);


        dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time;

        nameOutput.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);

        icon.src = "."
    })
}