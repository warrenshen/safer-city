class SearchMap extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="map-container">
        <input id="pac-input"
               className="controls"
               type="text"
               placeholder="Search Box" />
      	<div id="map"></div>
      </div>
    );
  }
}
