// global var
const apiKey = '417c16f9d2a5b6380aafa3dac636a4e5';
const searchButton = $('#searchBtn');
// might not need all these but meh
// weather variables
const citySearch = $('#citySearch');
const cityName = $('.cityName');
const cityDate = $('#date');
const cityTemp = $('#temp');
const humidity = $('#humidity');
const windSpeed = $('#wind');
const uvIndex = $('#uvIndex');
const cityHistory = $('#cityHistory');
const cityIcon = $('#cityIcon');

// // thinking of how to umplament buttons
// let locationIcon = document.querySelector('.weather-icon');
// const { icon } = data.weather[0].icon;
// locationIcon.innerHTML = `<img src="icons/${icon}.png">;`;

// API call for Weather

// there are a lot of cities need array

const cities = [];

// saving citys information
// alright lost af not even sure how to geather all the citys like What -_- probs a for loop with a if and at the end
const searchHistory = function () {
  const cityName = function (citySearch) {
    for (let i = 0; i < city.length; i++) {}
  };

  cityHistory = JSON.parse(localStorage.getItem('city'));
};

// api call to get the info i need
const getWeather = async function () {
  let response = await fetch(
    //   useing charlotte to make sure it works  but need to end up being ${cityName}
    `https://api.openweathermap.org/data/2.5/weather?q=Charlotte&units=standard&appid=${apiKey}`
  );

  let data = await response.json();

  const { temp, humidity, icon, speed, dt, name, lat, lon } = data;

  // making a second call to get the long a latt from the the 1st call to the second for uvIndex
  //   i think i need a paid acount to do this might need to find another way not sure yet
  let secondResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  let secondData = await secondResponse.json();
  const { uvi } = secondData;

  console.log(data);

  postWeather(
    data.main.temp,
    data.main.humidity,
    data.weather.icon,
    data.wind.speed,
    data.dt,
    data.name,
    uvi
  );
};

//  sapossed to be a 5 day forcast need a way to make it fill up each car and prob one of those i++ soo it goes from the current date and adds 5 more WiP
`https//:api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

// only sends the search querry when clicked?
searchButton.click(getWeather);

// puts the data in my html from js i think still working

const postWeather = function (temp, humidity, icon, speed, dt, name, uvi) {
  cityTemp.html(temp);
  cityIcon.attr('scr', icon);
  cityName.html(name);
  windSpeed.html(speed);
  humidity.html(humidity);
  cityDate.html(dt);
  localStorage.setItem('', JSON.stringify(cityHistory));
  // how do i make this a box
  uvIndex.html(uvi);
};

// change color when the uv is too much
// ummm what is a not ok uv #blessed to be colored
const changeColors = function () {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (uv > i) {
      input.addClass('good');
    }
    if (uv === i) {
      input.addClass('moderate');
    }
    if (uv < i) {
      input.addClass('bad');
    }
  }
};

const searchHistory = function () {
  cityHistory = JSON.parse(localStorage.getItem('city'));
};
