class SearchBar extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="search-bar">
        <input
          placeholder="Search for a location of interest"
          className="search-input"
          type="search" />
      </div>
    );
  }
}
