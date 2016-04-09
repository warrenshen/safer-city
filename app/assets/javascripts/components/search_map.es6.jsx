class SearchMap extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div>
        <input
          className="controls"
          id="pac-input"
          type="text" />
      	<div id="map"></div>
      </div>
    );
  }
}
