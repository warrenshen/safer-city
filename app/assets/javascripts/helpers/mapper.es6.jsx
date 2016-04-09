class Mapper {

  constructor() {
    this.listener = null;
  }

  attachListener(listener) {
    this.listener = listener;
  }

  initializeAutocomplete() {
    mapElement = document.getElementById("map");
    if (!mapElement) {
      return;
    }
    var map = new google.maps.Map(
      mapElement,
      {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      },
    );

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', () => {
      var places = searchBox.getPlaces();
      var lat = places[0].geometry.location.lat();
      var lng = places[0].geometry.location.lng();
      var miles = 20;

      // TODO: get stats and markers and set markers
      var resolve = (response) => {
          console.log(response);

          // Clear out the old markers.
          markers.forEach((marker) => marker.setMap(null));
          markers = [];
          var statsDict = []
          var markerArray = [];
          var arrayLength = markerArray.length;
          for (var i = 0; i < arrayLength; i++) {
          var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: 'Hello World!'
          });
      }
          this.listener(statsDict);
        };
      Requester.get(
        ApiConstants.reports.search(lat, lng, miles),
        resolve,
      );

      if (places.length == 0) {
        return;
      }

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }
}

window.Mapper = new Mapper();
