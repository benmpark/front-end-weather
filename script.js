const NUMBER_OF_PERIODS = 5;
const NUMBER_OF_ADDITIONAL_ATTEMPTS = 3;
const TIME_UNTIL_NEXT_ATTEMPT = 5;

const POSTION_STACK_API_KEY = "6b8e76a2f971d85a0ffd013228d84647";

const elementsToHide = document.getElementsByClassName("sometimes-hide");
const weatherInfo = document.getElementById("weather-info");
const alertsInfo = document.getElementById("alerts-info");

document
  .getElementById("location-options")
  .addEventListener("change", adjustOptions);
document.getElementById("city").addEventListener("change", showHideBox);
document.getElementById("weather-form").addEventListener("submit", handleClick);

function adjustOptions() {
  var options = document.getElementsByName("how-many-cities");
  for (option of options) {
    if (option.checked) {
      optionSelected = option.value;
      break;
    }
  }
  var insertSpace = document.getElementById("city");
  var options_list;
  if (optionSelected == "few") {
    options_list = `<option value="">---choose here---</option>
                    <option value="Automatic">Automatic Location</option>
                    <option value="Custom">Manual Location</option>
                    <option value="Boston">Boston, MA</option>
                    <option value="Mt Washington">Mount Washington, NH</option>
                    <option value="New York">New York, NY</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Philadelphia">Philadelphia, PA</option>
                    <option value="Washington">Washington, DC</option>
                    <option value="Chicago">Chicago, IL</option>
                    <option value="Orlando">Orlando, FL</option>
                    <option value="San Francisco">San Francisco, CA</option>
                    <option value="St Louis">St. Louis, MO</option>
                    <option value="Denver">Denver, CO</option>
                    <option value="Dallas">Dallas, TX</option>              
                    <option value="Phoenix">Phoenix, AZ</option>
                    <option value="Seattle">Seattle, WA</option>
                    <option value="New Orleans">New Orleans, LA</option>
                    <option value="Salt Lake City">Salt Lake City, UT</option>
                    <option value="Atlanta">Atlanta, GA</option>
                    <option value="Minneapolis">Minneapolis, MN</option>
                    <option value="Fairbanks">Fairbanks, AK</option>
                    <option value="Honolulu">Honolulu, HI</option>`;
  } else if (optionSelected == "many") {
    options_list = `<option value="">---choose here---</option>
                    <option value="Automatic">Automatic Location</option>
                    <option value="Custom">Manual Location</option>
                    <option value="New York">New York, NY</option>
                    <option value="Los Angeles">Los Angeles, CA</option>
                    <option value="Chicago">Chicago, IL</option>
                    <option value="Houston">Houston, TX</option>
                    <option value="Phoenix">Phoenix, AZ</option>
                    <option value="Philadelphia">Philadelphia, PA</option>
                    <option value="San Antonio">San Antonio, TX</option>
                    <option value="San Diego">San Diego, CA</option>
                    <option value="Dallas">Dallas, TX</option>
                    <option value="San Jose">San Jose, CA</option>
                    <option value="Austin">Austin, TX</option>
                    <option value="Jacksonville">Jacksonville, FL</option>
                    <option value="Fort Worth">Fort Worth, TX</option>
                    <option value="Columbus">Columbus, OH</option>
                    <option value="Charlotte">Charlotte, NC</option>
                    <option value="Indianapolis">Indianapolis, IN</option>
                    <option value="San Francisco">San Francisco, CA</option>
                    <option value="Seattle">Seattle, WA</option>
                    <option value="Denver">Denver, CO</option>
                    <option value="Nashville">Nashville, TN</option>
                    <option value="Washington">Washington, DC</option>
                    <option value="Oklahoma City">Oklahoma City, OK</option>
                    <option value="Boston">Boston, MA</option>
                    <option value="El Paso">El Paso, TX</option>
                    <option value="Portland">Portland, OR</option>`;
  } else {
    console.log("Something isn't working as intended");
  }
  insertSpace.innerHTML = options_list;
}

