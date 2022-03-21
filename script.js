// get all necessary elements from the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

//default city
let cityInput = 'Zermatt';

//add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {

        //change from default city to the clicked one
        cityInput = e.target.innerHTML;
        //functions that fetches and displays all the data from thw eather api
        fetchWeatherData();
        //fade out the app
        app.style.opacity = '0';
    });
});

//add sugbmit event to the form
form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name');
    } else {
        //change from default city to the one written
        cityInput = search.value;
        fetchWeatherData();
        search.value = '';
        app.style.opacity = '0';
    }

    //prevents the default behaviour of the form
    e.preventDefault();
});

//function that returns a day of the week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

// function that fetches and display the data from the weather api

function fetchWeatherData() {
    // fetch the data and dynamicaly add the city name with template
    fetch(
        `https://api.weatherapi.com/v1/current.json?key=871c9c1d464b4ae0a6615335222103&q=${cityInput}&aqi=no`
    )
        //take the data which is in json format and convert to regular js
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            //adding temperature and weather condition
            temp.innerHTML = data.current.temp_c + '&#176;';
            conditionOutput.innerHTML = data.current.condition.text;

            //get the date and time from the city and extract
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const d = parseInt(date.substr(5, 2));
            const m = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;

            nameOutput.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr(
                '//cdn.weatherapi.com/weather/64x64'.length
            );
            icon.src = './weather/64x64/' + iconId;

            //add the weather details to the page
            cloudOutput.innerHTML = data.current.cloud + '%';
            humidityOutput.innerHTML = data.current.humidity + '%';
            windOutput.innerHTML = data.current.wind_kph + 'km/h';

            //Set default time of day
            let timeOfDay = 'day';

            //get the unique id for each weather condition
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = 'night';
            }

            if (code == 1000) {
                //set the background image to clear if the weather is clear
                app.style.backgroundImage = `
            url(./images/${timeOfDay}/clear.jpg)`;
                //change the button bg color depending on if its day or night
                btn.style.background = '#e5ba92';
                if (timeOfDay == 'night') {
                    btn.style.background = '#181e27';
                }
            }
            //same thing for cloudy weather
            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `
                url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = '#fa6d1b';
                if (timeOfDay == 'night') {
                    btn.style.background = '#181e27';
                }
                //and rain
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = '#647d75';
                if (timeOfDay = 'night') {
                    btn.style.background = '#325c80';
                }
                // and finally snow    
            } else {
                app.style.backgroundImage = `
                    url(./images/${timeOfDay}/snowy.jpg)`;
                btn.style.background = '#4d72aa';
                if (timeOfDay == 'night') {
                    btn.style.background = '#1b1b1b';
                }
            }
            //fade in the page once all is done
            app.style.opacity = '1';
        })
        .catch(() => {
            alert('City not found, please try again');
            app.style.opacity = '1';
        });
}

//call the function on page load
fetchWeatherData();

//fade in the page
app.style.opacity = '1';
