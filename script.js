var jsonObject = {
  "coord": {
    "lon": -0.1,
    "lat": 51.38
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d"
    }
    ],
      "base": "stations",
      "main": {
      "temp": 9.45,
      "pressure": 1022,
      "humidity": 87,
      "temp_min": 8,
      "temp_max": 11
      },
        "visibility": 9000,
        "wind": {
        "speed": 8.2,
        "deg": 50
        },
          "clouds": {
          "all": 75
          },
            "dt": 1479973800,
            "sys": {
            "type": 1,
            "id": 5088,
            "message": 0.0564,
            "country": "GB",
            "sunrise": 1479972830,
            "sunset": 1480003220
            },
              "id": 2651817,
              "name": "Croydon",
              "cod": 200};
var locationApiUrl = "http://geoip.nekudo.com/api";
var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
var lat = "lat=";
var long = "&lon=";
var apiId = "&appid=afe224f25cdf028a03b1b75949c0d9cc";
var cityQuery = "q=";
var cityName = "";
var isMetric = "&units=metric";
var unitsButton = document.getElementById('changeUnits');
var canvasVar = document.getElementById('skyIcon');

var icons = new Skycons({"color": "black"});

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

// this promise returns the 'blob' of data from the url or an error
function getLeJSON(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onload = function() {
      if (xhr.status === 200 ) {
        resolve(xhr.response);
      } else {
        reject(Error("There was an error! Error:" + xhr.statusText));
      }
    };
    xhr.onerror = function() {
      reject(Error('There was a network error.'));
    };
    xhr.send();
  });

}

function startUp() {
// getLeJSON(locationApiUrl).then(
// function(response) {
//   // congrats you have a Blob with location data!
//   // next build a url for weather api using the data
//   var locationJson = JSON.parse(response);
//   console.log(response, "le response");
//   console.log(locationJson, "location json");
//   return baseUrl + lat + locationJson.location.latitude + long + locationJson.location.longitude + apiId + isMetric;
//   // after that we need to request the Blob from weather api (see next chained promise with .then)
//
// }, function(error){
//   // there was a problem with getting location so prompt for city name
//   cityName = prompt("There was a problem! Error:" + error + ". Please input your city manually.");
//    return baseUrl + cityQuery + cityName + apiId + isMetric;
// }
// ).then(function(weatherUrl){ console.log(weatherUrl);
//                   var xhr = new XMLHttpRequest();
//                   xhr.open("GET", weatherUrl, false);
//                   xhr.send();
//                   console.log(xhr.status)
//                   console.log(xhr.responseText);
//                   jsonObject = JSON.parse (xhr.responseText);
//                   return jsonObject;
//              }).then( function(response) { console.log(response);
                                         return viewInitialise();
                                      //  });
}

function viewInitialise() {
    console.log(jsonObject, "json object inside view");
    // everything to render to the page should go here
    var temperature = jsonObject.main.temp;
    var city = jsonObject.name;
    var country = jsonObject.sys.country;
    document.getElementById("location").textContent = city + ", " + country;
    document.getElementById("temperature").textContent = temperature;

    setIcon(jsonObject.weather["0"].id);
    icons.play();

    return jsonObject;
  }

function changeUnits() {
  isMetric = isMetric == "&units=metric" ? "&units=imperial" : "&units=metric";
  console.log("isMetric");
  return startUp();
}

function setIcon(weatherCode) {
  console.log(weatherCode, "weather code");
  if ( weatherCode[0] === 2 ) {
    canvasVar.set(Skycons.SLEET);
  } else if ( weatherCode[0] === 3 ) {
    canvasVar.id = "rain";
  } else if ( weatherCode[0] === 5 ) {
    canvasVar.id = "rain";
  }  else if ( weatherCode[0] === 6 ) {
    canvasVar.id = "snow";
  }  else if ( weatherCode[0] === 7 ) {
    canvasVar.id = "fog";
  } else if ( weatherCode === 800 ) {
    canvasVar.id = "clear";
  }  else if ( weatherCode > 800 && weatherCode < 805 ) {
    canvasVar.id = "cloudy";

    icons.set(canvasVar.id, Skycons.CLOUDY);

    //canvasVar.id = "cloudy";
    console.log(canvasVar.id, "show cloudy if it is cloudy");
  } else if ( weatherCode > 900 ) {
    canvasVar.id = "wind";
  }
}
unitsButton.addEventListener('click', changeUnits);
startUp();