function showHideBox(event) {
  event.preventDefault();

  var city = document.getElementById("city").value;
  if (city == "Custom") {
    for (element of elementsToHide) {
      element.style.display = "inline";
    }
  } else {
    for (element of elementsToHide) {
      element.style.display = "none";
    }
  }
}

function handleClick(event) {
  event.preventDefault();
  var city = document.getElementById("city").value;
  if (city == "Automatic") {
    automaticLocation();
  } else if (city == "Custom") {
    var address = document.getElementById("user-location").value;
    getUserCoordinatesFromAddress(address);
  } else if (city == "New York") {
    processCoordinates(40.66186927792799, -73.96963733086682);
  } else if (city == "Los Angeles") {
    processCoordinates(34.05, -118.25);
  } else if (city == "Chicago") {
    processCoordinates(41.878113, -87.629799);
  } else if (city == "Houston") {
    processCoordinates(29.760427, -95.369804);
  } else if (city == "Phoenix") {
    processCoordinates(33.60503, -112.070892);
  } else if (city == "Philadelphia") {
    processCoordinates(39.990821, -75.168428);
  } else if (city == "San Antonio") {
    processCoordinates(29.425, -98.493889);
  } else if (city == "San Diego") {
    processCoordinates(32.72793, -117.15529);
  } else if (city == "Dallas") {
    processCoordinates(32.736212, -96.784359);
  } else if (city == "San Jose") {
    processCoordinates(37.354559, -121.883844);
  } else if (city == "Austin") {
    processCoordinates(30.222346, -97.836521);
  } else if (city == "Jacksonville") {
    processCoordinates(30.369914, -81.660992);
  } else if (city == "Fort Worth") {
    processCoordinates(32.729442, -97.33181);
  } else if (city == "Columbus") {
    processCoordinates(39.980761, -82.985331);
  } else if (city == "Charlotte") {
    processCoordinates(35.19534, -80.81711);
  } else if (city == "Indianapolis") {
    processCoordinates(39.785871, -86.143448);
  } else if (city == "San Francisco") {
    processCoordinates(37.7775, -122.416389);
  } else if (city == "Seattle") {
    processCoordinates(47.673455, -122.331537);
  } else if (city == "Denver") {
    processCoordinates(39.740959, -104.985798);
  } else if (city == "Nashville") {
    processCoordinates(36.236907, -86.834683);
  } else if (city == "Washington") {
    processCoordinates(38.904722, -77.016389);
  } else if (city == "Oklahoma City") {
    processCoordinates(35.468611, -97.521389);
  } else if (city == "Boston") {
    processCoordinates(42.360278, -71.057778);
  } else if (city == "El Paso") {
    processCoordinates(31.759167, -106.488611);
  } else if (city == "Portland") {
    processCoordinates(45.533467, -122.650095);
  } else if (city == "Mt Washington") {
    processCoordinates(44.2705, -71.30325);
  } else if (city == "Orlando") {
    processCoordinates(28.54, -81.38);
  } else if (city == "St Louis") {
    processCoordinates(38.627222, -90.197778);
  } else if (city == "New Orleans") {
    processCoordinates(29.966667, -90.080556);
  } else if (city == "Salt Lake City") {
    processCoordinates(40.760833, -111.891111);
  } else if (city == "Atlanta") {
    processCoordinates(33.748889, -84.39);
  } else if (city == "Minneapolis") {
    processCoordinates(44.981944, -93.269167);
  } else if (city == "Fairbanks") {
    processCoordinates(64.843611, -147.723056);
  } else if (city == "Honolulu") {
    processCoordinates(21.306944, -157.858333);
  }
}

function automaticLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        success(position);
      },
      function (e) {
        unsucccess();
      },
      { enableHighAccuracy: true }
    );
  } else {
    weatherInfo.innerHTML =
      "<p>Geolocation does not appear to be supported by this browser.</p>";
  }
}

function success(position) {
  var lat = position.coords.latitude.toFixed(6);
  var lon = position.coords.longitude;
  processCoordinates(lat, lon);
}

