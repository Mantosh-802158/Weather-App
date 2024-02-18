let halfWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
let appkey = "&appid=4cebc248c1dace2bec598db6e933131e";

let button = document.getElementById("getBtn");

//styling image for initial stage:...
function checkImageStyle() {
  let images = document.getElementsByClassName("flexImage");
  let firstFlexDiv = document.getElementById("content-div1");

  for (let image of images) {
    if (firstFlexDiv.innerHTML == "") {
      image.style.display = "none";
    } else {
      image.style.display = "block";
      // console.log("div-full");
    }
  }
}

checkImageStyle();
let hours, minutes, secondss;
function unixTimeToHumanReadable(seconds) {
  let ans = "";
  let daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let currYear,
    daysTillNow,
    extraTime,
    extraDays,
    index,
    date,
    month,
    flag = 0;

  // Calculate total days unix time T
  daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
  extraTime = seconds % (24 * 60 * 60);
  currYear = 1970;

  // Calculating current year
  while (true) {
    if (currYear % 400 == 0 || (currYear % 4 == 0 && currYear % 100 != 0)) {
      if (daysTillNow < 366) {
        break;
      }
      daysTillNow -= 366;
    } else {
      if (daysTillNow < 365) {
        break;
      }
      daysTillNow -= 365;
    }
    currYear += 1;
  }

  // Updating extradays because it
  // will give days till previous day
  // and we have include current day
  extraDays = daysTillNow + 1;

  if (currYear % 400 == 0 || (currYear % 4 == 0 && currYear % 100 != 0))
    flag = 1;

  // Calculating MONTH and DATE
  month = 0;
  index = 0;
  if (flag == 1) {
    while (true) {
      if (index == 1) {
        if (extraDays - 29 < 0) break;

        month += 1;
        extraDays -= 29;
      } else {
        if (extraDays - daysOfMonth[index] < 0) {
          break;
        }
        month += 1;
        extraDays -= daysOfMonth[index];
      }
      index += 1;
    }
  } else {
    while (true) {
      if (extraDays - daysOfMonth[index] < 0) {
        break;
      }
      month += 1;
      extraDays -= daysOfMonth[index];
      index += 1;
    }
  }

  // Current Month
  if (extraDays > 0) {
    month += 1;
    date = extraDays;
  } else {
    if (month == 2 && flag == 1) date = 29;
    else {
      date = daysOfMonth[month - 1];
    }
  }

  // Calculating HH:MM:YYYY
  hours = parseInt(extraTime / 3600, 10);
  minutes = parseInt((extraTime % 3600) / 60, 10);
  secondss = parseInt((extraTime % 3600) % 60, 10);

  ans += date.toString();
  ans += "/";
  ans += month.toString();
  ans += "/";
  ans += currYear.toString();
  ans += " ";
  ans += hours.toString();
  ans += ":";
  ans += minutes.toString();
  ans += ":";
  ans += secondss.toString();

  return ans;
}

function h3function(lastUpdated) {
  let h3 = document.getElementById("h3");
  h3.textContent = "Last Updated on: " + lastUpdated;
}

let createImageTag = (num) => {
  let source;
  // let image = document.createElement("img");
  // image.classList.add("flexImage");
  // console.log("inside creteimage function");
  let image;
  if (num == 1) {
    image = document.getElementById("image1");
    source = "./assests/location_logo.png";
    // console.log("inside checking number");
  } else if (num == 2) {
    image = document.getElementById("image2");
    source = "./assests/temp_logo.jpg";
  } else if (num == 3) {
    image = document.getElementById("image3");
    source = "./assests/humidity_logo.jpg";
  } else if (num == 4) {
    image = document.getElementById("image4");
    source = "./assests/pressure_logo.png";
  } else if (num == 5) {
    image = document.getElementById("image5");
    source = "./assests/weather-2021-12-07.png";
  } else if (num == 6) {
    image = document.getElementById("image6");
    source = "./assests/wind_logo.jpg";
  } else {
    console.log("image not created!");
  }
  image.src = source;
  // console.log("end of createimage function");
  // return image;
};
function convertToCelcius(kelvin) {
  let celcius = kelvin - 273.15;
  // console.log(celcius);
  celcius = celcius.toFixed(2);
  // celcius.toString();
  return celcius;
}
function item1function(city, countryCode, finalTimeZone, latitude, longitude) {
  let div1 = document.getElementById("content-div1");
  // let imageDiv1 = document.getElementById("imageDiv1");
  let inn_html =
    city +
    "<br/>" +
    "Country Code: " +
    countryCode +
    "<br/>" +
    "Timezone: " +
    finalTimeZone +
    "<br/>" +
    "Latitude: " +
    latitude +
    "<br/>" +
    "Longitude: " +
    longitude;
  div1.innerHTML = inn_html;
  // let image;
  // try {
  //   image = createImageTag(1);
  // } catch (err) {
  //   console.log("An error occured; ", err);
  // }

  // imageDiv1.appendChild(image);
  checkImageStyle();
  createImageTag(1);
}
function item2function(temp, min_temp, max_temp, feels_like) {
  let div2 = document.getElementById("content-div2");
  // let imageDiv2 = document.getElementById("imageDiv2");
  let inn_html =
    "Temp: " +
    temp +
    "&deg;C<br/>" +
    "Min Temp: " +
    min_temp +
    "&deg;C<br/>" +
    "Max Temp: " +
    max_temp +
    "&deg;C<br/>" +
    "Feels like: " +
    feels_like +
    "&deg;C";
  div2.innerHTML = inn_html;
  // let image;
  // image = createImageTag(2);
  // imageDiv2.appendChild(image);
  createImageTag(2);
}

