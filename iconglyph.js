//Getting icon code from the JSON:

//var iconCode = json.weather['0'].icon;

var iconCode = jsonObject.weather['0'].id;

console.log(iconCode);

if(iconCode.charAt(0) == 9) {
  iconCode = iconCode.charAt(1);
} else {
  iconCode = iconCode;
}

console.log(iconCode);

//setting the iconKey to be used with SkyIcons using iconCode:

var iconKey = '';

function setIconKey(item) {
  if(iconCode == 4) {
    iconKey = 'PARTLY_CLOUDY_NIGHT';
  } else {
    iconCode = iconCode;
  }
}

setIconKey(iconCode);

console.log(iconKey);


//skyIcons code

var skycons = new Skycons({"color": "black"});

skycons.add(document.getElementById("skyIcon"), Skycons.iconKey);
