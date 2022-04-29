// added api base and put them in an object
const api =
{
  base: "https://api.openweathermap.org/",
  key: "856cf893bf4748da5e5e119d50885a54"
};
//getting zipcode data b/c I need to send lon and lat to another api
const zipData = (zip) => 
    fetch(`${api.base}geo/1.0/zip?zip=${zip},US&appid=${api.key}`)
      .then((res) => 
          res.json())
          //sends data to next api request
        .then((data) => geoLocData(data));

//sends lon and lat to 2nd API that has weather data
  const geoLocData = (geoLoc) => 
    fetch(`${api.base}data/2.5/weather?lat=${geoLoc.lat}&lon=${geoLoc.lon}&units=imperial&appid=${api.key}`)
      .then((res) => 
          res.json())
          //send data into the display weather function
          .then(data => displayWeather(data));

  // program to display the date
// get local machine date time
const date = new Date();
// got rid of these because while easier to write it's harder to read
// // get the date as a string
// const d = date.toDateString();

// // get the time as a string
// const t = date.toLocaleTimeString();

//function for displaying weather data
//got rid of this, trying to put it all into an object
// const document.querySelector = (dataPoint) => document.querySelector(dataPoint)
//sets constants using deconstruction
  const displayWeather = (data) => {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity, temp_min, temp_max, feels_like} = data.main;
    const {speed} = data.wind;
//changes the html with the results I want
    document.querySelector(".min").innerHTML =`Low: ${temp_min}`;
    document.querySelector(".max").innerHTML =`High: ${temp_max}`;
    document.querySelector(".city").innerText = name;
    document.querySelector(".description").innerText =`Conditions: ${description}`;
    document.querySelector(".icon").src =`https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".temp").innerText =`${temp}°F`;
    document.querySelector(".humidity").innerText =`Humidity: ${humidity} %`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector('.date').innerHTML = date.toDateString();
    document.querySelector('.time').innerHTML = date.toLocaleTimeString();
  };
  //sets up search function
  const search = () =>
   zipData(document.querySelector(".searchbar").value);
//makes the search button clickable
document.querySelector(".search button").addEventListener("click", () => search());
//sets up the enter key to also trigger the search function
document.querySelector(".searchbar").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    search();
  }
});
//got rid of this because it's not needed in the final version
// autoloads charlottes zip so I can check if my changes work
// zipData("28205");