function item3function(humidity) {
  let div3 = document.getElementById("content-div3");
  // let imageDiv3 = document.getElementById("imageDiv3");
  let inn_html = "Humidity: " + humidity.toString() + "%";
  div3.innerHTML = inn_html;
  // let image;
  // image = createImageTag(3);
  // imageDiv3.appendChild(image);
  createImageTag(3);
}

function item4function(pressure) {
  let div4 = document.getElementById("content-div4");
  // let imageDiv4 = document.getElementById("imageDiv4");
  let inn_html = "Pressure: " + pressure.toString() + " hPa";
  div4.innerHTML = inn_html;
  // let image;
  // image = createImageTag(4);
  // imageDiv4.appendChild(image);
  createImageTag(4);
}

function item5function(visibility, weather_desc, weather_main) {
  let div5 = document.getElementById("content-div5");
  // let imageDiv5 = document.getElementById("imageDiv5");
  let inn_html =
    "Visibility: " +
    visibility.toString() +
    " KM" +
    "<br/>" +
    "Weather Description: " +
    weather_desc +
    "<br/>" +
    weather_main;

  div5.innerHTML = inn_html;
  // let image;
  // image = createImageTag(5);
  // imageDiv5.appendChild(image);
  createImageTag(5);
}

function item6function(wind_speed, wind_dir) {
  let div6 = document.getElementById("content-div6");
  // let imageDiv6 = document.getElementById("imageDiv6");
  let inn_html =
    "Wind Speed: " +
    wind_speed.toString() +
    " km/h" +
    "<br/>" +
    "Wind Direction: " +
    wind_dir +
    " deg due North";

  div6.innerHTML = inn_html;
  // let image;
  // image = createImageTag(6);
  // imageDiv6.appendChild(image);
  createImageTag(6);
}
button.addEventListener("click", async () => {
  let cityName = document.getElementById("city").value;
  try {
    let response = await axios.get(halfWeather + cityName + appkey);
    // console.log(response);
    //heading of last updated
    let lastUpdatedUnix = response.data.dt;
    let lastUpdated = unixTimeToHumanReadable(lastUpdatedUnix);
    h3function(lastUpdated);

    //Calculating data for item 1
    //calculation timezone
    let timeZoneUnix = response.data.timezone;
    unixTimeToHumanReadable(timeZoneUnix);
    let finalTimeZone =
      hours.toString() + ":" + minutes.toString() + ":" + secondss.toString();
    // console.log(finalTimeZone);

    let city = response.data.name;
    let countryCode = response.data.sys.country;
    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;
    item1function(city, countryCode, finalTimeZone, latitude, longitude);

    //calculating data for item 2
    let temp = convertToCelcius(response.data.main.temp);
    let min_temp = convertToCelcius(response.data.main.temp_min);
    let max_temp = convertToCelcius(response.data.main.temp_max);
    let feels_like = convertToCelcius(response.data.main.feels_like);
    item2function(temp, min_temp, max_temp, feels_like);

    //calculating data for item 3
    let humidity = response.data.main.humidity;
    item3function(humidity);

    //calculating data for item 4
    let pressure = response.data.main.pressure;
    item4function(pressure);

    //calculating data for item 5
    let visibility = response.data.visibility / 1000;
    let weather_desc = response.data.weather[0].description;
    let weather_main = response.data.weather[0].main;
    item5function(visibility, weather_desc, weather_main);

    //calculating data for item 6
    let wind_speed = response.data.wind.speed * 3.6;
    wind_speed = wind_speed.toFixed(2);
    let wind_dir = response.data.wind.deg;
    item6function(wind_speed, wind_dir);
  } catch (err) {
    let h3 = document.getElementById("h3");
    h3.innerHTML="Try Entering another another name...<br/>Error: "+err.code;
    // console.log("an error occured ", err);
    console.log("An error occured!");
  }
  // console.log(cityName);
});
