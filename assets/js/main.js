 var latitude = 28.5494211, longitude = -81.17772269999999;
 var userLatitude = 0;
 var userLongitude = 0;

 var areaCovered;

 const numbers = { '1': 'Test', '2': 'Test 2' };
 const testSpread = { ...numbers, '3': 'Test 3' };
 console.log(testSpread);
 console.log(numbers);
 console.log(latitude);
      
function mapsLoaded() {
  if (navigator.geolocation) {
    google.maps.Circle.prototype.contains = function(latLng) {
      return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
    }
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

function convertMilesToMeters(miles) {
  return miles * 1609.34;
}

function convertFeetToMeters(feet) {
  return feet * 0.3048;
}

var map;
function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 18
  });

  // RADIUS IN METERS
  areaCovered = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: map,
    center: { lat: latitude, lng: longitude },
    radius: convertFeetToMeters(100),
    draggable: true,
    editable: true
  });

  areaCovered.addListener('radius_changed', function() {
    console.log('RADIUS:', areaCovered.getRadius());
  });

  areaCovered.addListener('center_changed', function() {
    console.log('CENTER: ', areaCovered.getCenter());
  })

  var homeMarker = new google.maps.Marker({
      position: {lat: latitude, lng: longitude},
      title: 'Home',
      zIndex: 1000,
      map,
      //icon: image
    });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  homeMarker.addListener('click', function() {
    infowindow.open(map, homeMarker);
  });
}