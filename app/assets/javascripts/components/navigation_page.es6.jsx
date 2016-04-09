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
      };
  }

  componentDidMount() {
    Mapper.attachListener(
      (latlngOrArray, type, map) => this.syncAutocomplete(latlngOrArray, type, map),
      'navigation',
    );
  }

  syncAutocomplete(latlngOrArray, type, map) {
    if (type === 'src') {
      this.setState({ srcLat: latlngOrArray.lat, srcLng: latlngOrArray.lng });
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
      this.setState({ dstLat: latlngOrArray.lat, dstLng: latlngOrArray.lng });
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
