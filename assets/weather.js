// global var
const apiKey = '417c16f9d2a5b6380aafa3dac636a4e5';
const searchButton = $('#searchBtn');
// might not need all these but meh
// weather variables
const citySearch = $('#citySearch');
const cityName = $('.cityName');
const cityDate = $('date');
const cityTemp = $('temp');
const humidity = $('humidity');
const windSpeed = $('wind');
const uvIndex = $('');
const cityHistory = $('city');
const cityIcon = $('icon');
// API call for Weather

// there are a lot of cities need array

var cities = [];

// saving citys information

var searchHistory = function () {
  cityHistory = JSON.parse(localStorage.getItem('city'));
};

// api call to get the info i need
const cityName = function(citySearch)


const getWeather = async function () {
    let response = await fetch(
    //   useing charlotte to make sure it works  but need to end up being ${cityName}
    `https://api.openweathermap.org/data/2.5/weather?q=Charlotte&units=imperial&appid=${apiKey}`
  );

  let data = await response.json();

  console.log(data);
  const { temp, humidity, icon, speed, dt: cityDate, name } = data.main;

  postWeather(temp, humidity, icon, speed, cityDate, name);
};

//  sapossed to be a 5 day forcast
`https//:api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${Apikey}`
// only sends the search querry when clicked?

searchButton.click(getWeather);

// puts the data in my html from js i think still working

const postWeather = function (temp, humidity, icon, speed, cityDate, name) {
  cityTemp.html(temp);
  cityIcon.attr('scr', icon);
  cityName.html(name);
  windSpeed.html(speed);
  humidity.html(humidity);
  cityDate.html(citydate);
  localStorage.setItem('city', JSON.stringify(cityHistory));
};

var searchHistory = function () {
  cityHistory = JSON.parse(localStorage.getItem('city'));
};
