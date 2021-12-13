// global var
var apiKey = '417c16f9d2a5b6380aafa3dac636a4e5';
var searchButton = $('#searchBtn');
// might not need all these but meh
// weather variables
var citySearch = $('#citySearch');
var cityName = $('.cityName');
var cityDate = $('#currentDate');
var cityTemp = $('#temp');
var cityHumidity = $('#humidity');
var windSpeed = $('#wind');
var uvIndexel = $('#uvIndex');
var cityHistory = $('#cityHistory');
var cityIcon = $('#cityIcon');
var time;
// // thinking of how to umplament buttons

// API call for Weather

// there are a lot of cities need array

var cities = [];
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  time = date + ' ' + month + ' ' + year;
  return time;
}
// saving citys information
// alright lost af not even sure how to geather all the citys like What -_- probs a for loop with a if and at the end

var saveTasks = function (cityName) {
  localStorage.setItem(cityName, JSON.stringify(tasks));
};

// api call to get the info i need
var getWeather = async function () {
  let response = await fetch(
    //   useing charlotte to make sure it works  but need to end up being ${cityName}
    `https://api.openweathermap.org/data/2.5/weather?q=charlotte&units=standard&appid=${apiKey}`
  );

  let data = await response.json();

  var { temp, humidity } = data.main;
  var { icon } = data.weather[0];
  var { speed } = data.wind;
  var { dt, name } = data;
  var { lon, lat } = data.coord;
  // making a second call to get the long a latt from the the 1st call to the second for uvIndex
  //   i think i need a paid acount to do this might need to find another way not sure yet
  let secondResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
  );

  let secondData = await secondResponse.json();
  var { uvi } = secondData.current;
  console.log(uvi);

  timeConverter(dt);
  getFiveDay();
  postWeather(temp, humidity, icon, speed, time, name, uvi);
  changeColors(uvi);
};

// only sends the search querry when clicked?
searchButton.click(getWeather);

var getFiveDay = async function () {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=charlotte&units=imperial&appid=417c16f9d2a5b6380aafa3dac636a4e5`
  );
  let data = await response.json();
  let i = 24;
  for (let j = 7; j < 40; j += 8) {
    const { temp, humidity } = data.list[j].main;
    const { icon } = data.list[j].weather[0];
    const { speed } = data.list[j].wind;
    const { dt_txt: date } = data.list[j];

    const dateModified = date.split(' ')[0];

    postFiveDay(i, temp, humidity, icon, speed, dateModified);
    i += 24;
  }
};

var postFiveDay = function (i, temp, humidity, icon, speed, date) {
  $(`#date${i}`).text(date);
  $(`#temp${i}`).append(temp);
  $(`#humidity${i}`).append(humidity);
  $(`#img${i}`).attr('src', `./assets/icons/${icon}.png`);
  $(`#speed${i}`).append(speed);
};

var postWeather = function (temp, humidity, icon, speed, time, name, uvi) {
  cityTemp.append(temp);
  cityIcon.attr('src', `./assets/icons/${icon}.png`);
  cityName.append(name);
  windSpeed.append(speed);
  cityHumidity.append(humidity);
  cityDate.append(time);
  localStorage.setItem('', JSON.stringify(cityHistory));
  // how do i make this a box
  uvIndex.append(uvi);
};

// change color when the uv is too much
const changeColors = function (uvi) {
  if (uvi <= 2) {
    uvIndexel.addClass('good');
  }
  if (uvi === 3) {
    uvIndexel.addClass('moderate');
  }
  if (uvi >= 4) {
    uvIndexel.addClass('bad');
  }
};

var searchHistory = function () {
  cityHistory = JSON.parse(localStorage.getItem('city'));
};
