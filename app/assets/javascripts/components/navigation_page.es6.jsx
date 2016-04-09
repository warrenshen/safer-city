class NavigationPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        srcLat: '',
        srcLng: '',
        srcMarker: '',
        dstLat: '',
        dstLng: '',
        dstMarker: '',
        reports: [],
        map: '',
        bestRoute: '',
      };
  }

  componentDidMount() {
    Mapper.attachListener(
      (latlngOrArray, type, map) => this.syncAutocomplete(latlngOrArray, type, map),
      'navigation',
    );
  }

  componentDidUpdate() {
    if (this.state.srcLat != '' && this.state.srcLng != '' && this.state.dstLat != '' && this.state.dstLng != '') {
      var directionsService = new google.maps.DirectionsService()
      var mainMap = this.state.map

      var start = new google.maps.LatLng(this.state.srcLat, this.state.srcLng)
      var end = new google.maps.LatLng(this.state.dstLat, this.state.dstLng)
      var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.WALKING,
        provideRouteAlternatives: true,
      };

      directionsService.route(request, function(result, status) {

        var routes = result.routes
        var requester = window.Requester
        var resolve = (response) => {
          var reports = response.reports

          var arrayLength = reports.length;
          for (var i = 0; i < arrayLength; i++) {
            var markerLat = response.reports[i].latitude;
            var markerLng = response.reports[i].longitude;
            var markerTitle = response.reports[i].title;
            var markerDesc = response.reports[i].description;

            var marker = new google.maps.Marker({
              map: mainMap,
              position: { lat: markerLat, lng: markerLng },
              title: markerTitle,
            });

            marker.addListener(
              'click',
              () => {
                var infowindow = new google.maps.InfoWindow({
                  content: markerDesc,
                });
                infowindow.open(mainMap, marker);
              },
            );
          }


          var minCost = Infinity
          var bestRoute = routes[0]
          var maxCost = 0
          var worstRoute = routes[0]
          for (var i = 0, len = routes.length; i < len; i++) {
            var route = routes[i]
            var overviewPath = route.overview_path
            var cost = 0
            for (var j = 0, lenTwo = overviewPath.length; j < lenTwo; j++) {
              var pathPoint = overviewPath[j];
              for (var k = 0, lenThree = reports.length; k < lenThree; k++) {
                var attackPoint = reports[k]
                var x = (attackPoint.latitude - pathPoint.lat())*(attackPoint.latitude - pathPoint.lat())
                var y = (attackPoint.longitude - pathPoint.lng())*(attackPoint.longitude - pathPoint.lng())
                cost += Math.sqrt(x, y)
                // want to minimize cost
              };
            }

            if (cost < minCost) {
              minCost = cost
              bestRoute = route
            }
            if (cost > maxCost) {
              maxCost = cost
              worstRoute = route
            }
          }

          var polylineOptionsActual = new google.maps.Polyline({
            strokeColor: '#43AD0D',
            strokeOpacity: 1.0,
            strokeWeight: 5
          });
          for (var i = 0, len = result.routes.length; i < len; i++) {
            if (routes[i] == bestRoute) {
              new google.maps.DirectionsRenderer({
                map: mainMap,
                directions: result,
                routeIndex: i,
                polylineOptions: polylineOptionsActual
              });
            } else {
              new google.maps.DirectionsRenderer({
                map: mainMap,
                directions: result,
                routeIndex: i,
              });
            }
          }
        };

        Requester.get(
          ApiConstants.reports.search(start.lat(), start.lng()),
          resolve,
        );
            // show the cards for routes with the following rankings:

      });
    }
  }

  syncAutocomplete(latlngOrArray, type, map) {
    if (type === 'src') {
      this.setState({ srcLat: latlngOrArray.lat, srcLng: latlngOrArray.lng, map: map });
      if (this.srcMarker != null) {
        this.srcMarker.setMap(null)
      }
      var marker = new google.maps.Marker({
        position: {lat: latlngOrArray.lat, lng: latlngOrArray.lng},
        map: map,
        title: 'Hello World!'
      });
      this.srcMarker = marker
      this.srcMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    } else if (type === 'dst') {
      this.setState({ dstLat: latlngOrArray.lat, dstLng: latlngOrArray.lng, map: map });
      if (this.dstMarker != null) {
        this.dstMarker.setMap(null)
      }
      this.dstMarker = new google.maps.Marker({
        position: {lat: latlngOrArray.lat, lng: latlngOrArray.lng},
        map: map,
        title: 'Hello World!'
      });
      this.dstMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    } else if (type == 'reports') {
      this.setState({ reports: latlngOrArray });
    }
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="navigation-page">
        <Header />
        <input id="pac-input-src"
               className="controls"
               type="text"
               placeholder="Starting point" />
        <input id="pac-input-dst"
               className="controls"
               type="text"
               placeholder="Ending point" />
        <div id="map" style={{"height": "400"}}></div>
      </div>
    );
  }
}
