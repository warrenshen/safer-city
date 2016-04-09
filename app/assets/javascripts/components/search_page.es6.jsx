class SearchPage extends React.Component {

  // --------------------------------------------------
  // Render
  // --------------------------------------------------
  render() {
    return (
      <div className="search-page">
        <Header />
        <div className="search-grid">
          <SearchMap />
          <SearchGraphs />
        </div>
      </div>
    );
  }
}
