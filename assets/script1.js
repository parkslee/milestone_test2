
function initMap() {
  var centerCoordinates = new google.maps.LatLng(51.509865, -0.118092);
  var map = new google.maps.Map(document.getElementById('map'), {
    center : centerCoordinates,
    zoom : 7
  });
  
  
  //restricts search to GB only
  var option = {
   // types: ['(regions)'],
		componentRestrictions : {country : "GB"
			}
		};
  var card = document.getElementById('pac-card');
  var input = document.getElementById('pac-input');
  var infowindowContent = document.getElementById('infowindow-content');

  

  var autocomplete = new google.maps.places.Autocomplete(input, option);
  var infowindow = new google.maps.InfoWindow();
  infowindow.setContent(infowindowContent);
  //kml layer
  var studioLayer = new google.maps.KmlLayer({
    url: 'https://raw.githubusercontent.com/parkslee/kml/master/ukdataset22.kml',
    map: map,
    preserveViewport: true
    });
  var marker = new google.maps.Marker({
    map : map
    
  });

  autocomplete.addListener('place_changed',function() {
    document.getElementById("location-error").style.display = 'none';
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      document.getElementById("location-error").style.display = 'inline-block';
      document.getElementById("location-error").innerHTML = "Cannot Locate '" + input.value + "' on map";
      return;
    }

    
    

    map.fitBounds(place.geometry.viewport);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    
    
   
  });
 

  

}

//url parameter

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
        
    }
}

var name = getUrlParameter('name');
document.getElementById('name').innerHTML = name;
