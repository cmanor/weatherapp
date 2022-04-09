    const apiKey= "856cf893bf4748da5e5e119d50885a54";
    //getting zipcode data b/c I need to send lon and lat to another api
    const zipData = function (zip) {
        fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`)
          .then((response) => 
              response.json())
              //sends data to next api request
            .then((data) => lonlat(data))
      };
//sends lon and lat to 2nd API that has weather data
      const lonlat = function (deez) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${deez.lat}&lon=${deez.lon}&units=imperial&appid=${apiKey}`)
          .then((response) => 
              response.json())
              //send data into the display weather function
              .then(data => displayWeather(data))
      };

      // program to display the date
// get local machine date time
const date = new Date();

// get the date as a string
const d = date.toDateString();

// get the time as a string
const t = date.toLocaleTimeString();

//function for displaying weather data

//sets constants using deconstruction
      const displayWeather = function (data) {
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
        document.querySelector('.date').innerHTML = d;
        document.querySelector('.time').innerHTML = t;
      };
      //sets up search function
      const search = () => 
      zipData(document.querySelector(".searchbar").value);
//makes the search button clickable
  document.querySelector(".search button").addEventListener("click", function () {
    search();
  });
//sets up the enter key to also trigger the search function
  document.querySelector(".searchbar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        search();
        document.querySelector(".searchbar").value = null;
      }
    });
// autoloads charlottes zip so I can check if my changes work
    zipData("28205");