function unsucccess() {
  weatherInfo.innerHTML =
    "<p>Geolocation has not been allowed by the user - this may be a one-time " +
    "refusal, or you may need to enable location services in your settings.</p>";
}

function processCoordinates(lat, long) {
  var url = `https://api.weather.gov/points/${lat},${long}`;
  fetch(url)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        try {
          if (response.json().detail != null) {
            throw new Error(`Error - ${response.json().detail}`);
          } else {
            throw new Error("An error occurred getting the forecast.");
          }
        } catch {
          throw new Error("An error occurred getting the forecast.");
        }
      }
    })
    .then(function (data) {
      let gridInfo = getGridInfo(data);
      if (gridInfo[0] != null) {
        getWeatherInfo(
          gridInfo[0],
          gridInfo[1],
          gridInfo[2],
          NUMBER_OF_PERIODS
        );
        getAlertInfo(gridInfo[3]);
      } else {
        weatherInfo.innerHTML = `<p>The location you have entered is outside
                                 the "jurisdiction" of the National Weather
                                 Service. U.S.A.!!! U.S.A.!!! 🇺🇸🇺🇸🇺🇸</p>`;
        alertsInfo.innerHTML = "";
      }
    })
    .catch(function (error) {
      weatherInfo.innerHTML = `<p style="text-align: center;">${error}</p>`;
    });
}

function getGridInfo(data) {
  var forecastUrl;
  var city;
  var state;
  var alertsUrl;

  try {
    if (data.title == "Data Unavailable For Requested Point") {
      return [null, null, null, null];
    }
    forecastUrl = data.properties.forecast;
    city = data.properties.relativeLocation.properties.city;
    state = data.properties.relativeLocation.properties.state;
    var zone = data.properties.forecastZone.slice(-6);
    alertsUrl = `https://api.weather.gov/alerts/active/zone/${zone}`;
  } catch {
    console.log("An error occurred processing the coordinates.");
  } finally {
    return [forecastUrl, city, state, alertsUrl];
  }
}

function getUserCoordinatesFromAddress(entry) {
  var url = `http://api.positionstack.com/v1/forward?access_key=${POSTION_STACK_API_KEY}&query=${entry}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      /*console.log(
        `LATITUDE: ${data.data[0].latitude}, LONGITUDE: ${data.data[0].longitude}`
      );*/
      if (data.data.length > 0) {
        processCoordinates(data.data[0].latitude, data.data[0].longitude);
      } else {
        weatherInfo.innerHTML = `<p style="text-align: center;">The location you have entered cannot be found. Please ensure your address is spelled correctly.</p>`;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getWeatherInfo(forecastUrl, city, state, duration) {
  fetch(forecastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayForecast(data, city, state, duration);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getAlertInfo(alertsUrl) {
  fetch(alertsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayAlerts(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function displayForecast(data, city, state, duration) {
  weatherInfo.innerHTML = `<h2>Here is the short-term forecast for ${city}, ${state}:</h2>`;
  var time_periods = [];
  var forecast_details = [];

  for (let i = 0; i < duration; i++) {
    time_periods.push(data.properties.periods[i].name.toUpperCase());
    forecast_details.push(data.properties.periods[i].detailedForecast);
  }

  for (let i = 0; i < duration; i++) {
    weatherInfo.innerHTML += `<p><span class="day-time">${time_periods[i]}:</span> <span class="deets">${forecast_details[i]}</span></p>`;
  }
}

function displayAlerts(data) {
  if (data.features.length > 0) {
    alertHTML = `<p style="text-align: center; color: #C94326; font-weight: 600;">*** The following alert(s) have been issued for your location: ***</p><ul>`;
    for (alert of data.features) {
      alertHTML += `<li><u><em>${alert.properties.headline}</em></u> – ${alert.properties.description}</li>`;
    }
    alertHTML += `</ul>`;
  } else {
    alertHTML = `<p style="text-align: center; font-weight: 400;"><em>There are no active alerts for your location</em>.</p>`;
  }
  alertsInfo.innerHTML = alertHTML;
}
