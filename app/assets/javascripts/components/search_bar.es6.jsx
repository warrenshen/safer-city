class SearchBar extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="Search for a location"
          className="search-input"
          type="search" />
      </div>
    );
  }
}
