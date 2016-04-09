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
        map: ''
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
        if (status == google.maps.DirectionsStatus.OK) {
          console.log(result)
          for (var i = 0, len = result.routes.length; i < len; i++) {
                new google.maps.DirectionsRenderer({
                    map: mainMap,
                    directions: result,
                    routeIndex: i
                });
            }
        }
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
