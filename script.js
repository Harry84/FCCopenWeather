var locationApiUrl = "http://geoip.nekudo.com/api";
var baseUrl = "http://api.openweathermap.org/data/2.5/weather?";
var lat = "lat=";
var long = "&lon=";
var apiId = "&appid=afe224f25cdf028a03b1b75949c0d9cc";
var cityQuery = "q=";
var cityName = "";
var jsonObject;
var isMetric = "&units=metric";
var unitsButton = document.getElementById('changeUnits');

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
getLeJSON(locationApiUrl).then(
function(response) {
  // congrats you have a Blob with location data!
  // next build a url for weather api using the data
  var locationJson = JSON.parse(response);
  console.log(response, "le response");
  console.log(locationJson, "location json");
  return baseUrl + lat + locationJson.location.latitude + long + locationJson.location.longitude + apiId + isMetric;
  // after that we need to request the Blob from weather api (see next chained promise with .then)

}, function(error){
  // there was a problem with getting location so prompt for city name
  cityName = prompt("There was a problem! Error:" + error + ". Please input your city manually.");
   return baseUrl + cityQuery + cityName + apiId + isMetric;
}
).then(function(weatherUrl){ console.log(weatherUrl);
                  var xhr = new XMLHttpRequest();
                  xhr.open("GET", weatherUrl, false);
                  xhr.send();
                  console.log(xhr.status)
                  console.log(xhr.responseText);
                  jsonObject = JSON.parse (xhr.responseText);
                  return jsonObject;
             }).then( function(response) { console.log(response);
                                         return viewInitialise(); });
}

function viewInitialise() {
    console.log(jsonObject, "json object inside view");
    // everything to render to the page should go here
    var temperature = jsonObject.main.temp;
    var city = jsonObject.name;
    var country = jsonObject.sys.country;
    document.getElementById("location").textContent = city + ", " + country;
    document.getElementById("temperature").textContent = temperature;
    return jsonObject;
  }

function changeUnits() {
  isMetric = isMetric == "&units=metric" ? "&units=imperial" : "&units=metric";
  console.log("isMetric");
  return startUp();
}

unitsButton.addEventListener('click', changeUnits);
startUp();
