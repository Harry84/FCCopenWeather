var jsonObject = {
"coord": {
"lon": 5.97,
"lat": 52.21
},
"weather": [
{
"id": 800,
"main": "Clouds",
"description": "few clouds",
  "icon": "01d"
}
],
"base": "stations",
"main": {
"temp": 281.19,
"pressure": 1021,
"humidity": 56,
"temp_min": 280.15,
"temp_max": 282.15
},
"visibility": 10000,
"wind": {
"speed": 6.7,
"deg": 50
},
"clouds": {
"all": 20
},
"dt": 1480082100,
"sys": {
"type": 1,
"id": 5207,
"message": 0.0038,
"country": "NL",
"sunrise": 1480058106,
"sunset": 1480087878
},
"id": 2759706,
"name": "Apeldoorn",
"cod": 200
};
var locationApiUrl = "http://geoip.nekudo.com/api";
var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
var lat = "lat=";
var long = "&lon=";
var apiId = "&appid=afe224f25cdf028a03b1b75949c0d9cc";
var cityQuery = "q=";
var isMetric = true;
var unitFar = "°F";
var unitCel = "°C";
var metricVal = "&units=metric";
var unitsButton = document.getElementById('changeUnits');
var canvasVar = document.getElementById('skyIcon');
var cityName = "";
var icons = new Skycons({"color": "black"});
var unitsConvert = document.getElementById('unit-convert');
var tempText = document.getElementById("temperature");
var temperature;
var tempStart = true;
var fahrenheit;


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
        reject(Error("There was an error! Error:"  + xhr.statusText));
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
//   return baseUrl + lat + locationJson.location.latitude + long + locationJson.location.longitude + apiId;
//   // after that we need to request the Blob from weather api (see next chained promise with .then)
// }, function(error){
//   // there was a problem with getting location so prompt for city name
//   cityName = prompt("There was a problem! Error:" + error + ". Please input your city manually.");
//    return baseUrl + cityQuery + cityName + apiId;
//  }
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
    temperature = (jsonObject.main.temp -273.15).toFixed(2);
    fahrenheit = ((temperature * (9/5)) + 32).toFixed(2);
    var city = jsonObject.name;
    var country = jsonObject.sys.country;
    document.getElementById("location").textContent = city + ", " + country;
    tempText.textContent = temperature;

    setIcon(jsonObject.weather["0"].id);
    icons.play();

    return jsonObject;
  }

function changeUnits() {
  // °F
  console.log(unitsButton);
  console.log(isMetric);
  if(isMetric===true) {
    tempText.textContent = fahrenheit;
    unitsConvert.textContent = unitFar;
  }
  if (isMetric=== false) {
    tempText.textContent = temperature;
    unitsConvert.textContent = unitCel;
  }


  isMetric = isMetric == true ? false : true;

}

function setIcon(weatherCode) {
  var dayOrNight = jsonObject.weather[0].icon.split("");
  console.log(weatherCode, "weather code");
  if ( weatherCode >= 200 && weatherCode <= 299 ) {
    canvasVar.id = "sleet";
    icons.set(canvasVar.id, Skycons.SLEET);
  } else if ( weatherCode >= 300 && weatherCode <= 399 ) {
    canvasVar.id = "rain";
    icons.set(canvasVar.id, Skycons.RAIN);
  } else if ( weatherCode >= 500 && weatherCode <= 599 ) {
    canvasVar.id = "rain";
    icons.set(canvasVar.id, Skycons.RAIN);
  }  else if ( weatherCode >= 600 && weatherCode <= 699 ) {
    canvasVar.id = "snow";
    icons.set(canvasVar.id, Skycons.SNOW);
  }  else if ( weatherCode >= 700 && weatherCode <= 799 ) {
    canvasVar.id = "fog";
    icons.set(canvasVar.id, Skycons.FOG);
  } else if ( weatherCode == 800 ) {
    console.log(dayOrNight);
    if ( dayOrNight[2] == "d" ) {
      canvasVar.id = "clear-day";
      icons.set(canvasVar.id, Skycons.CLEAR_DAY);
    } else if ( dayOrNight[2] == "n" ) {
      canvasVar.id = "clear-night";
      icons.set(canvasVar.id, Skycons.CLEAR_NIGHT);
    }
  }  else if ( weatherCode > 800 && weatherCode < 805 ) {
    canvasVar.id = "cloudy";
    icons.set(canvasVar.id, Skycons.CLOUDY);
  } else if ( weatherCode > 900 ) {
    canvasVar.id = "wind";
    icons.set(canvasVar.id, Skycons.WIND);
  }
}
unitsButton.addEventListener('click', changeUnits);
startUp();
