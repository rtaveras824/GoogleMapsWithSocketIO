 var latitude = 28.5494211, longitude = -81.17772269999999;
 var userLatitude = 0;
 var userLongitude = 0;

 const numbers = { '1': 'Test', '2': 'Test 2' };
 const testSpread = { ...numbers, '3': 'Test 3' };
 console.log(testSpread);
 console.log(numbers);
 console.log(latitude);
      
function mapsLoaded() {
  if (navigator.geolocation) {
    initMap(latitude, longitude);
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {

  }
}

function showPosition(position) {
  userLatitude = position.coords.latitude;
  userLongitude = position.coords.longitude;

  // var marker = new google.maps.Marker({
  //   map: map,
  //   title: 'What'
  // });

  // marker.setPosition({lat: userLatitude, lng: userLongitude});
}

var map;
function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 18
  });
}