class Mapper {

  constructor() {
    this.listener = null;
    this.mode = null;
  }

  attachListener(listener, mode) {
    this.listener = listener;
    this.mode = mode;
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
    if (this.mode === 'navigation') {
      var inputSrc = document.getElementById('pac-input-src');
      var searchBoxSrc = new google.maps.places.SearchBox(inputSrc);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputSrc);

      var inputDst = document.getElementById('pac-input-dst');
      var searchBoxDst = new google.maps.places.SearchBox(inputDst);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputDst);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', () => {
        searchBoxSrc.setBounds(map.getBounds());
      });
      map.addListener('bounds_changed', () => {
        searchBoxDst.setBounds(map.getBounds());
      });

    } else {
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
      });
    }


    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.


    if (this.mode === 'navigation') {
      var miles = 10;
      var resolve = (response) => {
        var reports = response.reports
        this.listener(reports, 'reports', map);
      };

      searchBoxSrc.addListener('places_changed', () => {
        var places = searchBoxSrc.getPlaces();
        var place = places[0]
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var latlng = {lat: lat, lng: lng}
        this.listener(latlng, 'src', map);
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

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

      searchBoxDst.addListener('places_changed', () => {
        var places = searchBoxDst.getPlaces();
        var place = places[0]
        var lat = place.geometry.location.lat();
        var lng = place.geometry.location.lng();
        var latlng = {lat: lat, lng: lng}
        this.listener(latlng, 'dst', map);
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

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    } else {
      searchBox.addListener('places_changed', () => {
        var places = searchBox.getPlaces();
        var lat = places[0].geometry.location.lat();
        var lng = places[0].geometry.location.lng();
        var miles = 20;

        // TODO: get stats and markers and set markers
        if (this.mode === 'search') {
          var aResolve = (aResponse) => {

            var bResolve = (bResponse) => {

              // Clear out the old markers.
              markers.forEach((marker) => marker.setMap(null));
              markers = [];
              var arrayLength = aResponse.reports.length;
              for (var i = 0; i < arrayLength; i++) {
                var markerLat = aResponse.reports[i].latitude;
                var markerLng = aResponse.reports[i].longitude;
                var markerTitle = aResponse.reports[i].title;
                var markerDesc = aResponse.reports[i].description;

                var marker = new google.maps.Marker({
                  map: map,
                  position: { lat: markerLat, lng: markerLng },
                  title: markerTitle,
                });

                marker.addListener(
                  'click',
                  () => {
                    var infowindow = new google.maps.InfoWindow({
                      content: markerDesc,
                    });
                    infowindow.open(map, marker);
                  },
                );
              }
              this.listener(aResponse.reports, bResponse.categories);
            };

            Requester.get(
              ApiConstants.categories.search(lat, lng),
              bResolve,
            );
          }

          Requester.get(
            ApiConstants.reports.search(lat, lng),
            aResolve,
          );
        } else if (this.mode === 'form') {
          this.listener(lat, lng);
        }

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
}

window.Mapper = new Mapper();
