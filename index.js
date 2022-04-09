    const apiKey= "856cf893bf4748da5e5e119d50885a54";
    const dq = (dataPoint) => document.querySelector(dataPoint)
    //getting zipcode data b/c I need to send lon and lat to another api
    const zipData = (zip) => 
        fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${apiKey}`)
          .then((res) => 
              res.json())
              //sends data to next api request
            .then((data) => lonlat(data));

//sends lon and lat to 2nd API that has weather data
      const lonlat = (deez) => 
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${deez.lat}&lon=${deez.lon}&units=imperial&appid=${apiKey}`)
          .then((res) => 
              res.json())
              //send data into the display weather function
              .then(data => displayWeather(data));

      // program to display the date
// get local machine date time
const date = new Date();

// get the date as a string
const d = date.toDateString();

// get the time as a string
const t = date.toLocaleTimeString();

//function for displaying weather data

//sets constants using deconstruction
      const displayWeather = (data) => {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity, temp_min, temp_max, feels_like} = data.main;
        const {speed} = data.wind;
//changes the html with the results I want

//remember 'dq' is short for document.queryselector
        dq(".min").innerHTML =`Low: ${temp_min}`;
        dq(".max").innerHTML =`High: ${temp_max}`;
        dq(".city").innerText = name;
        dq(".description").innerText =`Conditions: ${description}`;
        dq(".icon").src =`https://openweathermap.org/img/wn/${icon}.png`;
        dq(".temp").innerText =`${temp}°F`;
        dq(".humidity").innerText =`Humidity: ${humidity} %`;
        dq(".wind").innerText = `Wind speed: ${speed} km/h`;
        dq('.date').innerHTML = d;
        dq('.time').innerHTML = t;
      };
      //sets up search function
      const search = () =>
       zipData(dq(".searchbar").value);
//makes the search button clickable
  dq(".search button").addEventListener("click", () => search());
//sets up the enter key to also trigger the search function
  dq(".searchbar").addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        search();
        dq(".searchbar").value = null;
      }
    });
// autoloads charlottes zip so I can check if my changes work
    zipData("28205");